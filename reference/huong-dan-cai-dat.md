# Hướng dẫn cài đặt — Việc 1 và Việc 5

> Hai việc kỹ thuật duy nhất trong cả lộ trình. Xong hai việc này thì phần còn lại chỉ là trả lời câu hỏi.

---

## VIỆC 1 — Cài công cụ bậc 2

### Bậc 2 là gì, và vì sao chatbot không đủ

| | Bậc 1 — chatbot | Bậc 2 — công cụ có tay chân |
|---|---|---|
| Ví dụ | ChatGPT web, Gemini web, Claude.ai chat thường | Claude Code · Claude Cowork · AntiGravity |
| Đọc được file trên máy bạn | ❌ | ✅ |
| **Ghi được file ra máy bạn** | ❌ | ✅ |
| Nhớ sau khi đóng chat | chỉ nhớ mờ, không kiểm chứng được | ✅ nhớ vì **nó nằm trong file thật** |

Bộ não thứ 2 là **một thư mục file trên máy bạn**. Chatbot không tạo được file, nên nó không dựng được bộ não — nó chỉ có thể nói chuyện về bộ não.

> Đây cũng là câu trả lời cho *"ChatGPT của tôi vẫn nhớ mà"*: nó nhớ trong phiên. Đóng đi mở lại, hoặc mở trên máy khác, là mất. Bạn sẽ tự kiểm chứng điều này ở **Việc 6**.

### Chọn công cụ nào

| Công cụ | Hợp với ai | Ghi chú |
|---|---|---|
| **Claude Cowork** | người không rành kỹ thuật — **khuyên dùng nếu bạn phân vân** | Giao diện gần giống chat bình thường, kéo thả thư mục vào là chạy |
| **Claude Code** | người quen dùng máy tính, thích gõ lệnh | Mạnh nhất, chạy trong cửa sổ dòng lệnh |
| **AntiGravity** | ai đã dùng sẵn | Cài riêng theo hướng dẫn của họ |

**Bắt buộc có gói trả phí.** Bản miễn phí hết lượt giữa buổi phỏng vấn là mất mạch, và bạn sẽ phải làm lại.

### 🪟 Máy Windows — bốn chỗ khác Mac

Ba dòng lệnh **y hệt** trên Windows, gõ trong **PowerShell** (bấm Start, gõ "PowerShell"). Nhưng bốn chỗ sau hay vấp:

**0. Dùng PowerShell, đừng dùng Command Prompt (CMD)**

Cách phân biệt: nhìn đầu dòng lệnh — `PS C:\...` là PowerShell, chỉ `C:\...` là CMD.

| | PowerShell | CMD |
|---|---|---|
| Chạy được lệnh cài đặt | ✅ | ❌ — `irm`/`iex` là lệnh riêng của PowerShell |
| Chạy được `claude` | ✅ | ⚠️ chạy được nhưng Claude Code **sẽ có lúc yêu cầu bạn chuyển sang PowerShell** |
| Nối lệnh bằng `&&` | ✅ | ❌ không hỗ trợ |
| Shift+Enter để xuống dòng khi gõ câu dài | ✅ *(trong Windows Terminal)* | ❌ |

**Tốt nhất:** cài **Windows Terminal** (miễn phí ở Microsoft Store) rồi mở PowerShell trong đó. Không có cũng không sao — bấm Start gõ "PowerShell" là đủ dùng.

**1. Cài Claude Code — dùng bản chạy thẳng, không cần WSL**

Mở PowerShell, dán:
```powershell
irm https://claude.ai/install.ps1 | iex
```
Yêu cầu: Windows 10 (bản 1809 trở lên) hoặc Windows 11, tối thiểu 4 GB RAM. **Không cần cài Node.js, không cần WSL** — đó là yêu cầu của cách cài cũ.

**2. Gõ `claude` mà báo "not recognized" → đóng PowerShell, mở lại**

Đây là lỗi phổ biến nhất trên Windows. Cài xong, cửa sổ PowerShell đang mở **chưa biết** lệnh mới — phải đóng hẳn rồi mở cửa sổ mới. Không phải cài hỏng.

**3. Gõ `git` mà báo không nhận → chưa có Git**

Tải Git for Windows ở `git-scm.com`, cài bằng cách bấm Next hết. Hoặc bỏ qua git luôn, dùng đường tải file zip — không cần git chút nào.

**4. Đường dẫn có dấu cách thì phải có nháy kép**

```powershell
cd "C:\Users\Ten Ban\Documents\nhan-su-thu-thu"
```
Thiếu nháy kép là báo lỗi ngay. Cách tránh: để thư mục ở chỗ không có dấu cách, ví dụ `C:\nhan-su-thu-thu`.

**Kiểm sau khi giải nén zip:** mở thư mục, phải thấy `CLAUDE.md`, `templates`, và **`.claude`**. Không thấy `.claude` thì bật *View → Hidden items* trong File Explorer. Thiếu thư mục đó là mất cả 4 lệnh.

---

### Kẹt thì làm gì

Nhắn vào nhóm kèm **ảnh chụp màn hình chỗ kẹt**. Đây là việc duy nhất trong 8 việc có người gỡ hộ — 7 việc còn lại là việc của riêng bạn, không ai làm thay được.

---

## VIỆC 2 — Ném bộ khung vào công cụ

1. Giải nén file zip → được thư mục `nhan-su-thu-thu`.
2. Đặt thư mục đó ở chỗ **dễ tìm và không bị xoá nhầm** — ví dụ `Documents/nhan-su-thu-thu`. Đừng để trong Downloads.
3. Mở công cụ, đặt thư mục này làm workspace (Cowork: kéo cả thư mục vào cửa sổ).
4. Nhắn: **"bắt đầu"**.

Xong đúng thì AI dựng `wiki/`, `raw/`, `index.md`, `log.md` **ngay trong thư mục đó**, cạnh `CLAUDE.md`, rồi bắt đầu hỏi bạn.

**Không thấy gì xảy ra?** Kiểm tra AI có nhìn thấy file `CLAUDE.md` không — nếu không, workspace đang trỏ sai thư mục.

---

## VIỆC 5 — Mở kho bằng Obsidian

### Vì sao cần Obsidian

Bộ não là file markdown thuần — mở bằng Notepad cũng đọc được. Nhưng Obsidian cho bạn ba thứ mà trình soạn thảo thường không có:

- **Bấm vào `[[liên kết]]` để nhảy trang** — bộ não này được thiết kế để đi bằng liên kết, không phải bằng cách cuộn.
- **Xem sơ đồ toàn cảnh** — nhìn ra trang nào đang mồ côi, không nối với gì cả.
- **Tìm xuyên toàn bộ kho** trong một ô tìm kiếm.

Obsidian **miễn phí** cho dùng cá nhân, và **không đẩy dữ liệu lên mây** — file vẫn nằm trên máy bạn.

### Ba bước

1. Tải ở `obsidian.md` → cài như phần mềm bình thường.
2. Mở lên → **Open folder as vault** → trỏ vào thư mục **`nhan-su-thu-thu`** *(chính thư mục có `wiki/` và `CLAUDE.md`)*.
3. Bấm thử một `[[liên kết]]` bất kỳ — nhảy được sang trang khác là xong.

### Đáng bật ngay

- **Graph view** (biểu tượng sơ đồ bên trái) — trang nào nằm rìa, không nối với gì, là trang cần nối lại.
- **Chế độ đọc** (Ctrl/Cmd + E) — xem bản đã dựng đẹp thay vì bản thô.

⚠️ **Sửa file trong Obsidian thì được, nhưng đừng sửa nội dung `wiki/`.** Mọi thay đổi nội dung đi qua `/nap-kho` — có lý do: xem Luật sắt số 2 trong `CLAUDE.md`. Obsidian dùng để **đọc và duyệt**, không dùng để sửa.

---

## Bảng tra lỗi nhanh

| Triệu chứng | Nguyên nhân thường gặp |
|---|---|
| AI không tạo thư mục `wiki/` | Workspace trỏ sai chỗ — AI không thấy `CLAUDE.md` |
| AI trả lời chung chung, không biết gì về bạn | Đang dùng bậc 1 (chatbot), hoặc chưa cắm thư mục vào phiên |
| Obsidian mở ra trống trơn | Trỏ nhầm vào thư mục cha — phải trỏ đúng thư mục có `wiki/` |
| Hôm sau mở lại AI không nhớ gì | **Đây chính là thứ Việc 6 kiểm.** Rất có thể dữ liệu chưa được ghi ra file, chỉ nằm trong trí nhớ phiên trước → chạy `/kiem-chung` để biết chắc |
| Hết lượt giữa chừng | Chưa đăng ký gói trả phí |
