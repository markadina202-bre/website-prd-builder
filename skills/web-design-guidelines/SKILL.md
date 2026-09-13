---
name: web-design-guidelines
description: Checklist implementasi web praktis: semantic HTML, focus states, gambar, dan kesalahan umum. Pakai sebagai standar markup tiap halaman.
source: https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines
install: npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
---

# Web Design Guidelines (cache distilasi)

## Trigger
Menulis/me-review markup: halaman baru, refactor komponen, audit pra-rilis.

## Prinsip inti
- Semantic dulu: landmark (header/main/nav/footer), heading berurutan,
  tombol vs link sesuai fungsi, form berlabel.
- States non-visual: focus-visible jelas, keyboard reachable, aria
  seperlunya (jangan aria-berlebihan), alt + dimensi gambar eksplisit
  (cegah layout shift).
- Larangan umum: div-untuk-semua, teks dalam gambar, kontras di bawah
  ambang, target sentuh kekecilan, motion tanpa reduced-motion fallback.

## Cara pakai di proyek ini
Standar markup + canvas/kanban (drag juga harus keyboard-operable).
Ditegakkan bersama web-quality-skills (a11y) saat quality gate.

## Referensi penuh
Repo vercel-labs/agent-skills (satu keluarga dengan react-best-practices).
