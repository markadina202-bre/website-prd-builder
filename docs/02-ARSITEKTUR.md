# 02 — ARSITEKTUR (Stack, Logic, Data Model, Hooks Teknis)

> Stack final: **SvelteKit (Svelte 5) murni + Rust sidecar** (ADR-006, ADR-007).

## Tech stack (final)

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Framework | **SvelteKit 2 + Svelte 5** (runes) + TypeScript | Bundle ±50-70% lebih kecil, server ringan (VPS 512MB-1GB), kode ±30% lebih sedikit |
| Styling | Tailwind CSS + **shadcn-svelte** | Port 1:1 shadcn, skill `frontend-design` menempel di sini |
| Canvas | **@xyflow/svelte** (Svelte Flow) | Official xyflow, node-editor terbaik, MIT, performant |
| API | **SvelteKit Remote Functions** (`query`/`command`/`form`) | RPC type-safe bawaan, tanpa dep tambahan (alternatif: tRPC) |
| Auth | **Better Auth** (Google OAuth) | Login Gmail 1-klik, session + org bawaan, SvelteKit-ready |
| Database | **PostgreSQL** (Neon/Supabase) + **Drizzle ORM** | Ringan, SQL-like, migrasi sederhana (alternatif: Prisma) |
| AI | **@ai-sdk/svelte** + OpenRouter (Claude/GPT/Gemini) | Binding resmi Vercel untuk Svelte, streaming sama persis |
| Background jobs | **Inngest** (via SvelteKit endpoint) | Tiket Research AFK, export PDF, webhook retry |
| Billing ID | **Midtrans Snap** | QRIS 0,7%, ShopeePay/GoPay/OVO/DANA/VA/kartu |
| Billing INTL | **Polar** (atau Lemon Squeezy) | Merchant-of-record, kartu global, pajak beres |
| Realtime collab | Pusher/Ably (fase Team) | Kursor & edit bareng di canvas |
| Sidecar (opsional) | **Rust** (`services/rust/`) | Search index, worker PDF, auto-layout WASM, verifier — hanya saat bottleneck nyata |
| Lint/format | Biome | 1 tool ganti ESLint+Prettier |

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

Dipanggil dari `+server.ts` / Remote Functions. **Kontrak tiap modul:**
`input (state) → output (state + artefak) → persist`.
Contoh `grill/ask.ts`: terima `CONTEXT.md` + history → kembalikan
`{ question, options?, frontier, done }`. Aturan keras: 1 pertanyaan/giliran,
tidak ada asumsi tanpa catat.

## Data model (inti, Drizzle schema)

```ts
User        { id, email, name, avatar, plan, credits }
Project     { id, ownerId, title, stage, currentVersion }
ContextDoc  { id, projectId, version, markdown }   // CONTEXT.md berversi
Adr         { id, projectId, no, title, decision } // Architecture Decision Records
Abcd        { id, projectId, version, A, B, C, D }  // JSON per blok + confidence
Ticket      { id, projectId, type, status, blockedBy[], result } // wayfinder
CanvasGraph { id, projectId, version, nodes, edges } // Svelte Flow JSON (jsonb)
Prd         { id, projectId, version, markdown, score, issues }  // output final
Subscription{ id, userId, gateway, status, currentPeriodEnd }
Payment     { id, userId, gateway, ref, amount, method, status }  // webhook Midtrans/Polar
```

Index: `(projectId,status)` tickets (frontier query); `(projectId,version)` artefak.

## API surface (Remote Functions + endpoints)
- `grill.ask / grill.answer / grill.wrapUp` — mesin tanya-jawab streaming (SSE)
- `abcd.generate / abcd.update / abcd.lock` — form + confidence + validasi
- `wayfinder.bootstrap / tickets.* / frontier` — papan + AFK jobs
- `canvas.generate / canvas.save / canvas.validate` — graph + issues
- `prd.render / prd.score / prd.export.{md,pdf,docx,pptx} / prd.copyPack` — dokumen
- `billing.checkout / billing.portal` + `POST /api/webhooks/{midtrans,polar}` — langganan
- `project.handoff` — resume summary ("lanjutkan dari...")

Enforcement plan: server guard `requirePlan('pro')` di Remote Function/endpoint —
frontend (`useEntitlement`-setara) hanya UX.

## Hooks teknis

### 1. State frontend (Svelte 5 runes, bukan React hooks)
| Unit | Bentuk Svelte | Fungsi |
|---|---|---|
| `grillSession` | `.svelte.ts` (`$state` + class) | Streaming chat, frontier, ketajaman %, wrap-up |
| `abcdForm` | `.svelte.ts` | Field + confidence + mini-grill per field + lock/version |
| `wayfinderBoard` | `.svelte.ts` | Kanban, fog list, frontier highlight, claim tiket |
| `canvasGraph` | `.svelte.ts` + Svelte Flow store | Load/save graph, validasi, auto-layout, node grill |
| `prdDoc` | `.svelte.ts` | Render preview, skor, issues, export, copy-pack |
| `entitlement` | `$derived` dari session | Plan user, sisa kredit, paywall trigger |

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
- pre-commit: Biome check + `svelte-check` (skill `setup-pre-commit`).
- pre-push: unit test modul SkillRunner yang berubah (TDD).

## Aliran data AI (streaming)
Client → SSE endpoint/Remote Function → SkillRunner modul → OpenRouter
(model per tugas: Claude untuk grill/spec, GPT/Gemini untuk research/prototype)
→ stream token via `@ai-sdk/svelte` → persist state per turn (anti-hilang saat refresh).

## Sidecar Rust (`services/rust/`) — opsional, ADR-007
Dibangun HANYA saat bottleneck nyata. Kandidat terurut:
1. **Search engine skill index** (ganti BM25-lite Python → Rust + embedding).
2. **Worker render PDF massal** (lebih cepat & hemat RAM dari Node).
3. **Auto-layout canvas** (dikompilasi ke WASM, jalan di browser).
4. **Webhook verifier / rate-limiter** (servis kecil Axum).
Aturan: app harus tetap jalan 100% tanpa Rust (fallback JS selalu ada).

## Keamanan & batasan
- Rate limit grill per plan (kredit/token bucket). Free: 100 pesan/bln.
- PII: jangan simpan API key user; CONTEXT.md milik user, bisa dihapus total.
- Prompt-injection guard: instruksi sistem terpisah dari konten user (modul terisolasi).
- Audit: semua webhook + export Pro dicatat.
