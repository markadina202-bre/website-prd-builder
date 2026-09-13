# AGENTS.md — Aturan main agen di repo ini

> Diwariskan ke setiap sesi/agen berikutnya. Baca file ini + `memory/` dulu sebelum kerja.

## 1. Wajib baca saat sesi dimulai
1. `memory/MEMORY.md` — fakta abadi proyek
2. `memory/PROGRESS.md` — posisi terakhir
3. `memory/POLA-PIKIR.md` — cara berpikir yang dipakai
4. `skills/cache.kv` — registry skill (atau `python3 skills/index/search.py "<topik>"`)

## 2. Wajib tulis setiap ada progress
- Update `memory/PROGRESS.md` (tanggal, apa yang dikerjakan, status).
- Fakta baru yang permanen → `memory/MEMORY.md`.
- Keputusan arsitek/bisnis → `memory/DECISIONS.md` (format ADR-xxx).
- Pola berpikir baru yang terbukti berguna → `memory/POLA-PIKIR.md`.

## 3. Skill dulu sebelum kode
- Jangan langsung coding. Cek skill relevan via `skills/index/search.py`.
- Alur kerja default (superpowers): `brainstorming` → `writing-plans` →
  `test-driven-development` → `verification-before-completion`.
- Gali kebutuhan user dengan prinsip `grilling`: **1 pertanyaan per giliran**,
  jangan borongan, jangan asumsi diam-diam.

## 4. Konvensi
- Bahasa user: **Indonesia**. Dokumen produk: Indonesia. Kode & komentar: Inggris.
- Skill format: `SKILL.md` + frontmatter `name` + `description` (standar agentskills.io).
- Setiap perubahan skill → jalankan `python3 skills/index/build_index.py`.
- Jangan commit secret. Jangan push ke branch selain `arena/01a09aee-website-prd-builder`.
