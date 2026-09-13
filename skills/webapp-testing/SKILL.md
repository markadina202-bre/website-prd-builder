---
name: webapp-testing
description: Uji aplikasi web lokal dengan Playwright untuk verifikasi UI dan debugging. Pakai saat perlu membuktikan alur berjalan, bukan sekadar "kayaknya jalan".
source: https://github.com/anthropics/skills
install: npx skills add https://github.com/anthropics/skills --skill webapp-testing
---

# Webapp Testing (cache distilasi)

## Trigger
Setelah bikin/ubah alur UI: grill chat, form ABCD, kanban, canvas, export, checkout.
Terutama sebelum klaim "selesai" (verification-before-completion).

## Prinsip inti
- Jalankan dev server lokal, otomasi browser sungguhan (Playwright):
  navigasi, klik, isi form, screenshot tiap langkah kunci.
- Screenshot-driven iteration: lihat hasil visual, bandingkan dengan ekspektasi,
  perbaiki, ulangi. Jangan percaya DOM saja.
- Skenario = user journey nyata (mis. "ide → 3 jawaban grill → ABCD terisi"),
  bukan klik acak. Simpan skenario agar bisa di-rerun (regresi).
- Tangkap console error + failed request; nol error = syarat lolos.

## Cara pakai di proyek ini
Satu skenario E2E per fase roadmap (grill, abcd, wayfinder, canvas, prd, billing).
Jalankan sebelum merge ke main.

## Referensi penuh
Install dari sumber untuk skrip + pola Playwright lengkap.
