import { createBrowserClient, createServerClient, isBrowser, parse } from '@supabase/ssr';

import {
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SUPABASE_URL,
	PUBLIC_POSTHOG_API_KEY,
	PUBLIC_POSTHOG_API_HOST
} from '$env/static/public';

import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import posthog from 'posthog-js';

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
	// [START] Supabase config
	depends('supabase:auth');

	const supabase = isBrowser()
		? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					get(key) {
						const cookie = parse(document.cookie);
						return cookie[key];
					}
				}
			})
		: createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					get() {
						return JSON.stringify(data.session);
					}
				}
			});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	const {
		data: { user }
	} = await supabase.auth.getUser();
	// [END] Supabase config

	// [START] Posthog config
	// TODO: Setup with reverse proxy to avoid Ad blockers
	if (browser) {
		posthog.init(PUBLIC_POSTHOG_API_KEY, {
			api_host: PUBLIC_POSTHOG_API_HOST,
			person_profiles: 'identified_only',
			capture_pageview: false,
			capture_pageleave: false

			// * Uncomment this line to disable autocapture events
			// autocapture: false,
		});
	}
	// [END] Posthog config

	return { session, supabase, user };
};
