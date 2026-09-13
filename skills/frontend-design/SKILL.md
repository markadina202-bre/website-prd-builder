---
name: frontend-design
description: Ciptakan UI web production-grade yang khas dan berani. Pakai saat bikin halaman/komponen React, Tailwind, dashboard, landing, atau visualisasi. Anti AI-slop.
source: https://github.com/anthropics/skills
install: npx skills add https://github.com/anthropics/skills --skill frontend-design
---

# Frontend Design (cache distilasi)

## Trigger
Bikin/ubah UI apa pun: landing, dashboard, chat, form, kanban, canvas toolbar,
PRD preview, pricing. Jangan dipakai untuk logika backend murni.

## Prinsip inti
- **Bold decisions**: tipografi berkarakter, palet disengaja, spacing lega,
  motion bermakna. Larangan: gradien ungu generik, card hambar, lorem ipsum.
- Hierarki dulu: 1 pesan utama per viewport, CTA jelas, states lengkap
  (loading, empty, error, success) — bukan cuma happy path.
- React + Tailwind + shadcn: komposisi kecil, token desain konsisten,
  aksesibilitas (kontras, focus ring, aria) bawaan.
- Iterasi visual: render → screenshot → nilai → perbaiki (pasangan: webapp-testing).

## Cara pakai di proyek ini
Aktif untuk semua halaman PRD Builder. Rasa: Indonesia-first, playful-professional,
Bahasa Indonesia. Setiap komponen baru wajib punya 4 state + responsif mobile.

## Referensi penuh
Install dari sumber untuk panduan lengkap + contoh.
