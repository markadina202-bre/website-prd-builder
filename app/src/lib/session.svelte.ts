// Mock session — nanti diganti Better Auth (Google OAuth).
// NOTE: localStorage dibungkus aman — di iframe/preview yang memblokir
// storage, akses mentah MELEMPAR SecurityError dan bisa memutihkan halaman.
import { browser } from '$app/environment';

export const session = $state({ user: null as null | { name: string; email: string } });

const KEY = 'pb_mock_session';

function storageGet(): string | null {
	if (!browser) return null;
	try {
		return localStorage.getItem(KEY);
	} catch {
		return null;
	}
}

function storageSet(v: string | null) {
	if (!browser) return;
	try {
		if (v === null) localStorage.removeItem(KEY);
		else localStorage.setItem(KEY, v);
	} catch {
		// storage diblokir (iframe/private mode) → sesi hanya di memori
	}
}

export function hasMockSession(): boolean {
	return storageGet() === '1';
}

export function mockLogin() {
	session.user = { name: 'Demo User', email: 'demo@gmail.com' };
	storageSet('1');
}

export function mockLogout() {
	session.user = null;
	storageSet(null);
}

export function restoreSession() {
	if (storageGet()) {
		session.user = { name: 'Demo User', email: 'demo@gmail.com' };
	}
}
