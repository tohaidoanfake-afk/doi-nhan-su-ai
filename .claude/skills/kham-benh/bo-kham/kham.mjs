#!/usr/bin/env node
/**
 * Owner OS — kham.mjs · CỬA CHAT của buổi khám nút thắt
 *
 * Skill `/kham-benh` không tự giữ vị trí trong bài khám — nó gọi file này, và file này
 * nhả ra ĐÚNG MỘT Ô mỗi lượt. Đây là chỗ chặn AI lệch hướng: AI không biết câu kế tiếp
 * cho tới khi ghi xong câu đang hỏi, nên không đổ cả 30 câu ra một lượt được, không nhảy
 * cóc được, và không tự chấm màu được. Khuôn "bản đồ ở ngoài, AI chỉ điền một ô" —
 * (bản của Đoàn: `wiki/agent-harness-design.md` §2 — trang riêng, bộ khung phát không có).
 *
 * Ruột (chấm màu · quét ngược · ngưỡng · soạn markdown) nằm ở `kham-loi.mjs`, DÙNG CHUNG
 * với form. Ở đây chỉ có: xếp thứ tự ô · đọc/ghi phiên · in ra cho người đọc.
 *
 *   node <thư mục này>/kham.mjs moi                 → mở phiên, in ô đầu
 *   node <thư mục này>/kham.mjs o    <phiên>        → in lại ô đang đứng
 *   node <thư mục này>/kham.mjs dap  <phiên> <giá trị…>
 *   node <thư mục này>/kham.mjs bo   <phiên>        → bỏ qua ô đang đứng
 *   node <thư mục này>/kham.mjs lui  <phiên>        → xoá ô vừa trả lời, quay lại
 *   node <thư mục này>/kham.mjs quet <phiên>        → bảng 9 khâu + quét ngược + tổng hợp
 *   node <thư mục này>/kham.mjs soan <phiên>        → sinh owner-os/nap/<…>/de-xuat.md
 *
 *   (Đoàn chạy: `owner-os/kham.mjs` · member chạy: `bo-kham/kham.mjs` — file này được
 *   chép nguyên văn sang bộ khung, nên chú thích KHÔNG ghi cứng một đường dẫn.)
 *
 * Thêm `--json` để lấy bản máy đọc.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
/* ⚠️ KHÔNG import `scan.mjs`. File này phải chạy được ở bộ khung phát cho member, nơi không
   có `owner-os/` và không có kho của Đoàn — kéo `scan.mjs` (2.690 dòng quét cả vault) là kéo
   theo cả cái kho không dùng tới. Chỉ cần bảng luật + lịch sử lượt soi, và `doc-nut-that.mjs`
   đứng một mình lo đúng hai thứ đó. */
import { docNutThat } from './doc-nut-that.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));

/* ── BỐN KIỂU CÀI, VÀ CHỖ NÀY LÀ CHỖ PHÂN BIỆT ────────────────────────────
 *
 *   ① `owner-os/` của Đoàn   — cha của HERE là kho (có `wiki/`)
 *   ② thư mục clone về       — cha của HERE là gốc bộ khung (có `CLAUDE.md`)
 *   ③ PLUGIN                 — HERE ở ~/.claude/plugins/…, cha là `skills/kham-benh/`
 *   ④ BẢN GỘP                — HERE ở `<kho>/.claude/skills/kham-benh/bo-kham/`
 *
 * ⚠️ KHÔNG hỏi biến môi trường để phân biệt. Bản đầu của mục này dùng
 *    `CLAUDE_PLUGIN_ROOT` — chạy đúng ở ③ nhưng GÃY Ở ④, vì bản gộp không phải
 *    plugin nên biến đó rỗng. Bắt được lúc thử thật, không phải lúc đọc code.
 *
 * Phép hỏi đúng không phải "tôi đang chạy trong cái gì" mà là **"cha tôi có
 * phải một cái kho không"**. Câu đó tự trả lời được, không cần ai khai.
 *
 * HAI THỨ HỎNG NẾU ĐOÁN SAI, và cái thứ hai ăn mất dữ liệu người dùng:
 *
 *   1. `GOC` trỏ vào `skills/kham-benh/` thay vì kho → bản đề xuất ghi ra một
 *      chỗ người dùng không bao giờ tìm thấy.
 *
 *   2. `KHAM_DIR` nằm trong HERE là nằm TRONG GÓI. Bài khám ~22 ô, lưu sau mỗi
 *      lượt, mà `claude plugin update` thay cả thư mục đó. Ai đang khám dở,
 *      cập nhật một cái là mất sạch, KHÔNG CÓ GÌ BÁO. Câu trả lời là dữ liệu
 *      CỦA HỌ nên ghi vào kho của họ — không ghi vào `CLAUDE_PLUGIN_DATA`, chỗ
 *      đó hợp với cache chứ không hợp với thứ họ phải nhìn thấy và phải còn
 *      lại sau khi gỡ plugin.
 */
const laKho = (d) => fs.existsSync(path.join(d, 'wiki')) || fs.existsSync(path.join(d, 'CLAUDE.md'));
const CHA = path.resolve(HERE, '..');
const TRONG_KHO = laKho(CHA);                       // ① ② — nằm ngay trong kho người dùng
const GOC = TRONG_KHO ? CHA : process.cwd();        // ③ ④ — đứng ngoài, lấy thư mục đang chạy
const coFile = (...p) => { const f = path.join(...p); return fs.existsSync(f) ? f : null; };
const NAP_DIR = coFile(HERE, 'nap') || path.join(GOC, 'kham-ra');   // Đoàn: owner-os/nap · còn lại: kho/kham-ra/
/* Lệnh in ra cho người ta gõ lại phải là đường dẫn THẬT của chỗ đang chạy. Đóng cứng
   `owner-os/kham.mjs` thì bản phát cho member bảo họ gõ một lệnh không tồn tại — hỏng kiểu
   chỉ lộ ra ở máy người khác. Bản plugin thì đường dẫn tương đối xuyên qua ~/.claude/plugins
   nên vô nghĩa; ở đó in đúng dạng biến mà người ta gõ được. */
/* Đi NGƯỢC TỪ CHÍNH FILE NÀY để tìm gốc kho, không suy từ `process.cwd()`.
   Cách cũ đoán bằng `path.relative(cwd, file).startsWith('..')` — nhưng dấu hiệu đó
   gộp HAI cảnh khác hẳn nhau vào một: "tôi nằm trong plugin" và "người dùng đang
   đứng ở thư mục con của kho". Bản gộp rơi vào cảnh hai thì in ra biến
   `CLAUDE_PLUGIN_ROOT` — mà bản gộp KHÔNG phải plugin nên biến đó rỗng, lệnh thành
   `node "/skills/..."` và chết. Đo 2026-09-08, cả bốn bố cục. */
const GOC_KHO = (() => {
  let d = HERE;
  for (let i = 0; i < 4; i++) {            // gộp: bo-kham→kham-benh→skills→.claude→kho (4 nấc)
    d = path.resolve(d, '..');             // Đoàn: owner-os→kho (1 nấc)
    if (laKho(d)) return d;                // plugin: không có kho nào trong 4 nấc → null
  }
  return null;
})();
const tuong = GOC_KHO
  ? path.relative(GOC_KHO, fileURLToPath(import.meta.url))
  : path.relative(process.cwd(), fileURLToPath(import.meta.url));
const LENH = GOC_KHO
  ? `node ${tuong}`                                                      // ① ② ③ — luôn tính từ gốc kho
  : 'node "${CLAUDE_PLUGIN_ROOT}/skills/kham-benh/bo-kham/kham.mjs"';    // ④ — thật sự là plugin
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
/* Chạy được ở HAI NƠI, tự nhận ra mình đang ở đâu — không cần bộ sinh vá chuỗi.
   • Creator OS của Đoàn: luật ở `os-map.json`, luật kê đơn ở manifest tính năng.
   • Bộ khung phát member: luật ở `bang-kham.json`, luật kê đơn ở `luat-ke-don.md`. */
const docMap = () => JSON.parse(fs.readFileSync(
  coFile(HERE, 'os-map.json') || path.join(HERE, 'bang-kham.json'), 'utf8'));
function docLuat() {
  const m = coFile(HERE, 'tinh-nang', 'soi-nut-that', 'manifest.json');
  if (m) return JSON.parse(fs.readFileSync(m, 'utf8'));
  const f = path.join(HERE, 'luat-ke-don.md');
  /* Bản member: bỏ phần đầu trang (nhãn "file sinh ra") rồi lấy phần luật. Trang wiki bắt
     buộc đọc rút còn bốn trang mà bộ khung thật sự có — Đoàn có bảy, member không có
     ba trang chỉ kho Đoàn mới có — luật của chúng đã nằm sẵn trong `luat-ke-don.md`. */
  return {
    mo: fs.readFileSync(f, 'utf8').split('\n---\n').slice(1).join('\n---\n').trim(),
    doc: ['target-customer', 'goals', 'offer-ladder', 'values-and-principles'],
    trangDich: 'wiki/nut-that.md',
  };
}
import { KHAM_LOI as KL } from './kham-loi.mjs';

const KHAM_DIR = TRONG_KHO ? path.join(HERE, 'kham') : path.join(GOC, 'kham-ra', 'phien');
const HOM_NAY = iso(new Date());

/* ── phiên ─────────────────────────────────────────────── */
const MOI = () => ({
  luc: new Date().toISOString(), man: 'trieu-chung', daHoi: [],
  dap: {}, tich: {}, sau: {}, khauSau: '', O: '', R: '', E: '', linhCam: '', ghiChu: '',
  tiepNhan: { gio: [] }, congCu: {}, khoiPhat: '', khoiPhatMoc: '', kham: {}, R2: '', R2loai: '', taiKham: {},
});
const duong = (id) => path.join(KHAM_DIR, `${id}.json`);
function doc(id) {
  const f = duong(id);
  if (!fs.existsSync(f)) thoat(`Không có phiên khám "${id}". Mở phiên mới: ${LENH} moi`);
  return JSON.parse(fs.readFileSync(f, 'utf8'));
}
function ghi(id, n) {
  fs.mkdirSync(KHAM_DIR, { recursive: true });
  fs.writeFileSync(duong(id), JSON.stringify(n, null, 2) + '\n');
}
const thoat = (m) => { console.error('✕ ' + m); process.exit(1); };

/* ── DANH SÁCH Ô ───────────────────────────────────────────
 * Dựng lại từ đầu mỗi lượt, không lưu — vì ô phía sau phụ thuộc câu trả lời phía trước
 * (khâu nào quét ra thì đếm số của khâu đó, đào sâu câu tệ nhất của khâu đó). Lưu sẵn một
 * danh sách cứng là lại đúng cái bẫy "đổi một chiều trong cấu trúc, quên chỗ đọc theo
 * chiều cũ". Ô đang đứng = ô ĐẦU TIÊN chưa nằm trong `daHoi`.
 */
function dsO(NT, n, khau, lan) {
  const o = [];
  const chon = (man, id, hoi, dap, phu) => o.push({ man, id, kieu: 'chon', hoi, phu, dap });

  if (KL.coTaiKham(NT, lan)) {
    const cu = lan[0];
    const donCu = (cu.don || []).map(d => `${d.so} ${d.nhan}: ${(d.than || '').split('\n')[0].slice(0, 120)}`).join('\n');
    chon('tai-kham', 'tk.lamDuoc', NT.taiKham.lamDuoc.hoi, NT.taiKham.lamDuoc.dap,
      `Đơn ngày ${cu.ngay}, ${NT.soNgay} ngày trước. Đọc lại cho họ nghe trước khi hỏi:\n${donCu}`);
    chon('tai-kham', 'tk.ketQua', NT.taiKham.ketQua.hoi, NT.taiKham.ketQua.dap);
  }

  const tn = NT.tiepNhan;
  if (tn) {
    chon('tiep-nhan', 'tn.doanhThu', tn.capCuu.doanhThu.hoi, tn.capCuu.doanhThu.dap);
    chon('tiep-nhan', 'tn.tienCon', tn.capCuu.tienCon.hoi, tn.capCuu.tienCon.dap);
    o.push({ man: 'tiep-nhan', id: 'tn.gio', kieu: 'chon-nhieu', toiDa: 2,
      hoi: tn.gioChay.hoi, phu: tn.gioChay.phu, dap: tn.gioChay.nhom });
    if (tn.nhomKhach) chon('tiep-nhan', 'tn.nhomKhach', tn.nhomKhach.hoi, tn.nhomKhach.dap, tn.nhomKhach.phu);
    chon('tiep-nhan', 'tn.lamBaoLau', tn.tienSu.lamBaoLau.hoi, tn.tienSu.lamBaoLau.dap);
    chon('tiep-nhan', 'tn.truocDo', tn.tienSu.truocDo.hoi, tn.tienSu.truocDo.dap);
    chon('tiep-nhan', 'tn.ngu', tn.tienSu.ngu.hoi, tn.tienSu.ngu.dap);
  }

  /* Bản kê công cụ — hỏi họ chạy trên cái gì TRƯỚC khi hỏi bệnh. Quyết định luôn ba thứ:
     hỏi đúng câu xét nghiệm · chọn đúng đường lấy số · và tự nó là tín hiệu. */
  for (const h of ((NT.congCu && NT.congCu.hoi) || []))
    o.push({ man: 'cong-cu', id: `cc.${h.id}`, kieu: h.toiDa ? 'chon-nhieu' : 'chon',
      toiDa: h.toiDa, hoi: h.hoi, phu: h.phu, dap: h.dap });

  /* Vòng S — 11 câu sàng. Đáp án đã mang sẵn màu ở os-map: chọn xong là biết màu, KHÔNG
     có bước ai đó tự chấm điểm ở giữa (luật ở nutThat.chamMau). */
  for (const k of khau) for (const c of (k.cauSang || []))
    o.push({ man: 'trieu-chung', id: `dap.${c.id}`, kieu: 'chon', khau: `${k.icon} ${k.ten}`,
      hoi: c.hoi, phu: c.phu, dap: (c.dap || []).map(d => ({ id: d.mau, nhan: d.nhan, mo: d.mo })) });
  const tc = NT.trieuChung;
  if (tc && (tc.cuocSong || []).length)
    o.push({ man: 'trieu-chung', id: 'tich', kieu: 'chon-nhieu', hoi: tc.cauHoiCuocSong || 'Ngoài công việc, dòng nào đang đúng với mình?',
      phu: tc.phuCuocSong, dap: tc.cuocSong.map(x => ({ id: x.id, nhan: x.nhan, mo: `[${x.tenTruc}] ${x.mo}` })) });

  /* Từ đây trở xuống cần biết khâu nào quét ra — chưa xong vòng S thì dừng danh sách ở đây. */
  const xongS = o.filter(x => x.man === 'trieu-chung').every(x => n.daHoi.includes(x.id));
  if (!xongS) return o;
  if (!n.khauSau) { const q = KL.quet(NT, n, khau); n.khauSau = q.k ? q.k.id : ''; }
  const k = khau.find(x => x.id === n.khauSau);
  if (!k) return o;   // không khâu nào tắc → không đào sâu

  const kp = NT.khoiPhat;
  if (kp) {
    chon('khoi-phat', 'khoiPhat', kp.hoi.replace('Chỗ này', `Chỗ ${k.ten}`), kp.dap, kp.phu);
    if (n.khoiPhat === 'co-luc-on')
      o.push({ man: 'khoi-phat', id: 'khoiPhatMoc', kieu: 'chu', hoi: kp.mocGhi.hoi, phu: kp.mocGhi.ph });
  }

  /* Cấp cứu thì KHÔNG gửi đi xét nghiệm — cầm máu trước (luật ở tiepNhan.capCuu). */
  if (!KL.capCuu(n)) for (const x of KL.soCanDem(NT, n, khau)) {
    const d = KL.duongLaySo(NT, n, x);
    o.push({ man: 'kham', id: `kham.${x.id}`, kieu: 'so', donVi: x.donVi,
      hoi: KL.hoiXetNghiem(NT, n, x),
      duong: d,
      phu: [x.phu, x.doiChieu && `Đối chiếu: ${x.doiChieu}`].filter(Boolean).join(' · ') });
  }

  const ct = KL.cauTeNhat(n, k) || (k.cauSang || [])[0];
  ((ct && ct.daoSau) || []).forEach((h, i) => o.push({ man: 'sau', id: `sau.${i}`, kieu: 'chu',
    khau: `${k.icon} ${k.ten}`, hoi: h,
    phu: i === 0 ? `Đang đào chỗ: "${ct.hoi}". Bắt đầu bằng một chuyện VỪA XẢY RA thì dễ kể nhất.` : '' }));

  const ore = { O: 'Ba tháng nữa chỗ này chạy đúng ý mình, nhìn vào CÁI GÌ để biết?',
                R: 'Mình đang có sẵn cái gì có thể dùng cho việc này?',
                E: 'Gỡ được chỗ này rồi thì mấy dòng "ngoài công việc" vừa tích, dòng nào nhẹ đi?' };
  o.push({ man: 'O', id: 'O', kieu: 'chu', hoi: ore.O.replace('chỗ này', `chỗ ${k.ten}`),
    phu: 'Một thứ THẤY ĐƯỢC BẰNG MẮT: một con số, một thứ mở ra là thấy. Đừng ghi cảm giác.' });
  o.push({ man: 'R', id: 'R', kieu: 'chu', hoi: ore.R,
    phu: 'Bảng, file, nhóm chat, người phụ, công cụ đã mua — kể cả thứ TỪNG LÀM RỒI BỎ.' });

  const tcn = NT.testChucNang;
  if (tcn && !KL.capCuu(n)) {
    o.push({ man: 'R2', id: 'R2', kieu: 'chu', hoi: tcn.hoi.replace('chỗ này', `chỗ ${k.ten}`), phu: tcn.phu });
    if ((n.R2 || '').trim())
      chon('R2', 'R2loai', tcn.xacNhan.hoi.replace('{n}', String(KL.demBuoc(n.R2))), tcn.xacNhan.dap);
  }
  o.push({ man: 'E', id: 'E', kieu: 'chu', hoi: ore.E,
    phu: 'CHỐT KIỂM CUỐI: gỡ xong mà đời không đổi gì thì có thể đang chẩn nhầm khâu.' });
  o.push({ man: 'gui', id: 'linhCam', kieu: 'chon', hoi: `Máy quét ra ${k.icon} ${k.ten}. Linh cảm của mình — chỗ chặn thật có đúng khâu đó không?`,
    phu: 'Thấy khác thì chọn khâu khác; skill phải đối chiếu và nói thẳng bên nào đúng, không chiều theo bên nào.',
    dap: [{ id: '', nhan: 'Để AI tự phân tích' }, ...khau.map(x => ({ id: x.id, nhan: `${x.icon} ${x.ten}` }))] });
  o.push({ man: 'gui', id: 'ghiChu', kieu: 'chu', hoi: 'Còn gì muốn nói thêm?',
    phu: 'Bối cảnh giai đoạn này, ràng buộc, chuyện đang xảy ra. Không có thì bỏ qua.' });
  return o;
}

const oDangDung = (ds, n) => ds.find(x => !n.daHoi.includes(x.id)) || null;

/** Ghi giá trị vào đúng chỗ trong phiên. Đường dẫn kiểu `dap.thu-hut-1`, `tn.ngu`, `sau.2`. */
function datGiaTri(n, o, v) {
  const [g, ...con] = o.id.split('.'); const key = con.join('.');
  if (o.id === 'tich') { n.tich = {}; (v || []).forEach(x => { n.tich[x] = true; }); return; }
  if (g === 'cc') n.congCu[key] = v;
  else if (g === 'dap') n.dap[key] = v;
  else if (g === 'tn') n.tiepNhan[key] = v;
  else if (g === 'tk') n.taiKham[key] = v;
  else if (g === 'kham') n.kham[key] = v;
  else if (g === 'sau') { (n.sau[n.khauSau] ||= {})[Number(key)] = v; }
  else n[o.id] = v;
}

/* ── in ra ─────────────────────────────────────────────── */
function inO(o, n, ds) {
  if (!o) { console.log(`✅ HẾT Ô — hỏi xong rồi. Chạy: ${LENH} quet <phiên>`); return; }
  const da = n.daHoi.length, tong = ds.length;
  console.log(`\n[${o.man}${o.khau ? ' · ' + o.khau : ''} — ô ${da + 1}/${tong}]`);
  console.log(`\nHỎI: ${o.hoi}`);
  if (o.phu) console.log(`(${o.phu})`);
  if (o.kieu === 'chon' || o.kieu === 'chon-nhieu') {
    console.log('');
    o.dap.forEach((d, i) => console.log(`  ${i + 1}. ${d.nhan}${d.mo ? ` — ${d.mo}` : ''}`));
    if (o.kieu === 'chon-nhieu') console.log(`  (chọn nhiều${o.toiDa ? `, tối đa ${o.toiDa}` : ''} — ghi các số cách nhau bằng dấu phẩy)`);
  } else if (o.kieu === 'so') {
    console.log(`\n  → một con số (${o.donVi}). Bắt họ ĐẾM THẬT, đừng nhận số ước.`);
    if (o.duong && o.duong.tuLam) console.log(`  ⛔ Ô này CẤM kéo số tự động: ${o.duong.cach}`);
    else if (o.duong) o.duong.chiTiet.forEach(c => console.log(`  ${c.san === false ? '🔒' : '🔧'} ${c.ten}: ${c.cach}`));
    else console.log(`  (chưa có bản kê công cụ nên chưa biết đường lấy số — cứ để họ tự đếm)`);
  }
  else console.log('\n  → họ kể bằng lời, ghi lại nguyên văn');
  console.log(`\nGhi đáp án: ${LENH} dap ${n.id} <giá trị>`);
}

function inQuet(NT, n, khau, lan) {
  const th = KL.tongHop(NT, n, khau, lan);
  console.log(`\n═══ BẢNG 9 KHÂU ═══\n`);
  for (const k of khau) {
    const m = KL.mauKhau(n, k);
    console.log(`  ${m ? KL.NT_MAU[m].icon : '·'} ${(k.ten + '                ').slice(0, 14)} ${m ? KL.NT_MAU[m].ten : 'chưa đủ'}`);
  }
  console.log(`\n═══ QUÉT NGƯỢC (cơ học — KHÔNG phải kết luận) ═══\n`);
  console.log(`  Chiều quét: ${(NT.chieuQuet?.thuTu || []).join(' → ')}`);
  console.log(`  Loại vì ĐÓI NGUYÊN LIỆU: ${th.q.boQua.length ? th.q.boQua.map(x => `${x.k.ten} (thiếu: ${x.vi || '—'})`).join(' · ') : '(không khâu nào)'}`);
  console.log(`  Chưa trả lời đủ: ${th.q.chuaDu.length ? th.q.chuaDu.map(x => x.ten).join(' · ') : '(không)'}`);
  console.log(`  → MÁY QUÉT RA: ${th.q.k ? `${th.q.k.icon} ${th.q.k.ten}` : '(không khâu nào tắc)'}  [${th.q.trangThai}]`);
  console.log(`\n═══ MÁY ĐỌC ═══\n`);
  if (th.capCuu) console.log('  🚨 CẤP CỨU — đơn CHỈ ngăn giảm đau, ngăn tận gốc ghi "chưa phải lúc"');
  if (th.taiKham) console.log(`  Tái khám: ${th.taiKham.ten} — ${th.taiKham.doc}`);
  console.log(`  ⏱ Giờ vs khâu: ${th.gio && th.gio.luat ? `${th.gio.luat.ten} — ${th.gio.luat.doc}` : '(không có dữ liệu giờ)'}`);
  const lech = th.lech.filter(r => r.lech === 'khai-nhe');
  console.log(`  Bảng LỆCH: ${lech.length ? lech.map(r => `${r.x.id} tự khai ${KL.ic(r.khai)} · đếm ${r.v} → ${KL.ic(r.do)}`).join(' · ') : th.lech.some(r => r.v !== null) ? 'số đếm khớp lời khai' : '(chưa đếm số nào — THIẾU tầng xét nghiệm)'}`);
  console.log(`  Nguyên nhân máy NGHI: ${th.nn.loai ? `${th.nn.loai} ${th.nn.ten}${th.nn.nghi ? ' (nghi, chưa chốt)' : ''} ← ${th.nn.nguon.join('; ')}` : '(chưa đủ tín hiệu)'}`);
  console.log(`  💊 Bệnh nền: ${th.benhNen.length ? th.benhNen.map(b => b.ten).join(' · ') : '(máy không thấy)'}`);
  console.log(`  🏥 Chuyển tuyến: ${th.chuyenTuyen.length ? th.chuyenTuyen.map(c => `${c.id} — ${c.noi}`).join(' · ') : '(không ca nào khớp máy)'}`);
  if (th.nhom) console.log(`  👥 Nhóm khách: ${th.nhom.n.nhan}${th.nhom.khop === false ? ` — nhóm này thường tắc ở ${th.nhom.ngo.join('/')}, máy quét ra khâu khác, NÓI RA chỗ vênh` : th.nhom.khop ? ' — khớp tiên nghiệm' : ''}`);
  console.log(`  🧰 Lệch từ bản kê: ${th.lechCongCu.length ? th.lechCongCu.map(c => `${c.khau} tự khai ${KL.ic(c.khai)} mà không có chỗ nào giữ`).join(' · ') : '(không lệch)'}`);
  if (th.raiKenh) console.log(`  🕸 Rải ${th.raiKenh.so} kênh — nguồn thứ hai cho dấu "chưa có đô-mi-nô"`);
  console.log(`  🚨 Red flag: ${th.redFlag || '—'}`);
  console.log(`\n  Soạn đề xuất: ${LENH} soan ${n.id}\n`);
  return th;
}

/* ── soạn đề xuất — cùng khuôn thư mục `/api/nap` sinh ra, để /nap-kho chạy không đổi ── */
function soan(NT, n, khau, lan) {
  const man = docLuat();
  const khoi = KL.soanKhoi(NT, n, khau, (lan || [])[0] || null, HOM_NAY, lan);
  const soDo = khau.filter(k => KL.mauKhau(n, k) === 'do');
  const tomTat = `soi ${HOM_NAY} · ${soDo.length ? `${soDo.length} khâu tắc: ${soDo.map(k => k.ten).join(', ')}` : 'không khâu nào tắc'}`;
  const slug = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  const stamp = `${HOM_NAY}-${String(new Date().getHours()).padStart(2, '0')}${String(new Date().getMinutes()).padStart(2, '0')}`;
  const thuMuc = path.join(NAP_DIR, `${stamp}-soi-nut-that-${slug(tomTat)}`);
  if (fs.existsSync(thuMuc)) thoat('Đã có đề xuất cùng tên, thử lại sau một phút');
  fs.mkdirSync(thuMuc, { recursive: true });

  const canhBao = [];
  const k = khau.find(x => x.id === n.khauSau);
  const ds = k ? ((KL.cauTeNhat(n, k) || (k.cauSang || [])[0] || {}).daoSau || []) : [];
  if (ds.length && !ds.some((_, i) => ((n.sau[n.khauSau] || {})[i] || '').trim()))
    canhBao.push('⚠️ Vòng 2 không có câu trả lời nào. Nói rõ trong bản soi là THIẾU dữ liệu nguyên nhân — đừng nặn ra một nguyên nhân nghe hợp lý từ mỗi bảng đáp án bấm chọn.');
  if (!['O', 'R', 'E'].some(o => (n[o] || '').trim()))
    canhBao.push('⚠️ Vòng khám O·R·E trống hoàn toàn. Nói rõ trong bản soi là THIẾU dữ liệu nguyên nhân.');

  const doc = (man.doc || []).map(x => `\`wiki/${x}.md\``).join(' · ');
  const md = `---\nloai: soi-nut-that\ntao-luc: ${stamp}\nqua: kham.mjs (khám bằng lời qua /kham-benh)\n---\n\n`
    + `# 🧭 Soi nút thắt — 9 khâu, khám SCORE, đơn hai ngăn\n\n${man.mo}\n\n`
    + `**Trang wiki bắt buộc đọc:** ${doc}\n**Dự kiến ghi vào:** \`${man.trangDich}\`\n\n`
    + `⚠️ Đây là ĐỀ XUẤT, chưa phải nội dung cuối. Đừng chép nguyên văn vào kho — đọc, soi\ntrùng, chuẩn hoá theo khuôn đang dùng, rồi mới ghi. Chỗ nào không chắc thì hỏi Đoàn,\nđừng tự chốt.\n\n`
    + `## Tóm tắt lượt soi\n\n${tomTat}\n\n## Bản khám\n\n${khoi}${canhBao.length ? '\n\n' + canhBao.join('\n\n') : ''}\n`;
  fs.writeFileSync(path.join(thuMuc, 'de-xuat.md'), md);
  const rel = path.relative(process.cwd(), thuMuc);
  console.log(`\n✅ Đã soạn đề xuất: ${rel}/de-xuat.md`);
  if (canhBao.length) console.log(canhBao.map(c => '  ' + c).join('\n'));
  console.log(`\nBước cuối — phân tích và ghi vào bộ não:\n  /nap-kho ${rel}/\n`);
  return thuMuc;
}

/* ── chạy ──────────────────────────────────────────────── */
const argv = process.argv.slice(2).filter(a => a !== '--json');
const raJson = process.argv.includes('--json');
const [lenh, id, ...phanConLai] = argv;
if (!lenh) thoat('Thiếu lệnh. Xem đầu file kham.mjs.');

const NT = docNutThat(docMap(), GOC);
if (!NT || !NT.khau || !NT.khau.length) thoat('Không đọc được os-map.json > nutThat');
const khau = NT.khau; const lan = NT.lan || [];

if (lenh === 'moi') {
  const n = MOI();
  n.id = `${HOM_NAY}-${Date.now().toString(36).slice(-4)}`;
  const ds = dsO(NT, n, khau, lan);
  ghi(n.id, n);
  console.log(`\n✅ Mở phiên khám: ${n.id}   (${ds.length} ô, ${KL.coTaiKham(NT, lan) ? 'CÓ tái khám' : 'không tái khám'})`);
  console.log(`   Phiên lưu ở ${path.relative(process.cwd(), duong(n.id))} — hỏng giữa chừng vẫn mở lại được.`);
  inO(oDangDung(ds, n), n, ds);
  process.exit(0);
}
if (!id) thoat('Thiếu mã phiên.');
const n = doc(id); n.id = id;
let ds = dsO(NT, n, khau, lan);
const o = oDangDung(ds, n);

if (lenh === 'o') { if (raJson) console.log(JSON.stringify({ o, daHoi: n.daHoi.length, tong: ds.length }, null, 2)); else inO(o, n, ds); }
else if (lenh === 'bo') {
  if (!o) thoat('Hết ô rồi.');
  n.daHoi.push(o.id); ghi(id, n);
  ds = dsO(NT, n, khau, lan);
  console.log(`↷ bỏ qua: ${o.hoi}`); inO(oDangDung(ds, n), n, ds);
}
else if (lenh === 'lui') {
  const cuoi = n.daHoi.pop();
  if (!cuoi) thoat('Chưa trả lời ô nào.');
  ghi(id, n); ds = dsO(NT, n, khau, lan);
  console.log(`↶ quay lại ô: ${cuoi}`); inO(oDangDung(ds, n), n, ds);
}
else if (lenh === 'dap') {
  if (!o) thoat('Hết ô rồi — chạy `quet`.');
  const tho = phanConLai.join(' ').trim();
  if (!tho) thoat('Thiếu giá trị.');
  let v;
  if (o.kieu === 'chon' || o.kieu === 'chon-nhieu') {
    /* Nhận SỐ THỨ TỰ hoặc id. Nhận cả hai vì skill đọc danh sách rồi nói lại cho Đoàn
       bằng lời — bắt nó nhớ id máy là mời gõ nhầm. */
    const lay = (x) => {
      x = x.trim();
      const i = Number(x);
      if (Number.isInteger(i) && i >= 1 && i <= o.dap.length) return o.dap[i - 1].id;
      const d = o.dap.find(y => y.id === x); if (d) return d.id;
      thoat(`"${x}" không phải đáp án của ô này. Chọn 1–${o.dap.length}.`);
    };
    if (o.kieu === 'chon-nhieu') {
      v = tho.split(',').map(lay);
      if (o.toiDa && v.length > o.toiDa) thoat(`Ô này tối đa ${o.toiDa} lựa chọn.`);
    } else v = lay(tho);
  } else if (o.kieu === 'so') {
    if (!/^\d+([.,]\d+)?$/.test(tho)) thoat('Ô này cần một con số. Chưa đếm được thì dùng `bo`.');
    v = Number(tho.replace(',', '.'));
  } else v = tho;
  datGiaTri(n, o, v);
  n.daHoi.push(o.id);
  ghi(id, n);
  ds = dsO(NT, n, khau, lan);
  const sau = oDangDung(ds, n);
  /* Vừa xong vòng S thì công bố khâu ngay — đây là chỗ người ta muốn biết nhất, và cũng
     là chỗ bắt máy in ra bảng thay vì để AI tự nhớ mình đang đào khâu nào. */
  if (o.man === 'trieu-chung' && sau && sau.man !== 'trieu-chung') { ghi(id, n); inQuet(NT, n, khau, lan); }
  inO(sau, n, ds);
}
else if (lenh === 'quet') { ghi(id, n); const th = inQuet(NT, n, khau, lan); if (raJson) console.log(JSON.stringify(th, null, 2)); }
else if (lenh === 'soan') soan(NT, n, khau, lan);
else thoat(`Không có lệnh "${lenh}".`);
