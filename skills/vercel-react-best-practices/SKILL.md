---
name: vercel-react-best-practices
description: Panduan performa React/Next.js: RSC, streaming, caching, anti-waterfall. Pakai untuk semua kode frontend agar kencang by default.
source: https://github.com/vercel-labs/agent-skills
install: npx skills add vercel-react-best-practices
---

# Vercel React Best Practices (cache distilasi)

## Trigger
Bikin/ubah halaman/komponen Next.js, keluhan lambat, bundle membengkak.

## Prinsip inti
- Server Components default; Client Components hanya untuk interaktivitas
  (chat input, form, canvas). Jangan jadikan semua "use client".
- Streaming + Suspense untuk bagian lambat (AI stream, canvas besar);
  paralelkan fetch independen (anti-waterfall).
- Bundle: dynamic import untuk yang berat (Svelte Flow, editor), ukur dengan
  analyzer; tree-shake ikon/lib.
- Cache tepat: static untuk landing/pricing; dynamic + revalidate untuk
  dashboard; jangan cache data user antar-user.

## Cara pakai di proyek ini (dipetakan ke SvelteKit — ADR-006)
Standar: data di `load` + Remote Functions (padanan RSC: fetch di server,
render sekecil mungkin di client); chat/canvas = islands reaktif di atas
shell server; Svelte Flow via dynamic import; AI streaming via SSE endpoint
+ `@ai-sdk/svelte`. Prinsip inti (paralel fetch, bundle diet, jangan cache
data user antar-user) tetap berlaku 1:1.

## Referensi penuh
Repo vercel-labs/agent-skills untuk checklist penuh.
