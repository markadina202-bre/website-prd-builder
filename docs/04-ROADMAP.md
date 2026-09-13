# 04 — ROADMAP (Langkah-Langkah Build)

> Estimasi untuk 1 builder + AI coding, full-time. Skill yang dipakai tiap fase dicantumkan.

## Fase 0 — Fondasi (Minggu 1)
- [ ] Scaffold Next.js 16 + TS + Tailwind + shadcn/ui + Biome (`vercel-react-best-practices`)
- [ ] Auth: Better Auth + Google OAuth (login Gmail jalan)
- [ ] DB: Neon Postgres + Prisma schema (User, Project, ContextDoc, Abcd, Ticket, CanvasGraph, Prd, Subscription, Payment) (`supabase-postgres-best-practices`)
- [ ] tRPC + layout dashboard + landing basic (`frontend-design`)
- [ ] Pasang `codebasememory`: MEMORY per repo + index berjalan
- **Exit criteria:** user bisa login Gmail & buat proyek kosong.

## Fase 1 — Grill Chatbot / MVP inti (Minggu 2–3)
- [ ] SkillRunner: modul `grill` (ask-matt router + grill-me + grilling 1Q/turn)
- [ ] Streaming chat UI + panel CONTEXT.md live + progress ketajaman
- [ ] Modul `context` (grill-with-docs): CONTEXT.md + ADR per proyek
- [ ] `wait-what` detector + `wizard` opsi konkret
- [ ] Kredit & rate limit dasar + `handoff` resume
- [ ] E2E: ide → 15 pertanyaan → CONTEXT.md solid (`webapp-testing`, `agent-browser`)
- **Exit criteria:** 5 beta tester menghasilkan CONTEXT.md tanpa bingung.

## Fase 2 — Form ABCD (Minggu 4)
- [ ] Modul `questionnaire` (to-questionnaire): generate field + confidence
- [ ] UI form 4 blok + mini-grill per field + validasi kontradiksi (`diagnosing-bugs`)
- [ ] Lock/versioning ABCD + diff sederhana
- **Exit criteria:** ABCD auto-terisi ≥80% dari hasil grill, user tinggal edit.

## Fase 3 — Wayfinder (Minggu 5)
- [ ] Modul `wayfinder`: destination grill, ticket generator (R/P/G/T), frontier calc
- [ ] UI Kanban + panel fog-of-war + auto-skip jika no-fog
- [ ] Inngest jobs untuk tiket Research AFK (`research` subagent)
- [ ] Prototype artefak kasar (MD/wireframe teks) untuk tiket Prototype
- **Exit criteria:** proyek besar terpetakan jadi tiket yang bisa dieksekusi 1-1.

## Fase 4 — Canvas ala n8n (Minggu 6–7)
- [ ] React Flow: palet 7 node + 4 edge + minimap + auto-layout
- [ ] Modul `design` (codebase-design): generate graph dari ABCD, deletion test
- [ ] Klik node → detail + AC + "grill node ini" (scoped grill-with-docs)
- [ ] Validasi graph (node yatim, cycle, AC kosong) + `triage` warna prioritas
- [ ] Lock canvas → freeze versi
- **Exit criteria:** canvas 30+ node tetap mulus; user paham tanpa tutorial.

## Fase 5 — PRD Final + Export (Minggu 8)
- [ ] Modul `spec` (to-spec + writing-for-agents): render PRD baku
- [ ] Quality gate: skor 0-100 + issues (`code-review`, `diagnosing-bugs`)
- [ ] Export MD gratis; PDF/DOCX/PPTX via Inngest (`pdf`, `docx`, `pptx` skills)
- [ ] Tombol "Salin paket AI-Coding" (DESIGN.md + tasks + bootstrap prompt)
- [ ] Diagram arsitektur otomatis di PRD (`excalidraw-diagram`)
- **Exit criteria:** PRD ditempel ke Cursor → AI coding jalan tanpa tanya ulang.

## Fase 6 — Monetisasi & Launch (Minggu 9–10)
- [ ] Midtrans Snap: checkout + webhook + entitlements + invoice (`webhook-skills`)
- [ ] Polar: mirror produk internasional + webhook
- [ ] Paywall UX (`useEntitlement`) + halaman pricing + portal langganan
- [ ] Security pass: `static-analysis` (Semgrep) + review webhook signature
- [ ] Landing final + template galeri + launch 🚀
- **Exit criteria:** 1 pembayaran QRIS + 1 pembayaran kartu INTL sukses end-to-end.

## Pasca-launch (backlog)
- Team workspace + realtime collab canvas; API publik; mobile PWA;
- Template marketplace + affiliate; model lokal (hemat biaya); SSO.

## Cara eksekusi tiap fase (wajib)
1. `/brainstorming` — pertajam scope fase. 2. `writing-plans` — pecah jadi task 2–5 menit.
3. `test-driven-development` — test dulu untuk SkillRunner. 4. `subagent-driven-development` untuk task paralel.
5. `verification-before-completion` — buktikan exit criteria. 6. Update `memory/PROGRESS.md`.
