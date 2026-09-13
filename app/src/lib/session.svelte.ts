// Mock session — nanti diganti Better Auth (Google OAuth).
import { browser } from '$app/environment';

export const session = $state({ user: null as null | { name: string; email: string } });

export function mockLogin() {
	session.user = { name: 'Demo User', email: 'demo@gmail.com' };
	if (browser) localStorage.setItem('pb_mock_session', '1');
}

export function mockLogout() {
	session.user = null;
	if (browser) localStorage.removeItem('pb_mock_session');
}

export function restoreSession() {
	if (browser && localStorage.getItem('pb_mock_session')) {
		session.user = { name: 'Demo User', email: 'demo@gmail.com' };
	}
}
