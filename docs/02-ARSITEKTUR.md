# 02 — ARSITEKTUR (Stack, Logic, Data Model, Hooks Teknis)

## Tech stack (final)

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) + TypeScript 5 | Standar SaaS tercepat, RSC + server actions |
| Styling | Tailwind CSS + **shadcn/ui** | Konsisten, skill `frontend-design` menempel di sini |
| Canvas | **@xyflow/react** (React Flow) | Pustaka node-editor terbaik, MIT, performant |
| API | **tRPC v11** + superjson | Type-safe end-to-end tanpa OpenAPI manual |
| Auth | **Better Auth** (Google OAuth) | Login Gmail 1-klik, session + org bawaan |
| Database | **PostgreSQL** (Neon/Supabase) + Prisma 7 | Relasional untuk graph/tiket/versioning |
| AI | **Vercel AI SDK** + OpenRouter (Claude/GPT/Gemini) | Multi-model, gampang switch, streaming |
| Background jobs | **Inngest v4** | Tiket Research AFK, export PDF, webhook retry |
| Billing ID | **Midtrans Snap** | QRIS 0,7%, ShopeePay/GoPay/OVO/DANA/VA/kartu |
| Billing INTL | **Polar** (atau Lemon Squeezy) | Merchant-of-record, kartu global, pajak beres |
| Realtime collab | Pusher/Ably (fase Team) | Kursor & edit bareng di canvas |
| Lint/format | Biome | 1 tool ganti ESLint+Prettier |

Referensi arsitektur sejenis: pola "Next.js + tRPC + Prisma + ReactFlow +
Inngest + Better Auth" sudah terbukti untuk workflow-builder visual.

## Modul backend: SkillRunner
Tiap skill Matt Pocock = modul prompt + state machine + persistence:

```
packages/skills/
  grill/        # grill-me + grilling + ask-matt (router)
  context/      # grill-with-docs (CONTEXT.md + ADR per proyek)
  questionnaire/# to-questionnaire (ABCD generator)
  wayfinder/    # wayfinder + research + prototype (ticket graph)
  design/       # codebase-design + domain-modeling (canvas generator)
  spec/         # to-spec + writing-for-agents (PRD renderer)
  quality/      # diagnosing-bugs + code-review + wait-what + triage
  handoff/      # handoff + claude-handoff (session resume)
  teach/        # teach + wizard (guided mode)
```

**Kontrak tiap modul:** `input (state) → output (state + artefak) → persist`.
Contoh `grill/ask.ts`: terima `CONTEXT.md` + history → kembalikan
`{ question, options?, frontier, done }`. Aturan keras: 1 pertanyaan/giliran,
tidak ada asumsi tanpa catat.

## Data model (inti)

```prisma
User        { id, email, name, avatar, plan, credits }
Project     { id, ownerId, title, stage, currentVersion }
ContextDoc  { id, projectId, version, markdown }   // CONTEXT.md berversi
Adr         { id, projectId, no, title, decision } // Architecture Decision Records
Abcd        { id, projectId, version, A, B, C, D }  // JSON per blok + confidence
Ticket      { id, projectId, type, status, blockedBy[], result } // wayfinder
CanvasGraph { id, projectId, version, nodes, edges } // React Flow JSON
Prd         { id, projectId, version, markdown, score, issues }  // output final
Subscription{ id, userId, gateway, status, currentPeriodEnd }
Payment     { id, userId, gateway, ref, amount, method, status }  // webhook Midtrans/Polar
```

## API surface (tRPC routers)
- `grill.ask / grill.answer / grill.wrapUp` — mesin tanya-jawab streaming
- `abcd.generate / abcd.update / abcd.lock` — form + confidence + validasi
- `wayfinder.bootstrap / tickets.* / frontier` — papan + AFK jobs
- `canvas.generate / canvas.save / canvas.validate` — graph + issues
- `prd.render / prd.score / prd.export.{md,pdf,docx,pptx} / prd.copyPack` — dokumen
- `billing.checkout / billing.webhook / billing.portal` — langganan
- `project.handoff` — resume summary ("lanjutkan dari...")

## Hooks teknis

### 1. React hooks (frontend)
| Hook | Fungsi |
|---|---|
| `useGrillSession(projectId)` | Streaming chat, frontier, ketajaman %, wrap-up |
| `useAbcdForm(projectId)` | Field + confidence + mini-grill per field + lock/version |
| `useWayfinder(boardId)` | Kanban, fog list, frontier auto-highlight, claim tiket |
| `useCanvasGraph(projectId)` | Load/save React Flow, validasi, auto-layout, node grill |
| `usePrd(projectId)` | Render preview, skor, issues, export, copy-pack |
| `useEntitlement()` | Plan user, sisa kredit, paywall trigger |

### 2. Agent trigger hooks (aturan kapan skill aktif — prinsip superpowers)
| Pemicu | Skill aktif |
|---|---|
| User kirim ide pertama | `ask-matt` (router) → `grill-me` |
| Jawaban ambigu ("terserah") | `wait-what` → opsi konkret |
| Confidence field ABCD < 70% | `grilling` mini-loop |
| Ide besar terdeteksi (fog>0) | `wayfinder` bootstrap |
| Tiket Research dibuat | Inngest job + `research` subagent |
| Klik "grill node" di canvas | `grill-with-docs` scoped ke node |
| Klik "Render PRD" | `to-spec` → `writing-for-agents` → `code-review` |
| Buka proyek lama | `handoff` resume summary |

### 3. Webhook hooks (pembayaran — skill `webhook-skills`)
- `POST /api/webhooks/midtrans` — notifikasi Snap (settlement/expire/cancel) →
  update `Payment` + `Subscription` + entitlements. **Verifikasi signature!**
- `POST /api/webhooks/polar` — checkout.session.completed dkk → hal yang sama.
- Semua webhook: idempotent (dedup by gateway ref), retry via Inngest, log audit.

### 4. Git hooks (saat development)
- pre-commit: Biome check + `tsc --noEmit` (skill `setup-pre-commit`).
- pre-push: unit test modul SkillRunner yang berubah (TDD).

## Aliran data AI (streaming)
Client → tRPC subscription/SSE → SkillRunner modul → OpenRouter (model per tugas:
Claude untuk grill/spec, GPT/Gemini untuk research/prototype) → stream token →
persist state per turn (anti-hilang saat refresh).

## Keamanan & batasan
- Rate limit grill per plan (kredit/token bucket). Free: 100 pesan/bln.
- PII: jangan simpan API key user; CONTEXT.md milik user, bisa dihapus total.
- Prompt-injection guard: instruksi sistem terpisah dari konten user (modul terisolasi).
- Audit: semua webhook + export Pro dicatat.
