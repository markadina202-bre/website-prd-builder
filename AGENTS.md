# AGENTS.md — Aturan main agen di repo ini

> Diwariskan ke setiap sesi/agen berikutnya. Baca file ini + `memory/` dulu sebelum kerja.

## 1. Wajib baca saat sesi dimulai (urut)
1. `memory/PANDUAN-SESI.md` — checklist buka/tutup sesi + perintah kunci
2. `memory/MEMORY.md` — fakta abadi (M-xxx)
3. `memory/PROGRESS.md` — posisi terakhir (entri paling atas)
4. `memory/POLA-PIKIR.md` — cara berpikir (P-xxx)
5. `memory/DECISIONS.md` — keputusan arsitek/bisnis (ADR-xxx)
6. `skills/cache.kv` — registry skill, atau cari via `python3 skills/index/search.py "<topik>"`

## 2. Verifikasi dulu, percaya belakangan (M-029, M-034)
- Ringkasan sesi sebelumnya BISA basi/salah: cek `git log --oneline -3` + `git ls-remote` + `git status` SEBELUM kerja.
- Klaim "selesai" WAJIB bukti: check hijau, build OK, curl 200, SELECT count, potongan log.
- Output push menipu: baris "hint fast-forward" = DITOLAK. Verifikasi push HANYA via ls-remote vs rev-parse.

## 3. Simpan OTOMATIS tiap progres kecil — tak ada ingatan terbuang
- JANGAN tunggu akhir sesi. Tiap progres sekecil apa pun (1 file beres, 1 bug ketemu, 1 keputusan, 1 info user, 1 percobaan gagal yang berharga) → LANGSUNG: catat di PROGRESS (entri berjalan Sesi NN) → `./scripts/simpan.sh "Sesi NN: ..."` (add+commit+push+verifikasi).
- Wajib: akhiri SETIAP giliran kerja dengan tree bersih (sudah commit+push+terverifikasi `OK tersimpan`).
- Dilarang: menumpuk >3 perubahan tak-berhubungan dalam 1 commit; mengakhiri giliran dengan file tak-tersimpan.
- Fakta permanen → MEMORY.md (M-xxx lanjut). Keputusan → DECISIONS.md (ADR-xxx). Pola pikir → POLA-PIKIR.md (P-xxx).
- Nomor lanjut, jangan timpa. Bahasa: Indonesia.

## 4. Skill dulu sebelum kode
- Jangan langsung coding. Cari skill: `python3 skills/index/search.py "<topik>" --top 3`.
- Setiap tambah/ubah skill: update `skills/cache.kv` (count!) + tulis SKILL.md + `python3 skills/index/build_index.py` + uji search.
- Alur build: brainstorming → writing-plans → TDD → verification-before-completion.
- Gali kebutuhan: 1 pertanyaan per giliran (grilling); user SKIP popup ask_user → tanya via teks biasa.
- Skill = infrastruktur latar (P-009): nama skill JANGAN muncul di UI/copy user-facing.

## 5. Kode & build (app/)
- Stack: SvelteKit 2 + Svelte 5 + Tailwind v4 + Better Auth + Drizzle + PG. Kode/komentar: Inggris.
- Server baca env via `$env/dynamic/private` (process.env TAK terisi Vite!). JANGAN paralel-edit 1 file.
- Alur wajib tiap ubah kode: `npm run check` (0 error) → `npm run build` → restart preview → curl semua route.
- Preview user = production: `set -a; . ./.env; set +a; PORT=5173 npm run preview`. Dev hanya internal.
- DB lokal: `python3 scripts/local-pg.py` (start_process) → 127.0.0.1:5433; migrasi `npx drizzle-kit migrate` + verifikasi SELECT count.

## 6. Secret & git
- Secret HANYA di `.env`/`.env.neon` (gitignored, 600). JANGAN commit/echo secret.
- Restore sandbox MENGHAPUS .env/node_modules/.venv/.pgdata/proses + me-reset .git (M-039): recovery = set-branches+fetch+reset-mixed → npm ci → venv+initdb+migrate → .env baru → minta secret ke user.
- Kerja HANYA di branch sesi: push ke situ saja; force hanya `--force-with-lease=<branch>:<sha>` eksplisit bila lokal superset (cek diff dulu).
- PR HANYA bila user minta eksplisit (pernah dibatalkan: "jangan dulu").

## 7. Gaya komunikasi
- Indonesia, ringkas, terstruktur. Fakta besar → tabel. Akhiri sesi dengan: apa selesai (bukti), apa butuh user (persis), next step.
