---
name: docx
description: Buat, edit, dan analisis dokumen Word (.docx) dengan style, tabel, dan tracked changes. Pakai untuk export PRD yang bisa diedit klien.
source: https://github.com/anthropics/skills
install: npx skills add https://github.com/anthropics/skills --skill docx
---

# DOCX (cache distilasi)

## Trigger
Export PRD ke Word, atau olah .docx (template klien, impor PRD lama).

## Prinsip inti
- Generate dari struktur: Heading 1-3 = bab PRD, tabel untuk user stories
  (ID, story, AC, prioritas), style terkunci agar rapi dibuka di Word/WPS.
- Dukung tracked changes saat revisi AI atas dokumen user (opsional Pro).
- Selalu verifikasi: buka file, cek style tidak rusak, tabel tidak kepotong.

## Cara pakai di proyek ini
`prd.export.docx` (Pro). Template mencakup cover + tabel revisi + ADR appendix.
Async via Inngest untuk dokumen besar.

## Referensi penuh
Install dari sumber (python-docx) untuk detail API.
