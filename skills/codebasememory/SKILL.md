---
name: codebasememory
description: Memori persistent codebase: file-based + index + recall otomatis. WAJIB dibaca di awal sesi dan ditulis di akhir sesi. Tulang punggung pewarisan.
source: local (pola: supermemory, superlocalmemory, TerminalSkills/agent-memory)
install: built-in (repo ini)
kind: bundle(custom)
---

# CodebaseMemory (skill kustom proyek ini)

## Trigger
AWAL sesi (baca) dan AKHIR sesi/setiap progress (tulis). Juga saat agen
butuh fakta proyek ("berapa harga Pro?", "gateway apa?", "sampai mana?").

## Lapisan memori (3 lapis, local-first)
1. **File-based (utama, selalu ada)**: `memory/MEMORY.md` (fakta M-xxx),
   `memory/PROGRESS.md` (log sesi), `memory/POLA-PIKIR.md` (pola P-xxx),
   `memory/DECISIONS.md` (ADR-xxx), `AGENTS.md` (aturan main).
2. **Registry + index (skill)**: `skills/cache.kv` + `skills/index/`
   (manifest/chunks/lexicon) + `search.py` retrieval BM25-lite.
3. **Per-proyek user (runtime)**: CONTEXT.md + ADR + artefak berversi
   (di DB saat app jalan; pola `handoff`).

## Protokol wajib agen
- **Ingat**: baca AGENTS.md → MEMORY.md → PROGRESS.md (terbaru) → search skill
  relevan. Jangan tanya hal yang sudah tercatat.
- **Kerja**: keputusan baru → DECISIONS.md; fakta permanen → MEMORY.md;
  pola berguna → POLA-PIKIR.md; tiap jeda → PROGRESS.md.
- **Higiene**: jangan simpan secret/PII/API key; fakta kadaluarsa diarsipkan
  (bukan dihapus diam-diam); ID stabil (M-/P-/ADR-xxx).
- **Recall test**: sebelum mengandalkan ingatan, verifikasi via search/baca
  file — ingatan agen tanpa bukti = asumsi.

## Upgrade path (opsional, saat skala butuh)
- SQLite + embeddings (text-embedding-3-small) untuk semantic recall.
- ChromaDB/Pinecone untuk jutaan memori (pola agent-memory TerminalSkills).
- Supermemory API / SuperLocalMemory (local-first + temporal + graph)
  untuk memori user lintas-sesi di production.
- Prinsip tetap: privacy by default, container/tags per user, decay arsip.

## Cara pakai di proyek ini
Semua aturan pewarisan repo ini ADALAH implementasi skill ini.
EKsekusi: `python3 skills/index/build_index.py` tiap ubah skill.
