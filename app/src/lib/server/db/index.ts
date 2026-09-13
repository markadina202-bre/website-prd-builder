// Drizzle client via TCP (postgres-js).
// - Produksi/CI: Neon pooler → `prepare: false` WAJIB (PgBouncer) + ssl require.
// - Sandbox dev: PG lokal 127.0.0.1:5433 (tanpa SSL) — Neon tak terjangkau sandbox.
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '$env/dynamic/private';
import * as schema from './schema.js';

// WAJIB $env/dynamic/private: Vite TIDAK mengisi process.env dari .env
// (terbukti: fallback dummy kepakai). Aman untuk drizzle-kit: CLI hanya
// membaca file schema (auth/app-schema.ts), tidak pernah import file ini.
const url = env.DATABASE_URL ?? 'postgresql://dummy:dummy@localhost:5432/dummy';
const isLocal = url.includes('127.0.0.1') || url.includes('@localhost');

// Startup diagnostic (tanpa secret!): buktikan env termuat.
try {
	const u = new URL(url);
	console.log(`[db] target=${u.hostname}:${u.port || '5432'} local=${isLocal}`);
} catch {
	console.log('[db] DATABASE_URL tidak valid/kosong → fallback dummy ( SEMUA query akan gagal )');
}

const client = postgres(url, {
	prepare: false,
	max: 10,
	connect_timeout: 15,
	...(isLocal ? {} : { ssl: 'require' as const })
});

export const db = drizzle(client, { schema });
