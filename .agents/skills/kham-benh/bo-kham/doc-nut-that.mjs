#!/usr/bin/env node
/**
 * Owner OS — doc-nut-that.mjs · BỘ ĐỌC BẢNG KHÁM, đứng một mình
 *
 * Tách khỏi `scan.mjs` ngày 2026-09-06. Lý do: bộ khám cần chạy được ở **bộ khung phát cho
 * member** (`nhan-su-thu-thu`), mà kit đó không có `owner-os/` và không có kho của Đoàn.
 * `scan.mjs` là 2.900 dòng quét cả vault — kéo nó theo là kéo cả cái kho không dùng tới.
 *
 * File này chỉ cần HAI thứ, đều truyền vào: bảng luật (`MAP`, tức `os-map.json` hoặc bản
 * `bang-kham.json` sinh cho member) và đường dẫn thư mục chứa `wiki/`.
 *
 * ⚠️ Không import gì từ `scan.mjs` — nếu thấy mình sắp thêm một dòng `import` về đó thì dừng,
 * vì đó đúng là thứ file này sinh ra để cắt.
 */

import fs from 'node:fs';
import path from 'node:path';

/** Gỡ markdown về chữ trần để hiển thị trong giao diện. */
export const plain = (s = '') =>
  s.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, a, b) => b || a)
   .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
   .replace(/[*_`>]/g, '')
   .trim();

/** Blockquote chỉ chứa metadata (> Updated: ..., > Status: ...) — không dùng làm mô tả. */

export const neoSlug = (s = '') =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd')
   .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/**
 * Cắt một mục theo neo. Trả `{ title, body, level }`, hoặc null khi **không khớp tiêu đề
 * nào** hoặc **khớp nhiều hơn một** — cả hai đều là lỗi khai báo, `kiem.mjs` mục 2 báo đỏ.
 *
 * Khớp hai nấc: **đúng nguyên tiêu đề** trước, không có thì **tiền tố duy nhất**. Nấc hai
 * để neo khỏi phải cõng phần trang trí của tiêu đề — `#brand-poster-design-guidelines`
 * vẫn trúng *"Brand & Poster Design Guidelines (bàn giao 2026-07-18)"*, nên sửa cái ngày
 * trong tiêu đề không làm gãy bản đồ. Nhưng **tiền tố trúng 2 mục thì trả null**, không
 * bao giờ tự chọn mục đầu: đoán bừa ở đây là hỏng im lặng, đúng thứ cả file này tránh.
 *
 * ⚠️ Thân mục chạy tới tiêu đề **cùng bậc hoặc cao hơn**, KHÔNG phải tới tiêu đề kế tiếp.
 * Cắt ở tiêu đề kế tiếp thì một mục `##` có mục con `###` bị xén còn mỗi đoạn mở đầu —
 * số từ tụt xuống, cờ `mỏng` bật lên, và không có gì báo là đã mất phần thân. Cùng họ
 * với hai cái bẫy `scanCay` / `scanKhoBai` đã ghi trong `owner-os/CLAUDE.md`.
 */
/**
 * Dòng mô tả cho một MỤC. Khác `extractBlurb` ở hai điểm, cả hai đều do đã mắc thật:
 *
 * 1. **Chỉ đọc phần đầu mục, cắt trước mục con đầu tiên.** `extractBlurb` quét cả thân
 *    và ưu tiên blockquote — thả nguyên thân mục vào là nó bốc trúng blockquote nằm sâu
 *    trong một mục con. Đo thật: mục "Brand & Poster Design Guidelines" ra dòng mô tả
 *    *"Rút 2026-08-08 bằng cách ghép hai sự việc…"* của mục con ⚡ Bài học — câu đúng,
 *    nằm đúng trong mục, mà mô tả sai hẳn thứ đang được mô tả.
 * 2. **Chấp nhận gạch đầu dòng.** Nhiều mục không có đoạn văn nào, nội dung LÀ danh sách
 *    (mục này mở thẳng bằng `- **Font:** …`). `extractBlurb` bỏ qua bullet nên trả rỗng.
 */

/* ── Bánh Xe Cuộc Đời ─────────────────────────────────────────────────────
 *
 * Công cụ Đoàn tự dùng từ 2015 (`raw/meeting-notes/.../Khái niệm Bánh xe cuộc đời.md`).
 * Bài dạy gốc có đúng hai nửa, và bộ quét này giữ chúng ở HAI CHỖ KHÁC NHAU vì chúng
 * đổi với nhịp khác nhau:
 *
 *   · nửa ĐỊNH NGHĨA — *"10 điểm ở khía cạnh này là gì"* — gần như không đổi, và đã nằm
 *     sẵn trong một trang khác của kho từ trước (bản của Đoàn: `wiki/personal-mission.md`). Neo tới từng mục qua
 *     `os-map.json > banhXe.khiaCanh[].muoiDiem`, **không chép sang chỗ mới**: chép là đẻ
 *     bản thứ hai rồi lệch âm thầm (đúng lý do đã ghi ở mục "Neo" trong owner-os/CLAUDE.md).
 *   · nửa CHẤM ĐIỂM — đổi mỗi lần ngồi đánh giá lại. Sống ở `wiki/banh-xe-cuoc-doi.md`,
 *     do skill `/banh-xe-cuoc-doi` ghi, mỗi lần là một mục `## Lần đánh giá — <ngày>` mới.
 *
 * ⚠️ **Không có điểm ≠ 0 điểm.** Khía cạnh chưa chấm trả `null`, và giao diện phải vẽ nó
 * thành chỗ TRỐNG có nhãn "chưa chấm", không phải một nan hoa dài 0. Điền 0 cho đủ khuôn là
 * bịa số (nguyên tắc 2), và tệ hơn: một bánh xe khuyết đọc thành một bánh xe méo.
 *
 * ⚠️ **Trung bình TỰ TÍNH, không đọc dòng "Trung bình:" trong file.** Dòng đó do người/AI
 * gõ nên lạc hậu ngay khi sửa một điểm mà quên sửa nó. Vẫn đọc lên để **đối chiếu** và
 * báo lệch — im lặng bỏ qua thì file nói một đằng, biểu đồ một nẻo, không ai biết.
 */
/**
 * Bản soi NÚT THẮT định kỳ — đọc `wiki/nut-that.md`, trả về lịch sử các lượt soi.
 *
 * Đoàn 2026-08-17: *"tôi muốn tạo một bản phỏng vấn ở đó để giúp tôi tìm ra nút thắt ở
 * giai đoạn đó… nó sẽ cần làm nhiều giai đoạn tương tự như bánh xe cuộc đời vậy"*.
 *
 * Cùng cơ chế với `scanBanhXe`, và cố ý ĐƠN GIẢN HƠN: bánh xe phải đọc cả nửa định nghĩa
 * (neo sang trang định nghĩa) vì "10 điểm là gì" sống ở trang khác; ở đây định nghĩa từng
 * khâu nằm gọn trong `os-map.json > nutThat.khau`, không có nửa thứ hai để ghép.
 *
 * ⚠️ Thứ đáng đọc nhất KHÔNG phải điểm số mà là **nút thắt được gọi tên là khâu nào** —
 * để nhìn ra nó DI CHUYỂN qua các giai đoạn. Điểm chỉ là chỗ dựa.
 *
 * Trang chưa tồn tại là chuyện BÌNH THƯỜNG, không phải lỗi: nó chỉ ra đời sau lượt soi
 * đầu tiên, mà đường ghi vào `wiki/` chỉ có một cửa là skill `nap-kho`.
 */
/**
 * Bóc các ô ①②③… của mục "Đáp án" trong một khối đơn thuốc.
 *
 * Dùng ở HAI chỗ: `scanNutThat` (đơn đã ghi vào wiki) và `scanNap` (đơn skill vừa soạn,
 * còn nằm trong `ket-qua.md`, chưa duyệt). Hai chỗ đọc cùng một khuôn thì màn kê đơn
 * hiện đúng thứ về sau sẽ nằm trong wiki — không phải hai bộ đọc nói hai đằng.
 *
 * ⚠️ KHÔNG gán nghĩa theo SỐ ô. Bản 08-22 có 5 ô (③ = việc tiếp theo), bản 08-23 có 6 ô
 * (③ = giảm đau, ④ = tận gốc). Cùng số, khác nghĩa. Nhãn mới là nghĩa; số chỉ là chỗ đứng.
 */
export function docODon(than = '') {
  const don = [];
  const mDap = than.match(/^###\s+Đáp án[^\n]*$/m);
  const vung = mDap ? than.slice(mDap.index + mDap[0].length) : '';
  /* Nhãn có thể chứa `*` lồng bên trong (`… *(ngăn này KHÔNG tận gốc):***`) nên đóng
     bằng `\*\*+` không tham lam, đừng dùng `[^*]*`. */
  const dau = [...vung.matchAll(/^\*\*\s*([①②③④⑤⑥⑦⑧⑨⑩])\s*([^\n]*?)\*\*+[ \t]*(.*)$/gm)];
  dau.forEach((o, j) => {
    const het = j + 1 < dau.length ? dau[j + 1].index : vung.length;
    let than2 = vung.slice(o.index + o[0].length, het);
    /* Ô cuối đừng nuốt các dòng đứng sau đơn (Linh cảm, gạch ngang, mục kế, rào ```). */
    than2 = than2.split(/^\s*(?:\*\*Linh cảm|---|##\s|```)/m)[0];
    const nhan = plain(o[2]).replace(/[:：]\s*$/, '').trim();
    const noi = [o[3], than2].map(x => (x || '').trim()).filter(Boolean).join('\n');
    don.push({ so: o[1], nhan, than: noi.trim().slice(0, 1200) });
  });
  return don;
}

/** Đọc bảng luật + lịch sử lượt soi. `MAP` = os-map (hoặc bang-kham của member).
 *  `VAULT` = thư mục chứa `wiki/`. Trả về đúng hình dạng `DATA.nutThat` giao diện đang đọc. */
export function docNutThat(MAP, VAULT) {
  /* Lấy giờ NGAY LÚC ĐỌC, không dùng biến toàn cục. `scan.mjs` để `TODAY` ở tầng module và
     phải tự nhớ làm mới mỗi lượt — `serve.mjs` sống nhiều ngày liền thì con số "bao nhiêu ngày
     trước" đứng yên từ hôm nạp. Ở đây không có chỗ nào quên được. */
  const TODAY = new Date();
  const khau = MAP.nutThat?.khau || [];
  const nguon = MAP.nutThat?.nguon || 'wiki/nut-that.md';
  const nhacSauNgay = MAP.nutThat?.nhacSauNgay ?? 30;
  const donChayNgay = MAP.nutThat?.donChayNgay ?? 14;   // đơn cần bấy nhiêu ngày để chạy xong
  /* Chiều quét + bảng nguyên liệu đi kèm ra giao diện, không giữ riêng cho skill.
     Giữ riêng là đúng cái bẫy ghi ngay dưới đây: skill quét một kiểu, giao diện gợi
     một kiểu khác, hai bên nói hai đằng. Một khai báo, hai bên cùng đọc. */
  const chieuQuet = MAP.nutThat?.chieuQuet || null;
  const doiNguyenLieu = MAP.nutThat?.doiNguyenLieu || null;
  const trieuChung = MAP.nutThat?.trieuChung || null;   // vòng S — bộ triệu chứng để tích
  const chamMau = MAP.nutThat?.chamMau || null;

  const theoNhan = new Map();
  for (const k of khau) {
    theoNhan.set(neoSlug(k.ten), k.id);
    theoNhan.set(neoSlug(k.id), k.id);
  }
  const idCuaNhan = (nhan) => theoNhan.get(neoSlug(plain(nhan))) || null;

  const f = path.join(VAULT, nguon);
  /* Sáu tầng khám thêm 2026-09-04 (tiếp nhận · khởi phát · xét nghiệm · test chức năng ·
     bệnh nền/red flag/chuyển tuyến · tái khám) — luật nằm ở os-map.json > nutThat, trang chỉ
     RENDER. Gom một chỗ để hai câu return bên dưới không lệch nhau. */
  /* ⚠️ DANH SÁCH CỨNG — khai thêm một khối vào `os-map > nutThat` mà quên thêm tên vào đây
     thì khối đó KHÔNG bao giờ tới được giao diện lẫn `kham.mjs`, và không có lỗi nào nổ:
     màn hình vẫn vẽ, chỉ là thiếu hẳn một tầng khám. Đã cắn thật 2026-09-06 với `congCu`. */
  const themTang = {};
  for (const k of ['tiepNhan', 'congCu', 'khoiPhat', 'xetNghiem', 'testChucNang', 'nguyenNhan', 'benhNen', 'redFlag', 'chuyenTuyen', 'taiKham'])
    if (MAP.nutThat?.[k]) themTang[k] = MAP.nutThat[k];
  if (!fs.existsSync(f)) return { nguon, coFile: false, khau, nhacSauNgay, donChayNgay, chieuQuet, doiNguyenLieu, trieuChung, chamMau, ...themTang, lan: [], soNgay: null };

  const text = fs.readFileSync(f, 'utf8');
  const dauMuc = [...text.matchAll(/^##\s+Lần soi\s*[—–-]\s*(\d{4}-\d{2}-\d{2})/gm)];
  const lan = dauMuc.map((m, i) => {
    const than = text.slice(m.index, i + 1 < dauMuc.length ? dauMuc[i + 1].index : text.length);
    const diem = {};
    const mau = {};
    const bangChung = {};
    const laKhac = [];

    /* Bảng điểm: `| <nhãn> | … | X/10 | …` — lấy ô X/10 ĐẦU TIÊN sau tên khâu, không đếm
       theo vị trí cột. Bản 2026-08-20 chèn thêm cột "Màu" vào giữa; khoá cứng cột 2 thì
       mọi lượt soi mới đọc ra RỖNG mà không báo lỗi gì — biểu đồ xu hướng chỉ đơn giản là
       trống. Cách này đọc được cả bảng cũ (Khâu|Điểm|Lượt trước) lẫn bảng mới. */
    for (const [, nhan, phanConLai] of than.matchAll(/^\|\s*([^|]+?)\s*\|(.*)$/gm)) {
      const id = idCuaNhan(nhan);
      if (!id) { if (plain(nhan) && !/^-+$/.test(nhan.trim())) laKhac.push(plain(nhan)); continue; }
      /* MÀU mới là thứ đọc được: nó là đáp án người ta chọn, và so được giữa các lượt kể
         cả khi thang điểm đổi. Bảng đã ghi sẵn "🔴 tắc / 🟡 gợn / 🟠 chớm / 🟢 thông" từ
         đầu mà bộ đọc cũ chỉ lấy con số — nên giao diện hiện 7 · 8,5 · 5,5, những con số
         không nói gì với người đọc. Bắt theo CHỮ, không bắt theo emoji (emoji dễ đổi). */
      const mMau = phanConLai.match(/\b(tắc|gợn|chớm|thông)\b/);
      if (mMau) mau[id] = { 'tắc': 'do', 'gợn': 'vang', 'chớm': 'nhe', 'thông': 'xanh' }[mMau[1]];
      const mSo = phanConLai.match(/(\d+(?:[.,]\d+)?)\s*\/\s*10/);
      if (!mSo) continue;                       // hàng chưa chấm (ghi "—") — bỏ qua, đừng ghi 0
      const v = Number(String(mSo[1]).replace(',', '.'));
      if (v >= 0 && v <= 10) diem[id] = v;
      /* Lượt cũ (thang thanh trượt 1–10) không có cột màu — suy ra từ số để vẫn so được. */
      if (!mau[id]) mau[id] = v <= 2.5 ? 'do' : v <= 5.5 ? 'vang' : v <= 8 ? 'nhe' : 'xanh';
    }
    // Bằng chứng từng khâu: #### <nhãn> rồi đoạn chữ ngay dưới
    const dauCt = [...than.matchAll(/^####\s+(.+)$/gm)];
    dauCt.forEach((c, j) => {
      const id = idCuaNhan(c[1]);
      if (!id) { laKhac.push(plain(c[1])); return; }
      const b = than.slice(c.index, j + 1 < dauCt.length ? dauCt[j + 1].index : than.length);
      bangChung[id] = plain(b.replace(/^####.*$/m, '')).trim().slice(0, 600);
    });

    /* Nút thắt do SKILL gọi tên, ghi thành `**Nút thắt:** <khâu>`. Không tự suy từ điểm
       thấp nhất: điểm thấp nhất chưa chắc là chỗ chặn dòng chảy — đó đúng là cái bẫy mà
       manifest `soi-nut-that` bắt skill phải tránh, giao diện lại tự suy thì hỏng cả hai. */
    const mNut = than.match(/^\s*[-*]?\s*\*\*Nút thắt[:：]?\*\*\s*(.+)$/m);
    const nut = mNut ? idCuaNhan(mNut[1]) : null;
    const mViec = than.match(/^\s*[-*]?\s*\*\*Việc gỡ[:：]?\*\*\s*(.+)$/m);
    /* Nhãn có chữ đệm: skill ghi `**Linh cảm của Đoàn:**`, bộ đọc cũ đòi đúng
       `**Linh cảm:**` nên trả rỗng suốt mà không kêu. Nới cho phần đệm. */
    const mLinh = than.match(/^\s*[-*]?\s*\*\*Linh cảm[^*\n]*\*\*\s*(.+)$/m);

    /* ── ĐƠN THUỐC ────────────────────────────────────────────
       Đọc các ô ①②③… của mục "Đáp án". Trước đây trang chỉ đọc `**Việc gỡ:**` — một
       khuôn đã CHẾT: skill nay ghi đơn thành 5–6 ô đánh số. Hệ quả (kiểm 23/08): đơn
       ghi đủ vào wiki mà giao diện hiện đúng mỗi tên khâu, đơn rơi vào hố. Soi xong
       không thấy lại đơn thì lượt sau soi lại ra đúng khâu cũ — đã xảy ra thật giữa
       08-22 và 08-23.
       ⚠️ KHÔNG gán nghĩa theo SỐ ô: bản 08-22 có 5 ô (③ = việc tiếp theo), bản 08-23
       có 6 ô (③ = giảm đau, ④ = tận gốc). Cùng số, khác nghĩa. Nên giữ nguyên NHÃN
       skill đã ghi và hiện theo thứ tự — nhãn mới là nghĩa, số chỉ là chỗ đứng. */
    const don = docODon(than);

    return {
      ngay: m[1], diem, mau, bangChung, laKhac, don,
      nut, nutChu: mNut ? plain(mNut[1]) : '',
      viecGo: mViec ? plain(mViec[1]) : '',
      linhCam: mLinh ? idCuaNhan(mLinh[1]) : null,
    };
  }).sort((a, b) => b.ngay.localeCompare(a.ngay));

  const soNgay = lan.length ? Math.round((TODAY - new Date(lan[0].ngay)) / 86400000) : null;
  return { nguon, coFile: true, khau, nhacSauNgay, donChayNgay, chieuQuet, doiNguyenLieu, trieuChung, chamMau, ...themTang, lan, soNgay };
}
