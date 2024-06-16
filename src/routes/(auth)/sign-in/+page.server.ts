import { redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	signin: async ({ request, locals: { supabase } }) => {
		// console.log('Sign in server-side');
		const formData = await request.formData();
		console.log(formData);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			console.error(error);
			return redirect(303, '/');
		} else {
			return redirect(303, '/admin');
		}
	}
};
