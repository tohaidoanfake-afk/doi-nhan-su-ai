# AGENTS.md — cho Codex CLI và các công cụ đọc AGENTS.md

> **Luật đầy đủ nằm ở [`CLAUDE.md`](CLAUDE.md) trong cùng thư mục này. Đọc trọn file đó trước khi làm bất cứ việc gì.**
>
> File này cố ý ngắn và **không lặp lại nội dung** `CLAUDE.md`. Hai bản luật song song sẽ lệch nhau sau vài lần cập nhật, và lúc đó không ai biết bản nào đúng. Một nguồn sự thật, các file khác trỏ về.

---

## Việc đầu tiên

Đọc `CLAUDE.md`. Nó chứa: kiến trúc LLM Wiki, cấu trúc thư mục phải tạo, Giai đoạn 0, bộ câu hỏi phỏng vấn, cách dựng wiki 2 vòng, và 7 Luật sắt.

Người dùng nhắn *"bắt đầu"* → làm theo mục **LẦN CHẠY ĐẦU** trong `CLAUDE.md`.

---

## Bốn skill — kích hoạt bằng lời nói, không cần lệnh gạch chéo

Codex tìm skill ở `.codex/skills/`, còn bộ này để skill ở `.claude/skills/`. Nên **không có lệnh `/` nào** — thay vào đó, khi người dùng nói những câu dưới đây, **hãy mở đúng file SKILL.md tương ứng và làm theo trọn vẹn**:

| Người dùng nói gì | Đọc file này | Làm gì |
|---|---|---|
| *"bắt đầu"* · *"tạo bộ não thứ 2"* · *"dựng lại từ đầu"* | `.claude/skills/onboard/SKILL.md` | Dựng bộ não lần đầu |
| *"lưu cái này vào não"* · *"nạp vào kho"* · *"ghi lại insight này"* · người dùng kể một chuyện mới hoặc đưa tài liệu | `.claude/skills/nap-kho/SKILL.md` | **Đường ghi DUY NHẤT vào `wiki/`** |
| *"kiểm chứng"* · *"test bộ não"* · *"bộ não chạy chưa"* · *"làm việc 6"* | `.claude/skills/kiem-chung/SKILL.md` | **Việc 6** — bài test bộ não đã lưu thật chưa |

Đọc **trọn file**, không đọc lướt. Mỗi file đều có phần *"vì sao skill này tồn tại"* — phần đó quyết định làm đúng hay làm hỏng.

---

## Năm điều không được phá, kể cả khi chưa kịp đọc `CLAUDE.md`

Nếu vì lý do gì đó bạn chưa đọc được `CLAUDE.md`, năm điều dưới đây vẫn có hiệu lực:

1. **Không bao giờ sửa bất cứ thứ gì trong `raw/`.** Đó là nguồn gốc bất biến — nó cho phép mọi thứ trong `wiki/` sai rồi sửa được.
2. **Chỉ có MỘT đường ghi vào `wiki/`: skill `nap-kho`.** Không sửa thẳng file `.md`, kể cả sửa một lỗi chính tả.
3. **Không bịa.** Không tự nghĩ ra số liệu, tên khách, câu chuyện, kết quả. Thiếu dữ liệu thì để `[trong ngoặc vuông]` hoặc dừng lại hỏi. Bộ não có chỗ trống thì sửa được; có chỗ bịa thì hỏng mà không ai biết.
4. **Luôn ghi thêm vào `log.md`, không bao giờ viết đè lịch sử.**
5. **Luôn đọc `wiki/ai-operating-preferences.md` ở đầu mỗi phiên** và làm theo — đó là nơi người dùng khai cách xưng hô, khi nào phải hỏi trước, và những việc tuyệt đối cấm.

---

## Nếu bạn muốn có lệnh gạch chéo trong Codex

Chép 4 thư mục skill sang chỗ Codex tìm:

```bash
mkdir -p .codex/skills && cp -R .claude/skills/* .codex/skills/
```

⚠️ Làm vậy thì bạn có **hai bản** của mỗi skill. Lần `git pull` sau, bản trong `.claude/skills/` được cập nhật còn bản trong `.codex/skills/` thì không — và bạn sẽ chạy bản cũ mà không biết. Chạy lại đúng lệnh trên sau mỗi lần `git pull` nếu chọn cách này.

Không làm gì cả cũng được: bảng kích hoạt bằng lời nói ở trên đủ dùng, và với người không quen gõ lệnh thì nó còn dễ hơn.
