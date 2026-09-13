---
name: test-driven-development
description: Kembangkan dengan RED-GREEN-REFACTOR yang ditegakkan. Pakai untuk semua fitur; implementasi tanpa test duluan = hapus dan ulangi.
source: https://github.com/obra/superpowers
install: git clone https://github.com/obra/superpowers ~/.claude/skills/superpowers
---

# Test-Driven Development (cache distilasi)

## Trigger
Semua penulisan kode fitur/bugfix. Ini enforcement, bukan saran.

## Prinsip inti
- **RED**: tulis test gagal dulu yang mengekspresikan perilaku (1 vertical
  slice per test — ala mattpocock/tdd: sepakati "seam" dulu).
- **GREEN**: tulis kode minimal agar hijau. Dilarang gold-plating.
- **REFACTOR**: rapikan tanpa ubah perilaku, test tetap hijau.
- Anti-pattern (bundel testing-anti-patterns): test rapuh, mock berlebihan,
  test implementasi-bukan-perilaku, suite lambat. Test harus cepat & deterministik.
- Jika agen menulis implementasi duluan: HAPUS, mulai dari RED.

## Cara pakai di proyek ini
Wajib untuk packages/skills/* (grill, wayfinder, spec, quality, canvas-validate).
AC di PRD user ditulis agar siap-TDD: Given-When-Then + 1 slice terukur.

## Referensi penuh
Repo sumber: skills/test-driven-development/SKILL.md (superpowers).
