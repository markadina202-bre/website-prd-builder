---
name: pdf
description: Baca, buat, gabung, pisah, isi form, ekstrak teks/tabel/gambar, dan OCR file PDF. Pakai untuk export PRD ke PDF dan parsing dokumen.
source: https://github.com/anthropics/skills
install: npx skills add https://github.com/anthropics/skills --skill pdf
---

# PDF (cache distilasi)

## Trigger
Tugas apa pun yang melibatkan .pdf sebagai input/output: export PRD cantik,
gabung lampiran, ekstrak teks PRD lama user untuk diimpor.

## Prinsip inti
- Generate: markdown → HTML terstyled → PDF (template terkunci: cover,
  daftar isi, header/footer halaman, nomor halaman). Konsisten tiap export.
- Manipulasi: merge/split per halaman, isi form fields, ekstrak tabel/gambar,
  OCR untuk scan. Selalu validasi hasil (buka & cek halaman).
- Job berat (PRD 50+ halaman) jalan async (Inngest) + notifikasi saat jadi.

## Cara pakai di proyek ini
`prd.export.pdf` (Pro): render dari PRD markdown + diagram canvas.
Gratis: tidak tersedia (paywall). Template brand PRD Builder + watermark
hanya jika plan gratis (tidak berlaku karena fitur Pro saja).

## Referensi penuh
Install dari sumber untuk skrip Python + opsi lanjutan.
