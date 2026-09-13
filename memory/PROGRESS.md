# PROGRESS.md — Log Progress (Pewarisan)

> Update SETIAP sesi kerja. Format: tanggal, fase, yang dikerjakan, status, next.

## 2026-09-13 — Sesi 03: Scaffold skeleton + live preview
**Fase:** Fase 0-skeleton (mock, tanpa kredensial)
**Dikerjakan:**
- [x] Scaffold manual SvelteKit 2 + Svelte 5 + Tailwind v4 di `app/` (npm install 69 pkgs/13s).
- [x] Halaman: landing, login mock, dashboard, project/{grill,abcd,wayfinder,canvas}.
- [x] Mock SkillRunner grill: 8 pertanyaan scripted 1-per-giliran + skor ketajaman + panel CONTEXT.md live + prefill ABCD.
- [x] Fix preview sandbox: `allowedHosts: ['.e2b.app']` (leading-dot wildcard, terverifikasi di source Vite).
- [x] CI GitHub Actions (`ci.yml`): install + check + build untuk tiap push app/.
- [x] Verifikasi: 7/7 route HTTP 200, dev server live port 5173.
**Status:** ✅ Skeleton LIVE (dilanjutkan Sesi 04 di bawah).

## 2026-09-13 — Sesi 04: Wiring Neon + Better Auth (siap colok)
**Fase:** Fase 0 (DB + auth real)
**Dikerjakan:**
- [x] Install: better-auth 1.7.4, drizzle-orm, @neondatabase/serverless, drizzle-kit, @types/node.
- [x] Kode: `auth.ts` (Google provider), `db/` (auth-schema 4 tabel + app-schema 9 tabel), `drizzle.config.ts`, `hooks.server.ts`, `/api/auth/[...all]`, `auth-client.ts`, login real + fallback mock, `.env.example`.
- [x] Migrasi `drizzle/0000_init.sql` ter-generate (13 CREATE TABLE). Pelajaran: `useSession()` Svelte = store `{data,error,isPending}` → baca `$s.data.user`.
- [x] Verifikasi: svelte-check 0 error, build OK, `/api/auth/get-session` 200.
- [x] User paste DATABASE_URL + Google Client ID → tersimpan di app/.env (gitignored, chmod 600). Pelajaran: quote nilai .env (karakter `&` merusak `source`).
- [x] TEMUAN: sandbox = egress allowlist (bukti: example.com & api.neon:443 RST, github OK). neon-http MUSTAHIL dari sini → pindah ke postgres-js TCP (`prepare:false`, `ssl:require`).
- [x] Strategi migrasi: `.github/workflows/migrate.yml` (dispatch manual + auto saat app/drizzle/** berubah; butuh repo secret DATABASE_URL). `gh secret set` DITOLAK 403 → user harus isi secret via GitHub UI.
- [x] CI migrate run 34763073557: gagal di "Apply migrations" (17s). Run 34763136601 + guard: gagal di "Check DATABASE_URL secret" → TERBUKTI secret belum diisi user. `gh workflow run` tak bisa dipakai (workflow_dispatch hanya resolve dari default branch) → trigger via push app/drizzle/**.
- [x] Pelajaran infra: JANGAN paralelkan edit file dengan git add/commit (race: 1 file ketinggalan, commit 51aa913).
- [ ] Tunggu: (1) user isi secret DATABASE_URL → re-run/trigger → verifikasi 13 tabel, (2) GOOGLE_CLIENT_SECRET.
**Status:** ⏳ Bola di user: isi 1 secret GitHub. Semua otomasi siap & teruji gagal-dengan-benar.
**Next:** Secret terisi → trigger → 13 tabel → login Google end-to-end.

## 2026-09-13 — Sesi 02: Validasi konsep + evaluasi stack
**Fase:** Pra-Fase 0 (keputusan stack)
**Dikerjakan:**
- [x] User APPROVE: definisi ABCD (Audience/Business/Capabilities/Details) → ADR-004 CONFIRMED.
- [x] User APPROVE: harga Pro Rp49rb/bln, Team Rp199rb/bln → M-020 CONFIRMED.
- [x] User tanya: SvelteKit + lib React (AI SDK React-first, shadcn/ui)? → dijawab: BISA tapi JANGAN (dual-runtime, anti-ringan). Padanan native: @ai-sdk/svelte, shadcn-svelte, @xyflow/svelte.
- [x] User tanya: Rust sebagai pengganti Next.js/SvelteKit? → dijawab: TIDAK (ekosistem JS tidak bisa dipindah ke Rust; Leptos 3-5x lebih lambat untuk proyek ini; Rust hanya cocok sebagai microservice/WASM sidecar pasca-launch).
- [x] User tanya: React+Rust vs SvelteKit+Rust dari segala sisi? → dijawab: SvelteKit+Rust menang 57 vs 48 (teknis 9/9; React hanya menang hiring/komunitas). Varian React+backend-Rust-penuh DITOLAK.
- [x] User CONFIRM: **lanjut SvelteKit murni + Rust sidecar** → ADR-006/ADR-007 CONFIRMED. Migrasi dokumen selesai: M-010/M-015, ADR-001, docs/00-04, cache.kv skill.02/17/18.
**Status:** ✅ Pra-build selesai 100%. Siap scaffold Fase 0.
**Next:** Scaffold SvelteKit (`app/`): auth Gmail + DB + layout → perlu DATABASE_URL (Neon) + Google OAuth Client ID/Secret dari user, ATAU scaffold skeleton/mock dulu.

## 2026-09-13 — Sesi 01: Riset + Rancangan + Instalasi Skill
**Fase:** Pra-Fase 0 (konsep & fondasi pengetahuan)
**Dikerjakan:**
- [x] Riset: repo mattpocock/skills (35 skills, struktur engineering/productivity/misc),
  obra/superpowers (14+ skills, TDD enforcement), anthropics/skills official
  (frontend-design 862k installs, webapp-testing, skill-creator, mcp-builder, pdf/docx/pptx/xlsx),
  ngodingpakeai.com & desainpakeai.com (referensi), Midtrans vs Xendit (QRIS 0,7%),
  Polar/LemonSqueezy (MoR internasional), React Flow/@xyflow (canvas).
- [x] Dokumen: README, AGENTS.md, docs/00-KONSEP, 01-ALUR, 02-ARSITEKTUR, 03-MONETISASI, 04-ROADMAP.
- [x] Memory: MEMORY.md, PROGRESS.md, POLA-PIKIR.md, DECISIONS.md.
- [x] Skill: 20 skill OP + mattpocock + superhuman + codebasememory → `skills/cache.kv` + SKILL.md per skill.
- [x] Index ala-Cursor: `skills/index/` (build_index.py, search.py, manifest, chunks, lexicon).
**Status:** ✅ Rancangan v1 selesai. Siap Fase 0 (scaffold) setelah user approve konsep.
**Next:** Tunggu feedback user (nama ABCD? harga? scope MVP?) → scaffold Next.js.

## Format entri berikutnya
```
## YYYY-MM-DD — Sesi NN: Judul
**Fase:** ...
**Dikerjakan:** ...
**Status:** ...
**Next:** ...
```
