import type { PageServerLoad } from './$types';

export const load = (async ({ depends, locals: { supabase } }) => {
	console.log(
		'[src/routes/admin/+page.server.ts]',
		`Admin found user: ${await supabase.auth.getUser()}`
	);
	return {};
}) satisfies PageServerLoad;
