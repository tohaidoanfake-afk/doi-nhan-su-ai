# 🖥️ Trang bán hàng — `trang-ban-hang`

> ⚠️ **File này là chỗ DUY NHẤT chứa luật cấu trúc của trang bán hàng.** Đọc nó **sau** `SKILL.md`, không thay cho.

**Việc này lo NỘI DUNG/COPY của trang, không lo giao diện** (code/HTML/CSS) — hai việc khác nhau, đừng gộp. Giao một trang đã dựng sẵn HTML là làm thay việc của người dựng giao diện, và thường làm sai vì bạn không biết họ dùng hệ thiết kế nào.

Khác `email-ban-hang` đúng một điểm, nhưng điểm đó quyết định toàn bộ cách viết: **thư bán hàng đọc tuyến tính, không ngắt khối. Trang bán hàng người đọc lướt/scan**, nên nội dung phải chia thành các khối rõ ràng để dựng giao diện được. Viết một bài văn xuôi liền mạch rồi giao là **sai định dạng**, dù câu chữ hay tới đâu.

## Bảy khối, đúng thứ tự

Ghi trong `## Bài viết`, đánh dấu từng khối bằng heading `###` để người dựng giao diện cắt đúng chỗ:

1. **Hero** — mốc/chi tiết mở đầu (có mốc thời gian hoặc con số cụ thể thì đặt thành badge nhỏ phía trên) → tiêu đề lớn (câu hook) → một câu dẫn ngắn → hai CTA (nút chính hành động, nút phụ cuộn xuống đọc tiếp).
2. **Thân chuyện** — văn xuôi liên tục, cột đọc hẹp (không phải toàn màn hình). Trong dòng chảy này, tách riêng thành khối **callout** (không phải đoạn văn thường) ở đúng những chỗ có:
   - một câu đúc kết/châm ngôn ở đỉnh cảm xúc
   - một con số hoặc chi tiết cần đứng một mình để nhớ lâu
3. **Thesis** — khối RIÊNG BIỆT, nổi bật nhất trang (đổi nền/màu tương phản mạnh so với phần trên). Chỉ chứa câu chốt (1–2 câu), không có gì khác chen vào.
4. **Cơ chế / offer stack** — nếu offer có nhiều thành phần (vai trò, tính năng, bước), trình bày dạng lưới/danh sách ngắn, mỗi ô 1–2 dòng, không phải đoạn văn dài.
5. **Bằng chứng** — số liệu thật tách khỏi văn xuôi, thành hàng/ô riêng (mỗi ô: ai, con số, ý nghĩa ngắn).
6. **Future-pacing** *(nếu khung viết có)* — 2–3 cảnh cụ thể, mỗi cảnh 2–3 câu, trình bày cạnh nhau như thẻ, không nối liền thành văn xuôi.
7. **CTA cuối** — nhắc lại lời mời, một nút hành động, không lặp lại toàn bộ lý lẽ đã nói ở trên.

⚠️ **Không phải trang nào cũng cần đủ bảy khối.** Khối 4 (cơ chế) và khối 6 (future-pacing) chỉ dùng khi nội dung thật có — đừng bịa ra một danh sách vai trò hay ba cảnh tưởng tượng cho đủ khuôn (Bước 0, không bịa, vẫn áp đủ). Nhưng khối 1, 2, 3, 7 gần như luôn cần.

## Chốt chặn

- **Đọc `wiki/dau-hieu-ai-viet.md` trước khi viết khối Thesis và CTA** — đây là hai chỗ dễ rơi vào "chiêu bán hàng sáo mòn" nhất (mục cùng tên trong trang đó, nạp 2026-09-02): tránh twist tự-phủ-nhận kiểu *"tôi không mời bạn mua gì cả hôm nay"*, tránh liệt kê nhánh phòng thủ *"có thể bạn... có thể bạn... hoặc bạn..."*.
- **Không nhồi chi tiết vận hành (số ngày lộ trình, điều khoản hoàn tiền) vào khối Thân chuyện hoặc Thesis.** Chi tiết vận hành đặt ở khối Cơ chế, tách khỏi mạch cảm xúc — trộn vào là làm loãng đúng chỗ cần đặc nhất.
- **Bàn giao kèm mô tả cấu trúc, không chỉ giao chữ.** Trong `ket-qua.md`, liệt kê rõ khối nào ứng với đoạn nào, khối nào cần nổi bật hơn (đổi nền/màu), để người dựng giao diện — `thiet-ke-web`, hoặc một phiên Claude Code khác đang build code thật — cắt đúng chỗ mà không phải đoán lại từ đầu.
- **Đây là NỘI DUNG, không phải giao diện.** Không đề xuất màu sắc/font/CSS cụ thể trong bài — việc đó của `thiet-ke-web`. Chỉ đánh dấu khối và nói khối nào cần nổi bật hơn khối nào.

## Giao gì

`## Bài viết` — toàn bộ các khối cần có, mỗi khối một heading `###` rõ ràng. Kèm một đoạn ngắn cuối bài mô tả ý đồ trình bày (khối nào nền tối/nổi bật, khối nào dạng lưới/thẻ) để người dựng giao diện không phải đoán.
