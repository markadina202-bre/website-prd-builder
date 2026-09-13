---
name: ux-ui-agent-skills
description: Senior design architect: token DTCG, komponen atomic + 8 states, adapter Svelte, audit WCAG 2.2, review Nielsen, motion, UX writing, 138 design systems. Pakai sebagai standar desain produk.
source: https://github.com/plugin87/ux-ui-agent-skills
install: npx skills add https://github.com/plugin87/ux-ui-agent-skills
---

# UX/UI Agent Skills (cache distilasi)

## Trigger
Desain sistem, komponen, halaman, audit aksesibilitas, review desain, motion, microcopy.

## Prinsip inti
- Token dulu (DTCG 3-tier: Primitive → Semantic → Component), baru komponen.
- Komponen atomic (Atoms → Templates): anatomi, varian, 8 states, peta token,
  spec a11y. Kode via Adapter Protocol — target kita: Svelte + Tailwind v4
  (+ interop shadcn-svelte via crosswalk peran).
- Review 6 dimensi + 10 heuristik Nielsen dalam tabel temuan terstruktur;
  audit a11y WCAG 2.2 AA (target) dengan prioritas P0/P1/P2.
- Motion = token (durasi, easing, preset transisi) + strategi reduced-motion.
- Anti-slop doctrine + 138 arketipe: tiap halaman punya arah visual bernama,
  bukan default generik. UX writing: formula error/empty-state + microcopy inklusif.

## Cara pakai di proyek ini
Urutan resmi: token → komponen → halaman → review → audit.
Lihat juga: userinterface-wiki (raphaelsalaja), DESIGN.md Google
(google-labs-code/design.md), skill shadcn (direktori skills.sh).

## Referensi penuh
Repo sumber (MIT, 1.2k+ stars): 17 skill runnable (/design-tokens, /a11y-audit, ...).
