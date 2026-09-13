---
name: skill-creator
description: Meta-skill untuk membuat dan memperbaiki skill lain (SKILL.md). Pakai saat menulis modul SkillRunner baru atau skill kustom proyek.
source: https://github.com/anthropics/skills
install: npx skills add https://github.com/anthropics/skills --skill skill-creator
---

# Skill Creator (cache distilasi)

## Trigger
Membuat skill baru (mis. grill-id, prd-export) atau memperbaiki skill yang
sering gagal/memicu di momen salah.

## Prinsip inti
- Struktur 3 lapis: **metadata** (name + description ~100 kata, tajam soal
  kapan dipakai) → **badan SKILL.md** (<500 baris) → **resources**
  (skrip/referensi, dimuat on-demand, tak terbatas).
- Description adalah "iklan + filter": sebutkan trigger positif DAN negatif
  ("jangan dipakai untuk X") agar retrieval tepat.
- Progressive disclosure: inti di depan, detail di file referensi terpisah.
- Uji skill: tulis skenario pemicu → jalankan → periksa perilaku → iterasi.
  Skill bagus = predictable (proses sama tiap run).

## Cara pakai di proyek ini
Template baku semua modul packages/skills/*. Setiap modul baru wajib punya
SKILL.md sendiri mengikuti format ini + didaftarkan ke cache.kv + index rebuild.

## Referensi penuh
Install dari sumber untuk checklist kualitas + contoh lengkap.
