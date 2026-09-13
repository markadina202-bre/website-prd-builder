---
name: superhuman
description: Bundel framework obra/superpowers (julukan: superhuman) — CARA KERJA build: TDD, sistematis, simplicity, evidence. Pakai untuk SEMUA fase development.
source: https://github.com/obra/superpowers
install: git clone https://github.com/obra/superpowers ~/.claude/skills/superpowers
kind: bundle
---

# Superhuman = obra/superpowers (cache distilasi)

> 40K+ stars. Beda dari mattpocock: ini FRAMEWORK dengan enforcement gates
> (cocok untuk agen yang jalan lama sendirian), bukan sekadar koleksi tools.

## Isi framework (14+ skill)
Inti: `brainstorming`, `writing-plans`, `executing-plans`,
`test-driven-development`, `systematic-debugging`, `verification-before-completion`.
Kolaborasi: `subagent-driven-development`, `dispatching-parallel-agents`,
`requesting-code-review`, `receiving-code-review`, `using-git-worktrees`.
Meta: `writing-skills` (+bundel pengujian skill), `condition-based-waiting`,
`root-cause-tracing`, `defense-in-depth`, `testing-anti-patterns`.

## Filosofi (4 pilar — hafalkan)
1. **TDD**: test dulu, selalu. Langgar = hapus & ulangi.
2. **Sistematis > ad-hoc**: proses tertulis > tebakan pintar.
3. **Simplicity**: kurangi kompleksitas sebagai tujuan utama.
4. **Evidence over claims**: verifikasi sebelum deklarasi selesai.

## Alur baku development (7 langkah)
brainstorming → design doc → writing-plans → subagent-driven-development
→ test-driven-development → requesting-code-review → verification-before-completion.
Bootsrap ringan (<2rb token), skill dimuat on-demand via keyword/scenario.

## Cara pakai di proyek ini
INI cara kerja resmi build PRD Builder (lihat docs/04-ROADMAP "Cara eksekusi").
Catatan: skill.08–13 di cache.kv = pin individual dari bundel ini agar
bisa dirujuk 1-1 oleh modul & index.

## Referensi penuh
Repo sumber untuk SKILL.md asli + release notes + test harness.
