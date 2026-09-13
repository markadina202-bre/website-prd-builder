# PANDUAN-SESI.md — Panduan sesi baru (pewarisan)

> Dibaca PERTAMA setiap sesi baru, sebelum MEMORY/PROGRESS. Diupdate bila alur berubah.

## Buka sesi (±5 menit)
1. `git log --oneline -3 && git ls-remote origin <branch-sesi> | cut -c1-7 && git status --short | head` — lokal vs remote vs kotor?
2. `(ss -ltn | grep -E '5173|5433'); ls app/.env app/node_modules/.bin/vite .pgdata/PG_VERSION .venv-pg/bin/python3` — apa yang hidup?
3. Kalau pincang (cabang ke-reset / file hilang / port mati) → **Recovery restore** (bawah). JANGAN panik, ini rutin.
4. Baca PROGRESS (entri paling atas) → kerja.

## Tutup sesi (wajib)
1. PROGRESS entri baru di ATAS + MEMORY/DECISIONS/POLA bila ada fakta/keputusan/pola baru.
2. `npm run check` → `npm run build` → restart preview → curl semua route → catat bukti di PROGRESS.
3. `git add -A && git commit -m "Sesi NN: ..." && git push origin <branch-sesi>` → verifikasi `ls-remote` == `rev-parse HEAD`.
4. Balasan user: selesai+bukti, butuh user (persis), next step.

## Perintah kunci
| Perlu | Perintah |
|---|---|
| Cari skill | `python3 skills/index/search.py "<topik>" --top 3` (cwd repo) |
| Rebuild index | `python3 skills/index/build_index.py` |
| Check + build | `cd app && npm run check && npm run build` |
| Preview prod | `cd app && set -a; . ./.env; set +a; PORT=5173 npm run preview` (via start_process) |
| Postgres lokal | `python3 scripts/local-pg.py` (via start_process, cwd repo) |
| Migrasi lokal | `cd app && set -a; . ./.env; set +a; npx drizzle-kit migrate` |
| Hitung tabel | `../.venv-pg/lib/python3.11/site-packages/pgserver/pginstall/bin/psql -h 127.0.0.1 -p 5433 -U postgres prdbuilder -tAc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public'"` |
| Uji OAuth | `curl -X POST localhost:5173/api/auth/sign-in/social -H 'Content-Type: application/json' -d '{"provider":"google","callbackURL":"/dashboard"}'` |
| Cek harga DB | `curl -s localhost:5173/api/prices` |
| Commit | `git add -A && git commit -m "..." && git push origin <branch-sesi> && git ls-remote origin <branch-sesi>` |

## Peta repo (singkat)
- `app/src/routes/`: `/` (landing, harga SSR), `/login`, `/onboarding`, `/dashboard`, `/admin`, `/project/[id]/{grill,form,wayfinder,canvas}`, `/api/{prices,auth/[...all],admin/summary,admin/prices}`
- `app/src/lib/`: `session.svelte.ts` (sesi+profil), `grill.svelte.ts`, `mock.ts` (FORM_SECTIONS), `server/{auth.ts,admin.ts,db/}`
- `app/drizzle/`: `0000_init` (13 tabel) + `0001_site_settings`; `.env` = secret (JANGAN commit)
- `docs/00-06`: konsep, alur, arsitektur, monetisasi, roadmap, referensi tools, referensi scale
- `skills/` (42) + `skills/index/` (search.py, build_index.py) | `scripts/local-pg.py` (PG lokal)
- `memory/`: PANDUAN-SESI (ini), MEMORY (M-xxx), PROGRESS (Sesi), POLA-PIKIR (P-xxx), DECISIONS (ADR-xxx)

## Recovery restore (rutin ±5 mnt, detail M-039)
1. `git remote set-branches --add origin <branch-sesi>; git fetch origin; git reset origin/<branch-sesi>` (mixed — tree tak tersentuh)
2. `cd app && npm ci --no-audit --no-fund`
3. `python3 -m venv .venv-pg && .venv-pg/bin/pip install -q pgserver && .venv-pg/lib/python3.11/site-packages/pgserver/pginstall/bin/initdb -A trust -D .pgdata -U postgres`
4. Start postgres → createdb prdbuilder → tulis `.env` (chmod 600) → migrate → SELECT count (harus 14+)
5. `npm run build` → start preview → curl 8 route + /api/prices
6. Secret user-issued (Google client_secret, Neon URL) MINTA ULANG ke user — tak ada backup by design.

## Proses yang harus hidup
- PRD Builder (production) :5173 | Postgres lokal :5433. Mati semua + file hilang = restore baru → recovery.
- Client ID Google (publik): `960593617759-nj2l2t09ssgh9a2s3sgoc4qgkr0hd7ql.apps.googleusercontent.com`. Secret: HANYA di .env / chat user.
