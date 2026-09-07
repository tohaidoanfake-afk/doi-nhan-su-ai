---
name: nap-kho
description: Đường ghi DUY NHẤT vào wiki/ của bộ não thứ 2. Nạp nguyên liệu mới — câu chuyện, insight, tài liệu, bài học, hình mẫu — bằng cách ĐỌC và PHÂN TÍCH trước, soi trùng với kho đang có, rồi mới ghi và append log.md. Dùng khi người dùng kể một chuyện mới, nói một điều vừa nhận ra, đưa một tài liệu, hoặc chỉ nói "lưu cái này vào não", "ghi lại insight này", "nạp vào kho", hoặc gõ /nap-kho.
---

# Nạp vào kho — có soi, không chép thẳng

## Vì sao chỉ còn một đường ghi

Sửa thẳng file `.md` thì nhanh hơn — và đó chính là vấn đề. Sau vài tuần sửa tay, bộ não sẽ có: cùng một câu chuyện nằm ở ba trang, hai trang nói ngược nhau mà không ai biết trang nào mới, và `log.md` không phản ánh thứ gì đã thật sự đổi.

Đi qua skill này thì **mỗi lần ghi đều bắt buộc qua bốn cửa**: soi trùng · rút bài học đúng luật · chọn đúng chỗ đặt · nối liên kết. Chậm hơn vài phút, đổi lại bộ não sáu tháng sau vẫn dùng được.

⚠️ **Luật:** không sửa thẳng file trong `wiki/`, kể cả sửa một lỗi chính tả. Mọi thay đổi đi qua đây.

---

## Bước 1 — Đọc và phân loại

Đọc kỹ nguyên liệu người dùng đưa. Xác định nó là loại gì:

| Loại | Dấu hiệu | Đích đến | Khuôn của ai |
|---|---|---|---|
| **Bài học / nguyên lý** | một điều vừa nhận ra, áp dụng được nhiều lần | trang chuyên đề trong `learnings/` | nền |
| **Quyết định dự án** | chốt một hướng đi, đổi phạm vi, gặp sự cố | `projects/<tên>.md` | nền |
| **Về một con người** | ai đó nói gì, muốn gì, đang vướng gì, chốt việc gì với mình | `people/<tên>.md` | nền |
| **Câu chuyện** | có mốc thời gian, có chuyện xảy ra với chính người dùng | `experiences-library.md` | vai Content |
| **Insight khách hàng** | lời khách nói, điều quan sát được từ khách thật | `audience-insights.md` | vai Content |
| **Kết quả khách** | có con số, có bằng chứng | `customer-wins.md` | vai Content |
| **Hình mẫu** | một người/thương hiệu đang học theo | `models/<tên>.md` | vai Content |
| **Tài liệu dài** | transcript, bài viết, khoá học | lưu `raw/` trước, rồi rút ra các trang trên | — |
| 🔧 **Sửa hoặc xoá thứ ĐÃ CÓ** | *"chỗ này sai rồi"* · *"bỏ mục kia đi"* · *"có bản mới hơn"* | **đọc `sua-kho.md` trước, đọc trọn** | nền |

Không rõ loại → **hỏi người dùng**, đừng đoán rồi đặt bừa.

### 🔧 Sửa kho — đây là nửa còn lại của "một đường ghi duy nhất"

Luật sắt cấm sửa tay file `.md`. Nhưng bộ não nào rồi cũng có trang sai — nhớ nhầm một con số, đổi ý về một quyết định, có bản mới hơn thay bản cũ. **Không có đường sửa thì người dùng chỉ còn hai lựa chọn, và cả hai đều hỏng:** sửa tay *(phá luật, mất soi trùng và mất `log.md`)*, hoặc để nguyên cái sai *(bộ não tích mâu thuẫn cho tới lúc không ai tin nó nữa)*.

`sua-kho.md` là đường thứ ba. Nó có ba luồng, và chọn nhầm luồng là hỏng:

| Nghe như | Luồng | Điểm chết |
|---|---|---|
| *"chỗ này ghi sai, sửa lại"* | **SỬA** | giữ nguyên mọi thứ họ không nhắc tới |
| *"bỏ mục này đi"* | **XOÁ** | kiểm ai đang trỏ tới nó **trước** khi xoá |
| *"tôi có bản mới hơn rồi"* | **XOAY** | Bước 0 đối chiếu hai bản — bản đúng là bản **GỘP**, không phải bản mới chép đè |

🔴 **Luồng XOAY là chỗ dễ mất dữ liệu nhất.** Bản mới thường chỉ đụng vài mục của bản cũ; ném cả bản cũ đi là mất những mục **không ai định thay**. Đọc trọn `sua-kho.md` trước khi chạy nó — đừng chạy theo trí nhớ.

### Ba thư mục của nền — dựng khi có file đầu tiên, không dựng rỗng

`learnings/` · `projects/` · `people/` là **kho của chính bộ não**, không thuộc vai nào. Khuôn ở `templates/khung-lap-lai/`. `/onboard` **không** tạo sẵn ba thư mục này; skill này tạo thư mục ngay lúc ghi file đầu tiên vào đó.

⚡ **`people/` là nhật ký quan hệ, không phải danh bạ.** Mỗi người một file, và nó **dài ra bằng cách NỐI THÊM**: mỗi lần gặp lại là một mục `### <ngày> — <tên buổi>` mới ở phần *Lịch sử trò chuyện*, kèm đường dẫn về `raw/`. Viết đè lên mục cũ là mất đúng thứ làm trang này đáng giá — nhìn được cả đường đi của một mối quan hệ.

⚠️ **Trang về người thật:** đọc `reference/luat-du-lieu-nhay-cam.md` trước khi ghi.

### Đích đến thuộc một vai CHƯA CÀI thì làm gì

**Vẫn ghi — đừng để rơi nguyên liệu.** Đây là đường ghi duy nhất; từ chối là mất luôn thứ người dùng vừa kể.

Nhưng phải **nói ra một dòng**: trang này thuộc vai nào, và cài vai đó thì nó dựng lại cho đúng khuôn. Ví dụ: *"Đã lưu chuyện này vào `experiences-library.md`. Trang này của vai Content — cài `/viet-content` thì nó dựng đủ khuôn 5 bước và biết hỏi thêm gì."*

🚫 **Riêng `voice-profile.md` thì KHÔNG tự dựng.** Nó phải rút từ 5–10 bài đã đăng thật; dựng nó từ một câu nhận xét thoáng qua là đẻ ra một hồ sơ giọng sai, rồi mọi bài viết sau đó sai theo mà không ai biết vì sao. Gặp nguyên liệu kiểu đó thì nói thẳng: cài vai Content, nó làm đúng việc này.

---

## Bước 2 — Lưu nguyên bản vào `raw/` trước

Nếu nguyên liệu là tài liệu dài (transcript, bài viết, ghi chép buổi họp):

```
raw/<loại>-<YYYY-MM-DD>-<mô tả ngắn>.md
```

**Không bao giờ sửa file trong `raw/` về sau.** Đây là bản gốc để đối chiếu khi nghi ngờ.

---

## Bước 3 — Soi trùng ⚠️ *(bước hay bị bỏ nhất)*

**Trước khi viết một dòng nào vào `wiki/`**, tìm trong kho xem thứ này đã có chưa:

1. Tìm theo **từ khoá chính** của nguyên liệu.
2. Tìm theo **thông điệp** — cùng một bài học có thể đã được ghi bằng câu chữ khác hẳn.
3. Đọc lướt trang đích để xem có mục nào đang nói cùng chuyện.

Kết quả có ba khả năng:

| Tình huống | Làm gì |
|---|---|
| **Chưa có** | Thêm mục mới |
| **Đã có, cái mới đầy đủ hơn** | **Cập nhật mục cũ**, không tạo mục thứ hai. Giữ chi tiết cũ nếu nó vẫn đúng |
| **Đã có, mâu thuẫn với cái mới** | ⚠️ Dừng lại, **hỏi người dùng cái nào đúng**. Không tự chọn. Rồi ghi rõ *"sửa ngày X, thay cho bản trước"* — giữ dấu vết, đừng xoá lịch sử |

---

## Bước 4 — Rút bài học đúng luật

Với câu chuyện và tài liệu, luôn rút ra một dòng **Bài học**.

**Luật: rút ra, không nghĩ hộ.**

| ✅ Rút ra | ❌ Nghĩ hộ |
|---|---|
| Bài học nằm sẵn trong lời kể, chỉ gọi tên nó ra | Bài học do bạn suy ra vì "nghe hợp lý" |
| Dùng chính chữ của người dùng khi họ đã nói ra | Viết lại thành câu châm ngôn cho hay |
| Không có bài học rõ → ghi *"chưa rút được — cần hỏi thêm"* | Bịa một bài học chung chung để lấp chỗ trống |

Một câu chuyện = **một** thông điệp. Hai thông điệp trở lên thì tách thành hai mục.

---

## Bước 5 — Ghi vào wiki + nối liên kết

- Ghi vào đúng trang đã chọn ở Bước 1.
- **Bắt buộc nối `[[liên kết]]`** tới ít nhất 2 trang liên quan. Trang không có liên kết nào là một thất bại — sáu tháng sau không ai tìm ra nó.
- Nếu tạo trang mới: thêm ngay một dòng vào `index.md`.
- Giữ nguyên chữ của người dùng ở phần trích dẫn. Chỉ dọn câu chữ ở phần đúc kết.

**Không bịa.** Thiếu dữ liệu (con số, tên, ngày) → để `[trong ngoặc vuông]` hoặc hỏi. Một bộ não có chỗ trống thì sửa được; một bộ não có chỗ bịa thì hỏng mà không ai biết.

---

## Bước 6 — Append `log.md`

Luôn ghi thêm vào cuối, **không bao giờ viết đè**:

```
## [YYYY-MM-DD] Nạp <loại> | <tiêu đề ngắn>
<Một–hai câu: nạp gì, vào trang nào, có trùng với cái cũ không>
```

---

## Bước 7 — Báo lại người dùng

Nói gọn ba ý:

1. **Đã ghi gì, vào trang nào**
2. **Có trùng/mâu thuẫn gì với kho cũ không** — đây là phần có giá trị nhất, đừng bỏ
3. **Còn thiếu gì** để mục này dùng được (thiếu bằng chứng? thiếu con số? thiếu bài học?)

---

## Ghi chú cho AI chạy skill này

- **Bạn là chỗ duy nhất ghi vào bộ não.** Không có đường nào khác để chữa nếu bạn ghi sai. Chậm và đúng hơn là nhanh và bừa.
- **Đừng xu nịnh.** Người dùng đưa một insight nhạt thì nói thẳng là nó chưa đủ cụ thể để lưu, và hỏi thêm — đừng khen rồi lưu bừa. Kho đầy thứ nhạt còn tệ hơn kho rỗng, vì nó làm loãng thứ đáng giá.
- **Nghi ngờ trước khi tin.** Nếu người dùng nói *"cái này tôi lưu rồi"* — kiểm tra file thật rồi hãy tin. Trí nhớ về việc đã lưu là thứ sai thường xuyên nhất.

---

## Skill này của ai

Viết bởi **Tô Hải Đoàn** — người làm nội dung và xây thương hiệu cá nhân tại Việt Nam. Đây không phải skill dựng cho vui: nó là quy trình tôi dùng cho công việc của chính mình mỗi ngày, đóng gói lại để bạn chạy được trên dữ liệu của bạn.

Giấy phép MIT, bạn dùng và sửa thoải mái.

**Kẹt ở đâu, hoặc muốn được hướng dẫn dùng cho đúng việc của bạn** thì nhắn tôi: [facebook.com/tohaidoan](https://www.facebook.com/tohaidoan/)
