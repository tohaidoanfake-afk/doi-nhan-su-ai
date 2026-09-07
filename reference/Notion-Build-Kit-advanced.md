# SECOND BRAIN (LLM WIKI) — BUILD KIT
*Tài liệu để một AI assistant đọc rồi tự dựng hệ second brain cho 1 user, từ con số 0.*

> **Đọc kỹ trước khi làm.** Đây là blueprint tái lập. Mỗi user = một bộ database mới với ID riêng. AI phải: (1) tạo database, (2) ghi lại ID mới, (3) nhét ID vào skill `/brain`, (4) smoke test. Đừng dùng lại ID của người khác.

---

## 0. Mô hình tư duy (vì sao làm thế này)

Đây là pattern **LLM Wiki** của Andrej Karpathy. Thay vì RAG (truy hồi mẩu text thô mỗi lần hỏi → không tích lũy), AI **biên tập** nguồn thành các trang wiki dày, liên kết chéo. Kiến thức được *compile một lần* và *cộng dồn* theo thời gian.

**Khẩu quyết: Stop re-deriving, start compiling.**

Vai trò:
- **User** sở hữu: tìm nguồn, khám phá, đặt câu hỏi.
- **AI** sở hữu: tóm tắt, liên kết chéo, sắp xếp, bookkeeping.

---

## 1. Kiến trúc — 3 lớp = 3 Notion database

| Lớp Karpathy | Database | Vai trò | Ai ghi |
|---|---|---|---|
| `raw/` (bất biến) | **📥 Sources** | Nguồn thô: bài viết, video, PDF, note. Không bao giờ bị AI sửa. | User thả vào |
| `wiki/` (AI sở hữu) | **📚 Wiki** | Trang tổng hợp: Summary / Entity / Concept / Comparison / Synthesis. Liên kết qua `Related`. | AI sở hữu hoàn toàn |
| `log.md` (append-only) | **🧾 Log** | 1 dòng mỗi lần ingest. Truy vết brain lớn lên thế nào. | Chỉ thêm, không sửa |

`index.md` của Karpathy = **view native của Notion** (group Wiki theo Page Type / Topic), không cần file index thủ công.
Lớp `schema` (CLAUDE.md) của Karpathy = **skill `/brain`** cài trong AI.

---

## 2. SETUP — các bước AI thực thi

### Yêu cầu trước
- Notion MCP đã kết nối (các tool `notion-create-database`, `notion-create-pages`, `notion-update-page`, `notion-update-data-source`, `notion-search`).
- Quyền tạo page/database trong workspace của user.

### Bước 1 — Tạo hub page
Tạo 1 page (private hoặc trong teamspace tùy user) tên `🧠 Second Brain (LLM Wiki)`. Phần body mô tả cách dùng. **Ghi lại `HUB_PAGE_ID`.**

### Bước 2 — Tạo 📥 Sources (dưới hub)
```sql
CREATE TABLE (
  "Title" TITLE,
  "Type" SELECT('Article':blue,'Video':red,'PDF':orange,'Note':gray,'Conversation':purple,'Book':green,'Tweet/Post':pink),
  "Status" SELECT('Inbox':red,'Ingesting':yellow,'Ingested':green),
  "URL" URL,
  "Added" CREATED_TIME,
  "Tags" MULTI_SELECT('AI':blue,'Business':green,'Marketing':pink,'Personal':gray,'Tech':purple),
  "Notes" RICH_TEXT
)
```
**Ghi lại `SOURCES_DS_ID`** (data source id trong tag `<data-source url="collection://...">`).

### Bước 3 — Tạo 📚 Wiki (dưới hub), quan hệ 2 chiều về Sources
```sql
CREATE TABLE (
  "Title" TITLE,
  "Page Type" SELECT('Summary':blue,'Entity':orange,'Concept':purple,'Comparison':yellow,'Synthesis':green,'Index':gray),
  "Topic" MULTI_SELECT('AI':blue,'Business':green,'Marketing':pink,'Personal':gray,'Tech':purple),
  "Sources" RELATION('<SOURCES_DS_ID>', DUAL 'Wiki Pages'),
  "Updated" LAST_EDITED_TIME,
  "Source Count" ROLLUP('Sources','Title','count')
)
```
**Ghi lại `WIKI_DS_ID`.** Rồi thêm self-relation `Related` (= wikilinks) bằng `update-data-source`:
```sql
ADD COLUMN "Related" RELATION('<WIKI_DS_ID>', DUAL 'Related to' 'related_to')
```

### Bước 4 — Tạo 🧾 Log (dưới hub), quan hệ về Sources + Wiki
```sql
CREATE TABLE (
  "Entry" TITLE,
  "When" CREATED_TIME,
  "Action" SELECT('ingest':green,'refactor':yellow,'merge':orange,'prune':red),
  "Source" RELATION('<SOURCES_DS_ID>', DUAL 'Log Entries'),
  "Pages Touched" RELATION('<WIKI_DS_ID>', DUAL 'Log Entries'),
  "Summary" RICH_TEXT
)
```
**Ghi lại `LOG_DS_ID`.**

### Bước 5 — Cài skill `/brain`
Tạo file `~/.claude/skills/brain/SKILL.md` theo template ở **Phần 4**, thay 4 placeholder `{{HUB_PAGE_ID}}`, `{{SOURCES_DS_ID}}`, `{{WIKI_DS_ID}}`, `{{LOG_DS_ID}}` bằng ID thật vừa ghi.
*(Nếu AI không phải Claude Code: nhúng nội dung skill thành system prompt / custom instruction.)*

### Bước 6 — Smoke test
1. Tạo 1 Source thử (1 bài viết bất kỳ), Status = Inbox.
2. Chạy `/brain ingest` → kiểm: có Summary + vài Entity/Concept, tất cả cross-link, có 1 Log row, Source flip `Ingested`.
3. Chạy `/brain ask <câu hỏi>` → AI trả lời từ trang Wiki (search `WIKI_DS_ID`), có dẫn nguồn.
4. Đạt cả 3 = setup xong.

---

## 3. Quy tắc vận hành (cốt lõi của hệ)

### 4 thao tác
- **Ingest** (lõi): đọc nguồn → bàn takeaway với user → viết Summary → cập nhật mọi Entity/Concept liên quan (1 nguồn chạm 10–15 trang) → cross-link → ghi Log → flip Status.
- **Query** (`ask`): trả lời TỪ Wiki đã tổng hợp (không từ raw, không từ general knowledge mà không báo). Câu trả lời giá trị có thể thành trang Wiki mới.
- **Lint** (định kỳ): rà mâu thuẫn, claim cũ, trang mồ côi (0 link), thiếu cross-reference.
- **Status**: đếm Source theo Status, Wiki theo Page Type, Log gần nhất, trang orphan.

### Iron rules
1. **Không bao giờ sửa body Source.** Bất biến. Chỉ được đổi Status + thêm Notes.
2. **AI sở hữu Wiki** — tự do tạo/sửa/merge/link.
3. **1 nguồn chạm nhiều trang** — đừng chỉ viết 1 Summary.
4. **Luôn cross-link** qua `Related`. Trang 0 link = thất bại.
5. **Luôn ghi Log**, append-only.
6. **Tương tác user khi ingest** (chế độ mặc định: bàn takeaway trước khi viết).
7. **Markdown dày, không fluff.** Viết cho LLM suy luận, không phải cho SEO.
8. **Nghi ngờ trùng → search trước → merge thay vì tạo mới.**

---

## 4. Template skill `/brain` (thay placeholder rồi lưu thành SKILL.md)

```markdown
---
name: brain
description: Drive the user's Notion "Second Brain (LLM Wiki)" — an LLM-owned knowledge base (Karpathy's LLM Wiki pattern). Use to ingest a source, ask the brain, or check status. Triggers — "/brain", "ingest this", "add to my second brain", "what does my brain know about X", "brain status".
---

# Second Brain (LLM Wiki) — operating spec

You are the research librarian for the user's knowledge base. You own the Wiki. The user drops sources and asks questions. Stop re-deriving — start compiling. All work via Notion MCP.

## Store (live IDs)
- Hub page: {{HUB_PAGE_ID}}
- 📥 Sources: {{SOURCES_DS_ID}}
- 📚 Wiki: {{WIKI_DS_ID}}
- 🧾 Log: {{LOG_DS_ID}}

Sources props: Title, Type, Status(Inbox/Ingesting/Ingested), URL (key = "userDefined:URL"), Tags, Notes.
Wiki props: Title, Page Type(Summary/Entity/Concept/Comparison/Synthesis/Index), Topic, Sources(relation), Related(self-relation=wikilinks), Source Count(rollup).
Log props: Entry, Action(ingest/refactor/merge/prune), Source(relation), Pages Touched(relation), Summary.

## Iron rules
1. Never edit a Source's body (immutable). Only flip Status / add Notes.
2. You own the Wiki — create/update/merge/link freely.
3. One source can touch 10–15 Wiki pages. Don't just write a summary.
4. Always cross-link via Related. A page with no links is a failure.
5. Always log every ingest (append-only).
6. Stay involved with the user during ingest (discuss takeaways first).
7. Dense markdown, no fluff. Search before creating to avoid duplicates.

## /brain ingest
Find Sources with Status=Inbox. One source at a time:
1. Read source body. If URL with no body, fetch content first. Flip Status→Ingesting.
2. Tell the user 3–6 key takeaways; ask if they want to add an angle (skip pause if user said "auto").
3. Create a Wiki Summary page, linked to the Source via Sources.
4. For each person/company/tool → find-or-create an Entity page, update it, link via Related.
5. For each idea/framework → find-or-create a Concept page, link via Related.
6. Note contradictions explicitly (don't silently overwrite).
7. If a topic now has 4+ sources, update/create a Synthesis page.
8. Add a Log row: Entry=`[YYYY-MM-DD] ingest | <title>`, Action=ingest, Source, Pages Touched=all pages touched, Summary=one line.
9. Flip Source Status→Ingested. Report pages created/updated/linked.

## /brain ask <question>
Answer FROM the Wiki, not raw sources. Semantic-search {{WIKI_DS_ID}}, fetch top pages, answer with citations to page titles. If the Wiki can't answer, say so + suggest what to ingest. Don't fall back to general knowledge without flagging it.

## /brain status
Sources by Status, Wiki by Page Type, 5 most recent Log entries, Wiki pages with 0 Related links (orphans).

## /brain capture <url-or-text>
Quick-add to Inbox without ingesting: create a Sources row Status=Inbox, fetch+store body if URL.
```

---

## 5. ⚠️ Gotchas (học từ lần build thật — đọc để khỏi vấp)

1. **Property tên `URL` hoặc `ID`** phải dùng key `userDefined:URL` / `userDefined:id` khi create/update page (Notion bắt buộc).
2. **Set relation** (`Sources`, `Related`, `Source`, `Pages Touched`): truyền **JSON array các page URL**, không phải ID trần. VD: `"Sources": "[\"https://notion.so/p/<id>\"]"`.
3. **Self-relation `Related`** phải thêm bằng `update-data-source` SAU khi tạo Wiki DB (không tạo inline trong CREATE TABLE được).
4. **Cross-link 2 pha:** tạo hết các trang trước để có URL → rồi 1 lượt `update-page` set `Related`. Không thể link trang chưa tồn tại.
5. **Notion MCP KHÔNG trash được trang lẻ** (chỉ trash cả data source). Muốn dọn data test: tạo 1 container page, `move-pages` gom hết vào, rồi để user xóa container.
6. **`rollup`/`created_time`/`last_edited_time` là read-only** — đừng cố set giá trị.
7. **Ingest 1 nguồn 1 lần**, giữ user trong vòng lặp — chất lượng tổng hợp cao hơn batch.

---

## 6. Phương án thay thế: folder markdown (bản gốc Karpathy, không Notion)

Nếu user không dùng Notion, dựng y hệt bằng thư mục:
```
SecondBrain/
  raw/        # nguồn bất biến (1 file / nguồn)
  wiki/       # trang AI tổng hợp (.md), wikilink [[...]]
  index.md    # mục lục theo category
  log.md      # append-only: ## [YYYY-MM-DD] ingest | Title
  CLAUDE.md   # = nội dung spec Phần 3 + 4
```
Cùng quy tắc, cùng 4 thao tác. AI (Claude Code) đọc `CLAUDE.md`, đọc/ghi file trực tiếp. Đơn giản nhất, hợp khi user sống trong terminal. Mở `wiki/` bằng Obsidian để có graph view.

---

*Build Kit v1 — đi kèm: Persona-Extraction-Protocol.md (khai thác user) + skill /onboard (phỏng vấn → wiki).*
