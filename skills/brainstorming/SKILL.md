---
name: brainstorming
description: Klarifikasi kebutuhan via tanya-jawab Socratic sebelum menulis kode. Pakai saat requirement kabur; JANGAN dipakai untuk eksekusi kode langsung.
source: https://github.com/obra/superpowers
install: git clone https://github.com/obra/superpowers ~/.claude/skills/superpowers
---

# Brainstorming (cache distilasi)

## Trigger
Memulai fitur/fase baru, requirement ambigu, atau user berkata "pokoknya...".
Berhenti saat spec cukup tajam untuk writing-plans.

## Prinsip inti
- Tanya proaktif (Socratic): gali WHY sebelum WHAT/HOW. Satu fokus per putaran.
- Tuang ke spec ringkas, lalu **Spec Self-Review inline** (~30 detik):
  1) placeholder scan (tidak ada TBD/"nanti"), 2) konsistensi internal,
  3) scope check (in/out eksplisit), 4) ambiguity check.
- Self-review menangkap 3-5 bug nyata per run — jangan dilewati.
- Output = spec beku yang siap dipecah writing-plans. Bukan kode.

## Cara pakai di proyek ini
INTERNAL (saat build): pertajam scope tiap fase roadmap sebelum coding.
Berbeda dari grill produk: grill untuk end-user (1Q/turn, Bahasa Indonesia,
persist CONTEXT.md); brainstorming untuk builder (boleh padat, output spec teknis).

## Referensi penuh
Repo sumber: skills/brainstorming/SKILL.md (superpowers).
