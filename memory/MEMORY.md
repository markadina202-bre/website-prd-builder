# MEMORY.md — Fakta Abadi Proyek (Pewarisan)

> Tulis di sini HANYA fakta permanen. Progress berjalan → PROGRESS.md.
> Format: fakta pendek, ber-ID (M-xxx), boleh dirujuk agen berikutnya.

## Proyek
- M-001: Proyek = Website PRD Builder (SaaS, Indonesia-first, freemium).
- M-002: Alur produk baku: Grill chatbot → Form ABCD → Wayfinder → Canvas n8n → PRD final. Urutan tidak boleh diubah tanpa ADR.
- M-003: ABCD = Audience, Business & Problem, Capabilities, Details & Constraints.
- M-004: Referensi rasa produk: ngodingpakeai.com (komunitas/PRD untuk AI coding), desainpakeai.com (workspace + anti-slop).
- M-005: Bahasa produk & dokumen: Indonesia. Kode & komentar: Inggris.

## Arsitektur
- M-010: Stack [CONFIRMED SvelteKit 2026-09-13]: SvelteKit (Svelte 5) + TS + Tailwind + shadcn-svelte + SvelteKit Remote Functions + Drizzle ORM + Postgres (Neon) + Better Auth (Google) + @ai-sdk/svelte/OpenRouter + Inngest + Svelte Flow (@xyflow/svelte).
- M-011: Semua logika AI dibungkus modul `SkillRunner` (packages/skills/*). Dilarang prompt ad-hoc tersebar di UI.
- M-012: Aturan grill keras: 1 pertanyaan/giliran, frontier-first, persist tiap turn.
- M-013: Single source of truth langganan = tabel `Subscription` (bukan cookie/session).
- M-014: Webhook pembayaran wajib: verifikasi signature + idempotent (dedup gateway ref) + retry via Inngest.
- M-015: Rust = sidecar opsional (`services/rust/`): search engine index, worker PDF, auto-layout WASM, verifier. App harus jalan tanpa Rust (fallback JS). Jangan bangun sebelum ada bottleneck nyata.
- M-024: Neon project: ep-lingering-poetry-ayt5jp8v (pooler, us-east-2). Kredensial HANYA di app/.env (gitignored, chmod 600) — JANGAN tulis password ke repo/chat ulang.
- M-025: Sandbox Arena = egress allowlist (github/npm/pypi OK; neon/maven/apt DEB di-RST). DB driver = postgres-js TCP (`prepare:false`, ssl hanya non-lokal); neon-http TIDAK bisa dari sandbox. Migrasi produksi via CI (.github/workflows/migrate.yml + secret DATABASE_URL). Dev sandbox = PG lokal 127.0.0.1:5433 (binari pgserver, data .pgdata/).
- M-026: Kode server SvelteKit WAJIB baca env via `$env/dynamic/private` — Vite TIDAK mengisi `process.env` dari .env (terbukti: fallback dummy kepakai, `[db]` log). drizzle-kit aman karena hanya membaca file schema. File attach chat TIDAK sampai ke sandbox (3x gagal) — minta user paste teks.
- M-027: Login Google TIDAK BISA di dalam iframe preview (Google tolak framing → putih polos). User WAJIB buka preview di tab baru untuk OAuth. localStorage WAJIB try/catch (SecurityError di iframe/private mode bisa crash app).
- M-028: Preview user HARUS mode production (adapter-node + `vite preview`, PORT 5173, env via source .env) — dev/HMR rapuh untuk user (cache acak, ratusan modul). adapter-auto TIDAK bisa build di sandbox ("could not detect environment") → pakai adapter-node.
- M-029: RALAT: Sesi 07 TIDAK hilang total — commit e3c4c76 ADA di remote; yang rollback hanya workspace LOKAL. Pelajaran: tiap awal sesi bandingkan `git log` lokal vs `ls-remote` SEBELUM percaya ringkasan.
- M-034: Baris "hint fast-forward" di output push = PUSH DITOLAK (bukan sukses). Verifikasi push HANYA via `git ls-remote` vs `git rev-parse HEAD` — `git status` kosong + tanpa upstream = bukti palsu. Branch sesi solo → force aman bila lokal superset remote (cek diff per file dulu). Lease IMPLISIT gagal "stale info" bila branch tanpa upstream → pakai bentuk EKSPLISIT `--force-with-lease=<branch>:<sha-dari-ls-remote>` (terbukti berhasil Sesi 09).
- M-035: node_modules TIDAK ikut snapshot sandbox → bila `svelte-kit: not found`, jalankan `npm ci` (5 dtk, 148 pkgs). Server preview lama tetap jalan (dari build/), tapi check/build butuh install ulang.
- M-036: Logo Google = inline SVG 4-warna (path standar #4285F4/#34A853/#FBBC05/#EA4335 on white), bukan huruf "G".
- M-037: docs/05 = referensi kompetitor PRD (ChatPRD/UX Pilot/River/WriteMyPRD/RapidNative) + 10 pola adopsi → roadmap Fase 3/5/6.
- M-038: docs/06 = referensi arsitektur 1M concurrent (dari user, verbatim) → adaptasi SvelteKit bertahap; mulai 1 region + OpenRouter.
- M-039: Restore sandbox = .git reset ke 57d8e33 + .env*/node_modules/.venv-pg/.pgdata/proses HILANG (file tree utuh). Recovery: `set-branches --add` + fetch + `reset --mixed` (tree tak tersentuh) → npm ci → venv+initdb+migrate → .env baru. Secret user-issued (Google/Neon) WAJIB diminta ulang — tak ada backup by design.
- M-040: Kredensial Google datang format JSON client_secret_*.json (web.client_id + web.client_secret) — chat formatting bisa merusak JSON (link markdown), parse manual 2 nilainya. Secret baru = GOCSPX-... (nilai hanya di .env, jangan echo).
- M-041: Onboarding 3 langkah: (1) Nama, (2) Pengalaman ngoding Pemula/Menengah/Ahli, (3) Goals multi-pilih → dashboard. Profil {nama, experience, goals} di localStorage aman + migrasi profil lama. Nanti: tabel profile + server-side.
- M-042: Restore #2 = pola identik (recovery kini rutin ±5 mnt). Tambahan: app/build ikut hilang (excluded) → WAJIB `npm run build` sebelum preview. Client ID Google (publik) boleh diisi ulang dari memori; client_secret SELALU minta ulang ke user.
- M-043: Admin skeleton: tabel site_settings (key/value) + API + gate ADMIN_EMAILS (kosong = terbuka sementara + banner). Harga landing SSR dari DB + fallback. Migrasi tulis tangan: file SQL + entri _journal.json (migrate OK tanpa snapshot baru). Produksi: role admin di DB + kunci env.
- M-044: Paket pewarisan sesi baru = memory/PANDUAN-SESI.md (dibaca pertama) + AGENTS.md v2 (7 pasal) + ADR-008..011. Index skill: 42 skill / 254 chunk, rebuild 0-change = fresh.
- M-045: Aturan simpan-otomatis (perintah user): tiap progres sekecil apa pun → catat PROGRESS → ./scripts/simpan.sh (add+commit+push+verifikasi remote==lokal). Akhiri tiap giliran tree bersih; maks 3 perubahan tak-berhubungan per commit.
- M-046: MAIN = ac593cb (2026-09-14): PR #1 arena→main merged, 29 commit Sesi 10–16. Merge via gh (server-side) agar sesi tetap di branch arena. Aturan merge-hanya-atas-perintah tetap berlaku utk berikutnya.
- M-030: Nama produk "Form ABCD" → "Form" (struktur ABCD tetap internal). Route `/abcd` → `/form` (bookmark lama 404, beta = OK). Tabel DB `abcd` TIDAK diganti (hindari migrasi sia-sia).
- M-031: n8n canvas = Vue Flow (xyflow). SvelteKit = @xyflow/svelte: `bind:nodes/bind:edges`, node custom via `nodeTypes`, WAJIB browser-guard (SSR crash), simpan state manual.
- M-032: `as` cast TIDAK boleh di `{#each}` Svelte (parse error) → data bertipe di `<script>`. `{@const}` hanya anak langsung block — di dalam div biasa = error.
- M-033: raw.githubusercontent.com DIBLOKIR sandbox; ambil file GitHub via api.github.com (contents → base64).

## Bisnis
- M-020: Paket: Gratis / Pro Rp49rb/bln / Team Rp199rb-bln (5 seat). [CONFIRMED user 2026-09-13]
- M-021: Gateway ID = Midtrans Snap (QRIS 0,7%, ShopeePay/GoPay/OVO/DANA, VA, kartu, retail). Cadangan: Xendit (kalau butuh disbursement).
- M-022: Gateway INTL = Polar (utama), Lemon Squeezy (cadangan). Keduanya Merchant-of-Record.
- M-023: Auth utama = Login Gmail (Google OAuth). Tanpa password wajib.

## Skill
- M-030: 20 skill OP terdaftar di `skills/cache.kv` (skill.01–skill.20) + 3 bundel: mattpocock, superhuman (=obra/superpowers full), codebasememory.
- M-031: Cache skill = distilasi ringkas + sumber + perintah install asli. Untuk isi penuh, install dari repo sumber.
- M-032: Index ala-Cursor: chunking per seksi `##`, hash konten (ala Merkle leaves), inverted index leksikal + skoring BM25-lite (`skills/index/`).

## Pelajaran (prompt-engineering & produk) — tumbuh seiring waktu
- M-040: User Indonesia merespons lebih baik pada 1 pertanyaan konkret + opsi daripada pertanyaan terbuka lebar.
- M-041: Auto-prefill (grill→form, ABCD→canvas) adalah "momen magis" — pertahankan & ukur % keterisian.
- M-042: Quality gate (skor PRD) adalah paywall alami terbaik — jangan gratiskan skor detail penuh.
