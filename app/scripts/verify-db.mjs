// Verifikasi isi DB Neon — dipakai CI (.github/workflows/migrate.yml).
// Jalankan: DATABASE_URL="..." node scripts/verify-db.mjs
import postgres from 'postgres';

const url = process.env.DATABASE_URL;
if (!url) {
	console.error('VERIFY-FAIL: DATABASE_URL kosong (repo secret belum diisi?)');
	process.exit(1);
}

const sql = postgres(url, { prepare: false, ssl: 'require' });
try {
	const rows = await sql`SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename`;
	console.log(`TABLES (${rows.length}):`, rows.map((r) => r.tablename).join(', '));
	const need = ['user', 'session', 'account', 'verification', 'project', 'context_doc', 'adr', 'abcd', 'ticket', 'canvas_graph', 'prd', 'subscription', 'payment'];
	const have = new Set(rows.map((r) => r.tablename));
	const missing = need.filter((t) => !have.has(t));
	if (missing.length) {
		console.error('VERIFY-FAIL: tabel kurang:', missing.join(', '));
		process.exit(1);
	}
	console.log('VERIFY-OK: 13/13 tabel ada.');
} catch (e) {
	console.error('VERIFY-FAIL:', e.message);
	process.exit(1);
} finally {
	await sql.end();
}
