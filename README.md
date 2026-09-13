# Website PRD Builder 🇮🇩

> **Bangun PRD siap-coding lewat chatbot grill → form ABCD → wayfinder → canvas ala n8n.**
> Terinspirasi [ngodingpakeai.com](https://www.ngodingpakeai.com) & [desainpakeai.com](https://desainpakeai.com),
> ditenagai prinsip **Matt Pocock Skills** di latar belakang.

## Cara baca repo ini (urutan pewarisan)

| # | File | Isi |
|---|------|-----|
| 1 | `docs/00-KONSEP.md` | Konsep produk, visi, diferensiasi |
| 2 | `docs/01-ALUR.md` | Alur user: chatbot → ABCD → wayfinder → canvas → PRD |
| 3 | `docs/02-ARSITEKTUR.md` | Stack, logic, data model, hooks teknis |
| 4 | `docs/03-MONETISASI.md` | Login Gmail, paket, QRIS/ShopeePay/internasional |
| 5 | `docs/04-ROADMAP.md` | Langkah-langkah build fase 0–6 |
| 6 | `memory/` | Ingatan, progress, pola pikir, keputusan (pewarisan antar-sesi) |
| 7 | `skills/` | 20 skill OP + mattpocock + superhuman + codebasememory (cache + index) |

## Skill engine (ringkas)

Semua skill Matt Pocock dipetakan jadi modul backend (`SkillRunner`).
Contoh: `grill-me` → mesin chatbot, `wayfinder` → fog-of-war map,
`to-spec` → generator PRD, `writing-for-agents` → optimizer output untuk AI coding.
Detail: `docs/01-ALUR.md` + `skills/mattpocock/SKILL.md`.

## Cari skill (index ala Cursor)

```bash
python3 skills/index/build_index.py   # bangun ulang index
python3 skills/index/search.py "export PRD ke pdf"   # retrieval
```

Registry: `skills/cache.kv`. Cara kerja index: `skills/index/README.md`.
