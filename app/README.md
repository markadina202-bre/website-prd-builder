# PRD Builder — app (skeleton Fase 0)

SvelteKit murni + Tailwind. Semua data MOCK (lihat `src/lib/mock.ts`).

## Jalankan

```bash
cd app
npm install
npm run dev        # → http://localhost:5173
```

Alur demo: `/` → Masuk (mock) → `/dashboard` → proyek → **Grill** (8 pertanyaan
scripted, panel CONTEXT.md live) → **ABCD** (auto-prefill mock) → **Wayfinder**
(kanban statis) → **Canvas** (pratinjau SVG).

## Status integrasi

- [x] Better Auth + Google provider (kode siap, butuh GOOGLE_CLIENT_ID/SECRET)
- [x] Drizzle schema 13 tabel + migrasi `drizzle/0000_init.sql` (butuh DATABASE_URL untuk push)
- [ ] `cp .env.example .env` + isi → `npx drizzle-kit push` → login Google real
- [ ] Remote Functions: grill.answer, abcd.*, tickets.*, canvas.*, prd.*
- [ ] OpenRouter key untuk AI asli (@ai-sdk/svelte)
