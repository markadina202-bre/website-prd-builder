---
name: supabase-postgres-best-practices
description: Praktik Postgres aman & kencang: schema, index, RLS, migrasi, optimasi query. Pakai untuk semua desain database.
source: community via https://skills.sh
install: npx skills add supabase-postgres-best-practices
---

# Supabase Postgres Best Practices (cache distilasi)

## Trigger
Bikin/ubah schema, migrasi, query berat (frontier, graph, versioning).

## Prinsip inti
- Desain: tipe tepat (JSONB untuk graph fleksibel, bukan TEXT), FK + constraint
  di DB (bukan cuma di app), index untuk pola query nyata (projectId+status).
- Keamanan: RLS / pemisahan akses per user; service key TIDAK PERNAH ke client;
  validasi input sebelum query (Prisma typed, hindari raw kecuali perlu).
- Migrasi: kecil, reversible, teruji di staging; data besar = backfill bertahap.
- Observabilitas: EXPLAIN untuk query lambat; catat pola N+1 (mis. load tiket
  + relasi blockedBy) → join/include.

## Cara pakai di proyek ini
Skema Prisma docs/02 (User/Project/ContextDoc/Adr/Abcd/Ticket/CanvasGraph/Prd/
Subscription/Payment). Index: (projectId,status) tickets; (projectId,version)
artefak. Graph canvas = JSONB berversi.

## Referensi penuh
Registry skills.sh untuk panduan penuh.
