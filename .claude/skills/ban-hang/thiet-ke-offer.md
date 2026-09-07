# `thiet-ke-offer` — dựng một offer bán được

> Đọc file này **sau** `SKILL.md`, không thay cho nó. Chạy khi người dùng nói *"bán cái này thế nào"*, *"chưa gói được thành thứ có tên có giá"*, *"offer của tôi yếu"*.
>
> Khung gốc là 12 bước của **$100M Offers (Alex Hormozi)**. Phần đáng giá nhất trong file này không phải 12 bước — nó là **sáu lỗi ở cuối trang**, rút từ một phiên sửa offer thật phải làm lại **14 lần**.

## Luật lõi — thuộc trước khi chạy bước nào

**Offer ≠ sản phẩm.** Sản phẩm là thứ bạn tạo ra; offer là **lý do người ta mua**. Offer yếu → khách hỏi giá rồi im. Offer mạnh → khách hỏi cách thanh toán.

**Phương trình giá trị** — thước đo duy nhất:

```
              Kết quả trong mơ  ×  Độ tin
   Value = ─────────────────────────────────
              Thời gian chờ  ×  Công sức bỏ ra
```

Tăng tử số, giảm mẫu số. **Mọi bước bên dưới chỉ đang phục vụ một trong bốn ô này** — bước nào không nói được nó đang kéo ô nào thì bước đó thừa.

**Thứ tự bắt buộc, không đảo:**

```
Thị trường → Khách → Kết quả → Phương trình giá trị
   → Thành phần offer → Giá → Cam kết → Lý do gấp → Tên
```

🚫 **Đảo thứ tự là lỗi phổ biến nhất:** đặt tên và định giá trước, rồi cố nhét kết quả vào sau. Ra một cái tên hay cho một thứ chưa ai biết nó làm được gì.

---

## 12 bước

| # | Bước | Đầu ra một dòng |
|---|---|---|
| 1 | **Thị trường** | Đang bán cho thị trường nào — đọc `wiki/target-customer.md`, **đối chiếu chứ không chọn lại** |
| 2 | **Avatar một câu** | Một người cụ thể, không phải một tập |
| 3 | **Một kết quả hạt nhân** | Đo được. *"Tự tin hơn"* không phải kết quả |
| 4 | **Đau · Khát khao · Lời từ chối** | Nguyên văn lời khách, không diễn giải |
| 5 | **Hành trình A → B** | Họ đang ở đâu, sẽ tới đâu, qua mấy chặng |
| 6 | **Cơ chế riêng** | Tên cơ chế + vì sao khó so sánh với người khác |
| 7 | **Tối ưu phương trình giá trị** | Bốn ô, mỗi ô kéo bằng cách gì |
| 8 | **Lời từ chối → thành phần offer** | Mỗi lời từ chối phải có một thành phần xử nó |
| 9 | **Các tầng offer** | Lõi · Hỗ trợ · Giữ nhịp · Tài sản |
| 10 | **Quà kèm** | Mỗi món kèm **lý do tồn tại** |
| 11 | **Cam kết hoàn tiền** | Loại · điều kiện · cách đòi |
| 12 | **Giá · Lý do gấp · Khan hiếm · Tên** | Giá kèm lý do theo phương trình giá trị |

⚠️ **Bước 12 — không bịa lý do gấp.** Chưa có hạn chót thật thì ghi `[cần bổ sung: hạn chót thật]`. Hạn chót duy nhất luôn dùng được là **bậc thang giá theo số người** — vì nó kiểm chứng được. Bịa lý do gấp phá đúng thứ đang xây.

⚠️ **Bước 11 — cam kết không được gỡ bộ lọc.** Điều kiện vào nghiêm vừa là rào cản vừa là **bộ lọc chất lượng**. Cam kết nào làm cửa vào dễ hơn thì phải nói thẳng nó đang đánh đổi cái gì.

---

## Khuôn đầu ra — 12 mục, đủ cả 12

1. **Câu một dòng** — Tôi giúp *[avatar]* đạt *[kết quả đo được]* trong *[thời gian]*, ngay cả khi *[rào cản lớn nhất]*
2. **Cơ chế riêng** — tên + vì sao khó so sánh
3. **Kết quả & chỉ số** — chính · phụ · mốc thắng sớm
4. **Các tầng offer**
5. **Quà kèm** — kèm lý do tồn tại từng món
6. **Cam kết hoàn tiền**
7. **Bản đồ lời từ chối** — 3 cột: *họ nói gì · thực ra lo gì · thành phần nào xử*
8. **Giá** — kèm lý do theo phương trình giá trị
9. **Lý do gấp / khan hiếm** — hoặc `[cần bổ sung]`
10. **Đặt tên** — 3–5 phương án
11. **Lời chào bán** — 5–7 câu
12. **Câu chào hai dòng** — dòng 1 `[mệnh lệnh] + [kết quả]` · dòng 2 `[mệnh lệnh] + [cơ chế] + [kết quả cuối]`

Mục nào chưa đủ dữ liệu thì ghi `[cần bổ sung: ...]`, **đừng lấp bằng phỏng đoán** — một offer có mục bịa thì chỗ bịa đó là chỗ khách hỏi tới.

---

## 🔴 Sáu lỗi A.I lặp lại khi sửa offer — đọc trước khi gõ chữ nào

> Rút từ **một phiên sửa duy nhất phải làm lại 14 lần**. Cả 14 lần đều rơi vào đúng sáu nhóm dưới đây. Đây **không phải lỗi câu chữ, là lỗi cách nghĩ** — không đọc trước thì sẽ lặp lại đủ sáu.

### 1 · Ngôn ngữ nội bộ lọt ra trang bán — *5/14 lần, nhóm nặng nhất*

Tên gọi trong đầu người bán không phải tên gọi trong đầu người mua. *"Môi trường chuyển giao"*, *"tầng dữ liệu"*, *"nhân sự A.I"* — người bán hiểu ngay, khách đọc xong không biết mình sắp mua gì.

**Phép thử:** đưa câu đó cho một người ngoài ngành. Họ phải hỏi lại *"nghĩa là sao"* thì câu đó chưa dùng được.

### 2 · Hiểu sai bản chất thứ đang bán — *3/14*

Nhầm **tính năng** với **thứ đang bán**, hoặc nhầm **lộ trình dài** với **cam kết**. Bán một hệ thống mà mô tả như bán một khoá học, hoặc hứa 12 tháng trong khi cam kết thật là 30 ngày.

**Phép thử:** hỏi lại người dùng *"thứ khách trả tiền để có là gì"* — rồi so với thứ mình vừa viết.

### 3 · Tự dựng rào cản người dùng không đặt — *2/14*

A.I hay thêm điều kiện nghe cho chặt chẽ: *"cần bỏ ra 5 giờ mỗi tuần"*, *"phải qua phỏng vấn"*. Nhưng có người chỉ muốn lấy phần công cụ và tự chạy — dựng rào là **đuổi họ đi thay mặt người bán**.

🚫 **Điều kiện chỉ được có khi người dùng nói ra.** Nghĩ nó hợp lý không đủ.

### 4 · Thêm khối mới mà không soi khối cũ — *1/14, nhưng hỏng nặng nhất*

Thêm một khối *"ba bậc leo thang"* trong khi trang đã có khối *"vấn đề — nguyên nhân — cơ chế"* nói cùng một chuyện. Trang dài ra, và **hai khối cùng giành quyền giải thích** — người đọc không biết tin cái nào.

**Trước khi thêm bất kỳ khối nào: đọc hết những khối đang có, hỏi nó có trùng vai với khối nào không.** Trùng thì **nâng cấp khối cũ**, đừng thêm khối mới.

### 5 · Sửa ngay thay vì phác thảo trước — *1/14*

Được nhờ *"soi lại trang bán"* thì A.I bắt đầu sửa câu chữ luôn. Đúng ra: **phác cấu trúc trước** — trang này gồm mấy khối, khối nào giữ, khối nào bỏ, khối nào thiếu — cho người dùng duyệt, **rồi mới viết**.

Sửa ngay là sửa một trang có cấu trúc sai, và mọi câu chữ hay đều đổ đi khi cấu trúc đổi.

### 6 · Xác nhận bằng công cụ của A.I, không bằng mắt người dùng — *2/14*

A.I sửa xong rồi tự đọc lại file và báo *"đã đúng"*. Nhưng người dùng nhìn trang bằng **đường người đọc đi**: mở trình duyệt, cuộn từ trên xuống, đọc trên điện thoại.

**Xác nhận phải mô tả thứ người dùng sẽ thấy**, không phải thứ A.I vừa ghi được.

---

## Ghi vào đâu

Bản thiết kế offer ghi vào trang của **chính offer đó** — `wiki/offer-<tên>.md`. Chưa có trang thì tạo mới, rồi **thêm một dòng vào `wiki/offer-ladder.md`** để thang biết bậc mới tồn tại; không thì nó thành trang mồ côi.

🚫 **Đừng ghi bản thiết kế vào `offer-ladder.md`.** Trang thang chỉ giữ **thang** — bậc nào, ai đi bậc nào, bảng tóm tắt. Nhét cơ chế của từng offer vào đó là vài tháng sau không ai đọc nổi nó nữa.

⚠️ **Chạy lần hai thì THAY, không thêm bản thứ hai.** Một trang chỉ giữ **một** offer đang chạy. Bản cũ chuyển xuống mục `## 🔻 LỊCH SỬ` kèm dòng chỉ sang bản mới. Hai bản cùng xưng là bản chính thì người đọc sau không biết tin chỗ nào — và người đọc sau thường là chính bạn, ba tháng nữa.

📌 Đường ghi vào kho vẫn là `/nap-kho`, không có ngoại lệ.
