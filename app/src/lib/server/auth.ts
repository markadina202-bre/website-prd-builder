// Better Auth config. Pakai $env/dynamic/private (process.env TIDAK terisi
// dari .env oleh Vite — terbukti). Aman untuk drizzle-kit: CLI hanya baca schema.
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { env } from '$env/dynamic/private';
import { db } from './db/index.js';
import * as schema from './db/schema.js';

export const auth = betterAuth({
	baseURL: env.BETTER_AUTH_URL ?? 'http://localhost:5173',
	secret: env.BETTER_AUTH_SECRET ?? 'dev-secret-ganti-di-production-min-32-karakter!!',
	database: drizzleAdapter(db, { provider: 'pg', schema }),
	emailAndPassword: { enabled: false }, // login utama = Google (M-023)
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID ?? 'dummy',
			clientSecret: env.GOOGLE_CLIENT_SECRET ?? 'dummy'
		}
	}
});
