# PERSONA EXTRACTION PROTOCOL
*Khai thác 1 client → wiki AI dùng được*

> Bộ câu hỏi tái sử dụng để phỏng vấn 1 client, output là wiki cá nhân để AI dùng cho 4 việc: viết đúng voice, tư vấn/ra quyết định, trợ lý toàn diện, business/sales. Xây trên LLM Wiki pattern (Karpathy) — mỗi buổi phỏng vấn = 1 Source → AI ingest thành các trang Entity/Concept cross-link.

---

## 3 nguyên tắc khai thác (quan trọng hơn bản thân câu hỏi)

1. **Hỏi câu chuyện, không hỏi tính từ.** Đừng hỏi "anh có quyết đoán không" — hỏi "kể lần gần nhất anh ra một quyết định lớn trong 10 phút". Tính cách lộ ra trong hành vi cụ thể, không phải tự đánh giá.
2. **Đào 3 lớp mỗi câu:** WHAT (chuyện gì) → WHY (vì sao, niềm tin gì bên dưới) → SO WHAT (rút ra nguyên tắc gì). AI cần lớp 2–3 để bắt chước được tư duy, không chỉ sự kiện.
3. **Bắt nguyên văn (verbatim).** Ghi lại đúng từ ngữ, cụm từ lặp, cách ví von của client. Đây là nguyên liệu để AI viết đúng giọng. Đào cả mặt tối — nỗi sợ, điều ghét, thất bại — vì AI cần biết để *tránh*.

---

## 11 MODULE — mỗi module map thẳng ra 1 trang wiki

### A. Identity & Story → *Entity: [Tên client]*
Nền tảng. Hỏi để AI biết "đây là ai".

1. Giới thiệu bản thân trong 3 câu như anh nói với người lạ quan trọng.
2. Kể câu chuyện nguồn gốc của anh — bước ngoặt nào đưa anh tới chỗ hôm nay? *(probe: "lúc đó anh nghĩ gì?")*
3. Anh tự hào nhất về điều gì? Xấu hổ / hối tiếc nhất điều gì?
4. Nếu 5 năm nữa nhìn lại, anh muốn người ta nói gì về anh?
5. 3 từ người thân nhất dùng để tả anh — và anh có đồng ý không?

### B. Voice & Communication → *Concept: Voice Profile* (lõi cho "viết đúng voice")

6. Cho mình 2–3 đoạn anh từng viết/nói mà anh thấy "đúng chất mình nhất" *(thu thập sample thật — vàng ròng)*.
7. Anh ghét kiểu viết nào nhất? Từ ngữ nào anh không bao giờ dùng?
8. Anh hay mở đầu / kết thúc một bài thế nào? Có câu cửa miệng nào không?
9. Giọng anh nghiêng đâu: thẳng-gắt hay mềm-dẫn dắt? Hài hay nghiêm? Học thuật hay đời thường? *(cho chọn trên thang)*
10. Anh kể chuyện bằng ẩn dụ/ví von từ lĩnh vực nào? (thể thao, chiến tranh, nấu ăn, kinh doanh...)

### C. Values, Beliefs & Worldview → *Concept: Values & Principles* (lõi cho "ra quyết định")

11. 3 nguyên tắc anh không bao giờ vi phạm dù mất tiền?
12. Niềm tin nào về [ngành của anh] mà đa số không đồng ý nhưng anh đúng? *(bắt "contrarian belief" — cực giá trị cho content + định vị)*
13. Anh đánh đổi điều gì để lấy điều gì? (tiền vs tự do, tốc độ vs hoàn hảo, tăng trưởng vs kiểm soát...)
14. Điều gì khiến anh mất niềm tin vào một người ngay lập tức?
15. "Thành công" với anh định nghĩa cụ thể là gì — con số / trạng thái nào?

### D. Goals & Vision → *Concept: Goals (90 ngày / 1 năm / 5 năm)*

16. Mục tiêu lớn nhất trong 90 ngày tới? Đo bằng con số gì?
17. Trong 12 tháng, nếu chỉ 1 thứ thành công thì là gì?
18. Tầm nhìn 3–5 năm — bức tranh lớn?
19. Đâu là nút thắt cổ chai đang chặn anh ngay bây giờ?
20. Anh sẵn sàng *không* làm gì để đạt mục tiêu? (anti-goals)

### E. Work / Business / Offer → *Entity: Business* + *Concept: Offer Ladder* (business/sales)

21. Anh bán gì, cho ai, giải quyết nỗi đau gì — nói như nói với khách?
22. Các sản phẩm/offer theo bậc thang giá? Cái nào là "cỗ máy in tiền"?
23. Cơ chế độc đáo (unique mechanism) khiến offer anh khác đối thủ?
24. Mô hình doanh thu & con số hiện tại (MRR, AOV, biên lợi nhuận...) *(nếu client chịu chia sẻ)*.
25. Điều gì trong vận hành đang ngốn thời gian anh nhất?

### F. Customers & Market → *Entity: Target Customer* + *Entity: Competitor*

26. Mô tả khách hàng lý tưởng như một con người thật: họ là ai, sợ gì, khao khát gì, đang nói gì trong đầu lúc 2h sáng?
27. Khách hay phản đối điều gì trước khi mua? Anh xử lý sao?
28. 3 đối thủ chính — họ mạnh gì, yếu gì, anh khác họ chỗ nào?
29. Câu khách hàng hay nói nhất khi khen anh? *(voice-of-customer, vàng cho copy)*

### G. Network & Relationships → *Entity pages cho từng người*

30. 5–10 người quan trọng nhất với công việc của anh — tên, vai trò, mối quan hệ?
31. Ai là người anh hỏi ý kiến trước khi ra quyết định lớn?
32. Đối tác / KOL / mentor nào anh muốn AI nhớ để nhắc khi liên quan?

### H. Workflows, Tools & Routines → *Concept: Systems & Stack* (trợ lý)

33. Một ngày làm việc điển hình của anh diễn ra thế nào?
34. Stack công cụ anh dùng (CRM, content, quản lý...)? Cái nào anh ghét nhưng vẫn xài?
35. Quy trình nào anh đã chuẩn hóa? Quy trình nào còn trong đầu?
36. Anh muốn AI *tự động làm* việc gì mà không cần hỏi?

### I. AI Operating Manual → *Concept: AI Operating Preferences* ⚡ (cái làm AI dùng được NGAY)

37. Anh muốn AI xưng hô với anh thế nào? Giọng thế nào khi nói với anh?
38. Khi nào AI nên cứ làm, khi nào *bắt buộc* phải hỏi trước?
39. Điều gì AI tuyệt đối không được làm / không được nói thay anh?
40. Anh thích câu trả lời ngắn-thẳng hay đầy đủ-giải thích? Định dạng ưa thích?
41. Ranh giới riêng tư: chủ đề/thông tin nào AI không được đụng tới?

### J. Pain, Fears & Decision Style → *Concept: Decision Style* (ra quyết định)

42. Anh ra quyết định bằng dữ liệu hay trực giác? Kể 1 ví dụ mỗi loại.
43. Nỗi sợ lớn nhất trong kinh doanh / cuộc đời?
44. Lần thất bại dạy anh nhiều nhất — và bài học?
45. Điều gì khiến anh trì hoãn? Điều gì khiến anh hành động ngay?

### K. Knowledge & Expertise → *Concept pages theo lĩnh vực*

46. 3 lĩnh vực anh giỏi đến mức người ta trả tiền để nghe?
47. Khung tư duy / mô hình nào anh hay dùng để giải quyết vấn đề?
48. Anh đọc/học từ ai? Nguồn nào định hình tư duy anh? *(→ thành sources để ingest tiếp)*

---

## Cách chạy buổi phỏng vấn

- **Thời lượng:** 60–90 phút, hoặc chia 2 buổi (A–F, rồi G–K). Đừng ép hết 1 lần — chất lượng tụt.
- **Chế độ đào sâu:** không hỏi tuần tự như đọc bài. Chỗ nào client "bật" lên thì đào tiếp bằng "kể cụ thể hơn", "tại sao", "ví dụ?". Bỏ qua chỗ client cạn.
- **Ghi verbatim:** thu âm + ghi nguyên văn. Voice nằm trong *cách nói*, không chỉ nội dung.
- **Luôn xin tài liệu thật:** bài viết cũ, email hay nhất, post nổi nhất → ingest thẳng vào brain làm Source, không qua phỏng vấn.

## Cách biến câu trả lời → wiki cho AI

Mỗi buổi phỏng vấn = **1 Source** (transcript) trong DB 📥 Sources. Rồi `/brain ingest` sinh ra:

- 1 **Entity** trang trung tâm: client đó.
- ~6–8 **Concept**: Voice Profile, Values & Principles, Goals, Decision Style, AI Operating Preferences, Systems, Offer Ladder.
- Nhiều **Entity** phụ: business, từng khách hàng mục tiêu, đối thủ, người trong network.
- Tất cả cross-link qua `Related` → AI có bức tranh toàn cảnh về con người + business.

Trang **AI Operating Preferences** nên là trang AI đọc *đầu tiên* mỗi lần — nó định nghĩa cách hành xử.

---

## Bản đồ Module → Wiki Page (tóm tắt)

| Module | Trang wiki sinh ra | Page Type | Phục vụ mục đích |
|---|---|---|---|
| A. Identity & Story | [Tên client] | Entity | Nền tảng |
| B. Voice & Communication | Voice Profile | Concept | Viết đúng voice |
| C. Values & Worldview | Values & Principles | Concept | Ra quyết định |
| D. Goals & Vision | Goals (90d/1y/5y) | Concept | Tư vấn |
| E. Work / Business / Offer | Business + Offer Ladder | Entity + Concept | Business/sales |
| F. Customers & Market | Target Customer + Competitor | Entity | Sales |
| G. Network & Relationships | Người trong network | Entity | Trợ lý |
| H. Workflows, Tools, Routines | Systems & Stack | Concept | Trợ lý |
| I. AI Operating Manual | AI Operating Preferences | Concept | Cách AI hành xử |
| J. Pain, Fears, Decision Style | Decision Style | Concept | Ra quyết định |
| K. Knowledge & Expertise | Concept theo lĩnh vực | Concept | Content + tư vấn |

---

*v1 — Persona Extraction Protocol. Dùng kèm Second Brain (LLM Wiki) + skill `/brain`.*
