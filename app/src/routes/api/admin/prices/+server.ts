import { json, error } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import { db } from '$lib/server/db/index.js';
import { requireAdmin } from '$lib/server/admin.js';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async (event) => {
	await requireAdmin(event);
	const body = (await event.request.json().catch(() => ({}))) as { pro?: number; team?: number };
	const { pro, team } = body;
	if (!Number.isInteger(pro) || pro! <= 0 || !Number.isInteger(team) || team! <= 0) {
		throw error(400, 'pro & team harus bilangan bulat positif.');
	}
	await db.execute(sql`
		INSERT INTO site_settings (key, value) VALUES ('price_pro', ${String(pro)})
		ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
	`);
	await db.execute(sql`
		INSERT INTO site_settings (key, value) VALUES ('price_team', ${String(team)})
		ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
	`);
	const stamp = (await db.execute(sql`
		SELECT max(updated_at) AS u FROM site_settings
	`)) as unknown as { u: string }[];
	return json({ pro, team, updatedAt: stamp[0]?.u ?? new Date().toISOString() });
};
