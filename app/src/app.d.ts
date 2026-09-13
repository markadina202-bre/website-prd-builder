import type { auth } from '$lib/server/auth';

type InferredSession = typeof auth.$Infer.Session;

declare global {
	namespace App {
		interface Locals {
			session: InferredSession['session'] | null;
			user: InferredSession['user'] | null;
		}
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
