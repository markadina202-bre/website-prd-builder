import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'postgresql',
	schema: ['./src/lib/server/db/auth-schema.ts', './src/lib/server/db/app-schema.ts'],
	out: './drizzle',
	dbCredentials: { url: process.env.DATABASE_URL ?? '' }
});
