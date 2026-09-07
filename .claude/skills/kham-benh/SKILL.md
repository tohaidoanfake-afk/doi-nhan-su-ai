---
name: kham-benh
description: Khám xem việc kinh doanh của bạn đang tắc ở khâu nào trong chín khâu, rồi kê một đơn hai ngăn — một việc bảy ngày, và một thứ chữa tận gốc. Dùng khi bạn nói "khám cho tôi", "tôi đang tắc ở đâu", "tháng này nên gỡ chỗ nào", "soi nút thắt", "chẩn đoán giúp tôi", "khám lại xem đơn cũ chạy tới đâu", "tái khám", hoặc gõ /kham-benh. Chạy 3 tháng một lần là vừa. KHÔNG dùng để phân tích một bản khám đã có sẵn — cái đó là /nap-kho.
---

# Khám nút thắt — chín khâu, một chỗ tắc

> 🧱 **Vai này chạy TRÊN một cái nền.** Nền là bộ khung `nhan-su-thu-thu` — nó dựng `wiki/` và giữ `/nap-kho`, đường ghi duy nhất vào bộ não. Chưa có nền thì bài khám vẫn chạy được, nhưng bản đề xuất không có chỗ để ghi vào.
>
> 📌 **Lệnh dài vì máy khám nằm trong gói plugin, không nằm trong thư mục bạn đang đứng.** Đường dẫn tính từ gốc kho — gõ từ đúng thư mục bạn vừa clone. Câu trả lời của bạn thì ghi vào **kho của bạn** (`kham-ra/phien/`), không ghi vào thư mục skill: `git pull` thay file skill mỗi lần cập nhật.

## Việc này khác việc hỏi lời khuyên ở đâu

Hỏi lời khuyên thì nhận về một danh sách. Khám thì nhận về **đúng một khâu**, vì luật của bộ máy này là *ba nút thắt là không có nút thắt nào*.

Buổi khám đi qua các chặng của một buổi khám thật: tiếp nhận → hỏi bệnh → khám và đếm số → đào sâu → kê đơn. Khoảng 22 ô nếu là lượt đầu.

## ⛔ Luật sắt: KHÔNG tự nghĩ ra câu hỏi

Đừng đọc bảng khám rồi tự hỏi theo trí nhớ. Làm thế là bỏ ô, nhảy cóc, rồi tự chấm màu bằng cảm giác — đúng ba chỗ máy sinh ra để chặn.

Vị trí trong bài khám **không nằm trong đầu bạn, nó nằm trong file**:

```bash
node ".claude/skills/kham-benh/bo-kham/kham.mjs" o <phiên>
```

Máy nhả ra **đúng một ô** mỗi lượt. Bạn không biết câu kế tiếp cho tới khi ghi xong câu đang hỏi. Đó là chốt chặn, đừng đi vòng.

## Vòng lặp

**1. Mở phiên** *(chỉ lần đầu)*

```bash
node ".claude/skills/kham-benh/bo-kham/kham.mjs" moi
```

Phiên lưu thành file, bỏ dở giữa chừng vẫn mở lại hỏi tiếp được.

**2. Đọc ô máy vừa nhả** — câu hỏi, dòng phụ, danh sách đáp án đã đánh số.

**3. Hỏi người dùng — MỘT ô, một tin nhắn.** Chép câu hỏi cho đúng ý, đánh số đáp án y như máy in ra. Được nói lại cho tự nhiên hơn, **không được** đổi nghĩa, thêm đáp án, hay gộp hai ô vào một tin.

**4. Hỏi lại nếu câu trả lời mơ hồ.** Ô kể-bằng-lời mà nhận được câu cụt (*"tại tôi lười"*, *"không có thời gian"*) thì hỏi thêm **đúng một lần**: *"kể nghe một lần gần nhất xem"*. Ô bấm chọn thì không hỏi lại.

**5. Ghi vào máy**

```bash
node ".claude/skills/kham-benh/bo-kham/kham.mjs" dap <phiên> 3                  # ô bấm chọn — ghi số thứ tự
node ".claude/skills/kham-benh/bo-kham/kham.mjs" dap <phiên> 3,6                # ô chọn nhiều
node ".claude/skills/kham-benh/bo-kham/kham.mjs" dap <phiên> 12                 # ô đếm số
node ".claude/skills/kham-benh/bo-kham/kham.mjs" dap <phiên> "kể nguyên văn…"   # ô kể bằng lời
node ".claude/skills/kham-benh/bo-kham/kham.mjs" bo  <phiên>                    # bí, bỏ qua
node ".claude/skills/kham-benh/bo-kham/kham.mjs" lui <phiên>                    # sửa câu vừa rồi
```

Ô kể bằng lời thì ghi **nguyên văn lời họ**, đừng viết lại cho hay. Bước phân tích cần giọng thật.

## Bốn chỗ CẤM

**① Cấm tự chấm màu.** Đáp án đã mang sẵn màu trong bảng khám. Việc của bạn là ghi số họ chọn, hết.

**② Cấm tự gọi tên nút thắt.** Sau 11 câu sàng, máy tự in bảng chín khâu, chiều quét, và khâu nào bị loại vì *đói nguyên liệu*. **Đọc bảng đó ra, đừng tự suy.** Bẫy kinh điển là chọn khâu điểm thấp nhất — sai, vì luật quét là từ tầng cuối ngược về đầu, và khâu đỏ mà khâu ngay trên nó cũng đỏ thì bị loại: cái tắc đó là hệ quả, không phải bệnh.

```bash
node ".claude/skills/kham-benh/bo-kham/kham.mjs" quet <phiên>
```

**③ Cấm đoán đường lấy số.** Ở tiếp nhận có ba câu **bản kê công cụ** (bán ở đâu, giữ liên lạc bằng gì, ghi khách và tiền vào đâu). Ba câu đó quyết định câu xét nghiệm hỏi thế nào, nên hỏi cho xong trước khi vào phần sàng.

**④ Cấm bỏ tầng xét nghiệm.** Tới ô đếm số, **bắt họ mở trang, mở inbox, mở sổ ra đếm thật**, chờ đếm xong. Đừng nhận số ước. Bảng LỆCH — *tự khai 🟢 mà đếm ra 🔴* — là bằng chứng thuyết phục nhất của cả buổi. Đếm không được thì `bo`, bản khám sẽ tự ghi là thiếu.

## Khám xong thì làm gì

```bash
node ".claude/skills/kham-benh/bo-kham/kham.mjs" quet <phiên>    # đọc lại toàn bộ tín hiệu
node ".claude/skills/kham-benh/bo-kham/kham.mjs" soan <phiên>    # sinh kham-ra/<…>/de-xuat.md
```

Rồi **đọc `.claude/skills/kham-benh/bo-kham/luat-ke-don.md` TRỌN VẸN** và kê đơn theo đúng luật trong đó. Đọc kèm các trang bản khám tự liệt kê ở dòng *"Trang wiki bắt buộc đọc"*.

Đơn có **tám ô**, mỗi ô phải có nguồn, không ô nào được bịa. Hai luật dễ phá nhất:

- **Luôn kê cả hai ngăn.** Ngăn 🩹 giảm đau là một việc bảy ngày, dựng từ thứ họ **đã có**. Ngăn 🌱 tận gốc chữa con người.
- **Ngăn tận gốc rẽ theo NGUYÊN NHÂN, không rẽ theo khâu.** Người *chưa biết cách* mà kê môi trường thì dậy sớm ba mươi buổi vẫn không tự biết cách làm. Máy đã tách sẵn hai nhánh ở phần test chức năng.

Xong thì đưa đơn cho họ đọc, rồi mời lưu vào bộ não:

```
/nap-kho
```

Nói rõ là lưu bản khám và đơn vào `wiki/nut-that.md`, ghi thêm mục mới chứ **không đè lượt cũ** — để về sau nhìn thấy nút thắt di chuyển qua các giai đoạn.

## Mục "Máy đọc" — đọc cho đúng vai

Máy xếp sẵn: giờ đang chảy vào đâu so với khâu tắc · nguyên nhân nghi A hay B · bảng LỆCH · bệnh nền · red flag. Ba điều phải nhớ:

- Đây là **tín hiệu, không phải kết luận**. Nguyên nhân có dấu `?` nghĩa là máy mới *nghi*.
- Máy quét ra khâu nào cũng **không phải chốt cuối**. Được phép chốt khác sau khi đọc vòng đào sâu, nhưng phải nói rõ vì sao khác.
- Gặp **🚨 cấp cứu** (doanh thu 0 và tiền dưới 3 tháng) thì máy tự bỏ xét nghiệm và test chức năng. Đừng cố hỏi thêm cho đủ bài: người đang chảy máu thì cầm máu trước.

## Ba tháng một lần, không phải một lần

Khám một lần chỉ nói được một câu. Khám bốn lần trong mười hai tháng thì thành **đường tiến của từng khâu, đo được** — đó mới là chỗ bộ máy này đáng tiền. Lượt sau máy tự hỏi tái khám và tách ba lý do chưa đỡ: **chưa làm** · **làm rồi mà không ăn thua** · **chẩn nhầm từ đầu**. Ba thứ đó chữa khác hẳn nhau.
