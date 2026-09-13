---
name: impeccable
description: Selera desain + konteks produk + 12 command (shape, craft, critique, polish, audit...). Pakai sebagai alur desain resmi halaman besar.
source: https://github.com/pbakaus/impeccable
install: npx skills add https://github.com/pbakaus/impeccable
---

# Impeccable (cache distilasi)

## Trigger
Dua lapis: (1) otomatis — skill guidance termuat saat tugas menunjuk
(page/component/review); (2) eksplisit — kata pertama = command
(craft, critique, polish, audit, ...).

## Prinsip inti
- Commands: teach, document, shape, craft, critique, audit, polish,
  adapt, optimize, typeset, layout, (+lainnya). Tiap command punya
  workflow + setup gate sendiri.
- craft mewajibkan: brief bentuk terkonfirmasi + arah visual (bila ada
  image-gen) + inspeksi browser + ≥1 loop kritik-perbaiki kecuali
  pass pertama tanpa cacat material.
- DESIGN.md sebagai sumber arah (selaras standar Google design.md):
  token, aturan visual, konteks produk — bukan catatan hilang di chat.

## Cara pakai di proyek ini
Alur resmi halaman besar: shape → craft → critique → polish.
DESIGN.md produk disimpan per-proyek user + 1 DESIGN.md global app.

## Referensi penuh
Repo sumber untuk 12 command + setup gates.
