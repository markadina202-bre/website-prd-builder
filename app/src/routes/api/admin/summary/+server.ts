import { json } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import { db } from '$lib/server/db/index.js';
import { requireAdmin, adminMode } from '$lib/server/admin.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	const email = await requireAdmin(event);
	const counts = (await db.execute(sql`
		SELECT (SELECT count(*)::int FROM "user") AS users,
			(SELECT count(*)::int FROM project) AS projects,
			(SELECT count(*)::int FROM verification) AS verifications,
			(SELECT count(*)::int FROM session) AS sessions
	`)) as unknown as { users: number; projects: number; verifications: number; sessions: number }[];
	const users = (await db.execute(sql`
		SELECT name, email, created_at FROM "user" ORDER BY created_at DESC LIMIT 10
	`)) as unknown as { name: string; email: string; created_at: string }[];
	const settings = (await db.execute(sql`
		SELECT key, value FROM site_settings WHERE key IN ('price_pro', 'price_team')
	`)) as unknown as { key: string; value: string }[];
	const stamp = (await db.execute(sql`
		SELECT max(updated_at) AS u FROM site_settings
	`)) as unknown as { u: string | null }[];
	const get = (k: string, d: number) => {
		const v = parseInt(settings.find((x) => x.key === k)?.value ?? '', 10);
		return Number.isFinite(v) && v > 0 ? v : d;
	};
	return json({
		mode: adminMode(),
		email,
		now: new Date().toISOString(),
		counts: counts[0],
		users,
		prices: { pro: get('price_pro', 49000), team: get('price_team', 199000), updatedAt: stamp[0]?.u ?? null }
	});
};
