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

## Menuju Fase 0 real

- [ ] Better Auth + Google OAuth (butuh Client ID/Secret)
- [ ] Neon Postgres + Drizzle schema (butuh DATABASE_URL)
- [ ] Remote Functions: grill.answer, abcd.*, tickets.*, canvas.*, prd.*
- [ ] OpenRouter key untuk AI asli (@ai-sdk/svelte)
