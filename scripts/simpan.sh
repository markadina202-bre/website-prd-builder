#!/usr/bin/env bash
# simpan.sh — Simpan otomatis tiap progres kecil: add + commit + push + verifikasi.
# Pakai: ./scripts/simpan.sh "Sesi NN: pesan singkat"
set -u
cd "$(dirname "$0")/.." || exit 1
MSG="${1:-auto: $(date -u +%F\ %T) UTC}"
BRANCH="$(git branch --show-current)"
case "$BRANCH" in
  arena/*) ;;
  *) echo "DITOLAK: bukan branch sesi ($BRANCH)" >&2; exit 1 ;;
esac
if [ -z "$(git status --porcelain)" ]; then
  echo "Bersih — tidak ada yang disimpan."
  exit 0
fi
git add -A || exit 1
git commit -m "$MSG" || exit 1
git push origin "$BRANCH" || exit 1
REMOTE="$(git ls-remote origin "$BRANCH" | cut -c1-7)"
LOCAL="$(git rev-parse --short HEAD)"
echo "remote: $REMOTE / lokal: $LOCAL"
[ "$REMOTE" = "$LOCAL" ] || { echo "GAGAL: remote != lokal" >&2; exit 1; }
echo "OK tersimpan: $LOCAL"
