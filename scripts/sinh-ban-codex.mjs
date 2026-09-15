#!/usr/bin/env node
// Sinh bản skill cho Codex: .claude/skills/  ->  .agents/skills/
//
// Vì sao có file này: Codex tìm skill ở `.agents/skills/` (tài liệu OpenAI, đối chiếu 14/09/2026),
// không đọc `.claude/skills/`. Bản trước của bộ khung bảo người dùng tự chép sang `.codex/skills/`,
// một chỗ Codex không đọc, nên chép xong vẫn không có skill nào và không có lỗi nào báo.
//
// Người BẢO TRÌ chạy trước mỗi lần phát. Người dùng bộ khung KHÔNG cần chạy.
//   node scripts/sinh-ban-codex.mjs          ghi lại toàn bộ .agents/skills/
//   node scripts/sinh-ban-codex.mjs --kiem   chỉ kiểm; bản Codex lệch bản gốc thì thoát mã 1
//
// Nguồn sự thật vẫn là `.claude/skills/`. Sửa ở đó, rồi chạy lại file này. Đừng sửa `.agents/skills/`.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const GOC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const NGUON = path.join(GOC, '.claude', 'skills')
const DICH = path.join(GOC, '.agents', 'skills')
const KIEM = process.argv.includes('--kiem')

const TEN = fs.readdirSync(NGUON).filter((t) => fs.statSync(path.join(NGUON, t)).isDirectory())

// `/nap-kho` -> `$nap-kho`. Không đụng đường dẫn kiểu `.claude/skills/nap-kho/SKILL.md`:
// dấu `/` phải không đứng sau chữ, dấu chấm, gạch hay một `/` khác, và tên không được nối tiếp bằng `/` hay `-`.
const LENH = new RegExp(`(?<![\\w/.\\-])/(${TEN.join('|')})\\b(?![/\\-])`, 'g')

function dauBanSinh(tenSkill) {
  return `> ⚙️ **Bản sinh tự động cho Codex** từ \`.claude/skills/${tenSkill}/\`. Sửa ở bản gốc rồi chạy \`node scripts/sinh-ban-codex.mjs\`. Đừng sửa file này: lần sinh sau sẽ ghi đè.\n`
}

function doi(noiDung, tenSkill, laSkillMd) {
  let s = noiDung
    .replace(LENH, (_, ten) => `$${ten}`)
    .replaceAll('.claude/skills/', '.agents/skills/')
    .replaceAll('`.claude/`', '`.agents/`')
  const dau = dauBanSinh(tenSkill)
  if (laSkillMd) {
    // Frontmatter phải đứng đầu file, nên dấu bản sinh chèn NGAY SAU frontmatter.
    const m = /^---\n[\s\S]*?\n---\n/.exec(s)
    if (!m) throw new Error(`${tenSkill}/SKILL.md không có frontmatter`)
    s = m[0] + '\n' + dau + s.slice(m[0].length)
  } else {
    s = dau + '\n' + s
  }
  return s
}

function duyet(thuMuc, goc = thuMuc) {
  const ra = []
  for (const t of fs.readdirSync(thuMuc)) {
    const p = path.join(thuMuc, t)
    if (fs.statSync(p).isDirectory()) ra.push(...duyet(p, goc))
    else ra.push(path.relative(goc, p))
  }
  return ra
}

const muonCo = new Map()
for (const rel of duyet(NGUON)) {
  const tenSkill = rel.split(path.sep)[0]
  const buf = fs.readFileSync(path.join(NGUON, rel))
  muonCo.set(rel, rel.endsWith('.md') ? doi(buf.toString('utf8'), tenSkill, path.basename(rel) === 'SKILL.md') : buf)
}

if (KIEM) {
  const dangCo = fs.existsSync(DICH) ? new Set(duyet(DICH)) : new Set()
  const lech = []
  for (const [rel, nd] of muonCo) {
    const p = path.join(DICH, rel)
    if (!dangCo.has(rel)) lech.push(`thiếu   ${rel}`)
    else if (!fs.readFileSync(p).equals(Buffer.from(nd))) lech.push(`cũ      ${rel}`)
    dangCo.delete(rel)
  }
  for (const rel of dangCo) lech.push(`thừa    ${rel}`)
  if (lech.length) {
    console.error(`✕ Bản Codex lệch bản gốc ở ${lech.length} file:\n  ` + lech.join('\n  '))
    console.error('Chạy: node scripts/sinh-ban-codex.mjs')
    process.exit(1)
  }
  console.log(`✓ .agents/skills/ khớp .claude/skills/ (${muonCo.size} file, ${TEN.length} skill)`)
} else {
  fs.rmSync(DICH, { recursive: true, force: true })
  for (const [rel, nd] of muonCo) {
    const p = path.join(DICH, rel)
    fs.mkdirSync(path.dirname(p), { recursive: true })
    fs.writeFileSync(p, nd)
  }
  console.log(`✓ Đã sinh .agents/skills/ (${muonCo.size} file, ${TEN.length} skill: ${TEN.join(', ')})`)
}
