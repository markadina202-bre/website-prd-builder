# DECISIONS.md — Architecture Decision Records (ringkas)

> Format: ADR-xxx | tanggal | konteks → keputusan → konsekuensi.
> Status: PROPOSED / CONFIRMED / SUPERSEDED.

## ADR-006 | 2026-09-13 | [CONFIRMED] Framework = SvelteKit (Svelte 5) murni
Konteks: user minta alternatif Next.js yang hemat resource, ringan, cepat, mudah maintain.
Keputusan: SvelteKit murni — bundle ±50-70% lebih kecil, server ringan (VPS 512MB-1GB),
kode ±30% lebih sedikit (Svelte 5 runes). Stack pendamping: @ai-sdk/svelte,
Better Auth, Drizzle ORM, shadcn-svelte, @xyflow/svelte (Svelte Flow),
SvelteKit Remote Functions, Inngest, Midtrans, Polar. Hibrida Svelte+React DITOLAK
(dual-runtime, anti-ringan). Update susulan: M-010, ADR-001, docs/02, docs/04 Fase 0.
Konsekuensi: talent React adaptasi 1-2 minggu; lib bleeding-edge React-first
tidak dipakai — padanan Svelte resmi jadi standar.

## ADR-007 | 2026-09-13 | [CONFIRMED] Rust = sidecar, BUKAN fondasi app
Konteks: user ingin Rust terlibat. Opsi: (a) full Rust/Leptos, (b) Rust sidecar.
Keputusan: (b). Full Rust/Leptos ditolak untuk MVP (3-5x lebih lambat, tanpa shadcn/
xyflow/AI SDK; AI coding lemah di Leptos). Rust dipakai sebagai service pendamping:
`services/rust/` — kandidat: search engine skill index (BM25+embedding), worker render
PDF massal, auto-layout canvas (WASM), webhook verifier/rate-limiter.
Konsekuensi: Rust dibangun HANYA saat ada bottleneck nyata (pasca-launch) atau sebagai
modul WASM terisolasi; app tidak boleh bergantung pada Rust untuk jalan (fallback JS).

## ADR-001 | 2026-09-13 | [CONFIRMED → AMENDED SvelteKit] Canvas = Svelte Flow (@xyflow/svelte)
Konteks: butuh node editor ala n8n. Opsi: Svelte Flow/React Flow, bikin sendiri (SVG/canvas),
fork n8n (lisensi Sustainable Use — bermasalah komersial).
Keputusan: Svelte Flow — official xyflow untuk Svelte (MIT, performant).
Konsekuensi: graph disimpan sebagai JSON nodes/edges; executor n8n-style TIDAK perlu (canvas ini untuk desain PRD, bukan eksekusi workflow).

## ADR-002 | 2026-09-13 | Gateway lokal = Midtrans (bukan Xendit)
Konteks: butuh QRIS + ShopeePay + e-wallet lain. Keduanya dukung QRIS 0,7%.
Keputusan: Midtrans — GoPay native eksklusif, e-wallet ~1,5-2% (Xendit ~2-5,5%),
docs lengkap, support 24/7, tanpa biaya bulanan.
Konsekuensi: jika nanti butuh disbursement programatik → tambah Xendit sebagai gateway kedua.

## ADR-003 | 2026-09-13 | Gateway internasional = Polar (cadangan Lemon Squeezy)
Konteks: Stripe tidak tersedia untuk badan Indonesia; butuh kartu global + pajak beres.
Keputusan: Polar sebagai Merchant-of-Record utama.
Konsekuensi: produk di-mirror (Pro $5, Team $19); entitlements disatukan via tabel Subscription.

## ADR-004 | 2026-09-13 | [CONFIRMED] ABCD = Audience/Business/Capabilities/Details
Konteks: user minta "form pengisian abcd" tanpa definisi rinci.
Keputusan: A=Audience, B=Business & Problem, C=Capabilities, D=Details & Constraints.
Konsekuensi: bisa diubah saat review user; yang baku adalah PRINSIP (4 blok, auto-prefill, confidence).

## ADR-005 | 2026-09-13 | Skill disimpan sebagai cache.kv + index leksikal
Konteks: user minta cache.kv + indexing seperti cursor.ai.
Keputusan: registry KV di `skills/cache.kv`; index = chunking + hash konten + inverted index + BM25-lite (tanpa embedding eksternal agar offline & gratis).
Konsekuensi: recall semantik murni (embedding) jadi upgrade opsional nanti (text-embedding-3-small); retrieval leksikal cukup untuk 23 skill.

## ADR-008 | 2026-09-13 | [CONFIRMED] Auth = Better Auth + Google OAuth
Konteks: butuh login 1-klik Gmail untuk founder non-teknis; password ditolak (M-023).
Keputusan: Better Auth (drizzle adapter, 4 tabel auth) + provider Google; email/password DISABLED; sesi server via hooks + useSession client; login demo mock hanya skeleton.
Konsekuensi: butuh GOOGLE_CLIENT_ID/SECRET + redirect URI terdaftar di Console; login Google mustahil di iframe (wajib tab baru).

## ADR-009 | 2026-09-13 | [CONFIRMED] DB ganda: Neon (prod/CI) + PG lokal (sandbox)
Konteks: sandbox tak bisa menjangkau Neon (egress allowlist); dev butuh DB nyata.
Keputusan: Neon = source of truth (migrasi via CI, repo secret); sandbox = PG 16 lokal TCP 127.0.0.1:5433 (pgserver, scripts/local-pg.py, .pgdata). `.env` lokal, `.env.neon` backup.
Konsekuensi: migrasi ditulis sekali (drizzle/), diterapkan 2x (CI→Neon, lokal→PG); URL Neon tak pernah dipakai di sandbox.

## ADR-010 | 2026-09-13 | [CONFIRMED] Preview user = production (adapter-node)
Konteks: vite dev rapuh untuk user (ratusan modul, HMR, cache acak) → halaman putih/klik mati.
Keputusan: user selalu dilayani `vite preview` (adapter-node, PORT 5173, env via source .env); dev hanya iterasi internal. Build wajib sebelum preview (build/ tak ikut snapshot).
Konsekuensi: tiap ubah kode → check → build → restart preview → verifikasi curl semua route.

## ADR-011 | 2026-09-13 | [SKELETON] Admin = gate email + tabel site_settings
Konteks: butuh pantau (user/proyek) + ubah harga tanpa deploy.
Keputusan skeleton: /admin + API summary/prices; gate requireAdmin (ADMIN_EMAILS; kosong = semua-login-boleh + banner); harga di site_settings key/value, landing SSR dari DB + fallback.
Konsekuensi: production WAJIB isi ADMIN_EMAILS + pindah ke role admin di DB.
