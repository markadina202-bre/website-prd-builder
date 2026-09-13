# prd-schema — Skema PRD ketat + discovery (distilasi)

- repo: github/awesome-copilot (`skills/prd`, MIT)
- url: https://github.com/github/awesome-copilot
- install: `npx skills add https://github.com/github/awesome-copilot --skill prd`
- role: Hasilkan PRD production-grade: discovery dulu, lalu draf ikut skema baku.

## Trigger
Menulis/mereview/memperluas PRD fitur/produk (termasuk fitur AI).

## Prinsip inti
- **Discovery dulu (wawancara)**: JANGAN tulis 1 baris PRD sebelum interogasi user — core problem, success metric, constraints. Tanpa ini = draf dingin = tolak.
- Skema WAJIB: (1) Executive Summary (problem 1–2 kalimat, solusi 1–2 kalimat, 3–5 KPI) → (2) UX & Functionality (persona, user stories `As [user], I want [action] so that [benefit]`, acceptance criteria per story, NON-GOALS) → (3) AI requirements bila relevan (tools/API, strategi evaluasi) → (4) Technical specs (arsitektur, integrasi API/DB/auth) → (5) Risks & Roadmap (MVP→v1.1→v2.0, risiko latensi/biaya/dependensi).
- Mutu: konkret terukur — "200ms untuk 10k records", "≥85% Precision@10", "skor Lighthouse 100". LARANG: fast, easy, intuitive, modern, secure (tanpa angka/standar).
- DO: definisikan testing (khusus AI: cara validasi output), iterasi draf per seksi. DON'T: skip discovery, halusinasi constraint (stack tak disebut user = TBD, bukan "pasti Postgres").

## Pakai di proyek ini
Template inti FASE 5 (PRD Final) + rubric skor ketajaman dokumen.

## Batasan
Skema kaku — untuk produk baru total / risiko tinggi, pilih template via pm-copilot.
