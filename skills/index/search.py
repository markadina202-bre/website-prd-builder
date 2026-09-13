#!/usr/bin/env python3
"""Retrieval skill ala-Cursor (BM25-lite leksikal + rerank).

Pakai : python3 skills/index/search.py "export PRD ke pdf" [--top 5]
"""
import json
import math
import re
import sys
from pathlib import Path

HERE = Path(__file__).parent
TOKEN_RE = re.compile(r"[a-z0-9]+")
STOP = set(
    "dan yang di ke dari untuk dengan ini itu atau pada adalah sebuah sebagai "
    "agar juga akan ada dalam kami kita anda saya tidak ya yg dll the a an and "
    "or of to in on for with is are be it its this that these those by at as".split()
)
K1, B = 1.5, 0.75


def tokenize(text: str):
    return [t for t in TOKEN_RE.findall(text.lower()) if t not in STOP and len(t) > 1]


def load():
    chunks = {}
    with open(HERE / "chunks.jsonl", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                c = json.loads(line)
                chunks[c["id"]] = c
    lexicon = json.loads((HERE / "lexicon.json").read_text(encoding="utf-8"))
    return chunks, lexicon


def search(query: str, top: int = 5):
    chunks, lexicon = load()
    if not chunks:
        return []
    avgdl = sum(len(tokenize(c["text"])) for c in chunks.values()) / len(chunks)
    scores = {}
    for t in tokenize(query):
        posting = lexicon.get(t, {})
        if not posting:
            continue
        idf = math.log(1 + (len(chunks) - len(posting) + 0.5) / (len(posting) + 0.5))
        for cid, tf in posting.items():
            dl = max(len(tokenize(chunks[cid]["text"])), 1)
            denom = tf + K1 * (1 - B + B * dl / avgdl)
            scores[cid] = scores.get(cid, 0) + idf * (tf * (K1 + 1) / denom)
    # Rerank: bonus jika query cocok di skill-id / section / registry
    ranked = []
    for cid, s in scores.items():
        c = chunks[cid]
        q = query.lower()
        if c["skill"].replace("-", " ") in q or c["skill"] in q.replace(" ", ""):
            s *= 1.5
        if any(w in c["section"].lower() for w in tokenize(query)):
            s *= 1.2
        if c["section"] == "registry":
            s *= 1.1
        ranked.append((s, c))
    ranked.sort(key=lambda x: -x[0])
    return [(s, c) for s, c in ranked[:top] if s > 0]


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    top = 5
    if "--top" in sys.argv:
        try:
            top = int(sys.argv[sys.argv.index("--top") + 1])
        except (ValueError, IndexError):
            pass
    if not args:
        print('Pakai: python3 skills/index/search.py "kata kunci" [--top 5]')
        sys.exit(1)
    if not (HERE / "chunks.jsonl").exists():
        print("Index belum dibangun. Jalankan: python3 skills/index/build_index.py")
        sys.exit(1)
    query = " ".join(args)
    hits = search(query, top)
    if not hits:
        print(f"Tidak ada hasil untuk: {query}")
        return
    for s, c in hits:
        snippet = " ".join(c["text"].split())[:220]
        print(f"--- skor={s:.2f} | {c['skill']} | {c['file']} §{c['section']}")
        print(f"    {snippet}...")


if __name__ == "__main__":
    main()
