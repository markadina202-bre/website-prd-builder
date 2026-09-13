---
name: pptx
description: Buat dan edit slide PowerPoint (.pptx): outline jadi deck, template brand, chart, speaker notes. Pakai untuk "Pitch PRD" 1-klik.
source: https://github.com/anthropics/skills
install: npx skills add https://github.com/anthropics/skills --skill pptx
---

# PPTX (cache distilasi)

## Trigger
Ubah PRD/rencana jadi slide presentasi, atau olah .pptx yang ada.

## Prinsip inti
- Alur: PRD → outline 10-12 slide (masalah, solusi, persona, fitur kunci,
  arsitektur, roadmap, KPI, risiko, next step) → render ke template brand.
- 1 ide per slide, visual > teks, chart untuk angka (KPI/estimasi),
  speaker notes terisi dari narasi PRD.
- Hormati template: slide master, warna brand, font aman (Calibri/Inter).

## Cara pakai di proyek ini
`prd.export.pptx` / tombol "Pitch PRD" (Pro). Async via Inngest.
Sumber konten = PRD final + diagram canvas.

## Referensi penuh
Install dari sumber (python-pptx) untuk detail API.
