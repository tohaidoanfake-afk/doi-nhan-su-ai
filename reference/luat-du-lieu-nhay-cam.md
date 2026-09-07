# Luật dữ liệu nhạy cảm — đọc TRƯỚC khi nạp khách hàng

> Bộ não thứ 2 sắp chứa **tên khách hàng thật, số tiền thật, chuyện riêng của người khác**. Đọc trang này một lần, mất 3 phút, rồi làm theo suốt.

---

## Ba chỗ dữ liệu của bạn đi qua

1. **Máy của bạn** — file `.md` nằm thẳng trên ổ cứng, không mã hoá. Ai mở được máy là đọc được.
2. **Nhà cung cấp AI** — mỗi lần AI đọc bộ não để làm việc, phần nội dung liên quan được gửi đi để xử lý.
3. **Bất kỳ chỗ nào bạn đồng bộ** — iCloud, Google Drive, Dropbox, Git.

Không có chỗ nào trong ba chỗ trên là "riêng tư tuyệt đối". Nên nguyên tắc là: **nạp đủ để dùng được, không nạp nhiều hơn thế.**

---

## Nạp gì / không nạp gì

| ✅ Nên nạp | ❌ Không nạp |
|---|---|
| Tên gọi (tên riêng hoặc biệt danh) | Số CMND/CCCD, hộ chiếu |
| Tình trạng: mới quan tâm / đang trao đổi / đã mua / đã dừng | Số tài khoản ngân hàng, số thẻ |
| Nỗi đau, mong muốn họ đã nói ra | Mật khẩu, mã OTP, khoá API |
| Kết quả họ đạt được (có con số) | Địa chỉ nhà đầy đủ |
| Ghi chú công việc: đã trao đổi gì, hẹn gì | Bệnh án, chuyện gia đình họ kể riêng, chuyện pháp lý |
| Số tiền đã giao dịch với bạn | Ảnh chụp giấy tờ tuỳ thân |

**Quy tắc một câu:** nạp thứ giúp bạn **phục vụ họ tốt hơn**. Không nạp thứ chỉ khiến bạn **biết nhiều hơn về họ**.

---

## Ba luật bắt buộc

### 1. Bí danh cho người nhạy cảm

Khách VIP, người có tiếng, hoặc bất kỳ ai bạn thấy ngại nếu lộ — dùng **bí danh cố định**, không dùng tên thật:

```
[Khách A — ngách tài chính]     ← dùng nhất quán, đừng đổi giữa chừng
[Học viên B — chủ DN sản xuất]
```

Bảng đối chiếu bí danh ↔ tên thật để **ngoài bộ não** (sổ tay riêng, ghi chú khoá). Bộ não chỉ biết bí danh.

### 2. Chuyện của người khác cần được phép

Khách kể cho bạn nghe chuyện của họ **không có nghĩa là bạn được kể lại**. Trước khi đưa một câu chuyện khách vào trang có thể dùng làm content (`customer-wins`, `experiences-library`):

- [ ] Đã hỏi và họ **đồng ý** → ghi rõ trong file: `✅ đã xin phép dùng công khai — [ngày]`
- [ ] Chưa hỏi → ghi rõ: `⚠️ CHƯA XIN PHÉP — không đưa ra ngoài`

Không có dòng đánh dấu = mặc định **không được dùng công khai**.

### 3. Hard don't cho AI

Chép nguyên ba dòng này vào `wiki/ai-operating-preferences.md` mục Hard Don'ts:

```
1. Không bao giờ đưa tên thật, số điện thoại, doanh thu, hay chuyện riêng
   của khách hàng vào bất kỳ nội dung công khai nào. Bắt buộc dùng bí danh.
2. Không bao giờ xoá một dòng dữ liệu khách hàng. Chỉ đổi trạng thái
   sang "đã dừng" để lọc.
3. Không bao giờ tự bịa số liệu, tên khách, hay kết quả. Thiếu thì để
   [ngoặc vuông] hoặc dừng lại hỏi.
```

---

## Nếu bộ não đồng bộ lên mây hoặc lên Git

- Thêm `customers.md` và mọi file chứa dữ liệu khách vào `.gitignore` **trước lần commit đầu tiên**. Đã trót đẩy lên rồi thì xoá file **không đủ** — lịch sử vẫn còn.
- Thư mục đồng bộ dùng chung với người khác (Drive chia sẻ, máy công ty) → **đừng để bộ não ở đó**.

---

## Khi khách yêu cầu xoá dữ liệu của họ

Họ có quyền đó. Làm ba việc:

1. Xoá phần dữ liệu cá nhân của họ khỏi `wiki/` và `raw/`.
2. Ghi một dòng vào `log.md`: `[ngày] Xoá dữ liệu theo yêu cầu của [bí danh]` — ghi việc đã xoá, **không ghi lại nội dung vừa xoá**.
3. Nếu đã đồng bộ lên mây, xoá cả bản trên đó.

---

## Một câu để nhớ

> Bộ não thứ 2 làm bạn nhớ được nhiều hơn. Nó cũng làm một lần rò rỉ trở nên đắt hơn nhiều — vì mọi thứ nằm gọn một chỗ, sắp xếp sẵn, dễ đọc.
>
> Đó vốn là điểm mạnh của nó. Chỉ cần nhớ rằng điểm mạnh đó **không phân biệt ai đang đọc**.
