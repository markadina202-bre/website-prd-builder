---
name: writing-plans
description: Pecah spec jadi rencana eksekusi task 2-5 menit tanpa placeholder. Pakai sebelum eksekusi kerja besar; pasangan executing-plans.
source: https://github.com/obra/superpowers
install: git clone https://github.com/obra/superpowers ~/.claude/skills/superpowers
---

# Writing Plans (cache distilasi)

## Trigger
Spec sudah beku (dari brainstorming) dan kerja butuh >15 menit. Jangan
rencanakan hal sepele; jangan eksekusi tanpa rencana untuk hal besar.

## Prinsip inti
- Task 2-5 menit, berurutan, tiap task punya: tujuan, file tersentuh,
  kriteria done yang bisa dicek. **No placeholders**: dilarang TBD/"mirip task N"/
  referensi tak terdefinisi — tiap task mandiri jelas.
- **Plan Self-Review inline**: spec coverage (semua spec terpetakan?),
  placeholder scan, konsistensi tipe/nama antar task.
- Eksekusi = executing-plans: kerjakan berurutan + checkpoint verifikasi
  per batch. Rencana boleh direvisi, tapi revisi tercatat.

## Cara pakai di proyek ini
Perencanaan tiap fase roadmap + pola generator "rencana eksekusi" di paket
AI-Coding (user paste ke Cursor → agen eksekusi plan ini).

## Referensi penuh
Repo sumber: skills/writing-plans + executing-plans (superpowers).
