# to-spec — Percakapan menjadi spec (distilasi)

- repo: mattpocock/skills (`skills/engineering/to-spec`)
- url: https://github.com/mattpocock/skills
- install: `npx skills@latest add mattpocock/skills` (isi penuh di repo sumber)
- role: Sintesis spec dari konteks yang SUDAH ada — tanpa wawancara tambahan.

## Trigger
Ubah hasil diskusi (grill + form + tiket + canvas) menjadi spec terstruktur.

## Prinsip inti
- **Tanpa interview**: hanya sintesis apa yang sudah diketahui. Jangan tanya lagi.
- **Seams dulu**: tentukan di jahitan mana fitur diuji (pilih seam tertinggi, idealnya 1). Konfirmasi ke user sebelum menulis.
- **Template baku**: Problem Statement → Solution → User Stories (panjang, format `As <actor>, I want <feature>, so that <benefit>`) → Implementation Decisions → Testing Decisions → Out of Scope → Further Notes.
- **Tanpa path file/snippet** di spec (cepat basi). Pengecualian: snippet prototipe yang mengkodekan keputusan lebih presisi dari prosa — sebaris seperlunya + catat sumbernya.
- Keputusan implementasi: modul disentuh, interface, klarifikasi teknis, ADR, skema, kontrak API, interaksi spesifik.

## Pakai di proyek ini
Mesin FASE 5 (PRD Final): input = seluruh artefak proyek → output = spec Indonesia mengikuti template ini (diperluas dengan skema prd-schema).

## Batasan
Butuh konteks cukup; tanpa glossary/ADR hasilnya generik — pasangkan dengan domain-modeling.
