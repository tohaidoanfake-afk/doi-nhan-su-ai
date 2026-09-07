/**
 * Owner OS — kham-loi.mjs · RUỘT MÁY KHÁM, dùng chung cho hai cửa
 *
 * Hai cửa vào cùng một buổi khám:
 *   ① Form  — tab "Nút thắt" trong `template.html` (Đoàn tự bấm)
 *   ② Chat  — skill `/kham-benh` gọi qua `kham.mjs` (khám bằng lời)
 *
 * Trước 2026-09-05 phần máy nằm hẳn trong `template.html`. Viết cửa thứ hai mà chép lại
 * chỗ này là đẻ **bản luật thứ hai**: sửa chiều quét một bên, bên kia im lặng chạy luật
 * cũ, và hai cửa cùng một người sẽ ra hai nút thắt khác nhau. Nên ruột về đây, hai cửa
 * cùng gọi. File này **không đụng DOM, không đọc biến toàn cục** — mọi thứ đi qua tham số.
 *
 * ⚠️ Đây là RUỘT, không phải LUẬT. Luật (câu hỏi, ngưỡng, điều kiện) khai ở
 * `os-map.json > nutThat` và `tinh-nang/soi-nut-that/manifest.json > mo`. Ở đây chỉ tra
 * bảng. Thấy mình sắp gõ một con số hay một câu hỏi vào file này là đang đi nhầm chỗ.
 *
 * Nhúng vào trình duyệt: `build.mjs` và `serve.mjs > page()` chèn nguyên file này vào
 * `/*__OS_KHAM_LOI__*\/`, bỏ đúng dòng `export` cuối. Sửa đây thì `node owner-os/build.mjs`.
 */

const NT_MAU = { do: { icon: '🔴', ten: 'tắc' }, vang: { icon: '🟡', ten: 'gợn' }, nhe: { icon: '🟠', ten: 'chớm' }, xanh: { icon: '🟢', ten: 'thông' } };
/* Bậc nặng→nhẹ. Dùng cho cả "câu tệ nhất" lẫn so tự-khai-vs-đếm ở bảng LỆCH — trước có
   hai bảng riêng (`NT_NANG` và `NT_BAC`) lệch nhau một bậc vì bảng sau quên mất 'nhe'. */
const NT_NANG = { do: 0, vang: 1, nhe: 2, xanh: 3 };
const NT_DIEM = { do: 1, vang: 4, nhe: 7, xanh: 10 };

/** Màu khâu = câu TỆ NHẤT của khâu. Chưa trả lời câu nào → null (không phải xanh). */
function mauKhau(nhap, k) {
  const ds = ((k && k.cauSang) || []).map(c => nhap.dap[c.id]).filter(Boolean);
  if (!ds.length) return null;
  return ds.reduce((a, b) => (NT_NANG[b] < NT_NANG[a] ? b : a));
}
function cauTeNhat(nhap, k) {
  const ds = ((k && k.cauSang) || []).filter(c => nhap.dap[c.id]);
  if (!ds.length) return null;
  return ds.reduce((a, b) => (NT_NANG[nhap.dap[b.id]] < NT_NANG[nhap.dap[a.id]] ? b : a));
}
function diem10(nhap, k) { const m = mauKhau(nhap, k); return m ? NT_DIEM[m] : null; }

/* Khâu NGAY TRÊN — nguồn nguyên liệu của khâu này. Khai ở đây chứ không ở os-map vì nó là
   hình dạng của chuỗi, không phải một con số chỉnh được. ⓪ Định hướng không có khâu trên
   nên không bao giờ đói: nó đỏ là nó luôn là đáp án. */
const KHAU_TREN = {
  'thu-hut': 'dinh-huong', 'niem-tin': 'thu-hut', 'offer': 'dinh-huong',
  'chuyen-doi': 'offer', 'chuyen-giao': 'chuyen-doi', 'cham-soc': 'chuyen-giao',
  'van-hanh': 'cham-soc', 'nhan-ban': 'van-hanh',
};

/** Luật (1) + (2): loại khâu ĐÓI NGUYÊN LIỆU, rồi quét từ tầng cuối ngược về đầu. */
function quet(NT, nhap, khau) {
  const vao = (NT && NT.doiNguyenLieu && NT.doiNguyenLieu.vao) || {};
  const thuTu = (NT && NT.chieuQuet && NT.chieuQuet.thuTu) || khau.map(k => k.id).slice().reverse();
  /* 🐛 Sửa 2026-09-05: bản cũ hỏi màu bằng `mauKhau({ id: tren })` — object dựng tay,
     không có `cauSang`, nên hàm luôn trả null và `doi()` LUÔN false. Tức luật (1), luật
     ĐẦU TIÊN của cả bộ chẩn, chưa từng chạy một lần nào; nhánh 'doiHet' và cái banner
     "đã bỏ qua N khâu tuy có tắc" là code chết. Hỏng im lặng đúng nghĩa: máy vẫn trả về
     một khâu nghe hợp lý, chỉ là khâu hệ quả thay vì khâu gốc. Phải tra khâu THẬT. */
  const doi = (k) => {
    const tren = KHAU_TREN[k.id];
    if (!tren) return false;
    const kTren = khau.find(x => x.id === tren);
    return !!kTren && mauKhau(nhap, kTren) === 'do';
  };
  const boQua = [];
  const chuaDu = khau.filter(x => mauKhau(nhap, x) === null);
  /* Quét đủ BA mức, không bỏ 'nhe' — một tích đã là tín hiệu thật: họ vừa chỉ đúng chỗ đau. */
  for (const mau of ['do', 'vang', 'nhe']) {
    for (const id of thuTu) {
      const k = khau.find(x => x.id === id);
      if (!k || mauKhau(nhap, k) !== mau) continue;
      if (doi(k)) { boQua.push({ k, vi: vao[k.id] }); continue; }
      return { k, mau, boQua, chuaDu, trangThai: 'ok' };
    }
  }
  /* Không chọn được khâu nào — BA lý do khác hẳn nhau, đừng gộp thành "không tắc gì". */
  if (boQua.length) {
    const dauNguon = boQua.slice().sort((a, b) => thuTu.indexOf(b.k.id) - thuTu.indexOf(a.k.id))[0];
    return { k: dauNguon.k, mau: mauKhau(nhap, dauNguon.k), boQua, chuaDu, trangThai: 'doiHet' };
  }
  if (chuaDu.length) return { k: null, mau: null, boQua, chuaDu, trangThai: 'thieu' };
  return { k: null, mau: null, boQua, chuaDu, trangThai: 'tatCaXanh' };
}

/* ── Tiếp nhận ───────────────────────────────────────────── */
function tn(nhap) { return nhap.tiepNhan || (nhap.tiepNhan = { gio: [] }); }
function capCuu(nhap) { const t = tn(nhap); return t.doanhThu === '0' && (t.tienCon === 'd1' || t.tienCon === '1-3'); }

function coTaiKham(NT, lan) {
  const cu = (lan || [])[0];
  return !!(NT && NT.taiKham) && !!(cu && cu.don && cu.don.length)
    && NT.soNgay !== null && NT.soNgay !== undefined && NT.soNgay <= (NT.taiKham.hoiTrongNgay ?? 45);
}
/** Khâu nút thắt lượt trước — `scanNutThat` trả id ở `lan[0].nut`, tên ở `nutChu`. */
function khauCu(khau, lan) {
  const cu = (lan || [])[0]; if (!cu) return null;
  const theoId = cu.nut ? khau.find(k => k.id === cu.nut) : null; if (theoId) return theoId;
  const chu = ((cu.nut || '') + ' ' + (cu.nutChu || '')).toLowerCase();
  return chu.trim() ? khau.find(k => chu.includes(k.ten.toLowerCase())) || null : null;
}

/** Giờ tuần rồi chảy vào đâu, so với khâu máy quét ra. */
function docGio(NT, nhap, khau, q) {
  if (!NT || !NT.tiepNhan) return null;
  const nhom = (NT.tiepNhan.gioChay && NT.tiepNhan.gioChay.nhom) || [];
  const gio = (tn(nhap).gio || []).map(id => nhom.find(n => n.id === id)).filter(Boolean);
  if (!gio.length) return null;
  const khauGio = [...new Set(gio.map(g => g.khau).filter(Boolean))];
  const soVang = khau.filter(k => { const m = mauKhau(nhap, k); return m === 'do' || m === 'vang'; }).length;
  let loai = '';
  if (gio.some(g => g.id === 'vat')) loai = 'raiDeu';
  else if (q && q.k && khauGio.includes(q.k.id)) loai = 'dungCho';
  else if (khauGio.length) loai = 'saiCho';
  const luat = ((NT.nguyenNhan && NT.nguyenNhan.docGio) || {})[loai] || null;
  const o2 = luat ? (luat.o2 || '').replace('{gio}', gio.map(g => g.nhan).join(' + ')).replace('{khau}', q && q.k ? q.k.ten : '—') : '';
  return { loai, luat, o2, gio, khauGio, soVang, nhieuVang: soVang >= 3 };
}

/* ── Xét nghiệm — số tự đếm, chấm theo ngưỡng, so với lời tự khai ── */
function soCanDem(NT, nhap, khau) {
  const ks = nhap.khauSau; if (!ks) return [];
  const i = khau.findIndex(k => k.id === ks);
  const ids = [khau[i - 1], khau[i], khau[i + 1]].filter(Boolean).map(k => k.id);
  return ((NT && NT.xetNghiem && NT.xetNghiem.so) || []).filter(x => ids.includes(x.khau));
}
function mauDo(x, v, kham) {
  if (v === null || v === undefined || v === '' || isNaN(Number(v))) return null;
  const n = Number(v), ng = x.nguong; if (!ng) return null;
  if (ng.tyLe !== undefined) {
    const mau = Number(kham[ng.mau]); if (!mau) return null;
    const r = n / mau; return (ng.cao === false ? r < ng.tyLe : r > ng.tyLe) ? 'do' : 'xanh';
  }
  if (ng.nguoc) { if (n >= ng.do) return 'do'; if (n >= ng.vang) return 'vang'; return 'xanh'; }
  if (n <= ng.do) return 'do'; if (n <= ng.vang) return 'vang'; return 'xanh';
}
function bangLech(NT, nhap, khau) {
  const kham = nhap.kham || {};
  return soCanDem(NT, nhap, khau).map(x => {
    const raw = kham[x.id]; const v = (raw === undefined || raw === '' || raw === null) ? null : Number(raw);
    const khai = nhap.dap[x.cauSang] || null;
    const do_ = mauDo(x, v, kham);
    let lech = '';
    if (khai && do_ && NT_NANG[khai] !== undefined && NT_NANG[do_] !== undefined) {
      if (NT_NANG[khai] > NT_NANG[do_]) lech = 'khai-nhe';
      else if (NT_NANG[khai] < NT_NANG[do_]) lech = 'khai-nang';
    }
    return { x, v, khai, do: do_, lech };
  });
}

/* ── Test chức năng → nguyên nhân A / B ── */
function demBuoc(text) {
  return (text || '').split(/\n|;|→|->/).map(s => s.replace(/^\s*\d+[.)]\s*|^\s*[-•*]\s*/, '').trim()).filter(s => s.length >= 4).length;
}
function nguyenNhan(NT, nhap) {
  const nn = (NT && NT.nguyenNhan) || {}; const t = tn(nhap);
  const buoc = demBuoc(nhap.R2); const nguong = (NT && NT.testChucNang && NT.testChucNang.nguongBuoc) ?? 3;
  const nguon = []; let loai = '';
  if (nhap.R2loai === 'doan') { loai = 'A'; nguon.push(`test chức năng: tự nhận đang đoán (kể ${buoc} bước)`); }
  else if (nhap.R2loai === 'biet') {
    if (buoc >= nguong) { loai = 'B'; nguon.push(`test chức năng: kể ${buoc} bước, tự nhận biết làm mà chưa làm`); }
    else { loai = 'A?'; nguon.push(`test chức năng: nói biết làm nhưng chỉ kể được ${buoc} bước — máy nghi ngược lại`); }
  }
  const tienSuA = (t.truocDo === 'lam-thue' && (t.lamBaoLau === 'd6' || t.lamBaoLau === '6-24')) || nhap.khoiPhat === 'tu-dau';
  if (!loai && tienSuA) { loai = 'A?'; nguon.push('tiền sử / khởi phát: chưa từng bán hoặc chỗ này chưa từng ổn → nghi thiếu kỹ năng'); }
  if (!loai && nhap.khoiPhat === 'co-luc-on' && !(nhap.khoiPhatMoc || '').trim()) { loai = 'B?'; nguon.push('khởi phát: từng ổn rồi tụt, không kèm đổi gì → nghi thiếu năng lượng'); }
  const g = loai.replace('?', '');
  return { loai, nghi: loai.endsWith('?'), ten: g ? (nn[g] || {}).ten || '' : '', tanGoc: g ? (nn[g] || {}).tanGoc || '' : '', nguon, buoc };
}

/* ── Điều kiện khai ở os-map (benhNen · chuyenTuyen) — một bộ đọc chung ── */
function nguCanh(NT, nhap, khau) {
  return { t: tn(nhap), tich: nhap.tich || {}, khoiPhat: nhap.khoiPhat, khau: nhap.khauSau, capCuu: capCuu(nhap),
    lech: bangLech(NT, nhap, khau).filter(r => r.lech === 'khai-nhe').length };
}
function khop(dk, c) {
  if (!dk) return false;
  if (dk.ngu && !dk.ngu.includes(c.t.ngu)) return false;
  if (dk.tich && !dk.tich.every(id => c.tich[id])) return false;
  if (dk.khoiPhat && c.khoiPhat !== dk.khoiPhat) return false;
  if (dk.lechToiThieu !== undefined && c.lech < dk.lechToiThieu) return false;
  if (dk.khau && c.khau !== dk.khau) return false;
  if (dk.lamBaoLau && !dk.lamBaoLau.includes(c.t.lamBaoLau)) return false;
  if (dk.capCuu && !c.capCuu) return false;
  return true;
}
function benhNen(NT, nhap, khau) { const c = nguCanh(NT, nhap, khau); return ((NT && NT.benhNen && NT.benhNen.dau) || []).filter(d => khop(d.dieuKien, c)); }
function chuyenTuyen(NT, nhap, khau) { const c = nguCanh(NT, nhap, khau); return ((NT && NT.chuyenTuyen && NT.chuyenTuyen.ca) || []).filter(d => khop(d.dieuKien, c)); }

/** Tái khám: duyệt theo thứ tự, khớp cái đầu tiên. `soBo` = chưa quét lại 11 câu. */
function lyDoTaiKham(NT, nhap, khau, lan, soBo) {
  const tk = nhap.taiKham || {}; if (!tk.lamDuoc) return null;
  const kc = khauCu(khau, lan); const conDo = kc ? mauKhau(nhap, kc) === 'do' : null;
  return ((NT && NT.taiKham && NT.taiKham.baLyDo) || []).find(l => {
    const d = l.dieuKien || {};
    if (d.lamDuoc && !d.lamDuoc.includes(tk.lamDuoc)) return false;
    if (d.ketQua && !d.ketQua.includes(tk.ketQua)) return false;
    if (d.quetLai) { if (soBo || conDo === null) return false; if ((d.quetLai === 'con-do') !== conDo) return false; }
    return true;
  }) || null;
}


/* ── BẢN KÊ CÔNG CỤ ────────────────────────────────────────
 * Đoàn 2026-09-06: "phải hỏi xem họ dùng cái gì, rồi mới biết đường khám chứ nhỉ."
 * Ba câu ở tiếp nhận làm ba việc: hỏi đúng câu xét nghiệm · chọn đúng đường lấy số ·
 * và tự nó là tín hiệu. Luật khai ở os-map > nutThat.congCu — ở đây chỉ tra bảng.
 * ⛔ Tuyệt đối KHÔNG chấm màu khâu từ đây. Màu vẫn chỉ từ 11 câu sàng. Bản kê đẻ CỜ LỆCH. */
function cc(nhap) { return nhap.congCu || (nhap.congCu = {}); }

/** Đáp án đã chọn của một câu trong bản kê, trả về mảng object đáp án (câu 1 chọn nhiều). */
function congCuChon(NT, nhap, hoiId) {
  const c = ((NT && NT.congCu && NT.congCu.hoi) || []).find(h => h.id === hoiId);
  if (!c) return [];
  const v = cc(nhap)[hoiId];
  const ds = Array.isArray(v) ? v : (v ? [v] : []);
  return ds.map(id => (c.dap || []).find(d => d.id === id)).filter(Boolean);
}

/** Đường lấy số cho MỘT ô xét nghiệm, suy từ bản kê. Không khai `duongTheo` thì tự làm. */
function duongLaySo(NT, nhap, x) {
  const bang = (NT && NT.congCu && NT.congCu.duongLaySo) || {};
  if (x.tuLam) return { tuLam: true, ten: 'Phải tự làm', cach: 'Ô này không đo con số, nó đo chính người đó có tìm được số của mình không. Kéo tự động là hỏng bài test.' };
  const chon = congCuChon(NT, nhap, x.duongTheo);
  if (!chon.length) return null;                       // chưa trả lời bản kê
  const ds = [...new Set(chon.map(d => d.duong).filter(Boolean))];
  return { tuLam: false, duong: ds, chiTiet: ds.map(id => ({ id, ...(bang[id] || {}) })),
    theo: chon.map(d => d.nhan) };
}

/** Câu hỏi xét nghiệm, chỉnh theo nền tảng họ thật sự dùng. */
function hoiXetNghiem(NT, nhap, x) {
  if (x.id !== 'bai30') return x.hoi;
  const chon = congCuChon(NT, nhap, 'kenh').filter(d => d.duong !== 'khong-co');
  if (!chon.length) return x.hoi;
  return `Mở ${chon.map(d => d.nhan).join(' và ')} lên, đếm: 30 ngày qua đăng được bao nhiêu bài / video?`;
}

/** Cờ LỆCH sinh từ bản kê: tự khai từ 'chớm' trở lên mà công cụ nói không có gì. */
function lechCongCu(NT, nhap) {
  const l = (NT && NT.congCu && NT.congCu.lech) || {};
  return (l.ca || []).filter(ca => {
    const v = cc(nhap)[ca.hoi];
    const ds = Array.isArray(v) ? v : (v ? [v] : []);
    if (!ds.some(id => (ca.khiDap || []).includes(id))) return false;
    const khai = nhap.dap[ca.cauSang];
    return khai === 'nhe' || khai === 'xanh';   // tự khai đỏ rồi thì không có gì lệch
  }).map(ca => ({ ...ca, khai: nhap.dap[ca.cauSang] }));
}

/** Rải kênh: nguồn thứ hai cho dấu "chưa tìm ra đô-mi-nô", độc lập với cách đọc giờ. */
function raiKenh(NT, nhap) {
  const r = (NT && NT.congCu && NT.congCu.raiDeu) || {};
  const chon = congCuChon(NT, nhap, 'kenh');
  return chon.length >= (r.toiThieu || 3) ? { so: chon.length, doc: r.doc } : null;
}


/** Nhóm khách đã chọn (câu bối cảnh B1), kèm tiên nghiệm khâu hay tắc của nhóm đó. */
function nhomKhach(NT, nhap) {
  const nk = NT && NT.tiepNhan && NT.tiepNhan.nhomKhach;
  if (!nk) return null;
  return (nk.dap || []).find(d => d.id === tn(nhap).nhomKhach) || null;
}

/** Nhóm nói khâu này, máy quét ra khâu kia — chỗ vênh đáng nói ra, KHÔNG phải để sửa máy. */
function docNhom(NT, nhap, q) {
  const n = nhomKhach(NT, nhap);
  if (!n || !q || !q.k) return null;
  const ngo = n.nguDo || [];
  if (!ngo.length) return { n, khop: null };
  return { n, khop: ngo.includes(q.k.id), ngo };
}

/** Mọi tín hiệu máy đọc được, gom một chỗ — màn gửi và bản đề xuất cùng ăn cái này. */
function tongHop(NT, nhap, khau, lan) {
  const q = quet(NT, nhap, khau);
  return { q, capCuu: capCuu(nhap), gio: docGio(NT, nhap, khau, q), nn: nguyenNhan(NT, nhap),
    lech: bangLech(NT, nhap, khau), benhNen: benhNen(NT, nhap, khau), chuyenTuyen: chuyenTuyen(NT, nhap, khau),
    taiKham: lyDoTaiKham(NT, nhap, khau, lan, false),
    lechCongCu: lechCongCu(NT, nhap), raiKenh: raiKenh(NT, nhap), nhom: docNhom(NT, nhap, quet(NT, nhap, khau)),
    redFlag: nhap.khauSau ? (((NT && NT.redFlag && NT.redFlag.theoKhau) || {})[nhap.khauSau] || '') : '' };
}


/* ── SOẠN BẢN ĐỀ XUẤT ─────────────────────────────────────
 * Hai cửa (form và skill `/kham-benh`) phải sinh ra đề xuất GIỐNG NHAU TỪNG CHỮ — nếu
 * không thì cùng một buổi khám, khám bằng lời và khám bằng form ra hai bản soi khác nhau,
 * và không ai biết bản nào đúng. Nên khuôn markdown nằm đây, không nằm ở giao diện.
 *
 * ⚠️ Cột `X/10` PHẢI giữ: `scanNutThat` đọc đúng khuôn `| <nhãn> | X/10 |` để vẽ biểu đồ
 * xu hướng. Nó là số PHÁI SINH từ đáp án, và KHÔNG được dùng để chọn nút thắt
 * (luật ở os-map.json > nutThat.chamMau). Chưa trả lời đủ thì ghi "—", đừng rơi về 5/10:
 * con số bịa ra sẽ nằm trong biểu đồ như một phép đo thật. */
function ic(m) { return (NT_MAU[m] || {}).icon || m || '—'; }

/** Ba khúc chèn thêm: `dau` trước Vòng S · `giua` trước Vòng 2 · `sau` sau O·R·E. */
function soanThem(NT, nhap, khau, lan) {
  const th = tongHop(NT, nhap, khau, lan); const t = tn(nhap);
  const tnKhai = NT && NT.tiepNhan; const k = khau.find(x => x.id === nhap.khauSau);
  const nhan = (c, id) => { const d = ((c && c.dap) || []).find(x => x.id === id); return d ? d.nhan : '(không trả lời)'; };
  const cu = (lan || [])[0]; const tk = nhap.taiKham || {};
  const taiKham = cu && cu.don && cu.don.length && (tk.lamDuoc || tk.boQua)
    ? `### Tái khám — đơn ngày ${cu.ngay} (${NT.soNgay} ngày trước)\n\n` + (tk.boQua ? '- (bỏ qua tái khám)'
      : `- **Làm được mấy phần:** ${nhan(NT.taiKham.lamDuoc, tk.lamDuoc)}\n- **Chỗ đó giờ ra sao:** ${nhan(NT.taiKham.ketQua, tk.ketQua)}\n- **Máy đọc:** ${th.taiKham ? `**${th.taiKham.ten}** — ${th.taiKham.doc} → *${th.taiKham.hanhDong}*` : '(chưa đủ để đọc — không dò được khâu nút thắt lượt trước)'}`) + '\n\n'
    : '';
  const tiepNhan = tnKhai ? `### Tiếp nhận\n\n- **Doanh thu tháng gần nhất:** ${nhan(tnKhai.capCuu.doanhThu, t.doanhThu)} · **tiền còn đủ:** ${nhan(tnKhai.capCuu.tienCon, t.tienCon)}${th.capCuu ? ' → **🚨 CẤP CỨU** — cầm máu trước: đơn CHỈ ngăn giảm đau, ngăn tận gốc ghi "chưa phải lúc"' : ''}\n`
    + `- **Giờ tuần rồi chảy vào:** ${(t.gio || []).map(id => { const g = (tnKhai.gioChay.nhom || []).find(n => n.id === id); return g ? `${g.nhan} (→ ${g.khau || 'không khâu nào'})` : id; }).join(' · ') || '(không chọn)'}\n`
    + `- **Bán được bao lâu:** ${nhan(tnKhai.tienSu.lamBaoLau, t.lamBaoLau)} · **trước đó:** ${nhan(tnKhai.tienSu.truocDo, t.truocDo)} · **ngủ:** ${nhan(tnKhai.tienSu.ngu, t.ngu)} tiếng\n`
    + (() => { const nk = nhomKhach(NT, nhap); if (!nk) return '\n';
        const d = th.nhom;
        return `- **Nhóm khách:** ${nk.nhan}${nk.mo ? ` *(${nk.mo})*` : ''}`
          + (nk.dau ? `\n  - *đau chính của nhóm này, ghi chú nguyên văn của Đoàn:* ${nk.dau}` : '')
          + (nk.luuY ? `\n  - ⚠️ ${nk.luuY}` : '')
          + (d && d.khop === false ? `\n  - 🔍 **Nhóm này thường tắc ở ${d.ngo.join(' / ')}, máy lại quét ra ${th.q.k.ten}.** Nói ra chỗ vênh: hoặc đây là ca lạ, hoặc đang chẩn nhầm. ĐỪNG sửa máy theo tiên nghiệm.` : '')
          + (d && d.khop === true ? `\n  - ✓ khớp tiên nghiệm của nhóm` : '')
          + '\n\n'; })() : '';

  /* Bản kê công cụ: ghi cả ĐÁP ÁN lẫn ĐƯỜNG LẤY SỐ, vì skill đọc lại cần biết con số trong
     bảng LỆCH là tự đếm hay kéo từ nguồn — hai thứ đó tin ở mức khác nhau. */
  const ccKhai = (NT && NT.congCu) || null;
  const bangDuong = (ccKhai && ccKhai.duongLaySo) || {};
  const congCu = ccKhai && (ccKhai.hoi || []).some(h => cc(nhap)[h.id])
    ? `### Bản kê công cụ — họ đang chạy trên cái gì\n\n`
      + (ccKhai.hoi || []).map(h => {
          const ds = congCuChon(NT, nhap, h.id);
          const duong = [...new Set(ds.map(d => d.duong).filter(Boolean))]
            .map(id => `${(bangDuong[id] || {}).ten || id}${(bangDuong[id] || {}).san === false ? ' *(chưa nối được)*' : ''}`);
          return `- **${h.hoi}** → ${ds.length ? ds.map(d => d.nhan).join(' · ') : '(không trả lời)'}`
            + (duong.length ? `\n  - *đường lấy số:* ${duong.join(' · ')}` : '');
        }).join('\n')
      + (th.raiKenh ? `\n- ⚠️ **Rải ${th.raiKenh.so} kênh:** ${th.raiKenh.doc}` : '')
      + (th.lechCongCu.length
          ? '\n' + th.lechCongCu.map(c => `- 🔴 **LỆCH ở ${c.khau}:** tự khai ${ic(c.khai)} ở câu sàng, nhưng bản kê nói không có chỗ nào. ${c.doc}`).join('\n')
          : '')
      + '\n\n'
    : '';
  const kp = NT && NT.khoiPhat;
  const khoiPhat = kp && k ? `### Khởi phát — ${k.icon} ${k.ten}\n\n- **Tắc từ bao giờ:** ${nhan(kp, nhap.khoiPhat)}${(nhap.khoiPhatMoc || '').trim() ? `\n- **Lúc tụt vừa đổi gì:** ${nhap.khoiPhatMoc.trim()}` : ''}\n\n` : '';
  const daDem = th.lech.filter(r => r.v !== null).length;
  const nguonSo = (r) => {
    const d = duongLaySo(NT, nhap, r.x);
    if (!d) return '—';
    if (d.tuLam) return '*bắt buộc tự làm*';
    return d.chiTiet.map(c => c.ten || c.id).join(' · ');
  };
  const xetNghiem = th.lech.length ? `### Xét nghiệm — số tự đếm vs tự khai\n\n| Số | Nguồn | Tự khai (câu sàng) | Đếm ra | Máy chấm | Lệch |\n|---|---|---|---|---|---|\n`
    + th.lech.map(r => `| ${hoiXetNghiem(NT, nhap, r.x)} | ${nguonSo(r)} | ${r.khai ? ic(r.khai) + ' ' + ((NT_MAU[r.khai] || {}).ten || '') : '—'} | ${r.v === null ? '(chưa đếm)' : r.v + ' ' + r.x.donVi} | ${r.do ? ic(r.do) : '—'} | ${r.lech === 'khai-nhe' ? '**⚠ khai nhẹ hơn thực tế**' : r.lech === 'khai-nang' ? 'khai nặng hơn thực tế' : r.do ? 'khớp' : '—'} |`).join('\n')
    + (daDem ? '' : '\n\n*(không đếm được số nào — THIẾU tầng xét nghiệm, nói rõ trong bản soi)*') + '\n\n' : '';
  const tcn = NT && NT.testChucNang;
  const test = tcn ? `### Test chức năng — kể các bước\n\n${(nhap.R2 || '').trim() ? nhap.R2.trim().split('\n').map(l => '> ' + l).join('\n') : '> (không kể được bước nào)'}\n\n- **Máy đếm:** ${th.nn.buoc} bước (ngưỡng ${tcn.nguongBuoc}) · **tự xác nhận:** ${nhan(tcn.xacNhan, nhap.R2loai)}\n\n` : '';
  const mayDoc = `### Máy đọc — tín hiệu xếp sẵn, KHÔNG phải kết luận\n\n`
    + (th.gio && th.gio.luat ? `- **Giờ vs khâu:** **${th.gio.luat.ten}** — ${th.gio.luat.doc}${th.gio.nhieuVang ? ' *(≥3 khâu cùng vàng/đỏ)*' : ''}\n` : '- **Giờ vs khâu:** (không có dữ liệu giờ)\n')
    + `- **Nguyên nhân máy nghi:** ${th.nn.loai ? `**${th.nn.loai} ${th.nn.ten}**${th.nn.nghi ? ' *(nghi, chưa chốt)*' : ''} ← ${th.nn.nguon.join('; ')} → hướng tận gốc: ${th.nn.tanGoc}` : '(chưa đủ tín hiệu — test chức năng trống)'}\n`
    + `- **Đã loại trừ:** ${th.q.boQua.length ? th.q.boQua.map(x => `${x.k.ten} (đói nguyên liệu: ${x.vi || '—'})`).join(' · ') : '(không khâu nào bị loại)'}\n`
    + `- **💊 Bệnh nền:** ${th.benhNen.length ? th.benhNen.map(b => `**${b.ten}** — ${b.don}`).join(' · ') : '(máy không thấy)'}\n`
    + `- **🏥 Chuyển tuyến:** ${th.chuyenTuyen.length ? th.chuyenTuyen.map(c => `**${c.id}** — ${c.noi}`).join(' · ') : '(không ca nào khớp máy; ca ngoài phạm vi chỉ lộ ở C — skill tự soi)'}\n`
    + `- **🧰 Lệch từ bản kê công cụ:** ${th.lechCongCu.length ? th.lechCongCu.map(c => `**${c.khau}** tự khai ${ic(c.khai)} mà không có chỗ nào giữ`).join(' · ') : '(không lệch)'}\n`
    + `- **🚨 Red flag của khâu này:** ${th.redFlag || '—'}\n\n`;
  return { dau: taiKham + tiepNhan + congCu, giua: khoiPhat + xetNghiem, sau: test + mayDoc };
}

/** Cả khối `## Lần soi — <ngày>` gửi cho skill. Đơn để TRỐNG — skill điền, máy không kê. */
function soanKhoi(NT, nhap, khau, lanTruoc, homNay, lan) {
  const mau = (k) => { const m = mauKhau(nhap, k); return m ? NT_MAU[m].icon + ' ' + NT_MAU[m].ten : '· chưa đủ'; };
  const bang = `| Khâu | Màu | Điểm | Lượt trước |\n|---|---|---|---|\n`
    + khau.map(k => {
      const cu = lanTruoc && lanTruoc.diem[k.id] !== undefined ? `${lanTruoc.diem[k.id]}/10` : '—';
      const v = diem10(nhap, k);
      return `| ${k.icon} ${k.ten} | ${mau(k)} | ${v === null ? '—' : v + '/10'} | ${cu} |`;
    }).join('\n');

  /* Ghi ra ĐÚNG CÂU HỎI và ĐÚNG ĐÁP ÁN họ chọn, nguyên văn — skill đọc lại thấy được lời
     khách chứ không phải một bảng màu trần. */
  const tc = (NT && NT.trieuChung) || {};
  const ct = khau.map(k => `#### ${k.icon} ${k.ten}\n`
    + (k.cauSang || []).map(c => {
        const v = nhap.dap[c.id];
        const dp = v ? c.dap.find(x => x.mau === v) : null;
        return `- ${c.hoi}\n  → **${dp ? `${NT_MAU[v].icon} ${dp.nhan}` : '(không trả lời)'}**` + (dp ? ` — *${dp.mo}*` : '');
      }).join('\n')).join('\n\n');

  const tichB = (tc.cuocSong || []).filter(x => nhap.tich[x.id]);
  const congSong = `\n\n#### 🌦️ Ngoài công việc\n`
    + (tichB.length ? tichB.map(x => `  - [${x.tenTruc}] **${x.nhan}** — ${x.mo}`).join('\n') : '  - (không chọn dòng nào)');

  const q = quet(NT, nhap, khau);
  const ks = khau.find(k => k.id === nhap.khauSau) || q.k;
  const boQua = q.boQua.length
    ? `\n- **Máy bỏ qua vì đói nguyên liệu:** ${q.boQua.map(x => `${x.k.icon} ${x.k.ten} (thiếu: ${x.vi || '—'})`).join(' · ')}`
    : '';
  const cauTeKs = ks ? (cauTeNhat(nhap, ks) || (ks.cauSang || [])[0]) : null;
  const vong2 = ks
    ? `\n\n### Vòng 2 — đào sâu ${ks.icon} ${ks.ten}\n\n`
      + (cauTeKs ? `**Câu tệ nhất của khâu này:** ${cauTeKs.hoi}\n\n` : '')
      + ((cauTeKs && cauTeKs.daoSau) || []).map((h, i) => {
          const tl = ((nhap.sau[ks.id] || {})[i] || '').trim();
          return `**${i + 1}. ${h}**\n${tl || '(không trả lời)'}`;
        }).join('\n\n')
    : '\n\n### Vòng 2 — không chạy (sàng ra: không khâu nào tắc)';

  const ore = `\n\n### O · R · E\n\n`
    + `**O — đích họ tự đặt:** ${nhap.O.trim() || '(không trả lời)'}\n\n`
    + `**R — đang có sẵn gì:** ${nhap.R.trim() || '(không trả lời)'}\n\n`
    + `**E — gỡ được thì đời nhẹ đi đâu:** ${nhap.E.trim() || '(không trả lời)'}`;

  const lc = khau.find(k => k.id === nhap.linhCam);
  const them = soanThem(NT, nhap, khau, lan);
  return `## Lần soi — ${homNay}\n\n${them.dau}### Vòng S — 11 câu sàng\n\n${bang}\n\n${ct}${congSong}\n\n`
    + `- **Máy quét ra khâu để đào sâu:** ${ks ? `${ks.icon} ${ks.ten}` : '(không khâu nào tắc)'}`
    + ` — *cơ học theo chieuQuet + doiNguyenLieu, KHÔNG phải kết luận; skill được phép chốt khác*${boQua}`
    + (them.giua ? '\n\n' + them.giua.trimEnd() : '') + vong2 + ore + (them.sau ? '\n\n' + them.sau.trimEnd() : '')
    + `\n\n---\n\n- **Linh cảm:** ${lc ? `${lc.icon} ${lc.ten}` : '(không chọn — tự phân tích)'}\n`
    + `- **Nút thắt:** (skill điền — đúng MỘT khâu)\n`
    + `- **Nguyên nhân:** (skill điền — rút từ vòng 2 + SOI GƯƠNG, KHÔNG chép lại triệu chứng)\n`
    + `- **🩹 Giảm đau:** (skill điền — việc 7 ngày, dựng từ R, nhắm đích O)\n`
    + `- **🌱 Tận gốc:** (skill điền — RẼ NHÁNH theo nguyên nhân máy nghi + C: A thiếu kỹ năng → DẠY, không kê môi trường · B thiếu năng lượng → MÔI TRƯỜNG · cấp cứu → "chưa phải lúc")\n`
    + `- **Thế nào là xong:** (skill điền — CHÉP NGUYÊN VĂN ô O ở trên)\n`
    + `- **Chưa phải lúc:** (skill điền — 2 việc nên hoãn, lấy từ thứ họ đã thử mà hỏng)\n`
    + `- **💊 Bệnh nền:** (skill điền — điều kiện để ③④ ngấm; "không có" nếu máy không thấy)\n`
    + `- **🚨 Quay lại ngay nếu:** (skill điền — dấu hiệu CHẨN SAI, từ red flag của khâu ở os-map)`;
}

const KHAM_LOI = { NT_MAU, NT_NANG, NT_DIEM, KHAU_TREN, mauKhau, cauTeNhat, diem10, quet,
  capCuu, coTaiKham, khauCu, docGio, soCanDem, mauDo, bangLech, demBuoc, nguyenNhan,
  khop, benhNen, chuyenTuyen, lyDoTaiKham, tongHop, ic, soanThem, soanKhoi,
  congCuChon, duongLaySo, hoiXetNghiem, lechCongCu, raiKenh, nhomKhach, docNhom };
export { KHAM_LOI };
