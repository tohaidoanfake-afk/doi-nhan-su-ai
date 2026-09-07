# Loại `sua-kho` — SỬA hoặc XOÁ một mục đã có

> Tách khỏi `SKILL.md` ngày 2026-08-08. Luật chung (Bước 0 → Bước 5) vẫn áp đủ — đọc file này **sau** khi đã đọc `SKILL.md`, không thay cho nó.

Đề xuất có `loai: sua-kho` mang ba thông tin: **Việc cần làm** (Sửa / Xoá) · **Mục nào** · **Đổi thành gì hoặc vì sao xoá**.

**Bước bắt buộc trước khi làm gì:** tìm mục đó trong `wiki/`, **đọc nguyên văn đang có**, rồi mới đối chiếu với thứ người dùng muốn đổi. Họ nói bằng lời thường, không gõ markdown — việc dịch sang đúng khuôn của kho là của bạn.

## Khi là SỬA

- Giữ nguyên mọi thứ người dùng không nhắc tới. Sửa đúng chỗ được nêu.
- Nếu thứ người dùng muốn đổi **mâu thuẫn** với bản verbatim ở `raw/`, **dừng và hỏi** — quy tắc *bản verbatim thắng bản tóm tắt* vẫn áp.
- Ghi vào `ket-qua.md` cả **bản cũ** và **bản mới** của khối đã sửa, để đối chiếu được.

## 🔒 Trang "kết luận duy nhất" — luật riêng, thêm 2026-08-27

> Luật này do Tô Hải Đoàn chốt sau khi dồn một trang offer dài về một bản gọn: *"từ giờ tôi muốn điều này dc giữ chặt, khi tôi có thay đổi, hay bổ sung gì cũng cần làm thành một bản kết luận thôi, ko dài dòng thêm, thay gì hay bổ sung gì phải rõ."*
>
> Chốt lại lần hai sau khi dồn xong cả ba trang offer: *"chốt dùng bản này là bản duy nhất, còn lại đưa vào lịch sử hết, khi tôi sửa cái gì thì cần xác nhận là bổ sung, hay là thay thế, và ko lưu bản lịch sử chung chỗ."* — hai chữ mới so với lần chốt đầu: **XÁC NHẬN** (nói thẳng với Đoàn trong câu trả lời, không chỉ ghi âm thầm trong `log.md`) và **KHÔNG CHUNG CHỖ** (lịch sử tuyệt đối không ở lẫn trong file kết luận, dù chỉ một dòng).

Một trang mang nhãn này khi đầu trang có dòng kiểu `✅ Đây là bản kết luận duy nhất — không giữ lịch sử soạn thảo` *(ví dụ một trang offer đã dồn gọn)*, thường đi kèm một trang `<slug>-lich-su.md` chứa toàn bộ lịch sử đã dồn ra.

**Bốn việc bắt buộc khi sửa một trang loại này — khác hẳn cách sửa thường:**

1. **Sửa ĐÈ vào đúng mục đang có.** Không thêm mục mới kiểu *"§Vxx — sửa ngày Y"* chồng lên mục cũ còn nguyên. Trang chỉ giữ MỘT câu trả lời cho mỗi thứ — sửa xong thì đọc lại phải thấy đúng một câu chào, một mức giá, một cơ chế, không phải "bản cũ vs bản mới" nằm cạnh nhau.
2. **Không chua ngày tháng hay lịch sử tranh luận vào bản kết luận.** Cấm viết *"trước là X, nay là Y vì hôm Z bạn nói..."* ngay trong trang chính — đổi thì đổi thẳng câu chữ, không kể lại quá trình.
3. **XÁC NHẬN RÕ VỚI NGƯỜI DÙNG, không chỉ ghi âm thầm trong `log.md`.** Mỗi lần sửa, nói thẳng trong câu trả lời đây là **THAY** (mục nào, từ gì → thành gì) hay **BỔ SUNG** (thêm gì, đặt ở mục nào) — rồi mới ghi lại đúng như vậy vào `log.md`. Xác nhận là cho họ đọc ngay lúc đó, không phải thứ chỉ nằm trong log để tra sau.
4. **Toàn bộ lý do/lập luận/tranh luận phía sau mỗi lần sửa → dời sang `<slug>-lich-su.md`**, không ở lại trang kết luận dù chỉ một dòng. **File lịch sử luôn TÁCH RIÊNG — tuyệt đối không gộp lịch sử của nhiều offer/trang vào chung một file `-lich-su.md`.** Mỗi trang kết luận có đúng một file lịch sử của riêng nó. Nếu trang lịch sử chưa có mục cho lần sửa này, thêm vào cuối, giữ nguyên văn.

⚠️ **Vì sao luật này khác luồng XOAY ở dưới:** luồng XOAY áp khi có MỘT BẢN MỚI thay một bản cũ (bản mới đã tồn tại đâu đó, chỉ cần dời bản cũ đi). Luật này áp cho việc **sửa/bổ sung liên tục vào một trang vốn đã gọn** — không có "bản mới" độc lập nào cần đối chiếu, chỉ có một chi tiết cần đổi hoặc thêm vào bản đang có. Cùng tinh thần (kết luận sạch, lịch sử ở nơi khác), khác động tác (sửa tại chỗ, không phải xoay hai bản).

## ⚠️ Khi là XOÁ — chậm lại

Xoá là thao tác **một chiều**, và **chưa có ai duyệt luồng này lần nào**. Bốn việc bắt buộc:

1. **Hỏi lại trước khi xoá.** Không xoá ngay trong lượt đầu, kể cả khi đề xuất đã ghi rõ lý do.
2. **Chép nguyên văn mục bị xoá vào `log.md`** — đó là bản sao lưu duy nhất còn lại. *(Ngoại lệ duy nhất của luật "log ngắn" ở Bước 5: bản lưu thì phải đủ, cắt bớt là mất luôn.)*
3. **Kiểm ai đang trỏ tới nó.** Xoá một chuyện mà có trang wiki `[[link]]` trỏ tới nó thì **báo ra trước**, đừng xoá rồi mới thấy link gãy.
   Xoá xong thì chạy `/kiem-chung` — nó bắt link gãy và trang mồ côi vừa sinh ra.
4. Nếu là **hình mẫu** (một file riêng trong `wiki/models/`): xoá file thì phải bỏ luôn mọi `[[models/<tên>]]` trỏ vào nó **và** dòng của nó trong `index.md` — không thì mục lục khai một trang không tồn tại.

---

## 🔄 GHI BẢN MỚI ĐÈ BẢN CŨ — luồng XOAY, thêm 2026-08-24

> Đoàn hỏi: ***"nếu bây giờ tôi bổ sung thêm một bản mới hơn, thì luồng nó như thế nào? Cái đang là bản hiện tại có được chuyển vào lịch sử không?"***

**Trước lượt sửa này: KHÔNG có luồng nào cả.** Skill mặc định *nối thêm*, nên bản mới nằm chồng lên bản cũ và **cả hai cùng tự nhận là bản đang dùng**. Đó chính xác là cách `offer-ladder.md` phình thành **62 mục / 47.805 từ** với 4 bản "thang sản phẩm" và 3 bản "offer Creator VN" nằm cạnh nhau.

### Khi nào áp luồng này

Trang thuộc loại **một-câu-trả-lời** — offer, định vị, bảng giá, quy trình đang chạy — **và** thứ sắp ghi là **bản mới của thứ đã có**, không phải chủ đề mới. Trang kho tích luỹ (`experiences-library`, `learnings/`) thì **không** áp luồng này: ở đó thêm là thêm, không thay.

Phân biệt bằng đúng một câu hỏi: **mục mới ra đời thì mục cũ còn ĐÚNG không?**
Còn đúng → nối thêm như thường. Hết đúng → **xoay**, theo 4 bước dưới.

### 🔴 BƯỚC 0 — ĐỐI CHIẾU HAI BẢN. Không có bước này thì mọi bước sau đều sai

> Đoàn chốt 2026-08-24: ***"đừng kiểu cái bản mới mình vừa nạp thì nó auto ném luôn bản cũ đi mà không hỏi, không so sánh, không tổng hợp lại — không giữ lại những thứ cần giữ mà lại bỏ đi hết, và có thể nó sẽ bị thiếu."***

🔴 **Bản mới nạp vào KHÔNG phải là bản đang chạy.** Bản đang chạy là **kết quả của việc gộp** bản cũ với bản mới.

Ví dụ Đoàn nêu, và nó là ca thường gặp nhất:

```
bản cũ:  quy tắc 10 phần
bản mới:  quy tắc  5 phần   ← chỉ nói về 5 phần, KHÔNG nói 5 phần kia sai
                              ↓
bản đang chạy đúng = 5 phần mới  +  5 phần cũ chưa bị đụng tới
```

Ném cả bản cũ đi là **mất 5 phần**, mà mất im lặng — vài tuần sau không ai biết nó từng có.

⚠️ **Đây KHÔNG phải lo xa. Đã mắc HAI LẦN trong đúng ngày viết luật này:**

| Mất gì | Vì sao |
|---|---|
| Mục `Điểm mạnh độc đáo` *(99 từ — không ngại kể chuyện xấu hổ · không khuyên chỉ kể · thú nhận sai lầm cụ thể · luôn có bài học ngược)* | Bị xếp vào cụm *"giọng VIẾT"* rồi đẩy sang kho bản cũ, vì **giả định** trang mới đã có. Trang mới **chưa bao giờ có nó** |
| *"Chuẩn chất lượng 4K, nhịp cắt nhanh 50% video"* | Nằm lẫn trong một đoạn về nhận diện hình ảnh, bị dời theo cả cụm |

Cả hai đều **không có ai báo** — chỉ lộ ra khi Đoàn bảo rà lại. Đó là hình dạng thật của lỗi này: **không có thông báo, không có link gãy, chỉ là một thứ biến mất.**

### Bảng đối chiếu — ghi vào `ket-qua.md`, KHÔNG mục nào được bỏ trống

**Liệt kê ĐỦ mọi mục của bản cũ.** Mỗi mục nhận đúng một trong ba nhãn:

| Nhãn | Nghĩa | Bắt buộc kèm |
|---|---|---|
| 🔄 **BỊ THAY** | bản mới nói về đúng chuyện này, và nói khác | tên mục ở bản mới thay nó |
| ✅ **GIỮ** | bản mới **không đụng tới** — vẫn đúng, vẫn dùng | *(chuyển thẳng sang bản gộp)* |
| ⛔ **BỎ HẲN** | không còn đúng nữa | **lý do**, và Đoàn phải duyệt riêng |

🔴 **Mục nào không xếp được vào ba nhãn trên thì DỪNG và hỏi.** Không có nhãn thứ tư tên là *"chắc là có rồi"*.

⚡ **Và luật kiểm ngược, rẻ mà bắt được đúng lỗi trên:** mục gắn 🔄 BỊ THAY thì phải **chỉ ra được tên mục mới thay nó**. Chỉ không ra tên → nó **không bị thay**, nó chỉ đang **bị bỏ**. Hai chuyện khác nhau, và trộn hai chuyện đó là đúng cách 99 từ kia biến mất.

📌 Chỉ mục gắn 🔄 và ⛔ mới đi xuống lịch sử. Mục ✅ **ở lại bản đang chạy**.

### Bốn bước, không bỏ bước nào

**① Tìm bản đang chạy.** Dòng `✅ **ĐANG CHẠY:**` ở đầu trang trỏ vào nó. Không có dòng đó thì tìm mục tự xưng *hiện hành / mới nhất / đọc trước*, và **hỏi Đoàn xác nhận trước khi xoay** — chọn nhầm là chôn mất bản thật.

**② Rà NEO trỏ vào mục sắp dời.**
```bash
grep -rn "\[\[<slug>\]\] §" wiki/
```
🔴 **Neo bám theo slug tiêu đề, không bám vị trí — dời thì an toàn, ĐỔI TÊN thì tranh gãy IM LẶNG.** Nên khi dời: **giữ nguyên văn tiêu đề**.
🔴 **Và bản cũ vào lịch sử thì KHÔNG GÌ ĐƯỢC TRỎ VÀO NÓ NỮA** *(Đoàn chốt 2026-08-24)*. Mỗi neo trỏ vào mục sắp dời phải xử một trong hai cách: **trỏ sang mục tương ứng của bản mới**, hoặc **gỡ hẳn ô đó**. Trỏ nó sang file lịch sử là **SAI** — `/kiem-chung`.

> ⚠️ Đã mắc thật trong chính ngày viết luật này: dời bộ VPC cũ xong, bốn neo `benhCu`/`toaCu`/`khatKhaoCu`/`kichHoatCu` được **trỏ lại** sang file lịch sử thay vì gỡ. Bốn ô đó vốn sinh ra để bày bản cũ cạnh bản mới cho khỏi lẫn — **một cái nạng chống cho trang đang mập mờ**. Trang hết mập mờ thì cái nạng thành thừa, mà giữ nó thì bản cũ vẫn sống trong giao diện.

**③ Dời bản cũ.**
- Lịch sử của trang đã **> 1.000 từ** *(ngưỡng gợi ý — quá dài thì phần lịch sử nuốt mất phần đang dùng)* → cắt sang `wiki/<slug>-lich-su.md`, thêm dòng vào `index.md`, và **tuyệt đối không khai file đó vào `doc`** của tính năng nào.
- Dưới ngưỡng → để trong mục `## 🔻 LỊCH SỬ` cuối trang cho đỡ vụn.

Mục dời đi phải mang một dòng: `> 🔻 **ĐÃ NGHỈ <ngày>** — thay bởi <tên bản mới>, vì <lý do>.`

**④ Cắm BẢN GỘP + sửa đầu trang.** Thứ cắm vào là **bản gộp ở Bước 0** — mục 🔄 lấy bản mới, mục ✅ giữ nguyên bản cũ — **không phải** file mới nguyên xi. Cập nhật dòng `✅ **ĐANG CHẠY:**` ở đầu trang.

🔴 **Mỗi mục dời xuống lịch sử phải mang một dòng chỉ ra NÓ SỐNG Ở ĐÂU** *(hoặc ghi rõ "nghỉ hẳn, không có bản thay")*. Chỉ không ra chỗ sống thì nó chưa phải bản cũ — nó là thứ sắp bị mất. `/kiem-chung` kiểm đúng điều này.

### Vì sao token mới là lý do thật của bước ③

Để bản cũ trong cùng file thì nhãn 🔻 chỉ **nhờ AI tự giác bỏ qua** — mà công cụ Read nạp **cả file**.

> **TOKEN TIÊU LÚC ĐỌC, KHÔNG PHẢI LÚC DÙNG.**

Đo được 2026-08-24 sau khi tách: `mindmap` −21% · `kich-ban-ngan` −18% · `slide-bai-giang` −7%.

### Ba lưới bắt nếu quên

| Lưới | Bắt gì |
|---|---|

⚠️ Lưới là lưới, không phải hàng rào — chúng bắt **kiểu đã hỏng thật**, không bắt mọi kiểu. Trùng **Ý** mà khác **chữ** thì máy mù: hai bộ VPC của `target-customer` nằm cạnh nhau nhiều tuần vì một bên ghi `Ô 2 · PAINS`, bên kia ghi `4 Căn Bệnh Lâm Sàng`. Chỗ đó cần người đọc.
