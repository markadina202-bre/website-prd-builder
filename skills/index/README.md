# Index Skill ala Cursor.ai

> Meniru arsitektur indexing Cursor: **chunk → hash → retrieve**,
> versi ringan tanpa embedding eksternal (offline & gratis).

## Cara kerja (4 langkah, mirip Cursor)

| Cursor.ai | Implementasi di sini |
|---|---|
| 1. Chunk codebase (fungsi/file) | `build_index.py`: pecah tiap `SKILL.md` per seksi `##` (~<500 token) + 1 chunk per entri `cache.kv` |
| 2. Hash & sync (Merkle tree) | `manifest.json`: `sha1` per file + per chunk. Build ulang → hanya chunk berubah yang ditulis ulang |
| 3. Embedding + vector search | **Diganti BM25-lite leksikal** (`lexicon.json` inverted index + skoring TF-IDF). Upgrade opsional: tambah embedding nanti |
| 4. Hybrid retrieval + rerank | `search.py`: tokenisasi → skor BM25-lite → rerank (bonus judul/skill-id) → top-K + snippet |

## File

```
skills/index/
  README.md          # file ini
  build_index.py     # bangun manifest.json + chunks.jsonl + lexicon.json
  search.py          # CLI retrieval: python3 search.py "query" [--top 5]
  manifest.json      # hasil build: file, hash, daftar chunk (jangan edit manual)
  chunks.jsonl       # hasil build: 1 chunk per baris (jangan edit manual)
  lexicon.json       # hasil build: inverted index term → chunk ids
```

## Pakai

```bash
python3 skills/index/build_index.py                  # (wajib tiap ubah skill)
python3 skills/index/search.py "export PRD ke pdf"   # cari skill relevan
python3 skills/index/search.py "debug webhook" --top 3
```

## Batasan jujur
- Leksikal, bukan semantik: sinonim jauh ("bayar" vs "payment") hanya cocok
  jika katanya muncul. Mitigasi: SKILL.md ditulis dengan sinonim ID+EN.
- Cukup untuk 23 skill (~ratusan chunk). Di atas ribuan chunk → tambah embedding.
