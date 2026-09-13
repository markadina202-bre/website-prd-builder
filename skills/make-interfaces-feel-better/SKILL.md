---
name: make-interfaces-feel-better
description: Detail craft yang bikin UI terasa premium: optical alignment, word wrapping, button tactility, motion feel. Pakai sebagai polish pass terakhir.
source: https://github.com/jakubkrehel/make-interfaces-feel-better
install: npx skills add https://github.com/jakubkrehel/make-interfaces-feel-better
---

# Make Interfaces Feel Better (cache distilasi)

## Trigger
UI sudah "rapi" tapi belum "premium": polish pass halaman, micro-interaction,
review feel sebelum rilis.

## Prinsip inti
- Optical > matematis: sejajarkan berdasarkan yang terlihat mata
  (ikon vs teks, baseline, bobot visual), bukan angka piksel mentah.
- Tactility: tombol/link memberi respons (hover, active scale, focus)
  yang konsisten di seluruh app; loading terasa cepat (skeleton > spinner).
- Teks: wrapping rapi (hindari orphan/yatim), hirarki ukuran tegas,
  microcopy ringkas.
- Motion: sedikit momen kunci + easing tepat > animasi di mana-mana;
  hormati reduced-motion.

## Cara pakai di proyek ini
Pass terakhir tiap halaman + feel canvas/kanban (drag, hover node, transisi
kolom). Dieksekusi setelah avoid-ai-design & antislop lolos.

## Referensi penuh
Repo sumber untuk checklist craft lengkap.
