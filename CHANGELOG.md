# Lịch sử phiên bản

Bộ khung này còn tiến hoá. Trang này ghi cái gì đổi và **vì sao** — để bạn biết bản mới có đáng `git pull` không.

---

## v3.7 — 2026-09-07

**Bốn con số tự cãi nhau, và một bài test không bao giờ đạt được điểm tối đa.**

Không thêm tính năng nào. Bản này chỉ sửa những chỗ bộ khung nói hai điều khác nhau về cùng một thứ — kiểu hỏng không làm gì gãy, chỉ làm người đọc tin nhầm rồi đi sai.

- 🔴 **`/kiem-chung`: chỉ cài nền thì không ai đạt nổi 5/5.** Câu 5 hỏi giọng văn, mà `voice-profile` là kho của **vai Content** — nền cố ý không dựng. File có ghi *"chưa dựng thì bỏ qua câu này"*, nhưng bảng chấm ngay dưới lại chỉ cho một đường đạt duy nhất là **5/5**, còn 4 câu đúng thì rơi vào ô *"3–4/5 — thiếu nội dung, chạy lại từ đầu"*. Người mới cài nền làm đúng hết vẫn bị bảo là chưa đạt, và cách "chữa" hiển nhiên nhất là **dựng đại một `voice-profile` từ hỏi suông** — đúng thứ vai Content cấm, vì bản đó là giọng người ta *nghĩ* mình có, không phải giọng họ *thật sự* viết.
  - Bảng chấm nay tính theo **số câu có chạy**: 5/5, hoặc 4/4 khi bỏ qua Câu 5.
  - Thêm cảnh báo cấm dựng tạm `voice-profile` để cho qua bài test.
  - Bảng *"trượt câu nào sửa trang nào"* từng trỏ người mới cài nền sang `customers.md` và `experiences-library.md` — hai trang **của vai khác**, họ không có. Nay ghi rõ trang nào có sẵn ở nền, trang nào chỉ có khi đã cài vai.

- **`/onboard` mô tả sai số trang chính nó dựng.** Frontmatter ghi *"dựng đúng **10** trang nền"*; thân skill, `CLAUDE.md`, `README.md` và checklist đều ghi **11**. Mô tả là thứ AI đọc để quyết định cách chạy, nên đây không phải lỗi chính tả.

- **`README.md` tự mâu thuẫn hai chỗ:** trỏ *"lộ trình **8** việc"* sang một file có **7** việc *(và chính README ở dòng dưới ghi đúng là 7)*; và mô tả `templates/` là *"khung **10** trang nền"* trong khi thư mục có **13** khuôn — 11 cái `/onboard` dựng, cộng `positioning` và `brand-guide` do `/phong-van-dinh-vi` dựng.

---

## v3.6 — 2026-09-07

**Thêm lệnh thứ tư: `/phong-van-dinh-vi` — buổi phỏng vấn định vị 7 chặng.**

- **Vì sao nó ở nền chứ không ở một vai:** bảy chặng đẻ ra đầu ra đi vào **bảy chỗ thuộc bốn vai khác nhau** — `positioning` *(Bán hàng)* · `brand-guide` *(Thiết kế)* · `models/` và `video-production-setup` *(Content)* · `systems-and-stack` *(nền)*. Không vai nào sở hữu nó. Nó cùng loại với `/onboard`: một **buổi phỏng vấn dựng nền**, chạy một lần, nhiều vai đọc sau.

- **Nền nay dựng 13 trang**, thêm `positioning` và `brand-guide` — hai khuôn chuyển về từ vai Bán hàng và vai Thiết kế. Vai nào chạy phỏng vấn thì vai đó sở hữu trang đầu ra; để khuôn ở hai nơi là hai bản rồi lệch.

- **Viết mới, không chép.** Bản gốc chỉ là con trỏ sang `wiki/brand-positioning-protocol.md` 211 dòng. Nay bảy chặng tự chứa, cộng bốn chỗ siết chặt hơn bản khoá gốc:
  - **Từ khoá là MỘT TỪ, không phải một cụm.** Cụm nghe đầy đủ hơn nhưng **không ai nhớ nổi** — mà cả buổi này tồn tại để có thứ người khác nhớ được.
  - **Bộ 12 nguyên mẫu là của Mark & Pearson (2001), KHÔNG phải Carl Jung.** Rất nhiều tài liệu chép sai chỗ này.
  - **Phép thử 3 câu là phép thử của TỪ KHOÁ, không phải của offer.** Đã chấm nhầm một lần: ô *"có bằng chứng thật không"* bị chấm đỏ bằng bằng chứng của offer. Sai thước — rồi đi tìm lại một từ khoá vốn đã đúng.
  - **Kết buổi bằng HẠN CHÓT, không kết bằng bảng đã điền đủ.** Bảng đủ mà không ai làm gì với nó thì sáu tháng sau vẫn y nguyên.

- **Màu và font đi về `systems-and-stack`, không về `brand-guide`** — cố ý tách, vì mọi vai sản xuất đều tra màu/font, để hai chỗ là hai nguồn sự thật.

- Vai Bán hàng đổi theo: `positioning` **không còn là việc của nó**. Lớp 1 nay trỏ sang `/phong-van-dinh-vi`, kèm câu nói thẳng — *"chạy nó trước, nó hỏi đúng bảy chặng và ra câu định vị tử tế hơn tôi hỏi vội ở đây."*

---

## v3.5 — 2026-09-07

**Thêm `/nap-kho` luồng SỬA KHO — lấp chỗ hở lớn nhất của bản phát.**

- 🔴 **Người nhận ghi được vào bộ não nhưng không sửa được.** Luật sắt cấm sửa tay file `.md`, mà bản phát chỉ có `/nap-kho` để **ghi thêm** và `/kiem-chung` để **soi** — không có đường nào chữa một trang đã sai.

  Gặp trang sai thì họ chỉ còn hai lựa chọn, cả hai đều hỏng: **sửa tay** *(phá luật, mất soi trùng, mất `log.md`)* hoặc **để nguyên cái sai** *(bộ não tích mâu thuẫn cho tới lúc không ai tin nó nữa)*. `sua-kho.md` là đường thứ ba.

- **Ba luồng, và chọn nhầm luồng là hỏng:** SỬA *(giữ nguyên mọi thứ họ không nhắc tới)* · XOÁ *(kiểm ai đang trỏ tới nó trước khi xoá)* · **XOAY** *(có bản mới hơn)*.

  🔴 **XOAY là chỗ dễ mất dữ liệu nhất.** Bản mới thường chỉ đụng vài mục của bản cũ; ném cả bản cũ đi là mất những mục **không ai định thay**. Nên Bước 0 bắt lập bảng đối chiếu và gán nhãn từng mục — 🔄 bị thay *(phải nêu tên mục thay nó)* · ✅ giữ · ⛔ bỏ hẳn *(phải nêu lý do)*. **Bản đúng là bản GỘP**, không phải bản mới chép đè.

- Thêm luật **trang "kết luận duy nhất"**: trang chỉ giữ MỘT câu trả lời cho mỗi thứ, lịch sử tách hẳn sang `<slug>-lich-su.md`, và mỗi lần sửa phải **xác nhận rõ với người dùng** đây là THAY hay BỔ SUNG — không chỉ ghi âm thầm trong `log.md`.

- Gỡ mọi tham chiếu tới kit Owner OS trong file gốc: `owner-os/runs/`, `os-map.json`, bốn phép kiểm của `kiem.mjs` — thay bằng `/kiem-chung` và `index.md`, những thứ người nhận thật sự có.

---

## v3.4 — 2026-09-07

**Đổi tên kho: `second-brain-file-ai` → `nhan-su-thu-thu`.**

- Tên cũ mô tả **định dạng file**; tên mới mô tả **việc nó làm**, và xếp cùng hàng với các vai còn lại trong đội nhân sự A.I. Cả bốn kho nay đọc thành một bộ:

  | Vai | Kho |
  |---|---|
  | 🧑‍🏫 Thủ thư *(nền, cài đầu tiên)* | `creator-ceo/nhan-su-thu-thu` |
  | ✍️ Content | `creator-ceo/nhan-su-content` |
  | 🎛️ Điều phối | `creator-ceo/nhan-su-dieu-phoi` |
  | 💰 Bán hàng | `creator-ceo/nhan-su-ban-hang` |

- ⚠️ **Đã clone trước ngày này thì không gãy** — GitHub tự chuyển hướng link cũ. Nhưng đổi remote cho gọn:
  ```bash
  git remote set-url origin https://github.com/creator-ceo/nhan-su-thu-thu.git
  ```

- Sửa **10 file** đang trỏ tên cũ: lệnh `git clone`, lệnh `cd`, tên thư mục sau khi giải nén, đường dẫn ví dụ trong hướng dẫn cài đặt Windows/Obsidian, và cả `description` của một skill bên gói Điều phối.

- README mở đầu bằng **vai Thủ thư làm gì** thay vì tên định dạng, và bảng *Cài thêm vai* nay kể đủ sáu vai kèm kho thật của từng vai — vai nào chưa có kho thì ghi ⬜ thay vì để trống.

---

## v3.3 — 2026-09-07

**`expertise` về nền (11 trang), và bộ số liệu chuẩn tách ra thành trang riêng của vai Content.**

- **`expertise` quay lại nền.** v3.1 đẩy nó ra vì *"không vai nào đọc"* — nhưng nó là **chân dung**, cùng loại với `about-me`, và dựng được ngay từ câu 21 của phỏng vấn (*"3 lĩnh vực bạn giỏi đến mức người ta trả tiền để nghe"*). Nền nay dựng **11 trang**.

- **Tách bộ số liệu chuẩn ra khỏi `expertise`.** Trang `expertise` trong kho thật của Đoàn dài **154 dòng**, mà **chỉ 20 dòng đầu** là ba lĩnh vực chuyên môn. 130 dòng còn lại là một thứ khác hẳn: danh sách con số được phép nói ra, bốn luật chống thổi phồng, và bốn sự cố có thật.

  Hai thứ này **đổi theo nhịp khác nhau** — ba lĩnh vực gần như không đổi, còn bộ số liệu dày lên mỗi lần có sự cố. Và trộn chung thì cái tên `expertise` **che mất phần quan trọng hơn**: 85% nội dung không phải expertise.

  Nay bộ số liệu là `so-lieu-chuan.md`, thuộc **vai Content** *(khuôn ở đó, không ở nền)* — vì nó dựng được từ chính thứ vai Content đã hỏi: bài đã đăng, kết quả khách, lời chứng thực.

- 🔴 **Vì sao phải tách: một chỗ hỏng im lặng đo được trong kho thật.** `/viet-content` của Đoàn đọc ~20 trang, **`expertise` không nằm trong đó**; Owner OS thì chỉ **1 trên 37** tính năng khai đọc nó. Luật vẫn tới được người viết — nhưng bằng **sáu bản sao** rải ở các trang khác.

  Và bản sao thì lệch: ngày 20/08 hai luật mới được thêm vào nguồn, lan sang 3 trang — **trang duy nhất `/viet-content` đọc (`experiences-library`) là trang bị sót**, và nó vẫn nhắc con số mà luật mới sinh ra để gắn nhãn. Không có gì báo. Cùng đúng kiểu hỏng đã ghi ở v3.1: hai bản của một luật, không có gì buộc chúng khớp.

- **Vai Content nay đọc `so-lieu-chuan` ở Bước 3 — bắt buộc, không ngoại lệ**, kèm bảng **ba kiểu dùng sai xếp theo độ khó bắt**: bịa số *(luật cũ bắt được)* · **số thật sai chủ** *(không phép kiểm nào bắt được — nó có thật, đọc trôi chảy, có nguồn)* · **tiếng vọng của chính kho** *(người dùng nhắc lại con số mà nguồn gốc chính là kho này, và tiếng vọng hay tam sao)*. Phép kiểm rẻ nhất: `grep` con số trước khi ghi, và **bản trong kho thắng**.

- **`khuon-cua-vai/chua-co-vai/` biến mất** — không còn khuôn nào vô chủ.

---

## v3.2 — 2026-09-07

**Sửa một chỗ xếp sai của v3.1, và bổ sung `people/` vào `/nap-kho`.**

- 🔴 **Trả `learnings/` `projects/` `people/` về nền.** v3.1 đẩy chúng ra `khuon-cua-vai/chua-co-vai/` dựa trên phép đo *"không vai nào đọc"*. **Phép đo đó hỏi sai câu** — nó hỏi *vai nào ĐỌC* mà không hỏi *skill nào GHI*. `/nap-kho`, skill của chính nền, đã ghi vào `learnings/` và `projects/` từ trước.

  Chúng không thuộc vai nào vì chúng **thuộc về nền**, cùng lý do `about-me` thuộc nền dù không skill nào đọc: đó là phần làm nó thành *bộ não* chứ không phải bộ công cụ. Bằng chứng mạnh nhất là dung lượng kho thật: `people/` 17 file *(lớn nhất 619 dòng)* · `projects/` 14 file *(1.507 dòng)* · `learnings/` 12 file — **lớn hơn hẳn 10 trang nền**. Phép đo cũ bỏ lọt đúng phần lớn nhất của bộ não.

- **`/nap-kho` thiếu hẳn `people/` trong bảng phân loại.** Người dùng kể chuyện về một người thì skill không biết bỏ đâu — nó sẽ nhét vào `experiences-library` hoặc `learnings/`, và trang về người đó không bao giờ ra đời. Nay có dòng riêng, kèm hai luật:
  - ⚡ **`people/` là nhật ký quan hệ, không phải danh bạ.** Mỗi lần gặp lại là một mục `### <ngày>` **nối thêm**, kèm đường dẫn về `raw/`. Viết đè là mất đúng thứ làm trang này đáng giá — nhìn được cả đường đi của một mối quan hệ.
  - ⚠️ Trang về người thật → đọc `reference/luat-du-lieu-nhay-cam.md` trước.

- **Bảng phân loại của `/nap-kho` thêm cột *Khuôn của ai*,** và một luật mới cho ca đích đến thuộc vai chưa cài: **vẫn ghi** — đây là đường ghi duy nhất, từ chối là mất luôn nguyên liệu — nhưng nói ra một dòng rằng trang này của vai nào và cài vai đó thì nó dựng đúng khuôn.

  🚫 **Ngoại lệ đúng một trang: `voice-profile.md` thì KHÔNG tự dựng.** Nó phải rút từ 5–10 bài đã đăng thật; dựng từ một câu nhận xét thoáng qua là đẻ ra hồ sơ giọng sai, rồi **mọi bài viết sau đó sai theo mà không ai biết vì sao**.

- **Vẫn không tạo thư mục rỗng.** Ba thư mục trên mọc lên khi `/nap-kho` ghi file đầu tiên. Một thư mục rỗng không nói được gì hơn một dòng trong `index.md`, mà `index.md` thì nói được cả chủ của nó.

- `khuon-cua-vai/chua-co-vai/` còn đúng `expertise` — không vai nào đọc, không skill nào ghi.

---

## v3.1 — 2026-09-07

**Nền thành con thủ thư: dựng đúng 10 trang, không tạo file rỗng cho vai nào khác.**

- **Bỏ hẳn "Vòng 2" — 12 file rỗng có khung và 4 thư mục rỗng.** `/onboard` nay dựng đúng 10 trang, chia hai việc:
  - **Chân dung** — `about-me` · `values-and-principles` · `contrarian-beliefs` · `decision-style` · `network`. **Không skill nào đọc chúng**, và đó không phải lỗi: chúng là thứ làm bộ não trả lời *như chính người dùng* khi họ ngồi nói chuyện với nó. Thiếu thì đây là kho tài liệu, không phải bộ não của ai.
  - **Dùng chung** — `target-customer` · `offer-ladder` · `goals` · `ai-operating-preferences` · `systems-and-stack`. Từ **hai vai trở lên** cùng đọc. Đo thật: `target-customer` có **5 vai** đọc, nhiều nhất kho.

- **Luật chia, sau khi đo chứ không đoán.** Đoàn chốt *"≥2 vai đọc → nền, 1 vai → vai đó tự dựng"*. Nhưng đếm trên toàn bộ skill đã đóng gói thì hai luật đá nhau ở đúng bốn trang: `voice-profile` có **4 vai** đọc mà **không dựng nổi ngày đầu** — nó cần 10–20 bài đã đăng thật. Nên luật thật là luật thứ ba:

  > **Trang thuộc về vai nào ĐỦ SỨC DỰNG nó, không thuộc về vai đọc nó nhiều nhất.** Vai nào đọc mà chưa có thì cửa vào của chính vai đó phải biết dựng.

- **Vì sao không giữ lại vỏ rỗng cho tiện — ba lý do, cái thứ hai nặng nhất:**
  1. Nền không dựng nổi chúng. `customer-wins` cần khách thật, `business-metrics` cần số thật. Hỏi ngày đầu thì người ta nộp qua loa cho xong, hoặc dừng lại đi tìm rồi không quay lại.
  2. **Vỏ rỗng không giúp được vai nào, vì chính vai đó bỏ qua nó.** Cửa vào của vai Content đếm file *"tồn tại VÀ có nội dung thật — không phải dòng 'chưa có dữ liệu'"*. Tức nền đang làm một việc mà người thụ hưởng duy nhất không dùng tới.
  3. **Vỏ rỗng thối rữa im lặng.** Đo thật ngay trong bản này: `nut-that.md` được dựng sẵn kèm dòng *"trang này sinh ra từ việc X"*; v3.0 chuyển việc X sang vai Điều phối và để lại một file rỗng trỏ vào lệnh không có trong máy. **File rỗng còn chủ và file rỗng mất chủ trông y hệt nhau** — không ai phát hiện được.

- **`index.md` thành BẢN ĐỒ, và đây là nửa còn lại của cú cắt.** Nỗi lo cũ vẫn thật — không có chỗ đúng thì nội dung bị nhét bừa vào trang khác. Nhưng thuốc là bản đồ chứ không phải vỏ rỗng: mục lục nay liệt kê **26 trang kể cả trang chưa có**, mỗi dòng kèm cột **Ai lấp**. Một dòng nói rõ chủ của nó là ai; một file rỗng thì không nói được gì. Một file thay cho mười hai.

- **`templates/` chia theo vai.** Nền giữ 10 khuôn + `index` + `log`. 12 khuôn còn lại chuyển sang `khuon-cua-vai/` chờ về với vai sở hữu: 7 cái của Content, rồi Điều phối · Bán hàng · Chăm sóc · Nghiên cứu · Thiết kế mỗi vai một ít.

- **Bốn khuôn không vai nào đọc** — `expertise` · `people/` · `projects/` · `learnings/` — để riêng ở `chua-co-vai/`, **không nhét bừa vào một vai cho gọn**. Nhét vào vai không dùng là dựng một trang rỗng mãi mãi, đúng thứ vừa gỡ.

- **Lời chốt của `/onboard` viết lại.** Trước: kể tên năm trang còn trống. Nay: *"xong nền — cài vai nào thì vai đó tự dựng kho của nó"*, và **cấm kể tên trang chưa có** — người mới nghe xong sẽ tưởng mình đang thiếu rồi đi lấp bằng tay, mà lấp bằng tay là đi vòng qua đúng cái vai biết hỏi cho đúng.

---

## v3.0 — 2026-09-07

⚠️ **Bản này GỠ BỎ ba lệnh.** Đọc trước khi `git pull`.

- **Bộ khung thu về đúng ba lệnh: `/onboard` · `/nap-kho` · `/kiem-chung`** — dựng bộ não, ghi vào bộ não, kiểm bộ não. Đó là toàn bộ việc của cái nền.
- **Gỡ `/banh-xe-cuoc-doi`, `/kham-benh`, `/tong-giam-doc`** (và thư mục `bo-kham/` đi kèm). Cả ba là **mục tiêu và lập kế hoạch**, không phải xây bộ não — chúng chuyển sang **vai Điều phối**, một plugin cài rời đang đóng gói.

  Lý do là một câu hỏi rất cụ thể: *cái nền này để làm gì?* Nếu nó vừa dựng bộ não vừa chấm bánh xe vừa chốt việc của tháng thì ai chỉ cần chỗ chứa dữ liệu vẫn phải nuốt cả bộ hoạch định. Từ nay nền là nền, vai là vai — ghép lại được, mà không ghép cũng chạy.

- **`/onboard` không còn chặn ở bánh xe.** Trước bản này nó hỏi *"đã làm bánh xe chưa"* rồi bảo đi làm trước, quay lại sau. Nay nó hỏi **"đã có sẵn bản kế hoạch nào chưa"** — bánh xe, OKR, kế hoạch 90 ngày, dạng nào cũng được:
  - **Có** → nạp vào `raw/`, dùng thẳng làm `goals.md`. Vẫn là đường tốt nhất, vì bản đó đã qua một lượt người ta tự nghĩ chứ không phải câu trả lời ứng khẩu giữa buổi phỏng vấn.
  - **Chưa** → **chạy tiếp, không chặn.** Nói ra một lần cái giá của việc thiếu nó rồi đi tiếp. Bắt người ta dừng lại đi làm kế hoạch trước khi được dựng bộ não chính là chỗ họ bỏ ngang.
- **Lộ trình còn 7 việc** (`BAT-DAU-TU-DAY.md`), bỏ Việc 0. **Số hiệu Việc 1–7 giữ nguyên** — mọi tham chiếu chéo kiểu *"Việc 5 sẽ cần đường dẫn này"* và *"Việc 6 là nghiệm thu"* vẫn đúng. Đánh số lại cho đẹp là làm gãy hết chỗ trỏ chéo mà không đổi được gì.
- **Bản kế hoạch có sẵn nay nằm trong danh sách Giai đoạn 0**, cạnh bài đã đăng và feedback khách — đúng chỗ của nó: một thứ tài liệu mang tới, không phải một việc phải làm trước.

**Sửa kèm ba chỗ tự mâu thuẫn có từ v2.9:**

- Cây thư mục trong `README.md` để `bo-kham/` chen vào giữa `templates/` và hai mục con của nó, nên `vong2/` và `khung-lap-lai/` đọc thành nằm trong `bo-kham/`. Nay đã về đúng chỗ.
- Bảng skill trong `CLAUDE.md` chưa bao giờ kể `/kham-benh` và `/tong-giam-doc` — v2.9 thêm skill mà quên bảng. Gỡ đi thì bảng thành đúng.
- `START-HERE.txt` vẫn ghi *"gõ `/` tìm `/banh-xe-cuoc-doi` — thấy là đúng chỗ"*, tức phép kiểm cài đặt trỏ vào một lệnh không còn. Nay kiểm bằng `/onboard`.

---

## v2.9 — 2026-09-06

- **Thêm bộ khám nút thắt: `/kham-benh` + `/tong-giam-doc`.** Trước bản này bộ khung trả lời được *"tôi là ai, tôi bán gì"* nhưng không trả lời được *"tôi đang tắc ở đâu"* — mà đó là câu hỏi đầu tiên của bất kỳ ai mở bộ não ra vào sáng thứ Hai.
  - `/kham-benh` đi qua các chặng của một buổi khám thật: tiếp nhận → hỏi bệnh → đếm số → đào sâu → kê đơn hai ngăn. Khoảng 22 ô cho lượt đầu. Chạy **3 tháng một lần**.
  - `/tong-giam-doc` là vai điều phối: đọc bản khám gần nhất rồi chọn **một** quy trình cho tháng, giao, và nghiệm thu bằng hai con số. Nó **không tự khám** — gọi `/kham-benh`, vì hai bộ khám là hai kết quả khác nhau cho cùng một người và không có gì báo khi chúng lệch.
- **Máy giữ chỗ, không phải AI giữ chỗ.** Bài khám hơn hai chục ô nên vị trí nằm trong file (`bo-kham/kham.mjs`), nhả ra đúng một ô mỗi lượt. AI không biết câu kế tiếp cho tới khi ghi xong câu đang hỏi — nên không đổ cả bài ra một lượt, không nhảy cóc, không tự chấm màu.
- **Ba thứ máy làm mà hỏi miệng không làm được:** loại khâu *đói nguyên liệu* (khâu tắc mà khâu trên nó cũng tắc thì cái tắc đó là hệ quả, không phải bệnh) · bảng **LỆCH** đối chiếu điều bạn tự khai với con số bạn tự đếm · tách **chưa biết cách** khỏi **biết mà không làm**, vì hai thứ đó chữa ngược nhau.
- **`bo-kham/` là thư mục SINH RA**, đừng sửa tay. Luật sống ở Creator OS; bản này được phát sang. Sửa tay là lần `git pull` sau mất hết.
- **Thêm `nut-that` vào nhóm trang tạo rỗng** — đó là trang đích của `/kham-benh`, trước bản này bài khám ghi vào một trang `/onboard` chưa bao giờ dựng.
- Chú thích cách gọi trong `kham.mjs` nay **trung tính, không ghi cứng thư mục**. Trước đó nó ghi `node owner-os/kham.mjs`, tức bản phát cho member bảo họ gõ một lệnh trỏ vào thư mục họ không có. Code vốn đã in ra đúng lệnh lúc chạy; chỉ phần chú thích để đọc là sai — nên người mở file ra tìm hiểu sẽ gõ nhầm, còn người chỉ chạy thì không.

---

## v2.8 — 2026-09-06

- **Thêm `positioning` vào nhóm trang tạo rỗng.** Đếm lại thì hai vai cần nó (Bán hàng và Content) mà `/onboard` chưa bao giờ dựng — cùng loại lỗ với `quoted-authority` sửa ở v2.6. Luật đã chốt: trang từ **hai vai trở lên** cần thì thuộc nền chung và onboard dựng; trang chỉ một vai cần thì vai đó tự nạp lúc cài.

---

## v2.7 — 2026-09-06

- **Bốn skill và README nay ghi rõ ai làm bộ khung này, kèm đường nhắn khi kẹt** — `facebook.com/tohaidoan`. Bộ khung phát miễn phí và đi xa nhất trong mọi thứ đang có, nên người dùng vướng ở bước nào phải biết hỏi ai; trước bản này họ cài xong, hỏng, rồi bỏ, mà không có chỗ nào để hỏi.
- Nhân tiện nói rõ bộ skill đầy đủ nằm ở kho riêng `creator-ceo/creator-skills`, để ai muốn đi tiếp biết đường.

---

## v2.6 — 2026-09-06

**Onboard nhẹ đi một vòng, và chất liệu viết chuyển sang vai content.**

- **Bỏ Vòng 2 của `/onboard`.** Ba trang nặng nhất của vòng đó — `voice-profile`, `experiences-library`, `customer-wins` — nay do **vai content** nạp qua `/viet-content`, không dựng lúc onboard nữa. `expertise` xuống vòng file-rỗng-có-khung. Wiki giờ dựng theo **2 vòng**, không phải 3.

  Vì sao: soi lại từng skill xem nó đọc trang nào thì thấy ba trang đó **chỉ vai content và mấy vai sản xuất nội dung đọc**, không vai nào khác chạm tới. Và Vòng 2 đúng là vòng **đòi phải có sẵn tài liệu** — mười tới hai mươi bài đã đăng, ghi chép, lời chứng thực — tức đúng thứ người mới hoàn toàn chưa có ngày đầu. Xin ở buổi dựng nền thì hoặc họ nộp qua loa cho xong, hoặc họ dừng lại đi tìm rồi không quay lại.

- **`/onboard` vẫn TẠO cả năm trang chất liệu viết, nhưng để rỗng** kèm một dòng chỉ đường sang `/viet-content`. Lý do giữ nguyên như cũ: không có chỗ đúng thì nội dung bị nhét bừa vào trang khác và bộ não loạn từ tuần thứ ba. Cái đổi là **ai đi lấp**, không phải chỗ để lấp.

- **Thêm ⛩ CỬA VÀO cho `/viet-content`** — chạy trước mọi bước khác, mỗi lượt. Đọc thử bốn file nền rồi rẽ ba nhánh: kho trống thì **không viết**, chỉ đưa đúng một việc tiếp theo · kho mỏng thì viết nhưng **nói trước cái gì sẽ yếu** · kho đủ thì chạy im lặng như cũ.

  Trước bản này skill chặn rất tốt việc *bịa* (Bước 3 và Bước 6), nhưng chỉ chặn ở **đầu ra**. Người mới đi trọn bảy bước để nhận một lời từ chối ở cuối và không hiểu vì sao. Đây đúng cái bẫy khoá "Nạp nguyên liệu" đã ghi: *"người vào tool khi kho còn rỗng sẽ điền qua loa rồi kết luận tool viết dở."*

- **Nạp được ngay trong lượt viết đầu tiên.** Dán 5–10 bài cũ vào là skill rút hồ sơ giọng, dùng luôn cho bài đang viết, rồi mời `/nap-kho` lưu thật. Lần dùng đầu đổi từ *bị từ chối* thành *có bài dùng được cộng một tài sản mới*. Luật cũ không đổi: skill **không tự ghi vào `wiki/`**.

- **Hai trang `/viet-content` đọc mà `/onboard` chưa từng dựng** — `quoted-authority` và `video-production-setup` — nay có mặt trong danh sách tạo rỗng. Trước đó member chạy onboard xong dùng viet-content sẽ gặp hai file không tồn tại.

---

## v2.5 — 2026-08-14

- **Thêm mục hướng dẫn cho máy Windows.** Toàn bộ tài liệu trước đó viết theo góc nhìn Mac (*"mở Terminal"*), trong khi phần lớn member nhiều khả năng dùng Windows. Bốn chỗ hay vấp nay có sẵn cách chữa: lệnh `claude` báo *not recognized* (phải mở lại PowerShell, không phải cài hỏng) · chưa có Git · đường dẫn có dấu cách cần nháy kép · thư mục ẩn `.claude` không thấy trong File Explorer.
- **Nói rõ dùng PowerShell chứ không dùng CMD**, kèm cách phân biệt (`PS C:\...` vs `C:\...`) và bảng ba khác biệt. Lệnh cài đặt không chạy được trong CMD; và ngay cả khi `claude` chạy được, Claude Code sẽ có lúc yêu cầu chuyển sang PowerShell giữa chừng.
- Ghi rõ Claude Code có bản chạy thẳng trên Windows, **không cần WSL và không cần Node.js** — hai thứ này là yêu cầu của cách cài cũ và vẫn còn trong nhiều hướng dẫn trên mạng, đủ để làm người mới bỏ cuộc ngay bước đầu.

---

## v2.4 — 2026-08-14

- **README: mục cập nhật viết lại cho cả người dùng zip.** Trước đó chỉ hướng dẫn `git pull`, bỏ quên nhóm cài bằng zip — vốn là nhóm đông hơn và ít rành kỹ thuật hơn. Nay có đủ hai đường, cộng phép kiểm 2 câu sau khi cập nhật.
- **⛔ Cảnh báo: đừng nhờ AI "tự đọc bản mới rồi bổ sung phần còn thiếu".** Câu đó mơ hồ giữa *thiếu file khung* và *thiếu nội dung trong bộ não* — AI dễ hiểu sang nghĩa thứ hai rồi tự tạo và tự điền trang trong `wiki/`, phá Luật sắt số 2, và bịa nội dung để lấp chỗ trống. Thay khung thủ công thì chắc chắn và kiểm được; AI chỉ nên dùng để xác nhận sau khi thay.

---

## v2.3 — 2026-08-11

- **Thêm `AGENTS.md`** — Codex CLI đọc `AGENTS.md`, không đọc `CLAUDE.md`. Trước bản này, member dùng Codex clone về sẽ không được nạp luật nào cả, và không có cách nào nhận ra ngoài việc thấy AI trả lời như bình thường. `AGENTS.md` **trỏ về `CLAUDE.md` chứ không chép lại** — hai bản luật song song sẽ lệch nhau sau vài lần cập nhật.
- **Bảng kích hoạt 4 skill bằng lời nói.** Codex tìm skill ở `.codex/skills/`, bộ này để ở `.claude/skills/`, nên Codex không có lệnh gạch chéo. `AGENTS.md` dặn AI mở đúng file khi nghe *"làm bánh xe cuộc đời"*, *"lưu vào não"*, *"kiểm chứng"*... Với người không quen gõ lệnh thì cách này còn dễ hơn.
- **README: cảnh báo chỗ hay sai nhất — mở công cụ đúng thư mục.** `CLAUDE.md` và 4 skill chỉ được nạp khi thư mục này là gốc của phiên. Clone về rồi vẫn ngồi ở thư mục cũ thì nhắn *"bắt đầu"* không có gì xảy ra, và trông y hệt như bộ khung hỏng. Thêm dấu hiệu nhận biết + phép kiểm nhanh.

---

## v2.2 — 2026-08-11

Sửa 5 lỗi tìm ra khi **chạy thử trọn lộ trình 8 việc trên một bản clone sạch** — đóng vai member từ đầu tới cuối.

- 🔴 **Việc 6 chẩn đoán sai.** Bảng chấm cũ kết luận điểm thấp = *"bộ não chưa lưu được"*, hướng người dùng đi sửa cài đặt. Nhưng bộ não lưu tốt mà mới điền được vài trang cũng ra điểm thấp y hệt — hai vấn đề ngược nhau, hai cách chữa ngược nhau. Thêm **Câu 0** hỏi trước (*"đọc file goals.md, cho tôi biết dòng đầu"*) để tách hẳn hai nhánh: đọc được = lỗi nội dung, đi điền tiếp; không đọc được = lỗi công cụ, dừng test. Lỗi này nhắm đúng vào người làm dở dang, tức người ít khả năng tự gỡ nhất.
- **Thêm khuôn `templates/index.md` và `templates/log.md`.** Hai file ở gốc bộ não, được Luật sắt nhắc tới nhưng không có khuôn nào — mỗi người ra một định dạng, và `nap-kho` về sau ghi thêm vào cấu trúc không tồn tại.
- **Vòng 3 vẫn phải thay `[Tên bạn]` ở tiêu đề.** Câu *"tạo file rỗng, KHÔNG bắt điền"* bị hiểu thành không đụng gì cả, nên 5 trang vào bộ não với placeholder ngay dòng đầu.
- Cây thư mục ghi rõ `raw/` còn rỗng lúc tạo, file onboarding lưu vào ở **cuối** buổi.
- Nói rõ `index.md` và `log.md` **không tạo rỗng**.

---

## v2.1 — 2026-08-11

- **Bổ sung mục "Kiến trúc — mẫu LLM Wiki của Karpathy"** vào `CLAUDE.md` và `README.md`. Trước đó chỉ có một dòng nhắc tên; phần giải thích thật nằm trong `reference/Notion-Build-Kit-advanced.md` — file tuỳ chọn về Notion mà người dùng file sẽ không bao giờ mở. Lý lẽ cốt lõi của cả kiến trúc đang nằm nhầm chỗ.
- **Khối tạo thư mục viết lại cho đủ:** thêm 4 thư mục con `wiki/models` `people` `projects` `learnings` (trước đó vòng 3 và khung lặp lại đều giả định chúng tồn tại, nhưng không chỗ nào bảo AI tạo), thêm bước **in ra đường dẫn tuyệt đối** của bộ não cho người dùng, thêm luật dùng `templates/` (là khuôn, không copy cả thư mục vào `wiki/`).
- Việc 2 trong checklist thêm ô chép đường dẫn — nối thẳng sang Việc 5 (mở Obsidian), chỗ tắc phổ biến nhất vì người dùng không biết trỏ vào đâu.

---

## v2 — 2026-08-11

Bản gộp hai bộ kit cũ (24/06 và 16/07) + bổ sung toàn bộ lộ trình 8 việc.

### Thêm mới

| Thứ | Vì sao |
|---|---|
| **Việc 0 — skill `banh-xe-cuoc-doi`** | Phần còn lại nạp *dữ liệu việc*. Việc 0 nạp *con người*. Thiếu nó thì bộ não nạp rất nhanh một mục tiêu mà chính chủ chưa tự kiểm lại |
| **Việc 6 — skill `kiem-chung`** | Bắt cái bẫy phổ biến nhất: *tưởng đã lưu vào bộ não, thật ra chỉ nằm trong trí nhớ của đoạn chat*. Hai trường hợp đó trông giống hệt nhau — chỉ bài test này phân biệt được |
| **Skill `nap-kho`** | Đường ghi **duy nhất** vào `wiki/`. Sửa tay file `.md` thì nhanh hơn — và sau vài tuần bộ não sẽ có cùng một chuyện ở ba trang, hai trang nói ngược nhau, `log.md` không phản ánh gì |
| **`BAT-DAU-TU-DAY.md`** | Checklist 8 việc, kiêm bằng chứng cho cam kết hoàn tiền |
| **`reference/huong-dan-cai-dat.md`** | Việc 1 + Việc 5 + bảng tra lỗi. Trước đây nằm ngoài bộ kit |
| **`reference/luat-du-lieu-nhay-cam.md`** | Bộ não sắp chứa tên khách thật. Hai bản cũ không nói một chữ nào |
| **`templates/vong3/`** | Trang sinh ra từ vận hành — tạo rỗng có khung, không bắt điền. Không có chỗ đúng thì nội dung bị nhét bừa vào trang khác |
| **`templates/khung-lap-lai/`** | Khung cho `models` · `people` · `projects` · `learnings` |
| **`templates/customers.md`** | Mục "dữ liệu khách hàng" trong 7 mục tối thiểu trước đây không có trang nào để đặt vào |
| **`.gitignore` chặn `SecondBrain/`** | Để một lần `git push` không đưa dữ liệu khách hàng lên mạng |

### Sửa

- **Bốn trang neo bị bỏ sót** nay vào danh sách bắt buộc: `target-customer` · `values-and-principles` · `contrarian-beliefs` · `ai-operating-preferences`. Đo trên một bộ não đã chạy 6 tuần, bốn trang này nằm trong nhóm được trỏ vào nhiều nhất — nhưng bộ 7 mục tối thiểu cũ không có cái nào. Hệ quả: bộ não trả lời đúng về dự án nhưng viết hộ một bài thì ra giọng máy, và tự ý làm việc lẽ ra phải hỏi.
- **Giai đoạn 0 — hỏi tài liệu có sẵn TRƯỚC khi phỏng vấn.** Lấy từ bộ 16/07. Phần lớn giá trị thật nằm trong bài viết cũ và ghi chép cũ; phỏng vấn chỉ để lấp phần không lấy được từ tài liệu.
- **`voice-profile` có luật chặn:** chưa đủ 10 bài đã đăng thật thì **không được dựng bằng phỏng vấn**, phải để trống kèm lý do. Cái người ta *nghĩ* mình viết thường khác hẳn cái họ *thật sự* viết, và không ai tự phát hiện ra sự lệch đó.
- **Dựng wiki chia 3 vòng** thay vì tạo một lượt: trang neo → trang cần tài liệu → trang rỗng có khung.
- Phỏng vấn thêm 2 nhóm câu: **nguồn lực đang có** và **danh sách khách hàng thật** — hai mục trong 7 mục tối thiểu mà bộ câu hỏi cũ không hỏi.
- Luật sắt từ 6 lên 7 điều: thêm **"không bịa"** và **"chỉ một đường ghi"**.

---

## v1 — 2026-06-24 · `second-brain-kit.zip`

Bản đầu. `CLAUDE.md` + `START-HERE.txt` + `reference/` + 2 skill (`brain`, `onboard`).

**Có:** cơ chế tự chạy — ném vào workspace là AI tự đọc luật mỗi phiên.
**Thiếu:** không có khung trang nào, nên mỗi người ra một bộ não cấu trúc khác nhau; không hỏi tài liệu có sẵn; không có bước kiểm chứng.

---

## Bản song song — 2026-07-16 · `second-brain-onboarding-kit.zip`

Không phải phiên bản kế tiếp của v1 mà là **một cách làm khác**: 14 template + `AGENT_INSTRUCTIONS.md` dán tay vào bất kỳ chatbot nào.

**Có:** Giai đoạn 0 và bộ template — hai thứ tốt nhất, đã được đưa vào v2.
**Thiếu:** không có `CLAUDE.md` nên không có gì thường trực — đóng đoạn chat là AI thành người lạ. Thiết kế cho chatbot thường nên bộ não sinh ra sống trong đoạn chat, đúng cái bẫy mà Việc 6 sinh ra để bắt.
