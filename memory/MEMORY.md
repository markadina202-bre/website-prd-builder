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
- M-010: Stack: Next.js 16 + TS + Tailwind + shadcn + tRPC + Prisma + Postgres (Neon) + Better Auth (Google) + Vercel AI SDK/OpenRouter + Inngest + React Flow.
- M-011: Semua logika AI dibungkus modul `SkillRunner` (packages/skills/*). Dilarang prompt ad-hoc tersebar di UI.
- M-012: Aturan grill keras: 1 pertanyaan/giliran, frontier-first, persist tiap turn.
- M-013: Single source of truth langganan = tabel `Subscription` (bukan cookie/session).
- M-014: Webhook pembayaran wajib: verifikasi signature + idempotent (dedup gateway ref) + retry via Inngest.

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
