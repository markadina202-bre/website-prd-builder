---
name: web-quality-skills
description: Quality gate web: accessibility (WCAG), best-practices, core-web-vitals (LCP/INP/CLS), performance, SEO. Pakai pra-rilis tiap halaman.
source: https://github.com/addyosmani/web-quality-skills/tree/main/skills
install: npx skills add https://github.com/addyosmani/web-quality-skills
---

# Web Quality Skills (cache distilasi)

## Trigger
Sebelum halaman dinyatakan selesai/rilis: audit a11y + vitals + SEO dasar.

## Prinsip inti
- accessibility: audit WCAG (kontras, nama aksesibel, keyboard, aria),
  temuan berprioritas.
- core-web-vitals: LCP (konten utama cepat), INP (respons input),
  CLS (tanpa lompatan layout) — ukur, jangan kira-kira.
- performance: bundle diet, lazy/dynamic import (Svelte Flow, editor),
  gambar teroptimasi + berdimensi.
- seo (landing publik): meta/title/deskripsi, heading semantik,
  sitemap, OG tags.
- best-practices: checklist umum (HTTPS, error handling, dsb).

## Cara pakai di proyek ini
Gate pra-rilis: tiap halaman lolos a11y + vitals; landing + pricing
lolos SEO dasar. Eksekusi via audit manual + Lighthouse saat Fase 6.

## Referensi penuh
Repo addyosmani/web-quality-skills (5 sub-skill).
