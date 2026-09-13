# pm-copilot — Requirements-engineer + pilih template (distilasi)

- repo: slgoodrich/agents (AI PM Copilot: 1 orkestrator + 7 spesialis)
- url: https://github.com/slgoodrich/agents
- install: lihat repo sumber (plugin Claude Code + team presets)
- role: Route kebutuhan PM ke spesialis; pilih template PRD via skor kompleksitas.

## Trigger
Tulis PRD / validasi fitur / prioritaskan backlog / rencanakan rilis.

## Prinsip inti
- **Skor 3 dimensi** (0–10): Technical Complexity, Risk/Impact, Scope Breadth → rata-rata menentukan template:
  - Lean PRD (1–2 hlm): avg < 4, < 1 minggu, fitur simpel.
  - Comprehensive (3–5 hlm): avg 4–7, fitur standar. DEFAULT.
  - Amazon PR/FAQ (3–6 hlm): produk baru (deteksi kata kunci).
  - Google PRD (5–10 hlm): risiko tinggi (security/payments) atau kritis-skala.
- Spesialis: requirements-engineer (PRD/spec/stories/AC), research-ops (validasi), feature-prioritizer (skor RICE + alasan), + konteks produk persistent.
- Team presets: validation sprint, PRD stress-test, competitive war-room.
- Fokus solo-developer: tanpa kompleksitas enterprise.

## Pakai di proyek ini
FASE 5: penentu template PRD per proyek user (grill+form memberi sinyal kompleksitas) + stress-test draf.

## Batasan
Framework berat — ambil intinya (skor→template, stress-test), bukan seluruh orkestrasi agen.
