---
name: agent-browser
description: Otomasi browser production-grade untuk agen: navigasi, klik, isi form, screenshot, scraping. Pakai untuk testing UI & riset web AFK.
source: community (14K stars)
install: npm install -g agent-browser
---

# Agent Browser (cache distilasi)

## Trigger
Butuh agen mengendalikan browser sungguhan: uji alur UI end-to-end atau
kumpulkan fakta dari web (riset).

## Prinsip inti
- Berbasis referensi elemen (ref): temukan → aksi (klik/isi) → verifikasi
  hasil → screenshot bukti. Jangan "yakin" tanpa screenshot.
- Untuk testing: skenario = journey nyata + assertion eksplisit per langkah;
  simpan untuk regresi (pasangan webapp-testing/Playwright).
- Untuk riset: batasi domain & halaman, ekstrak fakta + sumber URL,
  ringkas jadi temuan ber-ID (masuk tiket Research wayfinder).
- Hormati: rate limit, ToS situs, jangan scrape data sensitif/pribadi.

## Cara pakai di proyek ini
(1) E2E UI tiap fase. (2) Eksekutor tiket Research AFK: baca docs/web →
temuan + sumber → update fog/board otomatis.

## Referensi penuh
Docs paket agent-browser (npm) untuk API lengkap.
