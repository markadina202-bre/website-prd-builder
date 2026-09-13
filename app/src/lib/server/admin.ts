// Admin gate (skeleton). Production: ADMIN_EMAILS wajib diisi + role di DB.
import { error, type RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { auth } from './auth.js';

export function adminMode(): 'open' | 'locked' {
	return (env.ADMIN_EMAILS ?? '').trim() ? 'locked' : 'open';
}

function allowList(): string[] {
	return (env.ADMIN_EMAILS ?? '')
		.split(',')
		.map((x) => x.trim().toLowerCase())
		.filter(Boolean);
}

// Returns admin email or throws 401/403.
export async function requireAdmin(event: RequestEvent): Promise<string> {
	const s = await auth.api.getSession({ headers: event.request.headers });
	const email = s?.user?.email ?? null;
	if (!email) throw error(401, 'Login dulu.');
	const allow = allowList();
	// SKELETON: tanpa ADMIN_EMAILS, semua user login boleh masuk (sementara!).
	if (allow.length === 0) return email;
	if (!allow.includes(email.toLowerCase())) throw error(403, 'Bukan admin.');
	return email;
}
