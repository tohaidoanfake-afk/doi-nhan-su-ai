# 🧑‍⚖️ Giám khảo soi lại — Bước 5b

> Đọc file này **sau khi đã qua hai cửa vào ở Bước 5b trong `SKILL.md`** (brief bật `giamKhao: co` + đúng 1 trong **6** loại việc đẻ ra bài hoàn chỉnh). Chưa qua cửa thì không chạy.
> ⚠️ Đếm ở đây từng ghi 5 — thiếu `trang-ban-hang`, thêm 2026-09-03. **Danh sách thật nằm ở Bước 5b của `SKILL.md`, không nằm ở đây** — đếm bên đó, đừng tin con số ở dòng này.

Với hai việc kịch bản, giám khảo soi **lời thoại**, không soi shotlist — shotlist đúng hay sai là chuyện nguồn lực thật, một con context trống không kiểm được.

### Vì sao có bước này

Bước 5 là **con vừa viết tự chấm bài mình**. `hook-library` đã ghi rõ vì sao AI chấm bài của chính nó là con số tự khen — và luật đó đang được áp cho loại việc `soi`, nhưng chưa từng được áp cho chính đường viết bài. Bước này lấp đúng chỗ đó.

Rõ nhất là **phép thử C5** ở Bước 5: đổi tên người viết rồi đọc lại xem bài còn là của người dùng không. Con vừa viết **không làm được** phép thử này — nó vừa mở `experiences-library.md`, nó *nhớ* chi tiết nào là thật, nên trong đầu nó bài lúc nào cũng đầy chất riêng. Người đọc trên Facebook không có bộ nhớ đó. Nó biết quá nhiều để chấm đúng.

### ⚡ TẦNG 1 — soi bằng máy TRƯỚC, miễn phí *(bắt buộc, thêm 2026-08-19)*

```bash
node ".claude/skills/viet-content/may/soi-may.mjs" <đường dẫn file bài> --giong=<nghiem-tuc|dua-nhe|vui-ve> --khung=<key khung viết>
```

**Sửa hết mục ● CHẮC rồi mới mở giám khảo AI.** Không tốn token, chạy trong một giây.

📌 **Vì sao bắt buộc:** lượt giám khảo đầu tiên (2026-08-19) tốn **141k token**. Đoàn: *"soi giám khảo mà tốn 120k token thì tốn kém quá, nghiên cứu lại xem"*. Đếm lại 9 lỗi nó tìm ra thì **5 cái regex bắt được** — `**markdown**` Facebook không render · câu punchline gọt (*"Nhưng mà nó chạy. Nó chạy thật."*) · câu dài nhất chưa tới 40 từ · giọng `vui-ve` mà không có từ nói ngọng · không có dấu `…`. Trả tiền cho một model để đếm dấu sao là lãng phí.

**Phân vai rõ:**

| | Bắt gì |
|---|---|
| **Máy** (`soi-may.mjs`) | đếm được: dấu cấm · từ nhạt · W1–W4 · khuôn mòn · số tròn · độ dài câu · khớp giọng đã chốt · cân nặng khung `costly_mistake` · **neo giác quan** · **giọng brochure** · **phủ định tuyệt đối** *(thêm 2026-09-02)* |
| **Giám khảo AI** | KHÔNG đếm được: **nghịch lý** (bài có tìm ra chỗ mâu thuẫn giữa vai và thực tế không) · **lời mời có chữa đúng thứ thân bài vừa chẩn không** · mạch bài có đứt không · phép thử C5 · A2 (có trả lời điều người đọc đang cãi không) · Tầng 4 (chi tiết thừa, cảm xúc có neo vào thân thể hay bỏ lại ở tính từ — luật **C6**) |

⚠️ **Truyền cả `--khung=`**, không chỉ `--giong=`. Ba cờ chỉ bật khi biết khung: `lech_can_nang` · `khong_thay_ngoat` · `thieu_giac_quan`. Quên cờ này thì máy im lặng bỏ qua chúng — không báo lỗi gì.

⚠️ Máy **không thay được** giám khảo. Nó chỉ dọn sạch lỗi vặt để giám khảo khỏi tốn lượt vào đó.

---

### 💰 TẦNG 2 — subagent, nạp bộ luật ĐÃ TRÍCH

```bash
### ⚡ TẦNG 2 — giám khảo AI, trên NGỮ CẢNH TRỐNG

Chỉ mở tầng này sau khi đã sửa hết mục ● CHẮC của tầng 1.

🔴 **Điều kiện sống còn: giám khảo KHÔNG được là con vừa viết.** Mở một lượt riêng — subagent nếu có Agent tool, không thì một phiên mới — và đưa vào **đúng ba thứ**:

1. Bài cần soi *(nguyên văn, không kèm brief, không kèm lý do viết thế)*
2. Bốn file luật đi kèm gói này: `luat/loi-nghe.md` · `luat/hook.md` · `luat/dau-hieu-ai-viet.md` · `luat/vi-du-luat-rieng.md`
3. `wiki/voice-profile.md` của người dùng

🚫 **Đừng đưa thêm gì nữa** — không `experiences-library`, không `teachings/`, không `raw/`. Đưa vào là tái tạo đúng cái bộ nhớ làm con vừa viết chấm sai: nó sẽ *nhớ* chi tiết nào có thật rồi chấm bài là đầy chất riêng, trong khi người đọc trên Facebook không có bộ nhớ đó.

⚠️ **Hai thứ lọt dễ nhất KHÔNG nằm trong danh sách kho trên** — vì chúng không cần ai cố ý đưa vào, chúng **tự trôi tới** trong hội thoại:

| Lọt qua đường nào | Ví dụ |
|---|---|
| **Bản nháp đã bỏ** | *"lúc đầu tôi viết mở bài kiểu này nhưng thấy chưa ổn"* |
| **Lời kể về quá trình viết** | *"bài này tôi muốn nhấn vào chuyện thất bại"* · *"chỗ này tôi cố ý để lửng"* |

Nghe xong hai câu đó là giám khảo **biết ý đồ**, và nó sẽ chấm bài theo ý đồ chứ không theo chữ trên trang. Người đọc trên Facebook không nghe được câu nào trong hai câu đó.

🔴 **Chỉ đưa BÀI. Không đưa lý do viết thế, không đưa thứ đã bỏ đi.** Đây là toàn bộ lý do bước này tồn tại — bỏ nó thì giám khảo chỉ là con vừa viết đọc lại bài của chính nó.

📌 **Giám khảo trả về chỗ hỏng và cách sửa, KHÔNG chấm điểm.** Lý do ở `luat/hook.md` mục *"Vì sao KHÔNG chấm điểm hook bằng AI"* — điểm số do AI đặt cho bài của chính hệ thống mình là con số tự khen. Mỗi lỗi phải **trích đúng câu bị lỗi**.

Chạy ở môi trường không có Agent tool thì làm bước này thành một lượt riêng: gạt hết ngữ cảnh viết sang một bên, chỉ đọc lại đúng bài và bộ luật bốn file luật đi kèm gói in ra. Cách này **kém hơn hẳn** vì không xoá được trí nhớ — ghi rõ trong `ket-qua.md` là đã chạy bằng cách thay thế, đừng để nó trông như bản đầy đủ.

### Giới hạn cứng — 2 vòng

1. Giám khảo chỉ ra chỗ hỏng → sửa → gọi một giám khảo **mới** soi lại (không nối tiếp con cũ, nối tiếp là mất tính độc lập).
2. Còn hỏng → sửa lần hai → soi lần hai.
3. **Hết 2 vòng là dừng, kể cả còn lỗi.** Giao bài cho **người dùng** kèm ghi rõ mục nào chưa đạt và vì sao.

Không có mốc dừng thì hai con chuyền bài qua lại tới hết tiền — **mỗi vòng là tiền thật**, và bài thứ ba hiếm khi hơn bài thứ hai đủ để bù. Luật chung: *một vòng lặp giữa hai con A.I phải có điểm dừng cứng đếm được, không phải điểm dừng "khi nào đạt"*.

⚠️ **Giám khảo không phải chốt chặn cuối. Bạn mới là.** Nó cùng một model, đọc cùng bộ luật: nó gỡ được cái bẫy *"tôi vừa viết nên tôi thấy hay"*, nhưng chỗ nào model mù thì cả hai con cùng mù. **Không bao giờ ghi "đã qua giám khảo nên bài đạt".**
