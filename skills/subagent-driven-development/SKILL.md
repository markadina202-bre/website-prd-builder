---
name: subagent-driven-development
description: Orkestrasi subagen paralel terisolasi + review 2 tahap ala tech-lead. Pakai untuk task besar/paralel; JANGAN untuk task 5 menit.
source: https://github.com/obra/superpowers
install: git clone https://github.com/obra/superpowers ~/.claude/skills/superpowers
---

# Subagent-Driven Development (cache distilasi)

## Trigger
Plan punya banyak task independen (mis. 5 modul SkillRunner) atau butuh
isolasi konteks (riset web vs coding).

## Prinsip inti
- Main agent = tech lead: bagi task, tulis brief tajam per subagen
  (tujuan, scope file, kriteria done, larangan), luncurkan paralel.
- Tiap hasil subagen wajib **2-stage review**: (1) spec conformance —
  sesuai brief? (2) code quality — rapi, aman, ada test?
- Merge hati-hati: selesaikan konflik, verifikasi integrasi
  (verification-before-completion). Gagal review = kembalikan dengan feedback
  konkret, bukan "coba lagi".

## Cara pakai di proyek ini
Build paralel modul SkillRunner; pola runtime tiket Research AFK
(subagen riset → hasil → review → masuk fog/board). Pasangan Inngest jobs.

## Referensi penuh
Repo sumber: skills/subagent-driven-development (superpowers).
