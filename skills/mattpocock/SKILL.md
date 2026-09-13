---
name: mattpocock
description: Bundel 35 skill real-engineer Matt Pocock — JANTUNG produk PRD Builder. Grill tanya-jawab user satu-per-satu, decision tree, wayfinder, to-spec. Tiap skill = modul SkillRunner. Pakai sesuai tabel pemetaan tahap di bawah.
source: https://github.com/mattpocock/skills
install: npx skills@latest add mattpocock/skills
kind: bundle
---

# Matt Pocock Skills (cache distilasi + peta produk)

> Prinsip: skill kecil, tajam, composable. User-invoked (manusia panggil,
> `disable-model-invocation: true`) vs model-invoked (agen ambil otomatis).

## Katalog 35 skill (kode: peran 1-baris)

**Engineering (18):**
- `ask-matt` — router: petakan skill mana untuk kebutuhan user.
- `grill-with-docs` — grill rencana MELAWAN codebase/CONTEXT.md (stateful, update ADR).
- `triage` — triage issue cepat dengan label.
- `improve-codebase-architecture` — rapikan arsitektur bertahap.
- `setup-matt-pocock-skills` — inisialisasi (tracker, label, lokasi docs).
- `to-spec` — sintesis diskusi jadi technical spec.
- `to-tickets` — pecah spec jadi tiket teknis aksiabel.
- `wayfinder` — peta fog-of-war untuk kerja raksasa antar-sesi (tiket R/P/G/T).
- `implement` — eksekusi implementasi terkendali.
- `prototype` — artefak kasar untuk direaksi.
- `diagnosing-bugs` — BANGUN sinyal pass/fail dulu sebelum hipotesis sebab.
- `research` — riset via subagent.
- `tdd` — RED-GREEN-REFACTOR per vertical slice, sepakati seam dulu.
- `domain-modeling` — gali ubiquitous language + model domain.
- `codebase-design` — kosakata modul/seam presisi + deletion test modul.
- `code-review` — review kualitas terstruktur.
- `resolving-merge-conflicts` — resolusi konflik merge.
- `wizard` — alur terpandu langkah-demi-langkah.

**Productivity (7):**
- `grill-me` — interogasi ide sampai decision tree tuntas (stateless).
- `grilling` — ATURAN grill: 1 pertanyaan/giliran, tunggu jawaban.
- `handoff` — dokumen state ringkas untuk resume sesi.
- `teach` — mode mengajar.
- `writing-for-agents` — tulis dokumen PREDICTABLE untuk AI (hapus no-op,
  lawan premature completion & sprawl, leading words).
- `to-questionnaire` — ubah topik jadi kuesioner terstruktur.
- `wait-what` — deteksi ambiguitas → paksa klarifikasi.

**Lainnya (10):** `claude-handoff`, `implement-spec`, `loop-me`, `retro`,
`setup-ts-deep-modules`, `writing-beats`, `writing-fragments`, `writing-shape`,
`git-guardrails-claude-code`, `migrate-to-shoehorn`, `scaffold-exercises`,
`setup-pre-commit` (infrastruktur+tulis; dipakai saat build).

## Peta ke produk (SkillRunner) — RINGKASAN EKSEKUTIF
Tahap 1 Grill: ask-matt→grill-me→grilling→grill-with-docs→wait-what/wizard.
Tahap 2 ABCD: to-questionnaire→domain-modeling; validasi diagnosing-bugs.
Tahap 3 Wayfinder: wayfinder→research/prototype/grilling; handoff resume.
Tahap 4 Canvas: codebase-design→domain-modeling; triage warna; to-tickets.
Tahap 5 PRD: to-spec→writing-for-agents; code-review gate; tdd AC; implement+handoff paket AI-Coding.
Meta: teach/wizard edukasi; retro evaluasi; setup-* & git-guardrails saat build.

## Aturan keras warisan repo ini
- Grilling: 1 pertanyaan/giliran, frontier-first, tanpa batas angka
  (user setir dengan "wrap up"), update CONTEXT.md+ADR tiap jawaban penting.
- Wayfinder: untuk planning BUKAN doing; berhenti saat no-fog; frontier =
  tiket terbuka+tak-terblokir+belum-diklaim; fog lulus jadi tiket baru.
- to-spec→to-tickets→implement: alur baku konsep→eksekusi. Jangan loncat.
- writing-for-agents: success = PROSES sama tiap run; default = hapus no-op.

## Referensi penuh
Install dari sumber (48K+ stars) untuk 35 SKILL.md asli + plugin.json.
