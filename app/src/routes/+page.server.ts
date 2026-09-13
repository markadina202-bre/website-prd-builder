import type { PageServerLoad } from './$types';
import { sql } from 'drizzle-orm';
import { db } from '$lib/server/db/index.js';

export const load: PageServerLoad = async () => {
	try {
		const rows = (await db.execute(
			sql`SELECT key, value FROM site_settings WHERE key IN ('price_pro', 'price_team')`
		)) as unknown as { key: string; value: string }[];
		const get = (k: string, d: number) => {
			const v = parseInt(rows.find((x) => x.key === k)?.value ?? '', 10);
			return Number.isFinite(v) && v > 0 ? v : d;
		};
		return { pro: get('price_pro', 49000), team: get('price_team', 199000) };
	} catch {
		return { pro: 49000, team: 199000 };
	}
};
