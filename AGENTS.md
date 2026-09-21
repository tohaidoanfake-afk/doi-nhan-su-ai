# AGENTS.md — cho Codex CLI và các công cụ đọc AGENTS.md

> **Luật đầy đủ nằm ở [`CLAUDE.md`](CLAUDE.md) trong cùng thư mục này. Đọc trọn file đó trước khi làm bất cứ việc gì.**
>
> File này cố ý ngắn và **không lặp lại nội dung** `CLAUDE.md`. Hai bản luật song song sẽ lệch nhau sau vài lần cập nhật, và lúc đó không ai biết bản nào đúng. Một nguồn sự thật, các file khác trỏ về.

---

## Việc đầu tiên

Đọc `CLAUDE.md`. Nó chứa: kiến trúc LLM Wiki, cấu trúc thư mục phải tạo, Giai đoạn 0, bộ câu hỏi phỏng vấn, cách dựng wiki 2 vòng, và 7 Luật sắt.

Người dùng nhắn *"bắt đầu"* → làm theo mục **LẦN CHẠY ĐẦU** trong `CLAUDE.md`.

---

## 15 skill — gọi bằng `$`, hoặc bằng lời

Codex tìm skill ở `.agents/skills/`. Bộ này có sẵn bản cho Codex ở đó, sinh từ `.claude/skills/` bằng `scripts/sinh-ban-codex.mjs`, nên gõ `$` là thấy đủ 15 skill: 4 skill nền ở bảng ngay dưới, cộng các vai làm việc ở bảng tiếp theo. **Trong `CLAUDE.md` và các skill, chỗ nào ghi `/tên` thì ở Codex là `$tên`.**

Người dùng nói những câu dưới đây mà không gõ `$` thì **hãy mở đúng file SKILL.md tương ứng và làm theo trọn vẹn**:

| Người dùng nói gì | Đọc file này | Làm gì |
|---|---|---|
| *"bắt đầu"* · *"tạo bộ não thứ 2"* · *"dựng lại từ đầu"* | `.agents/skills/onboard/SKILL.md` | Dựng bộ não lần đầu |
| *"lưu cái này vào não"* · *"nạp vào kho"* · *"ghi lại insight này"* · người dùng kể một chuyện mới hoặc đưa tài liệu | `.agents/skills/nap-kho/SKILL.md` | **Đường ghi DUY NHẤT vào `wiki/`** |
| *"kiểm chứng"* · *"test bộ não"* · *"bộ não chạy chưa"* · *"làm việc 6"* | `.agents/skills/kiem-chung/SKILL.md` | **Việc 6** — bài test bộ não đã lưu thật chưa |
| *"phỏng vấn định vị"* · *"định vị thương hiệu"* | `.agents/skills/phong-van-dinh-vi/SKILL.md` | Buổi phỏng vấn định vị 7 chặng |

### Các vai làm việc — đã có sẵn trong bản gộp này, không phải cài thêm

Khi nào dùng lệnh nào: đọc dòng `description:` ở đầu mỗi file — đó là chỗ duy nhất khai điều đó, bảng này không chép lại.

| Vai | Lệnh | File |
|---|---|---|
| ✍️ Content | `$viet-content` | `.agents/skills/viet-content/SKILL.md` |
| 🎛️ Điều phối | `$banh-xe-cuoc-doi` | `.agents/skills/banh-xe-cuoc-doi/SKILL.md` |
| 🎛️ Điều phối | `$dieu-hanh` | `.agents/skills/dieu-hanh/SKILL.md` |
| 🎛️ Điều phối | `$kham-benh` | `.agents/skills/kham-benh/SKILL.md` |
| 💰 Bán hàng | `$ban-hang` | `.agents/skills/ban-hang/SKILL.md` |
| 🔍 Nghiên cứu | `$soi-doi-thu` | `.agents/skills/soi-doi-thu/SKILL.md` |
| 🔍 Nghiên cứu | `$soi-hinh-mau` | `.agents/skills/soi-hinh-mau/SKILL.md` |
| 🔍 Nghiên cứu | `$tim-tam-guong` | `.agents/skills/tim-tam-guong/SKILL.md` |
| 🎨 Thiết kế | `$anh-quote` | `.agents/skills/anh-quote/SKILL.md` |
| 🎨 Thiết kế | `$giai-thich-de-hieu` | `.agents/skills/giai-thich-de-hieu/SKILL.md` |
| 🤝 Chăm sóc | `$cham-soc` | `.agents/skills/cham-soc/SKILL.md` |

Đọc **trọn file**, không đọc lướt. Mỗi file đều có phần *"vì sao skill này tồn tại"* — phần đó quyết định làm đúng hay làm hỏng.

---

## Năm điều không được phá, kể cả khi chưa kịp đọc `CLAUDE.md`

Nếu vì lý do gì đó bạn chưa đọc được `CLAUDE.md`, năm điều dưới đây vẫn có hiệu lực:

1. **Không bao giờ sửa bất cứ thứ gì trong `raw/`.** Đó là nguồn gốc bất biến — nó cho phép mọi thứ trong `wiki/` sai rồi sửa được.
2. **Chỉ có MỘT đường ghi vào `wiki/`: skill `nap-kho`.** Không sửa thẳng file `.md`, kể cả sửa một lỗi chính tả.
3. **Không bịa.** Không tự nghĩ ra số liệu, tên khách, câu chuyện, kết quả. Thiếu dữ liệu thì để `[trong ngoặc vuông]` hoặc dừng lại hỏi. Bộ não có chỗ trống thì sửa được; có chỗ bịa thì hỏng mà không ai biết.
4. **Luôn ghi thêm vào `log.md`, không bao giờ viết đè lịch sử.**
4b. **Số lấy từ kho phải kèm NGÀY** — cấm đưa số của tháng trước như số hôm nay.
4c. **Cấm nói "đã xong" khi chưa kiểm ngay trong lượt đó.** Khuôn ba phần: `[Đã <làm gì>] [Thấy: <bằng chứng>] <kết luận>`.
4d. **Ô trống trong kho là ô trống CỦA KHO**, không phải sự thật về người hay việc.
5. **Luôn đọc `wiki/ai-operating-preferences.md` ở đầu mỗi phiên** và làm theo — đó là nơi người dùng khai cách xưng hô, khi nào phải hỏi trước, và những việc tuyệt đối cấm.

---

## Người bảo trì bộ khung

⛔ **Bản gộp này là BẢN SINH từ đầu tới cuối** — cả `.claude/skills/` lẫn `.agents/skills/`. **Không sửa tay ở đây**: lần phát sau ghi đè mất.

- **Bạn đang dùng bộ này:** lấy bản mới bằng `git pull`. Sửa tay file skill thì lần `git pull` sau sẽ đụng với bản mới.
- **Người phát hành:** sửa ở kho lẻ (`creator-ceo/nhan-su-*` cho vai, `second-brain-file-ai` cho nền), commit, chạy bộ sinh `phat-ban-gop.mjs`, rồi `node scripts/sinh-ban-codex.mjs --kiem` trước khi đẩy — lệch là thoát mã 1. `BAN-KE.md` ghi mỗi phần sinh từ kho nào, phiên bản nào.

⚠️ **Đừng chép skill sang `.codex/skills/`.** Bản cũ của file này từng hướng dẫn vậy, nhưng Codex không đọc thư mục đó: chép xong vẫn không có skill nào, và không có lỗi nào báo.
