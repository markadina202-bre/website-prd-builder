// Harga publik (dibaca landing). Selalu ada fallback agar landing tak pernah rusak.
import { json } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import { db } from '$lib/server/db/index.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const rows = (await db.execute(
			sql`SELECT key, value FROM site_settings WHERE key IN ('price_pro', 'price_team')`
		)) as unknown as { key: string; value: string }[];
		const get = (k: string, d: number) => {
			const v = parseInt(rows.find((x) => x.key === k)?.value ?? '', 10);
			return Number.isFinite(v) && v > 0 ? v : d;
		};
		return json({ pro: get('price_pro', 49000), team: get('price_team', 199000) });
	} catch {
		return json({ pro: 49000, team: 199000 });
	}
};
