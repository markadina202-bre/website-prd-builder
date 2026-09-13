// Mock session + onboarding profile (nanti: Better Auth + tabel profile).
// NOTE: localStorage dibungkus aman — di iframe/preview yang memblokir
// storage, akses mentah MELEMPAR SecurityError dan bisa memutihkan halaman.
import { browser } from '$app/environment';

export interface Profile {
	name: string;
	experience: string;
	goals: string[];
}

export const session = $state({
	user: null as null | { name: string; email: string },
	profile: null as null | Profile,
	onboarded: false,
	pendingIdea: null as null | string
});

const KEY_SESSION = 'pb_mock_session';
const KEY_PROFILE = 'pb_profile';

function storageGet(k: string): string | null {
	if (!browser) return null;
	try {
		return localStorage.getItem(k);
	} catch {
		return null;
	}
}

function storageSet(k: string, v: string | null) {
	if (!browser) return;
	try {
		if (v === null) localStorage.removeItem(k);
		else localStorage.setItem(k, v);
	} catch {
		// storage diblokir (iframe/private mode) → sesi hanya di memori
	}
}

export function hasMockSession(): boolean {
	return storageGet(KEY_SESSION) === '1';
}

export function mockLogin() {
	session.user = { name: 'Demo User', email: 'demo@gmail.com' };
	storageSet(KEY_SESSION, '1');
}

export function mockLogout() {
	session.user = null;
	session.pendingIdea = null;
	storageSet(KEY_SESSION, null);
}

export function restoreSession() {
	if (storageGet(KEY_SESSION)) {
		session.user = { name: 'Demo User', email: 'demo@gmail.com' };
	}
	try {
		const raw = storageGet(KEY_PROFILE);
		if (raw) {
			const p = JSON.parse(raw);
			const prof = p.profile ?? null;
			// Toleran profil lama {name, role, idea} → migrasi role jadi experience.
			session.profile = prof
				? {
						name: prof.name ?? '',
						experience: prof.experience ?? prof.role ?? '',
						goals: prof.goals ?? []
					}
				: null;
			session.onboarded = p.onboarded === true;
		}
	} catch {
		// profil rusak/hilang → user onboarding ulang
	}
}

function persistProfile() {
	storageSet(KEY_PROFILE, JSON.stringify({ profile: session.profile, onboarded: session.onboarded }));
}

export function saveProfile(p: Profile) {
	session.profile = p;
	session.onboarded = true;
	persistProfile();
}

export function skipOnboarding() {
	session.onboarded = true;
	persistProfile();
}
