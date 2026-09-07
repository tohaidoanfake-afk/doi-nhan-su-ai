# Khung các trang — dùng thế nào

> Đây là **khuôn**, không phải nội dung. AI sẽ dùng chúng khi dựng `wiki/`.
> Giữ nguyên cấu trúc heading, chỉ thay `[...]` bằng nội dung thật. **Thiếu thì để nguyên placeholder — không bịa.**

---

## Hai file gốc — dựng trước tiên

`index.md` và `log.md` nằm ở **gốc thư mục bộ não**, cùng tầng với `wiki/` chứ không nằm trong `wiki/`. Dựng từ `index.md` và `log.md` trong thư mục này — **đừng tạo rỗng**: mỗi người một định dạng thì skill `nap-kho` về sau ghi thêm vào một cấu trúc không tồn tại.

---

## 11 trang, và chỉ 11 trang

| Nhóm | Khuôn |
|---|---|
| **Chân dung** — không skill nào đọc, nhưng thiếu thì bộ não không phải của ai | `about-me` · `values-and-principles` · `contrarian-beliefs` · `decision-style` · `network` · `expertise` |
| **Dùng chung** — từ 2 vai trở lên đọc | `target-customer` *(5 vai)* · `offer-ladder` *(3 vai)* · `goals` · `ai-operating-preferences` · `systems-and-stack` |

Cộng `index.md` và `log.md`.

## Ba khung lặp lại — `khung-lap-lai/`

Kho của chính bộ não, **không thuộc vai nào**. `/onboard` không tạo thư mục rỗng cho chúng; `/nap-kho` tạo khi ghi file đầu tiên.

| Khung | Là gì |
|---|---|
| `people.md` | **Nhật ký quan hệ**, không phải danh bạ. Mỗi người một file, nối thêm mỗi lần gặp — mục *Lịch sử trò chuyện* là phần đáng giá nhất, đừng viết đè |
| `projects.md` | **Sổ quyết định**. Chốt gì · ngày nào · vì sao. Không phải bản mô tả dự án |
| `learnings.md` | Thứ hấp thụ **từ ngoài**, gom theo **chủ đề** chứ không theo nguồn. Một file gom nhiều nguồn |

## 🚫 Khuôn của vai KHÔNG nằm ở đây nữa *(đổi từ v3.1)*

`voice-profile`, `experiences-library`, `customer-wins`, `hook-library`, `content-library`, `audience-insights`, `models`, `business-metrics`, `positioning`, `customers`, `competitors`, `brand-guide` đã chuyển sang **vai sở hữu chúng**, và vai đó dựng trang lúc được cài.

**Vì sao không giữ lại làm file rỗng cho tiện:**

1. **Nền không dựng nổi chúng.** `voice-profile` cần 10–20 bài đã đăng thật; `customer-wins` cần khách thật; `business-metrics` cần số thật. Hỏi ngày đầu thì người ta nộp qua loa, hoặc dừng lại đi tìm rồi không quay lại.
2. **Vỏ rỗng không giúp được vai nào.** Cửa vào của vai Content đếm file *"tồn tại VÀ có nội dung thật — không phải dòng 'chưa có dữ liệu'"*. Tức nó bỏ qua đúng cái vỏ mà nền vừa tạo cho nó.
3. **Vỏ rỗng thối rữa im lặng.** `nut-that.md` từng được dựng sẵn kèm dòng *"sinh ra từ việc X"*; việc X chuyển sang vai khác và để lại một file trỏ vào lệnh không tồn tại. File rỗng còn chủ và file rỗng mất chủ **trông y hệt nhau**.

⚡ Chỗ đúng để đặt vẫn phải có — nhưng nó là **một dòng trong `index.md`** kèm cột *Ai lấp*, không phải một file. Một dòng nói được chủ của nó là ai; một file rỗng thì không.

📁 Khuôn đã gỡ nằm ở `../../khuon-cua-vai/`, chia theo vai.

