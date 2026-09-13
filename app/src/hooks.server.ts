import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	try {
		const data = await auth.api.getSession({ headers: event.request.headers });
		event.locals.session = data?.session ?? null;
		event.locals.user = data?.user ?? null;
	} catch {
		event.locals.session = null;
		event.locals.user = null;
	}
	return resolve(event);
};
