# PROGRESS.md — Log Progress (Pewarisan)

> Update SETIAP sesi kerja. Format: tanggal, fase, yang dikerjakan, status, next.

## 2026-09-13 — Sesi 16: Paket pewarisan sesi baru
**Dikerjakan:**
- [x] Audit: skill 42/42 konsisten (index fresh, 254 chunk, retrieval teruji); prinsip 9; docs 00-06.
- [x] DECISIONS: + ADR-008 (auth), ADR-009 (DB ganda), ADR-010 (preview production), ADR-011 (admin skeleton).
- [x] AGENTS.md ditulis ulang v2 (7 pasal: baca urut, verifikasi, tulis, skill, kode, secret/git, komunikasi).
- [x] Baru: memory/PANDUAN-SESI.md (checklist buka/tutup, perintah kunci, peta repo, recovery restore, proses hidup).
- [x] Verifikasi: index rebuild 0-change + search OK; push terverifikasi.
**Status:** ✅ Pewarisan lengkap. Tunggu Google client_secret + review + instruksi.
**Next:** Secret masuk → login hijau → Fase 1 (OpenRouter key).

## 2026-09-13 — Sesi 15: Halaman admin + harga dinamis
**Dikerjakan:**
- [x] Migrasi 0001: tabel site_settings + seed price_pro 49000 / price_team 199000 (lokal ✅; Neon ikut via CI migrate).
- [x] API: GET /api/prices (publik) + GET /api/admin/summary + PUT /api/admin/prices (gate: 401 tanpa login, 403 bukan admin; ADMIN_EMAILS kosong = mode sementara).
- [x] Halaman /admin: 4 kartu statistik, form harga Pro/Team (preview Rp + simpan → landing ikut berubah), 10 pengguna terbaru, banner mode sementara, link nav Admin.
- [x] Landing: harga SSR dari DB via +page.server.ts (fallback 49rb/199rb).
- [x] Verifikasi: check 0, build OK, /admin 200, prices {"pro":49000,"team":199000}, summary 401 tanpa sesi, upsert SQL teruji + revert.
**Status:** ⏳ PR DIBATALKAN user ("jangan dulu"). Tunggu instruksi + Google client_secret + review.
**Next:** Secret masuk → login hijau → Fase 1 (OpenRouter key).

## 2026-09-13 — Sesi 14: Onboarding ikut referensi user
**Dikerjakan:**
- [x] Langkah 2 → "Pengalaman Ngoding Kamu" (Pemula/Menengah/Ahli + deskripsi, pilih 1).
- [x] Langkah 3 → "Apa yang Kamu Harapkan?" (5 goals multi-pilih chips) + tombol "Mulai Sekarang" → dashboard.
- [x] Profil: {nama, experience, goals} + migrasi toleran profil lama; langkah 1 tak berubah.
- [x] Verifikasi: check 0, build OK, 8/8 route 200.
**Status:** ⏳ Preview LIVE. Tunggu Google client_secret (login Google) + review user.
**Next:** Secret masuk → login hijau → Fase 1 (OpenRouter key).

## 2026-09-13 — Sesi 13: Restore #2 → server nyala lagi
**Dikerjakan:**
- [x] Restore sandbox ke-2 (pola identik M-039): git reset, .env/node_modules/venv/pgdata/build hilang, proses mati.
- [x] Recovery rutin: set-branches+fetch+reset (4c93651, bersih) → npm ci → venv+PG16+initdb → createdb → .env baru → migrate 13/13 → rebuild → preview+PG nyala.
- [x] Google client_secret hilang lagi → .env pakai secret kosong (login Google mati sementara, demo full jalan). Client ID (publik) diisi ulang.
- [x] Verifikasi: 8/8 route 200 ✅.
**Status:** ⏳ Preview LIVE. Tunggu user kirim ulang Google client_secret (ke-2x).
**Next:** Secret masuk → login hijau → Fase 1 (OpenRouter key).

## 2026-09-13 — Sesi 12: Redirect URI confirmed + onboarding 3 langkah
**Dikerjakan:**
- [x] User KONFIRMASI redirect URI callback tersimpan di Google Console (blocker Sesi 05–11 selesai!).
- [x] Onboarding `/onboarding` 3 langkah: (1) Nama (copy persis user), (2) Peran a/b/c/d, (3) Ide → langsung jadi jawaban pertama grill. Skip + validasi + progress.
- [x] session.svelte.ts: profile/onboarded/pendingIdea + persist aman; layout redirect otomatis login→onboarding; dashboard sapa nama.
- [x] Verifikasi: check 0, build OK, 8/8 route 200 (termasuk /onboarding), OAuth valid.
**Status:** ⏳ Tunggu user KLIK login (semua prasyarat hijau).
**Next:** Login hijau → Fase 1 grill AI asli (OpenRouter key).

## 2026-09-13 — Sesi 11: Kredensial Google masuk → OAuth hidup lagi
**Dikerjakan:**
- [x] User kirim ulang kredensial (format JSON client_secret Google, parse manual akibat format chat) → app/.env (600, gitignored), preview restart.
- [x] Log lama buktikan user klik login 3x saat kredensial kosong (CLIENT_ID_AND_SECRET_REQUIRED) → user aktif testing.
- [x] Verifikasi: POST sign-in → accounts.google.com + client_id benar + redirect preview + PKCE ✅; verification rows: 4 ✅.
**Status:** ⏳ Tunggu user KLIK login di tab baru + konfirmasi redirect URI tersimpan di Google Console (belum pernah dikonfirmasi sejak Sesi 05!).
**Next:** Login hijau → Fase 1 grill AI asli (OpenRouter key).

## 2026-09-13 — Sesi 10: Logo Google + riset kompetitor + referensi scale
**Dikerjakan:**
- [x] Logo Google: huruf "G" → SVG resmi 4-warna di tombol login.
- [x] Riset 5 tools PRD (ChatPRD, UX Pilot, River, WriteMyPRD, RapidNative) → docs/05-REFERENSI-TOOLS-PRD.md (peta + bedah + tabel adopsi 10 pola + diferensiasi + larangan).
- [x] Referensi arsitektur 1M users dari user → docs/06-REFERENSI-ARSITEKTUR-SCALE.md (verbatim + header adaptasi SvelteKit bertahap).
- [x] Insiden BESAR: sandbox restore → .git reset ke 57d8e33 (single-branch main!), .env* HILANG, node_modules/venv/pgdata/proses HILANG. Recovery: set-branches+fetch+reset-mixed (5 file Sesi 10 utuh) → npm ci → venv+PG16+initdb+13/13 tabel → .env baru (BETTER_AUTH_SECRET regenerate).
- [x] Verifikasi: 7/7 route 200, logo SVG tampil di /login, get-session null ✅. OAuth Google MATI SEMENTARA (client ID/secret ikut hilang — minta user kirim ulang).
**Status:** ⏳ Tunggu user: (1) kirim ulang Google Client ID + Secret, (2) review tampilan.
**Next:** Kredensial masuk → login hijau → Fase 1 grill AI asli (OpenRouter key).

## 2026-09-13 — Sesi 09: Form quiz + Svelte Flow canvas + redesign anti-slop + 11 skill
**Dikerjakan:**
- [x] ABCD → **Form**: route `/form`, 13 soal kuesioner a/b/c + d tulis-sendiri, tiap soal 1 ide + "Kenapa ditanya", prefill grill (cocok→pilih, tak cocok→d), progress bar, kunci v1 + ringkasan. Konsep ABCD tetap (struktur A/B/C/D), label UI = Form.
- [x] Riset mattpocock (8 SKILL.md via GitHub API; raw.githubusercontent DIBLOKIR) → install 32-39: to-spec, to-tickets, to-tickets, to-questionnaire (LANGSUNG DIPAKAI di Form), domain-modeling, prototype, research, writing-shape, wizard + peta ke FASE 2/3/5.
- [x] Canvas: n8n pakai **Vue Flow** (xyflow) → kita pakai **Svelte Flow** (@xyflow/svelte): node custom drag-drop, tambah/hapus/hubung node, minimap+controls, prefill grill, simpan localStorage, SSR-safe (browser guard).
- [x] Skill penajam PRD 40-42: prd-schema (awesome-copilot), pm-copilot (slgoodrich), prd-quality-gate (AgentX). Index: 43 file, 254 chunk, retrieval teruji.
- [x] Redesign anti-slop: sistem "Meja Arsitek" (Fraunces+Inter+Plex Mono, paper+tinta+hijau, kartu spesimen PRD, stepper 01-04, nol emoji). Landing, login, dashboard, grill, wayfinder, form, canvas ditulis ulang.
- [x] Verifikasi: check 0, build OK, 7/7 route 200, OAuth valid, label ABCD hilang dari UI.
**Status:** ✅ Semua perintah sesi ini selesai. Tunggu user review tampilan + status login.
**Next:** Login hijau → Fase 1 grill AI asli (OpenRouter key).

## 2026-09-13 — Sesi 08: Login+demo mati → server production + rollback Sesi 07
**Dikerjakan:**
- [x] User lapor login Google DAN demo mati. Audit: kode login benar, tak ada kebocoran modul server → build production BERSIH (tak ada error tersembunyi).
- [x] INSIDEN (ralat Sesi 09): Sesi 07 hanya hilang di workspace LOKAL — commit e3c4c76 ternyata ADA di remote. Push Sesi 08–09 sempat DITOLAK (non-fast-forward, disalahbaca sukses) → diperbaiki via force-with-lease setelah verifikasi lokal superset remote. Lihat M-029/M-034.
- [x] Switch preview ke PRODUCTION: adapter-auto → adapter-node, `vite preview` port 5173 (URL preview TETAP), env via source .env. Alasan: bundel tunggal, tanpa HMR, anti-cache-acak.
- [x] Verifikasi prod: 4/4 route 200, OAuth URL valid, get-session null ✅.
**Status:** ⏳ Tunggu user: buka ulang preview (hard-refresh) → coba demo + Google → lapor persis yang terjadi.
**Next:** Login hijau → Fase 1 (OpenRouter key).

## 2026-09-13 — Sesi 07 (diterapkan ulang di Sesi 08): Hardening storage iframe-safe
**Dikerjakan:**
- [x] Diagnosis halaman putih: halaman Google ditolak tampil di iframe (X-Frame-Options DENY) → user wajib buka preview di tab baru.
- [x] Hardening: localStorage try/catch (session.svelte.ts + guard layout pakai hasMockSession()).
**Status:** ✅ Diterapkan ulang + masuk build production.

## 2026-09-13 — Sesi 06: Login error + de-brand + 8 skill desain + konsep v2
**Dikerjakan:**
- [x] Login error: log server BERSIH pasca-fix (tak ada error baru) → error user hampir pasti di sisi Google (redirect_uri_mismatch / consent). Menunggu info persis error dari user.
- [x] De-brand: label skill dihapus dari UI (badge SKELETON→BETA, footer, grill, login, wayfinder, canvas) + prinsip P-009 (skill = latar belakang).
- [x] Riset + install 8 skill desain/anti-slop (24-31): avoid-ai-design, antislop-suite, web-design-guidelines, ux-ui-agent-skills, tailwind-4-docs, make-interfaces-feel-better, impeccable, web-quality-skills. Index: 188 chunk, retrieval teruji.
- [x] docs/00-KONSEP.md ditulis ulang v2.0 standar perusahaan (12 bab, tanpa istilah internal).
- [x] Verifikasi: 4/4 route 200, label skill hilang dari HTML.
**Status:** ⏳ Tunggu user: (1) info persis error login (screenshot/teks), (2) konfirmasi redirect URI tersimpan.
**Next:** Login hijau → Fase 1 grill AI asli (butuh OpenRouter key).

## 2026-09-13 — Sesi 05: Secret Google + PG lokal + OAuth hidup
**Fase:** Fase 0 (auth real, uji end-to-end)
**Dikerjakan:**
- [x] Attach PDF 3x GAGAL sampai (uploads/ tidak ada) → user paste secret teks → tersimpan app/.env (gitignored).
- [x] Temuan: user sempat klik login → log buktikan better-auth mencapai tahap insert verification (config benar, tinggal DB).
- [x] PG lokal: apt & Maven DIBLOKIR, tapi PyPI BUKA → pgserver → binari PG16 TCP 127.0.0.1:5433 (API pgserver socket-only, jadi jalankan binari langsung foreground; argv[0] harus full path).
- [x] app/.env → PG lokal (Neon dibackup .env.neon); migrasi lokal 13/13 ✅.
- [x] ROOT CAUSE auth gagal: Vite tidak isi process.env dari .env → pindah ke $env/dynamic/private (+ log `[db]` diagnostik, tanpa secret).
- [x] Verifikasi: POST sign-in/social → URL accounts.google.com valid (client_id + redirect preview + PKCE) ✅; verification rows: 1 ✅; svelte-check 0 error.
**Status:** ✅ OAuth server-side 100%. Tinggal KLIK user di preview (butuh redirect URI tersimpan di Google Console).
**Next:** User klik login → lapor hasil (sukses / redirect_uri_mismatch?) → Fase 1 grill AI asli (butuh OpenRouter key).

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
- [x] User isi secret → trigger → run 34763388363: Check secret ✅ → Apply migrations ✅ → **Verify tables ✅ (13/13)**. DB Neon LIVE.
- [ ] Terakhir: GOOGLE_CLIENT_SECRET → test login Gmail end-to-end.
**Status:** ✅ DB selesai 100%. Login Google 90% (kode siap, Client ID terpasang, tinggal Client Secret).
**Next:** Terima GOOGLE_CLIENT_SECRET → simpan .env + restart → user test klik login di preview.

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
