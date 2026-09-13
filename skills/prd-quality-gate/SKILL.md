# prd-quality-gate — Non-negotiables + gate mutu PRD (distilasi)

- repo: jnPiyush/AgentX (`skills/.../product-prd-skill`)
- url: https://github.com/jnPiyush/AgentX
- install: via Skills.lc / repo sumber
- role: Konvensi bersama agar PRD konkret, terukur, tak kontradiktif — lolos handoff ke Architect/UX/Engineer.

## Trigger
Finalisasi PRD sebelum dikunci / diekspor / diserahkan ke developer.

## Prinsip inti
- **5 non-negotiables**: riset berbasis bukti (kutip sumber, bukan asumsi) · requirement konkret-terukur (angka/rubric/standar bernama) · intent preservation (jangan downgrade diam-diam maksud user, mis. "AI agent" → rule-based) · tak kontradiktif · siap handoff lintas-peran.
- **Discovery gate**: PRD tak boleh didraf dingin — minimal 2 pertanyaan klarifikasi (problem/metrik/constraint/persona/stack) ATAU catat TBD eksplisit + Open Question. Jangan halusinasi constraint.
- Aturan mutu (REJECTED vs ACCEPTED): "search harus cepat" DITOLAK → "200ms p95 untuk 10k records + eval set path" DITERIMA. Tiap requirement: angka, atau rubric path, atau standar bernama.
- **Kontrak AI** (PRD fitur-AI): Primary AI Job · Grounding Sources · Tool/Action Boundaries (boleh vs TAK BOLEH otonom) · Response Contract · Fallback Behavior · Human Review Trigger · Quality Threshold (metrik + dataset).

## Pakai di proyek ini
Exit gate FASE 5: checklist PASS/FAIL + komponen skor PRD sebelum export MD/PDF/DOCX.

## Batasan
Gate menolak, bukan menulis — pasangkan dengan prd-schema (penulis) + pm-copilot (template).
