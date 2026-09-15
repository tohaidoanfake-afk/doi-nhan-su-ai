/**
 * Vá "mở ra trắng trang" cho file markmap.
 *
 * markmap gọi fit() lúc khởi tạo, TRƯỚC khi font hệ thống đo được kích thước chữ — nên
 * nó tính khung bằng 0 và để cả cây ở toạ độ ÂM, nằm ngoài khung nhìn. Mở file ra là
 * trắng trang, phải tự bấm nút thu-gọn trong toolbar mới thấy.
 * Đo thật 2026-08-07: 9 node, node đầu ở x=-62 y=-20.
 *
 * Dùng:  node va-mindmap.mjs <file.html>
 * Chạy lại nhiều lần vô hại — có dấu là bỏ qua.
 */
import fs from 'node:fs';

const f = process.argv[2];
if (!f) { console.error('thiếu đường dẫn file'); process.exit(1); }
let html = fs.readFileSync(f, 'utf8');
const DAU = 'va-fit-khi-mo';

if (html.includes(DAU)) { console.log('⏭  đã vá rồi:', f); process.exit(0); }

const va = `
<script data-${DAU}="1">
// Vá fit khi mở — xem lý do ở mục "🗺️ Mindmap" trong .claude/skills/viet-content/SKILL.md
(function () {
  function fit(conLai) {
    if (window.mm && typeof window.mm.fit === 'function') { try { window.mm.fit(); } catch (e) {} return; }
    if (conLai > 0) setTimeout(function () { fit(conLai - 1); }, 120);
  }
  function chay() {
    var xong = (document.fonts && document.fonts.ready) || Promise.resolve();
    xong.then(function () { setTimeout(function () { fit(25); }, 60); });
  }
  if (document.readyState === 'complete') chay();
  else addEventListener('load', chay);
  // Đổi kích thước cửa sổ cũng phải fit lại, không thì cây lệch khỏi khung.
  var t; addEventListener('resize', function () { clearTimeout(t); t = setTimeout(function () { fit(1); }, 200); });
})();
</script>
`;

if (!html.includes('</body>')) { console.error('❌ không thấy </body> trong', f); process.exit(1); }
html = html.replace('</body>', va + '</body>');
fs.writeFileSync(f, html);
console.log('✅ đã vá:', f);
