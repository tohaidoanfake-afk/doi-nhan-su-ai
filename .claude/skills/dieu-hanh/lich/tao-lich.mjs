#!/usr/bin/env node
/**
 * tao-lich.mjs — sinh FILE LỊCH (.ics) + link Google Calendar cho một hành trình chữa 90 ngày:
 * khung giờ mỗi ngày · nghiệm thu tháng (ngày 30, 60) · tái khám (ngày 90).
 *
 *   node tao-lich.mjs --khau "Thu hút" --khung 06:00-07:00
 *   node tao-lich.mjs --khau "Thu hút" --bat-dau 2026-09-24 --tai-kham 2026-12-23 --khung 21:00-21:45
 *
 * Tham số:
 *   --khau      tên khâu đang chữa (bắt buộc)
 *   --bat-dau   ngày bắt đầu, YYYY-MM-DD. Mặc định: hôm nay
 *   --tai-kham  ngày tái khám, YYYY-MM-DD. Mặc định: ngày bắt đầu + 90 ngày
 *   --khung     khung giờ mỗi ngày HH:MM-HH:MM. Bỏ trống thì chỉ tạo sự kiện tái khám
 *   --gio-nhac  giờ của sự kiện tái khám HH:MM. Mặc định: đầu khung ngày, không có khung thì 08:00
 *   --lech-gio  múi giờ so với UTC. Mặc định: 7 (Việt Nam)
 *   --ra        thư mục ghi file. Mặc định: lich-nhac/ trong thư mục đang đứng
 *
 * Vì sao là mã, không để A.I tự gõ file lịch: file .ics sai một chút — xuống dòng sai kiểu, dòng dài
 * quá 75 byte cắt giữa một chữ có dấu, thiếu dấu thoát ở dấu phẩy — thì lịch điện thoại hoặc từ chối
 * im lặng, hoặc nhập được mà MẤT CHUÔNG NHẮC. Không có lỗi nào hiện ra; người dùng chỉ không được nhắc.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const MAC_DINH_SO_NGAY = 90;

function thamSo(ten) {
  const i = process.argv.indexOf(`--${ten}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
function thoat(loi) {
  console.error(`✗ ${loi}`);
  process.exit(1);
}

const lechGio = Number(thamSo('lech-gio') ?? 7);
if (!Number.isFinite(lechGio) || Math.abs(lechGio) > 14) thoat('--lech-gio phải là số giờ lệch UTC, vd 7');

const khau = (thamSo('khau') || '').trim();
if (!khau) thoat('Thiếu --khau "<tên khâu đang chữa>"');

/** Đi một vòng qua Date rồi so lại: JavaScript nhận 2026-02-30 và lặng lẽ đổi thành 02/03. */
const laNgay = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s || '') && !Number.isNaN(Date.parse(s + 'T00:00:00Z'))
  && new Date(s + 'T00:00:00Z').toISOString().slice(0, 10) === s;
const laGio = (s) => /^([01]\d|2[0-3]):[0-5]\d$/.test(s || '');
const phut = (hhmm) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));

/** Ngày hôm nay theo múi giờ của người dùng, không theo múi giờ của máy chạy lệnh. */
const homNay = new Date(Date.now() + lechGio * 3600e3).toISOString().slice(0, 10);
const cong = (ngay, soNgay) => new Date(Date.parse(ngay + 'T00:00:00Z') + soNgay * 86400e3).toISOString().slice(0, 10);

const batDau = thamSo('bat-dau') || homNay;
if (!laNgay(batDau)) thoat('--bat-dau phải có dạng YYYY-MM-DD');
const taiKham = thamSo('tai-kham') || cong(batDau, MAC_DINH_SO_NGAY);
if (!laNgay(taiKham)) thoat('--tai-kham phải có dạng YYYY-MM-DD');
const soNgay = Math.round((Date.parse(taiKham) - Date.parse(batDau)) / 86400e3);
if (soNgay < 1) thoat('Ngày tái khám phải sau ngày bắt đầu');

let khung = null;
if (thamSo('khung')) {
  const m = /^(\d{2}:\d{2})-(\d{2}:\d{2})$/.exec(thamSo('khung'));
  if (!m || !laGio(m[1]) || !laGio(m[2]) || phut(m[2]) <= phut(m[1])) thoat('--khung phải có dạng HH:MM-HH:MM, giờ kết thúc sau giờ bắt đầu');
  khung = { tu: m[1], den: m[2] };
}
const gioNhac = thamSo('gio-nhac') || khung?.tu || '08:00';
if (!laGio(gioNhac)) thoat('--gio-nhac phải có dạng HH:MM');

/** Giờ tường ở múi giờ người dùng → thời điểm UTC dạng 20261223T010000Z. */
function utc(ngay, hhmm, themPhut = 0) {
  const [y, mo, d] = ngay.split('-').map(Number);
  const t = Date.UTC(y, mo - 1, d, 0, phut(hhmm) + themPhut) - lechGio * 3600e3;
  return new Date(t).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/** Dấu thoát cho chữ trong .ics (RFC 5545 §3.3.11). */
const thoatChu = (s) => s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** Gập dòng ở 75 BYTE, không cắt đôi một chữ có dấu (RFC 5545 §3.1). */
function gap(dong) {
  const ra = [];
  let hienTai = '';
  let byte = 0;
  for (const kyTu of dong) {
    const b = Buffer.byteLength(kyTu, 'utf8');
    const tran = ra.length === 0 ? 75 : 74;   // dòng nối bắt đầu bằng một dấu cách
    if (byte + b > tran) {
      ra.push(hienTai);
      hienTai = '';
      byte = 0;
    }
    hienTai += kyTu;
    byte += b;
  }
  ra.push(hienTai);
  return ra.map((d, i) => (i === 0 ? d : ' ' + d)).join('\r\n');
}

const dauTem = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const ma = crypto.randomBytes(4).toString('hex');
const dmy = (ngay) => ngay.split('-').reverse().join('/');

const suKien = [];

const tkBatDau = utc(taiKham, gioNhac);
const tkKetThuc = utc(taiKham, gioNhac, 30);
const tkTen = `Tái khám — khâu ${khau}`;
const tkMoTa = `Hết hành trình ${soNgay} ngày chữa khâu ${khau}.\nMở Claude, gõ /dieu-hanh: nghiệm thu quy trình của tháng cuối, rồi tái khám.\nMang theo con số thật: giờ mỗi tuần và giờ mỗi ngày bạn tự tay bỏ vào khâu này, và con số kinh doanh của khâu.`;
suKien.push([
  'BEGIN:VEVENT',
  `UID:tai-kham-${batDau}-${ma}@nhan-su-dieu-phoi`,
  `DTSTAMP:${dauTem}`,
  `DTSTART:${tkBatDau}`,
  `DTEND:${tkKetThuc}`,
  `SUMMARY:${thoatChu(tkTen)}`,
  `DESCRIPTION:${thoatChu(tkMoTa)}`,
  'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${thoatChu('Còn 7 ngày tới ngày tái khám')}`, 'TRIGGER:-P7D', 'END:VALARM',
  'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${thoatChu('Hôm nay là ngày tái khám')}`, 'TRIGGER:PT0S', 'END:VALARM',
  'END:VEVENT',
]);

/* Nghiệm thu tháng: mỗi 30 ngày tính từ ngày bắt đầu, trước ngày tái khám. Ngày tái khám đã gánh
   nghiệm thu tháng cuối nên không tạo trùng. Một sự kiện lặp, không phải nhiều sự kiện rời —
   để người dùng Google chỉ phải bấm một link cho cả hai lần. */
const soLanNghiemThu = Math.floor((soNgay - 1) / 30);
const ntBatDau = utc(cong(batDau, 30), gioNhac);
const ntKetThuc = utc(cong(batDau, 30), gioNhac, 30);
const ntTen = `Nghiệm thu tháng — chữa khâu ${khau}`;
const ntMoTa = `Hết một tháng của hành trình chữa khâu ${khau}.\nMở Claude, gõ /dieu-hanh để nghiệm thu quy trình của tháng này, rồi chọn quy trình tháng sau.`;
if (soLanNghiemThu > 0) {
  suKien.push([
    'BEGIN:VEVENT',
    `UID:nghiem-thu-${batDau}-${ma}@nhan-su-dieu-phoi`,
    `DTSTAMP:${dauTem}`,
    `DTSTART:${ntBatDau}`,
    `DTEND:${ntKetThuc}`,
    `RRULE:FREQ=DAILY;INTERVAL=30;COUNT=${soLanNghiemThu}`,
    `SUMMARY:${thoatChu(ntTen)}`,
    `DESCRIPTION:${thoatChu(ntMoTa)}`,
    'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${thoatChu('Mai là ngày nghiệm thu tháng')}`, 'TRIGGER:-P1D', 'END:VALARM',
    'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${thoatChu('Hôm nay nghiệm thu quy trình của tháng')}`, 'TRIGGER:PT0S', 'END:VALARM',
    'END:VEVENT',
  ]);
}

let khBatDau, khKetThuc, khTen, khMoTa;
if (khung) {
  khBatDau = utc(batDau, khung.tu);
  khKetThuc = utc(batDau, khung.den);
  khTen = `Việc mỗi ngày — chữa khâu ${khau}`;
  khMoTa = `Khung giờ cố định của hành trình, tới ngày tái khám ${dmy(taiKham)}.\nMở Claude, gõ /dieu-hanh để xem việc hôm nay.`;
  suKien.push([
    'BEGIN:VEVENT',
    `UID:khung-ngay-${batDau}-${ma}@nhan-su-dieu-phoi`,
    `DTSTAMP:${dauTem}`,
    `DTSTART:${khBatDau}`,
    `DTEND:${khKetThuc}`,
    `RRULE:FREQ=DAILY;COUNT=${soNgay}`,
    `SUMMARY:${thoatChu(khTen)}`,
    `DESCRIPTION:${thoatChu(khMoTa)}`,
    'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${thoatChu(khTen)}`, 'TRIGGER:-PT10M', 'END:VALARM',
    'END:VEVENT',
  ]);
}

const noiDung = [
  'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//nhan-su-dieu-phoi//dieu-hanh//VI', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
  ...suKien.flat(),
  'END:VCALENDAR',
].map(gap).join('\r\n') + '\r\n';

const thuMuc = path.resolve(thamSo('ra') || 'lich-nhac');
fs.mkdirSync(thuMuc, { recursive: true });
const tep = path.join(thuMuc, `hanh-trinh-${batDau}.ics`);
fs.writeFileSync(tep, noiDung, 'utf8');

const link = (ten, tu, den, moTa, lap) => {
  const q = new URLSearchParams({ action: 'TEMPLATE', text: ten, dates: `${tu}/${den}`, details: moTa });
  if (lap) q.set('recur', lap);
  return 'https://calendar.google.com/calendar/render?' + q.toString();
};

console.log(`✓ Đã tạo file lịch: ${path.relative(process.cwd(), tep) || tep}`);
console.log(`  · Tái khám: ${dmy(taiKham)} lúc ${gioNhac} — chuông nhắc trước 7 ngày và đúng giờ đó`);
if (soLanNghiemThu > 0) console.log(`  · Nghiệm thu tháng: ${Array.from({ length: soLanNghiemThu }, (_, i) => dmy(cong(batDau, 30 * (i + 1)))).join(' · ')} lúc ${gioNhac} — chuông nhắc trước 1 ngày và đúng giờ đó`);
if (khung) console.log(`  · Việc mỗi ngày: ${khung.tu}–${khung.den}, lặp ${soNgay} ngày từ ${dmy(batDau)} — chuông nhắc trước 10 phút`);
console.log('');
console.log('Link Google Calendar (bấm là mở sẵn sự kiện, chỉ cần bấm Lưu):');
console.log(`  · Tái khám:         ${link(tkTen, tkBatDau, tkKetThuc, tkMoTa)}`);
if (soLanNghiemThu > 0) console.log(`  · Nghiệm thu tháng: ${link(ntTen, ntBatDau, ntKetThuc, ntMoTa, `RRULE:FREQ=DAILY;INTERVAL=30;COUNT=${soLanNghiemThu}`)}`);
if (khung) console.log(`  · Việc mỗi ngày:    ${link(khTen, khBatDau, khKetThuc, khMoTa, `RRULE:FREQ=DAILY;COUNT=${soNgay}`)}`);
