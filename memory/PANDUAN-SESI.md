# PANDUAN-SESI.md — Panduan sesi baru (pewarisan)

> Dibaca PERTAMA setiap sesi baru, sebelum MEMORY/PROGRESS. Diupdate bila alur berubah.
> Branch sesi: `arena/01a09aee-website-prd-builder`. JANGAN merge/PR tanpa perintah eksplisit user.

## Status terkini (update tiap sesi — patokan: Sesi 16, 2026-09-13)
| Aspek | Keadaan |
|---|---|
| HEAD | `531a10a` Sesi 16, remote == lokal, tree bersih |
| Preview prod :5173 | HIDUP (build Sesi 15: admin + harga dinamis) |
| Postgres lokal :5433 | HIDUP (14 tabel + site_settings: pro=49000, team=199000) |
| Login Google | 🔴 MATI — `client_secret` kosong di `.env`, nunggu user tempel di chat |
| Admin (`ADMIN_EMAILS=""`) | 🟡 MODE TERBUKA sementara (semua user login bisa buka + banner) |
| Nunggu user | client_secret → review tampilan → Fase 1 (butuh OpenRouter key) |

## Diagnosis cepat (gejala → penyebab → obat)
| Gejala | Penyebab paling mungkin | Obat |
|---|---|---|
| Login Google gagal / error client | `client_secret` kosong | Minta secret ke user → tulis `.env` → restart preview |
| Harga landing = fallback (bukan DB) | Postgres mati / `site_settings` kosong | Start postgres → cek `curl /api/prices` → migrate bila perlu |
| Port 5173/5433 mati + file hilang | Sandbox habis di-restore | **Recovery restore** (bawah), bukan debug acak |
| Halaman putih / klik mati | Preview dev atau build basi | Wajib preview production dari build segar |
| Push "ditolak / hint fast-forward" | Remote lebih baru | Fetch dulu; force hanya `--force-with-lease=<branch>:<sha>` bila lokal superset |
| `process.env.X` undefined di server | Salah baca env | Server wajib `$env/dynamic/private`, env di-load via `set -a; . ./.env` |

## Buka sesi (±5 menit)
1. `git log --oneline -3 && git ls-remote origin arena/01a09aee-website-prd-builder | cut -c1-7 && git status --short | head` — lokal vs remote vs kotor?
2. `(ss -ltn | grep -E '5173|5433'); ls app/.env app/node_modules/.bin/vite .pgdata/PG_VERSION .venv-pg/bin/python3` — apa yang hidup?
3. Cocokkan dengan **Status terkini** di atas. Kalau pincang (cabang ke-reset / file hilang / port mati) → **Recovery restore** (bawah). JANGAN panik, ini rutin.
4. Baca PROGRESS (entri paling atas) → kerja.

## Tutup sesi (wajib)
1. PROGRESS entri baru di ATAS + MEMORY/DECISIONS/POLA bila ada fakta/keputusan/pola baru.
2. `npm run check` → `npm run build` → restart preview → curl semua route → catat bukti di PROGRESS.
3. `git add -A && git commit -m "Sesi NN: ..." && git push origin arena/01a09aee-website-prd-builder` → verifikasi `ls-remote` == `rev-parse HEAD`.
4. Balasan user: selesai+bukti, butuh user (persis), next step. Update tabel **Status terkini** di atas bila keadaan berubah.

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
| Commit | `git add -A && git commit -m "..." && git push origin arena/01a09aee-website-prd-builder && git ls-remote origin arena/01a09aee-website-prd-builder` |

## Peta secret (isi `.env`, gitignored, chmod 600)
| Var | Status | Keterangan |
|---|---|---|
| `DATABASE_URL` | ✅ lokal `127.0.0.1:5433` | Jangan pakai URL Neon di sandbox |
| `BETTER_AUTH_SECRET` | ✅ random lokal | Regenerate tiap restore |
| `GOOGLE_CLIENT_ID` | ✅ publik (lihat bawah) | Boleh di-refill dari memori |
| `GOOGLE_CLIENT_SECRET` | 🔴 KOSONG | Hanya user yang punya — minta di chat, langsung tulis `.env`, jangan echo |
| `ADMIN_EMAILS` | 🟡 `""` (terbuka) | Produksi WAJIB diisi email admin |
| `BETTER_AUTH_URL` | ✅ URL preview | Ganti tiap URL preview berubah |

## Peta repo (singkat)
- `app/src/routes/`: `/` (landing, harga SSR), `/login`, `/onboarding`, `/dashboard`, `/admin`, `/project/[id]/{grill,form,wayfinder,canvas}`, `/api/{prices,auth/[...all],admin/summary,admin/prices}`
- `app/src/lib/`: `session.svelte.ts` (sesi+profil), `grill.svelte.ts`, `mock.ts` (FORM_SECTIONS), `server/{auth.ts,admin.ts,db/}`
- `app/drizzle/`: `0000_init` (13 tabel) + `0001_site_settings`; `.env` = secret (JANGAN commit)
- `docs/00-06`: konsep, alur, arsitektur, monetisasi, roadmap, referensi tools, referensi scale
- `skills/` (42) + `skills/index/` (search.py, build_index.py) | `scripts/local-pg.py` (PG lokal)
- `memory/`: PANDUAN-SESI (ini), MEMORY (M-xxx), PROGRESS (Sesi), POLA-PIKIR (P-xxx), DECISIONS (ADR-xxx)

## Recovery restore (rutin ±5 mnt, detail M-039)
1. `git remote set-branches --add origin arena/01a09aee-website-prd-builder; git fetch origin; git reset origin/arena/01a09aee-website-prd-builder` (mixed — tree tak tersentuh)
2. `cd app && npm ci --no-audit --no-fund`
3. `python3 -m venv .venv-pg && .venv-pg/bin/pip install -q pgserver && .venv-pg/lib/python3.11/site-packages/pgserver/pginstall/bin/initdb -A trust -D .pgdata -U postgres`
4. Start postgres → createdb prdbuilder → tulis `.env` (chmod 600) → migrate → SELECT count (harus 14+)
5. `npm run build` → start preview → curl 8 route + /api/prices
6. Secret user-issued (Google client_secret, Neon URL) MINTA ULANG ke user — tak ada backup by design.

## Proses yang harus hidup
- PRD Builder (production) :5173 | Postgres lokal :5433. Mati semua + file hilang = restore baru → recovery.
- Client ID Google (publik): `960593617759-nj2l2t09ssgh9a2s3sgoc4qgkr0hd7ql.apps.googleusercontent.com`. Secret: HANYA di .env / chat user.
