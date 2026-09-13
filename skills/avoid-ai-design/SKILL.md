---
name: avoid-ai-design
description: Audit frontend hasil AI dan rewrite agar tidak terlihat AI-generated. Pakai untuk de-slop halaman/komponen; mode detect-only tersedia untuk audit tanpa ubah.
source: https://github.com/funboy322/avoid-ai-design
install: npx skills add https://github.com/funboy322/avoid-ai-design
---

# Avoid AI Design (cache distilasi)

## Trigger
Halaman/komponen terlihat generik ("template AI"): panggil "de-slop halaman X"
atau "audit App untuk AI tells, jangan ubah dulu".

## Prinsip inti
- Katalog tells 9 kategori: tipografi (Inter default, tanpa display face),
  warna (gradien ungu-biru, shadcn zinc mentah, tombol biru default),
  layout (hero tengah + 3 kartu + CTA, pricing 3 tier template),
  komponen (rounded-2xl shadow-lg di semua permukaan, glassmorphism refleks),
  spacing seragam, motion nihil/seragam, ikon lucide pasaran, copy klise
  ("Elevate/Seamless"), imagery placeholder.
- Severity: P0 (kentara AI saat dilihat) → P1 (bau AI) → P2 (kosmetik).
  Wajib: 1 arah desain dikomitmen, lalu semua perubahan mengikuti arah itu.
- Alur: Scope → Audit (baca kode + screenshot bila ada; tiap temuan =
  lokasi, kategori, severity, KENAPA terbaca AI) → Rewrite → Bukti before/after.

## Cara pakai di proyek ini
Gate tiap halaman: detect-only → bereskan P0/P1 → rewrite. Pasangan kreasi =
frontend-design; pasangan filter = antislop-suite.

## Referensi penuh
Repo sumber (MIT): SKILL.md + references/ai-tells-catalog.md + examples/demo/.
