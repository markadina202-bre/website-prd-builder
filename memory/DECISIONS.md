# DECISIONS.md — Architecture Decision Records (ringkas)

> Format: ADR-xxx | tanggal | konteks → keputusan → konsekuensi.
> Status: PROPOSED / CONFIRMED / SUPERSEDED.

## ADR-006 | 2026-09-13 | [PROPOSED] Framework: SvelteKit (Svelte 5) vs Next.js — MENUNGGU USER
Konteks: user minta alternatif Next.js yang hemat resource, ringan, cepat, mudah maintain.
Usulan: SvelteKit — bundle ±50-70% lebih kecil, server ringan (VPS 512MB-1GB cukup),
kode ±30% lebih sedikit (Svelte 5 runes), tetap kompatibel: Vercel AI SDK (Svelte),
Better Auth, Prisma/Drizzle, shadcn-svelte, @xyflow/svelte (Svelte Flow), Inngest, Midtrans, Polar.
Tradeoff: talent & tutorial React lebih banyak di Indonesia; lib AI bleeding-edge sering React-first.
Jika CONFIRMED → update: M-010, ADR-001 (React Flow→Svelte Flow), docs/02 (hooks→runes), docs/04 Fase 0.

## ADR-001 | 2026-09-13 | Canvas = React Flow (@xyflow/react)
Konteks: butuh node editor ala n8n. Opsi: React Flow, bikin sendiri (SVG/canvas),
fork n8n (lisensi Sustainable Use — bermasalah komersial).
Keputusan: React Flow (MIT, performant, ekosistem besar).
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
