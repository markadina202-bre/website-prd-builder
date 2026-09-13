---
name: verification-before-completion
description: Gerbang bukti sebelum klaim selesai. Evidence over claims. Pakai di akhir SEMUA task; JANGAN pernah skip.
source: https://github.com/obra/superpowers
install: git clone https://github.com/obra/superpowers ~/.claude/skills/superpowers
---

# Verification Before Completion (cache distilasi)

## Trigger
Setiap kali hendak berkata "selesai/done" — tanpa kecuali.

## Prinsip inti
- Klaim tanpa bukti = belum selesai. Bukti valid: test hijau (log),
  demo/screenshot, request sukses, file terverifikasi ada & benar.
- Checklist pre-completion: (1) kriteria done task terpenuhi semua?
  (2) tidak ada regresi? (3) artefak bisa dibuka/dijalankan pihak lain?
  (4) state tersimpan (memory/progress update)?
- Jika 1 saja gagal → kembali kerja, jangan "selesai dengan catatan".

## Cara pakai di proyek ini
Exit criteria tiap fase roadmap; quality gate skor PRD (skor = bukti
otomatis); checklist sebelum export & sebelum merge.

## Referensi penuh
Repo sumber: skills/verification-before-completion (superpowers).
