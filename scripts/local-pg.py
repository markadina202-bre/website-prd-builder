#!/usr/bin/env python3
"""Postgres lokal sandbox: TCP 127.0.0.1:5433, data di .pgdata/ (persistent).

Memakai binari postgres bundelan pgserver (PyPI) — BUKAN via API pgserver,
karena API-nya socket-only (tanpa TCP) dan driver kita butuh TCP.

Alasan: sandbox tidak bisa menjangkau Neon (egress allowlist), jadi dev/test
auth di sandbox memakai PG lokal. Produksi/CI tetap Neon (URL Neon tersimpan
di app/.env.neon — JANGAN commit file .env*).

Jalankan via: start_process (foreground, log streaming).
Berhenti: stop_process. Data tetap ada di .pgdata/ untuk sesi berikutnya.
"""
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BIN = str(ROOT / '.venv-pg/lib/python3.11/site-packages/pgserver/pginstall/bin/postgres')
SOCKDIR = Path('/tmp/pgsock')
SOCKDIR.mkdir(exist_ok=True)

os.execv(
    BIN,
    [BIN, '-D', str(ROOT / '.pgdata'), '-h', '127.0.0.1', '-p', '5433',
     '-k', str(SOCKDIR)],
)
