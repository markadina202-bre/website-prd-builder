---
name: get-shit-done
description: Loop spec-driven development ringan: spec → task → eksekusi → review. Pakai untuk ritme build harian yang anti-macet.
source: community (TÂCHES)
install: npx skills add get-shit-done
---

# Get Shit Done (cache distilasi)

## Trigger
Hari build baru, task menumpuk, atau butuh ritme eksekusi ketat.

## Prinsip inti
- Context engineering: bawa hanya konteks relevan per task (skill + file
  terkait), bukan seluruh repo. Hemat token, tajam fokus.
- Loop: spec kecil → task checklist → eksekusi 1-1 → review cepat →
  commit/persist → next. Jangan lompat task tanpa selesaikan definisi done.
- Meta-prompting: rumuskan ulang instruksi kabur jadi perintah tajam
  sebelum eksekusi. Waktu tanya < waktu benerin salah jalan.
- Akhir sesi: tulis pewarisan (progress/memory) — selaras P-007.

## Cara pakai di proyek ini
Ritme harian build + format kompatibilitas paket AI-Coding: user paste paket
ke Cursor/Claude → agen langsung masuk loop ini (spec=PRD, tasks=daftar slice).

## Referensi penuh
Sumber komunitas; pola inti tercakup di atas.
