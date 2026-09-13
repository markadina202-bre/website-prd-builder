# Migrasi Drizzle

- `0000_init.sql` — skema awal: 4 tabel Better Auth + 9 tabel app (13 total).
- Diterapkan otomatis ke Neon via CI (`.github/workflows/migrate.yml`) setiap ada
  perubahan di folder ini, atau manual: tab Actions → DB Migrate → Run workflow.
- Lokal (laptop, bukan sandbox): `DATABASE_URL="..." npx drizzle-kit migrate`.
