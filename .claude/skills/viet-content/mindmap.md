# 🗺️ Mindmap — `mindmap`

> ⚠️ **File này là chỗ DUY NHẤT chứa luật mindmap.** Sửa luật thì sửa ở đây.

Đây là loại việc **khác hẳn** mọi việc còn lại của vai này: nó **chạy lệnh ngoài** và **giao file HTML**, không giao chữ để bạn copy đi đăng.

### Chạy gì

1. **Lấy nguyên liệu.** Ba đường, **phải có ít nhất một**, và có thể có nhiều hơn một cùng lúc:

   | Người dùng đưa gì | Làm gì |
   |---|---|
   | **một trang trong bộ não** | **Đọc trọn** `wiki/<trang>.md`. Không tóm tắt từ trí nhớ, kể cả khi thấy mình vừa đọc trang đó trong phiên này |
   | **một link Notion / trang ngoài** | Mở ra, lấy nội dung |
   | **một bài dán thẳng vào** | Dùng thẳng chữ đã dán |

   ⚠️ **Trang trỏ hụt thì DỪNG và hỏi lại, đừng đoán trang gần giống.** Đọc trượt file rồi tự bù bằng trí nhớ là ra một bản đồ trông rất hợp lý dựng từ hiểu biết chung — không phải từ bộ não của người dùng. Đó là kiểu sai khó bắt nhất ở đây, vì thành phẩm không có chỗ nào trông sai.

   ⚡ **Người dùng khoanh đúng MỘT mục thì đó là ràng buộc cứng, đọc trước khi rút gọn.**
   Trang trong bộ não hay gộp nhiều khung vào một chỗ — một trang `frameworks-core.md`
   gộp năm khung là chuyện thường. Nghe *"vẽ mindmap trang này, phần SCORE thôi"* thì
   **CHỈ lấy đúng mục đó**: từ dòng `## <tên mục>` (khớp nguyên văn) tới heading `##`
   kế tiếp, **bỏ hẳn phần còn lại của trang** — không kéo thêm ngữ cảnh từ mục khác trừ
   khi trang tự dẫn chiếu chéo. Không tìm thấy heading khớp nguyên văn thì **dừng và
   hỏi lại**, đừng đoán mục gần giống. Mục đã khoanh **thắng** nếu nó và mục tiêu bài
   chỉ tới hai hướng khác nhau — lúc đó mục tiêu chỉ còn vai trò chọn *góc nhìn* bên
   trong phần đã khoanh. Không khoanh gì → đọc cả trang, tự rút theo mục tiêu.

   ⚠️ **Nguồn ngoài wiki đi kèm một ràng buộc.** Nội dung từ Notion hay bài dán **chưa qua `/nap-kho`**, tức chưa có ai soi trùng, chưa đối chiếu giá trị cốt lõi. Dựng mindmap từ nó thì được, nhưng **nói rõ trong `ket-qua.md`** rằng bản đồ này dựng từ nguyên liệu chưa nạp vào bộ não — và nếu nội dung đáng giữ thì **đề xuất nạp qua `/nap-kho`**, đừng tự ghi vào `wiki/`.
2. **Viết `mindmap-nguon.md`** — markdown thuần, phân cấp bằng `#` / `##` / `###` rồi tới gạch đầu dòng. Frontmatter YAML khai màu và độ mở:

```markdown
---
title: <tên gọn>
markmap:
  colorFreezeLevel: 2
  color: ["#dd1717", "#141414", "#b8860b", "#7a1f35", "#2d5016", "#1c3a5e"]
  maxWidth: 320
  initialExpandLevel: <đúng số cấp ô `doSau`; "het" → -1>
  spacingVertical: 10
  spacingHorizontal: 90
---
```

3. **Chốt tên file đầu ra `<ten-file>.html`** — KHÔNG dùng cứng `mindmap.html`. Lý do
   chỉ lộ ra lúc dùng thật: kéo vài file ra khỏi thư mục lượt chạy để gửi cho người khác
   hay để chung một chỗ, thì tất cả cùng tên `mindmap.html` và không phân biệt được cái
   nào là cái nào.

   Suy `<ten-file>` từ chính `title` đã viết ở bước 2 — không nghĩ ra tên thứ hai:
   viết thường, bỏ dấu tiếng Việt, thay khoảng trắng/ký tự lạ bằng `-`, cắt còn khoảng
   30–40 ký tự, bỏ gạch nối thừa ở hai đầu. Ví dụ `title: NLP Meta Model & SCORE` →
   `nlp-meta-model-score.html`; `title: 7C Content Formula` → `7c-content-formula.html`.

4. **Sinh file**, từ thư mục run — **hai lệnh, cả hai đều bắt buộc**:

```bash
npx --yes markmap-cli mindmap-nguon.md -o <ten-file>.html --offline --no-open
node ../../va-mindmap.mjs <ten-file>.html
```

5. **Mở `<ten-file>.html` kiểm bằng mắt** trước khi bàn giao. Đếm số nhánh cấp 1 khớp số mục lớn đã định chưa.

### Bốn chốt chặn — đều là lỗi đã mắc thật, đừng gỡ

0. 🚫 **Không bao giờ bỏ lệnh `va-mindmap.mjs`.** markmap gọi `fit()` lúc khởi tạo, **trước khi font đo được kích thước chữ** — nó tính khung bằng 0 rồi để cả cây ở toạ độ **âm**, nằm ngoài khung nhìn. Mở file ra là **trắng trang**, phải tự bấm nút thu-gọn trong toolbar mới thấy. Đo thật 2026-08-07: 9 node, node đầu ở `x=-62 y=-20`. Bạn báo đúng chỗ này: *"trong thư viện mindmap ko hiển thị dc nhỉ"*. Bản vá đợi `document.fonts.ready` rồi mới `fit()`, và fit lại khi đổi kích thước cửa sổ. Chạy lại nhiều lần vô hại — có dấu thì nó bỏ qua.

1. 🚫 **Không bao giờ bỏ cờ `--offline`.** Thiếu nó thì file gọi d3 + markmap-view từ CDN. Member mở lúc không có mạng là **trắng trang** — mà họ sẽ không báo lại, họ chỉ nghĩ tài liệu hỏng.
2. 🚫 **Không thay markmap bằng mermaid `mindmap`.** Mermaid chỉ vẽ được **cây**; nó không vẽ được mũi tên quay ngược (vòng lặp) hay hộp lồng nhau (hai tầng). Và nó không cho chỉnh font/khoảng cách/bo góc — chỉ đổi được `fill`/`stroke` — nên kết quả luôn trông như sơ đồ kỹ thuật. Cần vẽ *vòng lặp* hay *hai tầng* thì làm **thêm** một file mermaid `.md` bên cạnh, không thay thế.
3. 🚫 **Không đặt chữ tiếng Việt vào SVG `<text>`.** Dấu chồng bị vỡ — "NGƯỢC" hiện ra thành "NGƯ Ợ C". Chữ đè lên hình phải là `<div>` HTML định vị tuyệt đối bên trên SVG.

### Luật nội dung

- **Rút gọn tàn nhẫn.** Mindmap là *bản đồ*, không phải bản tóm tắt. Mỗi node tối đa một dòng ngắn. Trang 4.000 từ ra khoảng 8 nhánh lớn là vừa — ra 20 nhánh là chưa rút.
- **Giữ nguyên chữ của bạn ở các node chốt.** Câu cửa miệng (*"Não loạn thì Notion cũng loạn"*) đưa vào nguyên văn, đừng diễn đạt lại cho "gọn hơn".
- **Ô `keoTheo` là ràng buộc cứng** — nhánh bạn ghi ở đó không được lược, kể cả khi thấy nó nhỏ.
- **Áp Hard Don't #2**: lược sạch tên người thật, số doanh thu, thông tin VIP. Bản đồ này gửi ra ngoài.

### Giao gì

Trong `ket-qua.md`, mục `## Mindmap` ghi: đường dẫn `<ten-file>.html`, danh sách nhánh cấp 1, và **những gì đã cố ý lược bỏ kèm lý do**. Nói rõ file mở offline được và gửi Zalo/Messenger được.

Giữ luôn `mindmap-nguon.md` trong thư mục run — lần sau sửa nội dung thì sửa file đó rồi chạy lại **hai lệnh** ở bước 4, không phải dựng lại từ đầu. **Sinh lại là mất bản vá**, nên đừng chỉ chạy lệnh đầu. `mindmap-nguon.md` giữ nguyên tên (nguồn nội bộ, không gửi ra ngoài) — chỉ file `.html` giao ra mới cần tên ngắn gọn.

Không cần dặn bạn tự mở file: thư viện tự mọc nút **🗺️ Mở `<ten-file>.html`** cho mọi run có file xem được (`scan.mjs` → `fileXem`) — nút tự đọc đúng tên file thật, không hardcode.
