---
name: onboard
description: Dựng bộ não thứ 2 lần đầu — thu tài liệu có sẵn, đọc và rút draft, phỏng vấn lấp chỗ trống, rồi dựng đúng 11 trang nền: chân dung người dùng cộng dữ liệu từ hai vai trở lên cùng đọc. KHÔNG dựng kho của vai nào khác, kể cả file rỗng — mỗi vai tự dựng kho của nó lúc cài. Dùng khi người dùng vừa cài bộ khung và nói "bắt đầu", "start", "tạo bộ não thứ 2", hoặc gõ /onboard.
---

# Dựng bộ não thứ 2 — 4 giai đoạn

> Luật chi tiết nằm ở `CLAUDE.md` gốc. Skill này là bản hành động từng bước.

🔴 **Bộ não dựng THẲNG vào thư mục đang mở, không bọc thêm lớp nào.** `wiki/` · `raw/` · `index.md` · `log.md` nằm cùng tầng với `CLAUDE.md` và `.claude/skills/`.

Mọi đường dẫn trong skill này và trong mọi vai đều tính từ đó: `wiki/about-me.md` nghĩa là `<thư mục đang mở>/wiki/about-me.md`. Dựng vào một thư mục con (kiểu `SecondBrain/wiki/`) là **mọi vai sau này tìm hụt lên một tầng** — và hụt im lặng: vai Content sẽ báo *"kho trống, không viết"* trong khi kho đầy, nằm thấp hơn một bậc. Người dùng làm đúng hết mà công cụ nói chưa có gì.

## Nguyên tắc quan trọng nhất

Một bộ não thứ 2 tốt **không đến từ một buổi hỏi-đáp suông**. Phần lớn giá trị thật — giọng văn đúng, câu chuyện thật, framework đã đúc kết, bằng chứng khách hàng — nằm trong **tài liệu người dùng đã có sẵn**. Phỏng vấn chỉ để lấp phần không lấy được từ tài liệu.

Vì vậy: **không bỏ Giai đoạn 0.**

---

## GIAI ĐOẠN −1 — Hỏi xem đã có bản kế hoạch nào chưa

Hỏi: *"Bạn đã từng ngồi làm kế hoạch dài hạn – ngắn hạn cho chính mình chưa? Bánh xe cuộc đời, OKR, kế hoạch 90 ngày — bất cứ dạng nào."*

- **Rồi** → xin bản đó, lưu vào `raw/`, dùng thẳng làm đầu vào cho `goals.md`. Đây là đường tốt nhất: nó đã qua một lượt người ta tự nghĩ, không phải câu trả lời ứng khẩu giữa buổi phỏng vấn.
- **Chưa** → **vẫn chạy tiếp, đừng chặn.** Hỏi bù ba câu ở phần Mục tiêu là đủ dựng `goals.md` bản đầu.

⚠️ **Nói thẳng cái giá của việc chưa có.** Phỏng vấn kinh doanh nạp *dữ liệu việc*: dự án, khách hàng, sản phẩm. Một bài kế hoạch tử tế nạp *con người* — họ đang ở đâu, muốn đi đâu. Thiếu nửa sau thì bộ não sẽ nạp rất nhanh và rất đúng một mục tiêu mà **chính chủ chưa tự kiểm lại** xem có thật là mục tiêu của mình không. Nói ra một lần, rồi đi tiếp — đừng bắt họ dừng lại đi làm kế hoạch trước.

📌 Bài Bánh Xe Cuộc Đời có bộ hướng dẫn riêng, nằm ở **vai Điều phối** — chưa phát. Đừng hứa một lệnh chưa có.

---

## GIAI ĐOẠN 0 — Thu tài liệu có sẵn

Hỏi người dùng có sẵn loại nào (có gì nộp nấy, không có cũng không sao):

1. **Ghi chép/bản ghi buổi chia sẻ, coaching, họp nhóm** — transcript Zoom, note cuộc gọi, bài giảng. Đây là nguồn giàu câu chuyện và framework nhất; có hàng chục file thì đây sẽ là phần tạo giá trị lớn nhất.
2. **Tài liệu sản phẩm/dịch vụ** — SOP, playbook, hồ sơ khách hàng, email đã gửi.

Dán thô vào chat hoặc đính kèm file. Không cần gọn gàng.

### ⛔ Hai loại tài liệu CỐ Ý không xin ở đây

**Bài đã đăng thật** và **lời chứng thực của khách** là chất liệu để viết, không phải hồ sơ nền. Vai content xin chúng khi nó được kích hoạt, bằng `/viet-content`.

Vì sao tách: hai loại này là thứ người mới hoàn toàn **thường chưa có** ngày đầu. Xin ngay ở buổi dựng nền thì hoặc họ nộp qua loa cho xong, hoặc họ dừng lại đi tìm và không quay lại. Hỏi đúng lúc cần thì họ hiểu vì sao phải nộp, và nộp tử tế hơn.

Người dùng chủ động đưa sẵn thì **vẫn nhận** — lưu vào `raw/`, nói rõ là để dành cho vai content, đừng rút thành trang ở đây.

---

## GIAI ĐOẠN 1 — Đọc và rút draft từ tài liệu

| Nhận được | Rút ra |
|---|---|
| Ghi chép buổi chia sẻ | (a) framework dạy lặp lại nhiều lần → trang chuyên đề trong `learnings/` · (b) tên người nhắc nhiều → trang trong `people/` |
| Tài liệu sản phẩm | → `offer-ladder.md` · `target-customer.md` |

⛔ **Không rút `voice-profile`, `experiences-library`, `customer-wins` ở đây** — ba trang đó là việc của vai content (xem Giai đoạn 0). Gặp câu chuyện hay trong ghi chép thì cứ để nguyên trong `raw/`; vai content sẽ lấy.

Rút xong: **báo lại đã rút được gì và còn thiếu gì.** Đây là lúc người dùng thấy tài liệu cũ của họ có giá — và là lúc họ nhớ ra còn tài liệu nào chưa nộp.

---

## GIAI ĐOẠN 2 — Phỏng vấn lấp chỗ trống

Bộ câu hỏi đầy đủ nằm ở `CLAUDE.md`. Bản sâu 48 câu ở `reference/Persona-Extraction-Protocol.md`.

Luật:
- **Một câu một lượt.** Chờ trả lời rồi mới hỏi tiếp.
- Câu nào Giai đoạn 1 đã có đủ → **bỏ qua và nói rõ vì sao bỏ**. Hỏi lại thứ họ vừa nộp là cách nhanh nhất làm người ta bỏ dở.
- 🔴 **Trang đó đã có nội dung thật trong `wiki/` rồi → cũng bỏ qua.** Đọc `wiki/` **trước khi hỏi câu nào**, không phải chỉ đọc tài liệu họ vừa nộp. Xem mục ⚠️ ngay dưới Giai đoạn 3.
- Trả lời chung chung → xin **ví dụ cụ thể, số liệu, tên riêng** trước khi đi tiếp.
- Giữ nguyên chữ của họ.

⚠️ Hai nhóm câu **không được bỏ dù tài liệu có nhiều tới đâu**: `ai-operating-preferences` (xưng hô · khi nào phải hỏi · hard don'ts) và `contrarian-beliefs`. Tài liệu không bao giờ chứa hai thứ này — chúng chỉ có trong đầu người dùng.

---

## GIAI ĐOẠN 3 — Dựng 11 trang, và KHÔNG dựng gì khác

Dùng khung trong `templates/`, giữ nguyên heading, chỉ thay `[...]`. **Không bịa** — thiếu thì để nguyên placeholder hoặc ghi *"chưa có thông tin"*.

### ⚠️ Trang đã có nội dung thật thì BỔ SUNG, không dựng đè

`/onboard` không phải lúc nào cũng là thứ chạy đầu tiên. Hai đường đã có thật:

- Một **vai** cứu trước. Vai Content, khi cửa vào đang kẹt, hỏi ba câu tối thiểu rồi giao `/nap-kho` ghi `target-customer` và `contrarian-beliefs` — bản **rút tối thiểu**, cố ý cạn hơn bản ở đây.
- Người dùng **chạy lại `/onboard`** sau vài tuần để lấp nốt trang còn trống.

Cả hai ca đều dẫn tới cùng một tình huống: **file đã có, và có nội dung thật.** Ghi đè là xoá thứ họ đã ngồi trả lời, mà xoá xong không có gì báo — `log.md` chỉ ghi *"dựng wiki"*, không ghi *"đã mất một bản"*.

**Luật:**

1. **Đọc file trước khi định ghi.** Có nội dung thật (không còn `[ngoặc vuông]`, không phải dòng *"chưa có thông tin"*) thì **không ghi đè**.
2. **Bổ sung vào chỗ còn trống**, giữ nguyên chữ họ đã viết. Câu phỏng vấn ứng với phần đã đầy thì **bỏ và nói rõ vì sao bỏ**.
3. **Mâu thuẫn thì hỏi, đừng chọn hộ.** Bản cũ nói khách sợ A, họ vừa nói sợ B → đưa cả hai ra, hỏi cái nào đúng hơn bây giờ. Đây thường là **thay đổi thật theo thời gian**, không phải lỗi.

📌 Bản rút tối thiểu do vai cứu là **hạt giống, không phải bản chính thức**. Gặp nó thì nói thẳng: *"target-customer đang là bản rút nhanh từ ba câu, tôi hỏi sâu thêm để dựng bản đủ."* Rồi hỏi — nhưng hỏi để **đắp dày**, không hỏi lại từ đầu.

### 11 trang, hai việc khác nhau

| Nhóm | Trang | Vì sao nằm ở nền |
|---|---|---|
| **Chân dung** | `about-me` · `values-and-principles` · `contrarian-beliefs` · `decision-style` · `network` · `expertise` | Không skill nào đọc chúng. Chúng là thứ làm bộ não trả lời **như chính người dùng** khi họ ngồi nói chuyện với nó. Thiếu thì đây là kho tài liệu, không phải bộ não của ai |
| **Dùng chung** | `target-customer` · `offer-ladder` · `goals` · `ai-operating-preferences` · `systems-and-stack` | Từ **hai vai trở lên** đọc. `target-customer` nhiều nhất: 5 vai. Để chúng nằm trong một vai thì cài vai khác là hụt |

### 🚫 Tuyệt đối KHÔNG tạo file rỗng cho vai khác

Không dựng `voice-profile`, `experiences-library`, `customer-wins`, `hook-library`, `content-library`, `models/`, `business-metrics`, `positioning`, `so-lieu-chuan`… **kể cả file rỗng có khung.**

⚠️ **`learnings/` `projects/` `people/` thì KHÁC — chúng là kho của chính nền**, không thuộc vai nào; `/nap-kho` ghi thẳng vào đó. Nhưng vẫn **không tạo thư mục rỗng ở đây**: `/nap-kho` tạo ngay lúc ghi file đầu tiên. Một thư mục rỗng cũng không nói được gì hơn một dòng trong `index.md`.

Ba lý do, cái thứ hai là cái nặng nhất:

1. **Nền không dựng nổi chúng.** `voice-profile` cần 10–20 bài đã đăng thật; `customer-wins` cần khách thật; `business-metrics` cần số thật. Hỏi ngày đầu thì người ta nộp qua loa cho xong, hoặc dừng lại đi tìm rồi không quay lại.
2. **Vỏ rỗng không giúp được vai nào, vì chính vai đó coi nó ngang bằng không có.** Cửa vào của vai Content đếm file *"tồn tại **VÀ có nội dung thật** — không phải dòng 'chưa có dữ liệu'"*. Tạo sẵn vỏ là làm một việc mà người thụ hưởng duy nhất bỏ qua.
3. **Vỏ rỗng thối rữa thành con trỏ chết, và thối im lặng.** Đo thật: `nut-that.md` từng được dựng sẵn kèm dòng *"trang này sinh ra từ việc X"* — rồi việc X chuyển sang vai khác, để lại một file rỗng trỏ vào lệnh không có trong máy. **File rỗng còn chủ và file rỗng mất chủ trông y hệt nhau**, nên không ai phát hiện được.

⚡ **Vai nào cần trang nào thì vai đó dựng, lúc cài.** Nó biết khuôn đúng của trang đó, nó biết hỏi gì để lấp, và nó chỉ tồn tại khi người dùng thật sự cần tới.

### Chỗ đúng để đặt vẫn phải có — nhưng là MỘT DÒNG, không phải một file

Nỗi lo cũ vẫn thật: không có chỗ đúng thì nội dung bị nhét bừa vào trang khác, và bộ não loạn từ tuần thứ ba. Thuốc là **bản đồ**, không phải vỏ rỗng.

Ghi `index.md` theo khuôn `templates/index.md` — nó liệt kê **cả trang chưa có**, mỗi dòng kèm cột **ai lấp**. Một dòng trong bảng nói rõ chủ của nó là ai; một file rỗng thì không nói được gì.

Cộng `log.md` rỗng và thư mục `raw/`. **Hết.**

---

## Kết thúc

1. Cập nhật `index.md` — mọi trang + một dòng tóm tắt.
2. Lưu nguyên văn buổi phỏng vấn vào `raw/onboarding-<ngày>.md` — **bất biến**.
3. Append `log.md`.
4. Báo người dùng đã dựng được gì, trang nào còn trống và vì sao.
5. ⚡ **Nhắc chạy Việc 6** — skill `kiem-chung`, trên **đoạn chat mới, project mới**. Chưa chạy bài đó thì chưa biết bộ não có lưu thật hay chỉ đang nằm trong trí nhớ của phiên này.
6. **Nói rõ việc tiếp theo là gì, và nói bằng lời của người dùng.** Bộ não giờ có **nền**, chưa có ai làm việc trên nền đó. Nói đúng ba ý:

   > *"Xong nền. Giờ bộ não biết bạn là ai, bán gì, cho ai, và làm việc với bạn kiểu nào.*
   > *Nhưng nó chưa biết viết bài, chưa biết soi chỗ tắc, chưa biết chốt việc của tháng — mấy cái đó là **vai**, cài rời.*
   > *Cài vai nào thì vai đó tự dựng kho của nó và hỏi bạn đúng thứ nó cần."*

   🚫 **Đừng liệt kê tên mấy trang chưa có** (`voice-profile`, `hook-library`…). Người mới nghe xong sẽ tưởng mình đang thiếu và đi lấp bằng tay — mà lấp bằng tay là đi vòng qua đúng cái vai biết hỏi cho đúng. Nói *"cài vai nào thì vai đó lo"*, hết.

---

## Skill này của ai

Viết bởi **Tô Hải Đoàn** — người làm nội dung và xây thương hiệu cá nhân tại Việt Nam. Đây không phải skill dựng cho vui: nó là quy trình tôi dùng cho công việc của chính mình mỗi ngày, đóng gói lại để bạn chạy được trên dữ liệu của bạn.

Giấy phép MIT, bạn dùng và sửa thoải mái.

**Kẹt ở đâu, hoặc muốn được hướng dẫn dùng cho đúng việc của bạn** thì nhắn tôi: [facebook.com/tohaidoan](https://www.facebook.com/tohaidoan/)
