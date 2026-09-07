/**
 * SOI BẰNG MÁY — tầng 1 của bước giám khảo. Không gọi AI, không tốn token.
 *
 * Vì sao có file này (2026-08-19): lượt giám khảo đầu tiên tốn **141k token**, Đoàn:
 * *"soi giám khảo mà tốn 120k token thì tốn kém quá, nghiên cứu lại xem"*.
 * Đếm lại 9 lỗi con giám khảo đó tìm ra thì **6 cái là đếm được bằng regex** —
 * trả tiền cho một model để đếm dấu sao và đếm câu ngắn là lãng phí.
 *
 * Phân vai: file này bắt lỗi ĐẾM ĐƯỢC. Giám khảo AI chỉ soi thứ không đếm được —
 * mạch bài, phép thử C5, Tầng 4 (chi tiết thừa / cảm xúc có neo vào thân thể hay bỏ lại ở tính từ).
 *
 * Nguồn luật: wiki/dau-hieu-ai-viet.md §"Soi được bằng máy" + PHẦN 4B masterfile.
 * ⚠️ Sửa luật bên đó thì sửa cả đây — cùng họ ràng buộc hai chiều với ai-tells.ts.
 *
 * Dùng:  node owner-os/soi-may.mjs <file.md|->   [--giong=vui-ve|dua-nhe|nghiem-tuc]
 */
import fs from 'node:fs';

const args = process.argv.slice(2);
const giong = (args.find((a) => a.startsWith('--giong=')) || '').split('=')[1] || 'dua-nhe';
const nguon = args.find((a) => !a.startsWith('--')) || '-';
let van = nguon === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(nguon, 'utf8');

// Chỉ soi phần BÀI, bỏ frontmatter và các mục phân tích phía sau.
const mBai = van.match(/^## Bài viết\s*$([\s\S]*?)^## /m);
if (mBai) van = mBai[1];
van = van.replace(/^>.*$/gm, '').replace(/^`\[.*$/gm, '').trim();

const cau = van.split(/[.!?]+/).map((c) => c.trim()).filter(Boolean);
const doan = van.split(/\n\s*\n/).map((d) => d.trim()).filter(Boolean);
const tu = van.split(/\s+/).filter(Boolean);

const loi = [];
const bao = (ma, muc, mo, vd = '') => loi.push({ ma, muc, mo, vd });

/* ── Mức CHẮC ── */
const dash = van.match(/[—–]/g) || [];
if (dash.length) bao('dash', 'chac', `${dash.length} dấu gạch ngang dài`, 'PHẦN 6 cấm — thay bằng dấu phẩy hoặc tách câu');

const md = van.match(/\*\*[^*]+\*\*/g) || [];
if (md.length) bao('markdown', 'chac', `${md.length} cụm **in đậm** kiểu markdown`, 'Facebook KHÔNG render — sẽ hiện nguyên dấu sao. Dùng CHỮ HOA (PHẦN 4B mục 9)');

for (const [ma, re, mo] of [
  ['mot_cach', /một cách \p{L}+/giu, '"một cách" + tính từ'],
  ['danh_tu_hoa', /\b(sự|việc) (thay đổi|xây dựng|phát triển|hình thành|tạo ra)/gi, 'danh từ hoá'],
  ['chu_ngu_trong', /^(Điều này|Việc này|Thứ này)/gim, 'câu mở bằng chủ ngữ trống'],
]) { const h = van.match(re) || []; if (h.length) bao(ma, 'chac', `${h.length} lần ${mo}`, [...new Set(h)].slice(0, 3).join(' · ')); }

const NHAT = ['thực sự','thật sự','vô cùng','đáng kể','hoàn toàn','vốn dĩ','đơn giản là','rõ ràng là','kiến tạo','khai phá','nâng tầm','bứt phá','lan toả','lan tỏa','đồng hành','thấu hiểu','ươm mầm','hành trình','dấu ấn','giá trị cốt lõi','điều kỳ diệu','Tuy nhiên','Bên cạnh đó','Hơn nữa','Chính vì vậy','Tóm lại','mang lại','đem lại','góp phần','tụi mình'];
const nhat = NHAT.filter((w) => new RegExp(`\\b${w}\\b`, 'i').test(van));
if (nhat.length) bao('tu_nhat', 'chac', `${nhat.length} từ nhạt/AI`, nhat.join(' · '));

// W1–W4 (vay từ Wikipedia)
for (const [ma, re, mo] of [
  ['W1', /\b(đóng vai trò|được xem như|được coi là|trở thành một)\b/gi, 'né động từ "là"'],
  ['W2', /\b(đánh dấu bước ngoặt|minh chứng cho|cột mốc quan trọng|để lại dấu ấn|mở ra một chương)\b/gi, 'nhấn mạnh ý nghĩa rỗng'],
  ['W3', /,\s*(thể hiện|phản ánh|cho thấy|qua đó khẳng định)\b/gi, 'mệnh đề phân tích rỗng cuối câu'],
  ['W4', /\b(sôi động|nép mình|giàu bản sắc|đa dạng và phong phú|không gian ấm cúng)\b/gi, 'ngôn từ quảng cáo'],
]) { const h = van.match(re) || []; if (h.length) bao(ma, 'chac', `${h.length} lần: ${mo}`, [...new Set(h)].slice(0, 3).join(' · ')); }

/* ── Mức ĐỂ Ý ── */
const ngan = cau.filter((c) => c.split(/\s+/).length <= 4);
if (ngan.length) bao('cau_gon', 'de_y', `${ngan.length} câu ≤4 từ đứng riêng`, `PHẦN 4B mục 11 — đo 19 bài thật chỉ có 1 câu như thế. Ngờ là punchline gọt: "${ngan.slice(0,3).join('" · "')}"`);

const dai = cau.map((c) => c.split(/\s+/).length);
const maxDai = Math.max(...dai);
if (maxDai < 40) bao('cau_ngan_het', 'de_y', `câu dài nhất chỉ ${maxDai} từ`, 'Đoàn viết tới 57 từ — PHẦN 4B mục 11 "viết dây dưa, không gọt"');

const so = van.match(/\b\d+([.,]\d+)?\b/g) || [];
const le = so.filter((n) => !/^\d*[05]$/.test(n) && !/^(19|20)\d\d$/.test(n));
if (so.length && !le.length) bao('so_tron', 'de_y', `${so.length} số, không có số lẻ nào`, 'Tầng 4 — người thật có "87 người", "11 tuần"');

const khuon = (van.match(/không phải .{1,40}? mà (là|còn)/gi) || []).length;
if (khuon > 1) bao('khuon_mon', 'de_y', `"không phải X mà là Y" ${khuon} lần`, 'luật C3 cấm lặp quá 1 lần');

const phu = cau.filter((c) => /\b(không|chẳng|chả)\b/i.test(c));
let chuoi = 0, max = 0;
for (const c of cau) { if (phu.includes(c)) { chuoi++; max = Math.max(max, chuoi); } else chuoi = 0; }
if (max >= 4) bao('phu_dinh', 'de_y', `${max} câu phủ định liên tiếp`, 'Guidelines — gộp lại hoặc lật một câu sang khẳng định');

/* ── Cân nặng khung costly_mistake (thêm 2026-08-19) ────────────────────
   Luật: phần "sai lầm + cái giá" phải NẶNG HƠN phần "điều đã đổi".
   Nguồn: wiki/writing-craft-core.md Tầng 2, hàng "Một sai lầm đắt giá".
   Đo thô bằng vị trí BƯỚC NGOẶT — chỗ bài chuyển từ kể sai sang kể cách sửa. */
const khung = (args.find((a) => a.startsWith('--khung=')) || '').split('=')[1] || '';
if (khung === 'costly_mistake') {
  const MOC = /^(Rồi |Cho đến khi|Thế là |Mọi thứ thay đổi|Bước ngoặt|Sau đó (thì )?(mình|tôi))/i;
  const i = doan.findIndex((d) => MOC.test(d.trim()));
  if (i < 0) {
    bao('khong_thay_ngoat', 'de_y', 'không tìm thấy đoạn bước ngoặt',
      'khung costly_mistake cần một thời điểm CÓ THẬT đánh dấu chỗ lật — không có thì tự kiểm bằng mắt');
  } else {
    const truoc = i, sau = doan.length - i - 1;
    if (sau > truoc) bao('lech_can_nang', 'chac',
      `phần giải pháp ${sau} đoạn > phần sai lầm ${truoc} đoạn`,
      'Kể giải pháp dài hơn kể sai lầm là bài trượt thành quảng cáo cho giải pháp — writing-craft-core, khung "Một sai lầm đắt giá"');
  }
}

/* ── Neo giác quan trong đoạn kể chuyện (thêm 2026-08-22) ───────────────
   Luật: wiki/writing-craft-core.md — "CHI TIẾT PHẢI CHẠM ĐƯỢC GIÁC QUAN".
   Đo trên 19 bài nguyên văn: 5 dòng có neo, cả 5 nằm trong ĐÚNG MỘT bài (#3).
   Chỉ soi 4 khung lấy CÂU CHUYỆN làm xương sống — belief_flip lấy lập luận
   làm xương sống nên không tính, dù cuối bài có chuyện đỡ.
   Mức `de_y`: vắng từ trong từ điển KHÔNG chứng minh là bài thiếu hình ảnh. */
const KHUNG_CHUYEN = ['costly_mistake', 'transformation', 'plain_story', 'client_before_after'];
const GIAC_QUAN = [
  // tượng thanh
  'thình thịch','ầm','rầm','bịch','lạch cạch','tí tách','rào rào','ken két','lộp bộp','rì rào','ù ù','xoẹt','vèo','róc rách','leng keng',
  // tượng hình
  'lù lù','lảo đảo','run run','lấm tấm','nhễ nhại','hun hút','chằng chịt','lấp ló','thoăn thoắt','xộc xệch','lấm lem','nhấp nhô','lóng ngóng','lồm cồm','ngổn ngang','hì hục','cặm cụi','lầm lũi','tất tả','hớt hải','ngơ ngác','bần thần','trân trân','chằm chằm',
  // cảm giác cơ thể
  'tim (tôi |mình )?đập','thở phào','nghẹn','ứa nước mắt','lạnh sống lưng','toát mồ hôi','nổi da gà','rùng mình','tay run','chân run','tức ngực','nặng ngực','khô cổ','díu mắt',
];
// \b của JS chỉ biết chữ ASCII nên vô dụng với tiếng Việt có dấu — 'ầm' khớp luôn vào
// "nhầm", "thầm", "lầm" (đã bắt được lỗi này lúc chạy thử). Dùng lookaround Unicode.
const trung = (w) => new RegExp(`(?<!\\p{L})(?:${w})(?!\\p{L})`, 'iu').test(van);
const neo = GIAC_QUAN.filter(trung);
if (KHUNG_CHUYEN.includes(khung) && neo.length === 0)
  bao('thieu_giac_quan', 'de_y', `khung ${khung} mà không có neo giác quan nào`,
    'writing-craft-core: 4 neo — HÌNH (động tác thấy được) · TIẾNG · CẢM XÚC gọi thẳng tên · CẢM GIÁC CƠ THỂ. Cắm ở đoạn cao trào, không rải đều.');

/* Mặt trái của chính luật trên: viết quá tay thành giọng brochure = W4 ở dau-hieu-ai-viet */
const BROCHURE = ['nắng vàng','trải dài','không gian ấm cúng','bầu không khí','sôi động','nép mình','giàu bản sắc','đa dạng và phong phú','trọn vẹn','êm đềm','thơ mộng','bình yên đến lạ'];
const bro = BROCHURE.filter(trung);
if (bro.length) bao('giong_brochure', 'chac', `${bro.length} cụm giọng brochure: ${bro.join(' · ')}`,
  'W4 ở dau-hieu-ai-viet — giọng quảng cáo du lịch, KHÔNG phải tượng hình');

/* ── Phủ định tuyệt đối (thêm 2026-09-02) ──────────────────────────────
   Luật: wiki/writing-craft-core.md §NÓI CHÍNH XÁC. Rút từ diff thật —
   Đoàn đổi "không có nổi một clip..." thành "không giúp ta giỏi lên BẰNG...".
   Phủ định tuyệt đối bị bắt bẻ bằng đúng một phản ví dụ. */
const TUYET_DOI = [
  'không có nổi một', 'không một ai', 'chẳng một ai', 'không một chút',
  'chẳng bao giờ', 'không bao giờ có', 'tuyệt đối không có', 'không hề có một',
  'chẳng có gì là', 'không ai (?:là )?không',
];
const td = TUYET_DOI.filter((w) => new RegExp(w, 'i').test(van));
if (td.length) bao('phu_dinh_tuyet_doi', 'de_y', `${td.length} cụm phủ định tuyệt đối: ${td.join(' · ')}`,
  'writing-craft-core §NÓI CHÍNH XÁC — đổi sang SO SÁNH ("không ... BẰNG ..."), người đọc luôn tìm được một phản ví dụ');

/* ── Khớp giọng đã chốt ── */
const NGONG = ['hem','thui','tui','rùi','nắm','ló','mí'];
const DUA = ['toang','khô máu','to tổ bố','gà gà','amatơ','hâm','mống','phết','nhá','ảo ma','vãi'];
const nNgong = NGONG.filter((w) => new RegExp(`\\b${w}\\b`, 'i').test(van)).length;
const nDua = DUA.filter((w) => new RegExp(w, 'i').test(van)).length;
const nCham = (van.match(/…/g) || []).length;
const minh = (van.match(/\bmình\b/gi) || []).length, toi = (van.match(/\btôi\b/gi) || []).length;

if (giong === 'vui-ve') {
  if (toi > minh) bao('giong_lech', 'chac', `giọng vui-ve mà "tôi" (${toi}) > "mình" (${minh})`, 'PHẦN 1 — vui vẻ dùng mình/anh em');
  // Ô giao chưa có tiền lệ: bài CÓ CHUYỆN + vui-ve. Đo trên 19 bài nguyên văn — 8 bài có chuyện
  // đều dùng tôi/bạn và tối đa 3 từ đùa; bài đùa dày nhất (10 từ) là bài THÔNG BÁO, không kể chuyện.
  // Đoàn chốt 2026-08-19: CẢNH BÁO, không cấm.
  if (khung === 'costly_mistake' || khung === 'transformation' || khung === 'plain_story')
    bao('o_giao', 'de_y', `bài kể chuyện (khung ${khung}) mà chọn giọng vui-ve`,
      '⚠️ Kết hợp này CHƯA từng xuất hiện trong 19 bài thật của Đoàn — không sai, nhưng là vùng chưa có tiền lệ. Tự chịu trách nhiệm.');
  if (nNgong === 0) bao('thieu_ngong', 'de_y', 'vui-ve mà không có từ nói ngọng nào', `PHẦN 4B mục 3: ${NGONG.join(' · ')}`);
  if (nCham === 0) bao('thieu_cham', 'de_y', 'không có dấu … nào', 'PHẦN 4B mục 1 — vân tay số một của Đoàn');
} else if (giong === 'nghiem-tuc') {
  if (nDua + nNgong > 0) bao('qua_dua', 'de_y', `nghiêm túc mà có ${nDua + nNgong} từ đùa`, 'PHẦN 1 — mức nghiêm túc là 0');
  if (minh > toi) bao('giong_lech', 'chac', `nghiêm túc mà "mình" (${minh}) > "tôi" (${toi})`, 'PHẦN 1 — nghiêm túc dùng tôi/bạn');
}

/* ── In ── */
const C = { do: '\x1b[31m', vang: '\x1b[33m', xanh: '\x1b[32m', mo: '\x1b[2m', h: '\x1b[0m' };
console.log(`\n  ${C.mo}${tu.length} từ · ${cau.length} câu · ${doan.length} đoạn · giọng đã chốt: ${giong}${C.h}`);
console.log(`  ${C.mo}câu: ngắn nhất ${Math.min(...dai)} · dài nhất ${maxDai} · trung vị ${dai.sort((a,b)=>a-b)[dai.length>>1]} từ${C.h}\n`);
if (!loi.length) { console.log(`  ${C.xanh}✓ máy không bắt được lỗi nào — chuyển sang giám khảo AI${C.h}\n`); process.exit(0); }
for (const m of ['chac', 'de_y']) {
  const ds = loi.filter((l) => l.muc === m);
  if (!ds.length) continue;
  console.log(`  ${m === 'chac' ? C.do + '● CHẮC' : C.vang + '○ ĐỂ Ý'}${C.h} (${ds.length})`);
  for (const l of ds) { console.log(`    ${l.ma.padEnd(14)} ${l.mo}`); if (l.vd) console.log(`    ${' '.repeat(14)} ${C.mo}${l.vd}${C.h}`); }
  console.log();
}
console.log(`  ${C.mo}Chạy giám khảo AI SAU khi sửa hết mục ● — đừng trả tiền để nó đếm dấu sao.${C.h}\n`);
