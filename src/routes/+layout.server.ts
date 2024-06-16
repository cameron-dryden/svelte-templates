import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { safeGetSession } }) => {
	const { session } = await safeGetSession();
	console.log('[src/routes/+layout.server.ts]', 'Loaded session for Server');
	return {
		session
	};
}) satisfies LayoutServerLoad;
