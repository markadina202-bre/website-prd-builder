// Drizzle client (Neon HTTP — jalan di lokal, VPS, maupun serverless).
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

const sql = neon(
	process.env.DATABASE_URL ?? 'postgresql://dummy:dummy@localhost:5432/dummy'
);

export const db = drizzle(sql, { schema });
