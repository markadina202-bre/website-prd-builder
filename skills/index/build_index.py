#!/usr/bin/env python3
"""Bangun index skill ala-Cursor: chunk -> hash -> inverted index.

Sumber : skills/cache.kv + skills/*/SKILL.md
Output : manifest.json, chunks.jsonl, lexicon.json (di folder ini).
Idempotent: hash per chunk dilaporkan (diubah/tetap/dihapus) ala Merkle leaves.
"""
import hashlib
import json
import re
from pathlib import Path

HERE = Path(__file__).parent
SKILLS_DIR = HERE.parent
KV_FILE = SKILLS_DIR / "cache.kv"

TOKEN_RE = re.compile(r"[a-z0-9]+")
STOP = set(
    "dan yang di ke dari untuk dengan ini itu atau pada adalah sebuah sebagai "
    "agar juga akan ada dalam kami kita anda saya tidak ya yg dll the a an and "
    "or of to in on for with is are be it its this that these those by at as".split()
)


def sha1(s: str) -> str:
    return hashlib.sha1(s.encode("utf-8")).hexdigest()[:12]


def tokenize(text: str):
    return [t for t in TOKEN_RE.findall(text.lower()) if t not in STOP and len(t) > 1]


def chunk_skill_md(skill_id: str, path: Path):
    """Pecah SKILL.md per seksi '##' menjadi chunk dict."""
    text = path.read_text(encoding="utf-8")
    parts = re.split(r"(?m)^##\s+(.+)$", text)
    sections = []
    pre = parts[0].strip()
    if pre:
        sections.append(("frontmatter", pre))
    for i in range(1, len(parts), 2):
        heading = parts[i].strip()
        body = parts[i + 1].strip() if i + 1 < len(parts) else ""
        if body:
            sections.append((heading, body))
    out = []
    for n, (heading, body) in enumerate(sections):
        out.append({
            "id": f"{skill_id}#{n:02d}",
            "skill": skill_id,
            "file": str(path.relative_to(SKILLS_DIR.parent)),
            "section": heading,
            "text": body[:4000],
            "tokens": len(tokenize(body)),
            "hash": sha1(body),
        })
    return out


def parse_kv_chunks():
    """Tiap entri skill.NN di cache.kv menjadi 1 chunk registry."""
    entries = {}
    for raw in KV_FILE.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        m = re.match(r"skill\.(\d+)\.(.+)", k.strip())
        if not m:
            continue
        entries.setdefault(m.group(1), {})[m.group(2).strip()] = v.strip()
    chunks = []
    for idx in sorted(entries):
        e = entries[idx]
        sid = e.get("id", f"skill-{idx}")
        text = " | ".join(f"{k}: {v}" for k, v in e.items())
        chunks.append({
            "id": f"{sid}#kv", "skill": sid, "file": "skills/cache.kv",
            "section": "registry", "text": text[:4000],
            "tokens": len(tokenize(text)), "hash": sha1(text),
        })
    return chunks


def main():
    all_chunks = parse_kv_chunks()
    files = {"skills/cache.kv": sha1(KV_FILE.read_text(encoding="utf-8"))}
    for md in sorted(SKILLS_DIR.glob("*/SKILL.md")):
        all_chunks.extend(chunk_skill_md(md.parent.name, md))
        files[str(md.relative_to(SKILLS_DIR.parent))] = sha1(md.read_text(encoding="utf-8"))

    # Diff vs manifest lama (ala Merkle sync report)
    manifest_path = HERE / "manifest.json"
    old_hashes = {}
    if manifest_path.exists():
        try:
            data = json.loads(manifest_path.read_text(encoding="utf-8"))
            old_hashes = {c["id"]: c["hash"] for c in data.get("chunks", [])}
        except Exception:
            pass
    new_ids = {c["id"] for c in all_chunks}
    changed = [c["id"] for c in all_chunks if old_hashes.get(c["id"]) != c["hash"]]
    removed = [cid for cid in old_hashes if cid not in new_ids]

    # Inverted index: term -> {chunk_id: tf}
    lexicon = {}
    for c in all_chunks:
        tf = {}
        for t in tokenize(c["skill"] + " " + c["section"] + " " + c["text"]):
            tf[t] = tf.get(t, 0) + 1
        for t, n in tf.items():
            lexicon.setdefault(t, {})[c["id"]] = n

    manifest = {
        "files": files,
        "chunks": [{"id": c["id"], "skill": c["skill"], "file": c["file"],
                    "section": c["section"], "tokens": c["tokens"], "hash": c["hash"]}
                   for c in all_chunks],
        "stats": {"files": len(files), "chunks": len(all_chunks),
                  "terms": len(lexicon),
                  "tokens": sum(c["tokens"] for c in all_chunks)},
    }
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding="utf-8")
    with open(HERE / "chunks.jsonl", "w", encoding="utf-8") as f:
        for c in all_chunks:
            f.write(json.dumps(c, ensure_ascii=False) + "\n")
    (HERE / "lexicon.json").write_text(json.dumps(lexicon, ensure_ascii=False), encoding="utf-8")

    print(f"files={len(files)} chunks={len(all_chunks)} terms={len(lexicon)} "
          f"tokens={manifest['stats']['tokens']}")
    print(f"changed/new={len(changed)} removed={len(removed)}")
    for cid in changed[:20]:
        print(f"  + {cid}")


if __name__ == "__main__":
    main()
