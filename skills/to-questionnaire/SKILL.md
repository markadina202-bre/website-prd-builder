# to-questionnaire — Keputusan buntu menjadi kuesioner (distilasi)

- repo: mattpocock/skills (`skills/productivity/to-questionnaire`)
- url: https://github.com/mattpocock/skills
- install: `npx skills@latest add mattpocock/skills` (isi penuh di repo sumber)
- role: Tarik pengetahuan dari pihak yang tahu via dokumen kuesioner terstruktur.

## Trigger
Butuh jawaban dari seseorang (atau dari diri sendiri secara async) untuk keputusan yang tak bisa dijawab sekarang.

## Prinsip inti
- **Grill the send, not the subject**: hanya tanya soal pengiriman (ke siapa, butuh kembali apa) — bukan substansi yang memang belum diketahui.
- Urutan: (1) siapa penerima (peran, expertise, relasi → nada + konteks dokumen), (2) apa yang harus dibawa pulang (daftar keputusan/fakta konkret), (3) tulis dokumen.
- Struktur: judul + Purpose + From/To/pemakaian jawaban → Context 1 paragraf → How to answer (deadline, effort, "I don't know" BOLEH + flag ragu) → `##` per tema (>segenggam soal) → catch-all "Anything else?".
- Tiap soal: **paling penting dulu** (async = mungkin cuma 1 pass), 1 ide per soal (tak pernah compound), stub jawaban tepat di bawah, _why this matters_ sebaris hanya jika bisa disalahbaca/mengundang jawaban asal.

## Pakai di proyek ini
Mesin FASE 2 (Form) — SUDAH DITERAPKAN: tiap soal 1 ide + "Kenapa ditanya" + opsi a/b/c/d dengan stub tulis.

## Batasan
Kuesioner bukan pengganti diskusi untuk keputusan yang butuh debat bolak-balik.
