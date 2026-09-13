// Drizzle client via TCP (postgres-js). Dipilih karena endpoint HTTPS Neon
// (api.*.neon.tech:443) tidak terjangkau dari sandbox — TCP 5432 OK.
// `prepare: false` WAJIB untuk pooler Neon (PgBouncer transaction mode).
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema.js';

const url = process.env.DATABASE_URL ?? 'postgresql://dummy:dummy@localhost:5432/dummy';

const client = postgres(url, { prepare: false, max: 10, connect_timeout: 15, ssl: 'require' });

export const db = drizzle(client, { schema });
