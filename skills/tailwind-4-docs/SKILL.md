---
name: tailwind-4-docs
description: Dokumentasi Tailwind CSS v4 untuk agen: gotchas, playbook implementasi/refactor/review, snapshot docs lokal. Rujukan wajib styling (app memakai v4).
source: https://github.com/Lombiq/Tailwind-Agent-Skills
install: npx skills add Lombiq/Tailwind-Agent-Skills
---

# Tailwind 4 Docs (cache distilasi)

## Trigger
Styling apa pun di Tailwind v4: utility baru, @theme, refactor CSS, review,
migrasi pola v3 → v4.

## Prinsip inti
- v4 = CSS-first: konfigurasi via `@theme` di CSS (bukan tailwind.config.js),
  `@import "tailwindcss"`, plugin via Vite (`@tailwindcss/vite`).
- Cek gotchas dulu: specificity `@layer`, urutan import, arbitrary values,
  dynamic utilities yang tidak ter-generate (hindari menggabungkan string
  class secara dinamis — safelist bila perlu).
- Playbook: implementasi (token → utility → komponen) → refactor (duplikasi
  jadi komponen/utility) → review (konsistensi token, dead classes).
- Snapshot docs lokal + index: muat hanya kategori yang dibutuhkan
  (hemat konteks — sejalan dengan arsitektur index repo ini).

## Cara pakai di proyek ini
Rujukan styling utama. Token brand di `@theme` (app.css); utility eksotis
wajib cek gotchas; tidak ada warna/font hardcode di luar token.

## Referensi penuh
Repo Lombiq (snapshot generator + docs-index + playbook).
