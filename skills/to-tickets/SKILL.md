# to-tickets — Spec menjadi tiket tracer-bullet (distilasi)

- repo: mattpocock/skills (`skills/engineering/to-tickets`)
- url: https://github.com/mattpocock/skills
- install: `npx skills@latest add mattpocock/skills` (isi penuh di repo sumber)
- role: Pecah rencana/spec menjadi tiket vertical slice + blocking edges.

## Trigger
Ubah spec yang disetujui menjadi daftar tiket yang bisa dikerjakan berurutan.

## Prinsip inti
- **Tracer bullet**: tiap tiket = irisan vertikal sempit tapi LENGKAP (skema→API→UI→tes), bisa didemo sendiri, muat 1 konteks kerja. Bukan irisan horizontal per-layer.
- **Blocking edges**: tiap tiket deklarasikan tiket yang memblokirnya. Tanpa blocker = bisa mulai sekarang.
- **Wide refactor = pengecualian**: perubahan mekanis 1-bentuk seluruh codebase → pola expand–contract (tambah baru → migrasi batch → hapus lama), bukan tracer bullet.
- **Quiz user**: granularitas pas? edge benar? gabung/pecah? Iterasi sampai disetujui.
- **Kerjakan frontier**: tiket yang semua blocker-nya done. Rantai linear = atas ke bawah.
- Format tiket: What to build (perilaku end-to-end, bukan daftar layer) + Blocked by + Acceptance criteria. Tanpa path file.

## Pakai di proyek ini
Mesin FASE 3 (Wayfinder): kolom board = status tiket (fog→frontier→doing→done); destination = definisi selesai.

## Batasan
Granularitas salah (terlalu kasar/halus) = tiket tak berguna — quiz user wajib, bukan opsional.
