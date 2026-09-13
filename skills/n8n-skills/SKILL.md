---
name: n8n-skills
description: Pengetahuan workflow automation ala n8n (trigger, node, edge, eksekusi, retry). Pakai sebagai referensi UX canvas node-editor.
source: community via https://skills.sh
install: npx skills add n8n-skills
---

# n8n Skills (cache distilasi)

## Trigger
Merancang/membangun canvas node-editor: palet node, koneksi edge, validasi graph.

## Prinsip inti (yang diadopsi)
- Mental model: trigger → node → edge → output; graph diserialisasi ke JSON;
  tiap node punya config + input/output handle yang jelas.
- UX terbukti: drag dari palet, hubung antar handle, panel konfigurasi kanan,
  minimap, zoom-to-fit, validasi (node yatim, koneksi invalid).
- Eksekusi (referensi saja): run per-node berurutan, retry, history.
  → TIDAK diimplementasi di produk ini (canvas kami untuk DESAIN PRD).

## Cara pakai di proyek ini
Acuan UX canvas React Flow: 7 node (Persona/Feature/Page/API/DB/Decision/Ticket)
+ 4 edge (flows-to/depends-on/implements/blocks). Validasi graph meniru n8n.

## Batasan
Skill referensi UX, bukan eksekutor workflow. Jangan bangun runner n8n.
