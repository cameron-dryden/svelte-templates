import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import {
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_POSTHOG_API_HOST,
	PUBLIC_POSTHOG_API_KEY
} from '$env/static/public';
import { PostHog } from 'posthog-node';

// [START] Supabase config
const supabase: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => event.cookies.get(key),
			set: (key, value, options) => {
				event.cookies.set(key, value, { ...options, path: '/' });
			},
			remove: (key, options) => {
				event.cookies.delete(key, { ...options, path: '/' });
			}
		}
	});

	event.locals.safeGetSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		if (!session) {
			return { session: null, user: null };
		}

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			return { session: null, user: null };
		}

		return { session, user };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};
// [END] Supabase config

// [START] PostHog config
const posthog: Handle = async ({ event, resolve }) => {
	event.locals.capturePostHogEvent = async (params) => {
		if (event.locals.user) {
			// Capture event with logged in user
			const posthog = new PostHog(PUBLIC_POSTHOG_API_KEY, { host: PUBLIC_POSTHOG_API_HOST });
			posthog.capture({ distinctId: event.locals.user.id, ...params });
			await posthog.shutdown();
		} else {
			// Capture event with anonymous user's distinctId
			const phCookieKey = `ph_${PUBLIC_POSTHOG_API_KEY}_posthog`;
			const phData = event.cookies.get(phCookieKey);

			if (phData) {
				const data = JSON.parse(phData);
				if (data['distinct_id']) {
					const posthog = new PostHog(PUBLIC_POSTHOG_API_KEY, { host: PUBLIC_POSTHOG_API_HOST });
					posthog.capture({ distinctId: data['distinct_id'], ...params });
					await posthog.shutdown();
				}
			}
		}
	};

	return resolve(event);
};
// [END] PostHog config

const authGuard: Handle = async ({ event, resolve }) => {
	const { session, user } = await event.locals.safeGetSession();
	event.locals.session = session;
	event.locals.user = user;

	if (!event.locals.session && event.url.pathname.startsWith('/admin')) {
		return redirect(303, '/sign-in');
	}

	if (
		event.locals.session &&
		(event.url.pathname === '/sign-in' || event.url.pathname === '/sign-up')
	) {
		return redirect(303, '/admin');
	}

	return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard, posthog);
