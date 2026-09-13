# 00 — KONSEP Website PRD Builder

## Visi (1 kalimat)
**Orang Indonesia yang punya ide aplikasi bisa menghasilkan PRD setara business analyst
profesional dalam 30 menit — lalu PRD itu langsung bisa dieksekusi AI coding
(Claude Code, Cursor, Codex, dsb) tanpa revisi berulang.**

## Masalah yang diselesaikan
1. **Blank-page syndrome** — user tidak tahu mulai PRD dari mana.
2. **PRD mentah** — PRD buatan AI sekali-tembak penuh lubang (asumsi, scope creep,
   acceptance criteria kabur) → AI coding salah jalan → token & waktu kebuang.
3. **Hamburan konteks** — ide di chat, keputusan di kepala, tidak ada artefak tunggal.
4. Referensi lokal ([ngodingpakeai.com](https://www.ngodingpakeai.com),
   [desainpakeai.com](https://desainpakeai.com)) membuktikan pasar Indonesia haus
   tooling "AI + struktur", tapi belum ada yang fokus ke **PRD builder visual + grill**.

## Konsep inti: "Grill → Struktur → Peta → Bangun"
Bukan chatbot sekali-jawab. Ini **mesin interogasi + visualisasi keputusan**:

```
IDE KABUR ──▶ [1. GRILL CHATBOT] ──▶ KONTEKS TAJAM
     grill-me + grill-with-docs + grilling (1 pertanyaan/giliran)
                        │
                        ▼
              [2. FORM ABCD] ──▶ STRUKTUR (auto-prefilled, bisa edit)
     to-questionnaire + domain-modeling
                        │
                        ▼
              [3. WAYFINDER] ──▶ PETA PERJALANAN (fog-of-war → tickets)
     wayfinder + research + prototype
                        │
                        ▼
              [4. CANVAS ala n8n] ──▶ ARSITEKTUR VISUAL (node = modul/fitur)
     codebase-design + domain-modeling + to-tickets
                        │
                        ▼
              [5. PRD FINAL] ──▶ DOKUMEN SIAP-CODING (MD/PDF/DOCX/PPTX)
     to-spec + writing-for-agents + triage
```

## Prinsip Matt Pocock di latar belakang (SkillRunner)
User tidak perlu tahu nama skill. Mereka hanya merasakan "AI-nya pinter nanya".
Di backend, tiap tahap = 1+ skill Matt Pocock yang berjalan sebagai modul:

| Tahap produk | Skill Matt Pocock | Peran |
|---|---|---|
| Chatbot awal | `grill-me`, `grilling`, `ask-matt` | Tanya 1-per-1 sampai decision tree tuntas |
| Chatbot + konteks | `grill-with-docs` | Lawan rencana dengan CONTEXT.md proyek (stateful) |
| Form ABCD | `to-questionnaire`, `domain-modeling` | Generate + isi form dari hasil grill |
| Wayfinder | `wayfinder`, `research`, `prototype` | Fog-of-war → tiket Research/Prototype/Grilling/Task |
| Canvas | `codebase-design`, `domain-modeling` | Node = modul deep/shallow, seam jelas |
| Prioritas | `triage`, `to-tickets` | MoSCoW + tiket siap eksekusi |
| PRD final | `to-spec`, `writing-for-agents` | Spec + optimasi agar AI coding patuh |
| Quality gate | `diagnosing-bugs`, `code-review`, `wait-what` | Cari "bug" di PRD: kontradiksi, lubang, ambiguitas |
| Handoff coding | `implement`, `handoff`, `tdd` | Instruksi eksekusi + test plan per vertical slice |
| Edukasi | `teach`, `wizard` | Mode jelaskan & mode dipandu langkah-demi-langkah |
| Retrospektif | `retro`, `claude-handoff` | Evaluasi proyek + resume sesi |

Total 35 skill Matt Pocock dipasang (lihat `skills/mattpocock/SKILL.md`);
yang tabel di atas adalah yang aktif di alur user, sisanya dipakai saat development.

## Diferensiasi vs kompetitor
1. **Grill engine, bukan prompt box** — 1 pertanyaan tajam per giliran, ada frontier
   & decision tree (ala `grill-me`), bukan wall-of-text.
2. **Canvas node seperti n8n** — PRD divisualkan jadi graph modul yang bisa
   di-drag, dipecah, dihubungkan (React Flow).
3. **Output dioptimasi untuk AI coding** — `writing-for-agents`: predictable,
   no-op dihapus, acceptance criteria per slice (langsung tempel ke Cursor/Claude).
4. **Indonesia-first** — Bahasa Indonesia, login Gmail, bayar QRIS/ShopeePay,
   harga rupiah, template khas (toko online, absensi, PPDB, dsb).
5. **Pewarisan konteks** — tiap proyek punya CONTEXT.md + ADR (skill `handoff`),
   sesi bisa disambung kapan pun tanpa mengulang.

## Aha-moment (hook utama)
> "Saya cerita ngalor-ngidul 10 menit, AI-nya nanya terus kayak konsultan mahal,
> tiba-tiba PRD 20 halaman + peta canvas-nya JADI. Tinggal tempel ke Cursor."

## Model bisnis singkat
Freemium SaaS: Gratis (1 proyek, grill terbatas) → Pro (Rp49rb/bln) →
Team (Rp199rb/bln). Bayar: QRIS, ShopeePay/GoPay/OVO/DANA, VA, kartu via
**Midtrans**; luar negeri via **Polar/Lemon Squeezy**. Detail: `docs/03-MONETISASI.md`.
