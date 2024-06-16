<script lang="ts">
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { invalidate } from '$app/navigation';

	export let data: LayoutData;

	$: ({ supabase } = data);

	onMount(() => {
		const { data } = supabase!.auth.onAuthStateChange(async (_, newSession) => {
			console.log('Auth State Change', newSession?.user);
			// if (!newSession) {
			// 	/**
			// 	 * Queue this as a task so the navigation won't prevent the
			// 	 * triggering function from completing
			// 	 */
			// 	setTimeout(() => {
			// 		goto('/', { invalidateAll: true });
			// 	});
			// }
			const prevSession = await supabase?.auth.getSession().then((s) => s.data.session);

			if (newSession?.expires_at !== prevSession?.expires_at) {
				invalidate('supabase:auth');
				console.log('Auth session expired');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<slot></slot>
