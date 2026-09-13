// Better Auth config — TANPA import SvelteKit (agar bisa dipakai CLI).
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db/index.js';
import * as schema from './db/schema.js';

export const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:5173',
	secret: process.env.BETTER_AUTH_SECRET ?? 'dev-secret-ganti-di-production-min-32-karakter!!',
	database: drizzleAdapter(db, { provider: 'pg', schema }),
	emailAndPassword: { enabled: false }, // login utama = Google (M-023)
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID ?? 'dummy',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? 'dummy'
		}
	}
});
