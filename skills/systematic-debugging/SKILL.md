---
name: systematic-debugging
description: Root-cause analysis 4 fase untuk bug kompleks. Pakai saat ada bug/error; JANGAN tebak-tebakan atau langsung patch tanpa reproduksi.
source: https://github.com/obra/superpowers
install: git clone https://github.com/obra/superpowers ~/.claude/skills/superpowers
---

# Systematic Debugging (cache distilasi)

## Trigger
Bug, error produksi, test gagal misterius, perilaku "kadang-kadang".

## Prinsip inti (4 fase)
1. **Reproduce**: buat sinyal pass/fail deterministik untuk bug SEBELUM
   berhipotesis. Tidak bisa direpro = belum boleh klaim paham.
2. **Isolate**: sempitkan scope ala binary search + log/instrumentasi.
   Teknik bundel: root-cause-tracing, defense-in-depth, condition-based-waiting.
3. **Hypothesize + Experiment**: ajukan hipotesis penyebab, uji satu per satu
   dengan eksperimen kecil. Satu variabel per eksperimen.
4. **Fix + Verify**: perbaiki sempit (jangan refactor sekalian), verifikasi
   sinyal hijau + tidak ada regresi (verification-before-completion).

## Cara pakai di proyek ini
Debug SkillRunner, canvas graph, webhook Midtrans/Polar. Pola yang sama
dipakai modul quality untuk "diagnosing-bugs PRD" (repro = contoh kontradiksi
konkret di dokumen, bukan firasat).

## Referensi penuh
Repo sumber: skills/systematic-debugging/SKILL.md (superpowers).
