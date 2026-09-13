---
name: antislop-suite
description: Filter 38 aturan anti-slop untuk UI, copy, manusia, mobile, dan komentar kode + Delivery Gate PASS/FAIL. FILTER, bukan style guide — arah desain tetap dari DESIGN.md.
source: https://github.com/miqdadbadjuber/Anti-Slop
install: npx skills add https://github.com/miqdadbadjuber/Anti-Slop
---

# Antislop Suite (cache distilasi)

## Trigger
Bangun UI baru (mode During) atau bersihkan output lama (mode After:
temuan bernomor → user approve → perbaiki → laporan susulan).

## Prinsip inti
- 6 skill: core (aturan + gate), ui (layout/warna/komponen/motion),
  copywriting (headline/CTA/nada, anti pola tulis-AI), human (kontras,
  keyboard, focus, states), layoutmobile (breakpoint/grid/tap target),
  code (rapikan komentar generik, JANGAN sentuh kode).
- 38 aturan 3 tier: Hard Gate (mutlak) → Purpose-Gate (teknik boleh,
  alasan wajib) → Quality Locks (konsistensi).
- Liveliness Toolkit: 3 dial (ENERGY/RHYTHM/MOTION) + Design Read —
  hasil harus hidup & spesifik, bukan sekadar "bersih".
- Delivery Gate: laporan PASS/FAIL 4 blok WAJIB sebelum ship.
  Hasil steril = arah desain (DESIGN.md) hilang, bukan filter gagal.

## Cara pakai di proyek ini
During untuk tiap halaman baru; After untuk audit landing/dashboard lama.
Semua copy Indonesia (CTA, empty/error states) lewat antislop-copywriting.

## Referensi penuh
Repo sumber (MIT): antislop.md inti + 6 skill + First-Run wizard.
