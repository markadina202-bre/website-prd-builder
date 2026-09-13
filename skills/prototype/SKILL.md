# prototype — Kode sekali-pakai penjawab pertanyaan (distilasi)

- repo: mattpocock/skills (`skills/engineering/prototype`)
- url: https://github.com/mattpocock/skills
- install: `npx skills@latest add mattpocock/skills` (isi penuh di repo sumber)
- role: Bangun prototipe throwaway untuk menjawab SATU pertanyaan desain.

## Trigger
"Ragu state model/logika ini terasa benar?" atau "UI-nya sebaiknya seperti apa?".

## Prinsip inti
- **Pertanyaan menentukan bentuk** (salah cabang = kerja sia-sia):
  - Logika/state → 1 file HTML mandiri (tombol free-play + walkthrough terpandu, bisa dikemudikan non-developer).
  - UI → beberapa variasi RADIKAL berbeda di 1 route (`?variant=` + bilah alih bawah).
- Aturan: throwaway sejak hari-1 + jelas bernama prototipe (dekat modul yang diprototipe); trivial dijalankan (1 perintah / klik 2x); tanpa persistensi (state di memori); skip polish (tanpa tes/abstraksi); **state selalu terlihat** tiap aksi; selesai → keputusan valid dilipat ke kode asli, prototipe di-commit ke branch throwaway + pointer konteks di issue.

## Pakai di proyek ini
Internal builder (cek keraguan UI/logika tiap fase) + calon kapabilitas produk Fase 6 ("Prototoipe").

## Batasan
Prototipe bukan fondasi — jangan pernah "melanjutkan" kode prototipe menjadi produksi.
