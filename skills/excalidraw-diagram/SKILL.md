---
name: excalidraw-diagram
description: Hasilkan diagram arsitektur/alur visual gaya Excalidraw dari deskripsi sistem. Pakai untuk diagram PRD dan dokumentasi visual.
source: https://github.com/coleam00/excalidraw-diagram-skill
install: npx skills add https://github.com/coleam00/excalidraw-diagram-skill --skill excalidraw-diagram
---

# Excalidraw Diagram (cache distilasi)

## Trigger
Butuh diagram: arsitektur modul, user flow, ERD sederhana, sequence.

## Prinsip inti
- Input: deskripsi terstruktur (komponen + relasi) → output: file diagram
  Excalidraw yang rapi, label jelas, layout terbaca (kiri→kanan / atas→bawah).
- 1 diagram = 1 pesan. Pecah jika >12 elemen. Legenda bila ada warna/edge khusus.
- Selalu render & cek visual sebelum diserahkan (webapp-testing mindset).

## Cara pakai di proyek ini
Diagram otomatis di PRD final: (1) peta modul dari canvas,
(2) user flow utama dari blok A/C. Tersimpan sebagai aset proyek + PNG
untuk export PDF/PPTX.

## Referensi penuh
Repo sumber untuk format file + contoh.
