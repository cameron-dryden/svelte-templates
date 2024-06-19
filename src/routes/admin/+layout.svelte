<script lang="ts">
	import { goto } from '$app/navigation';
	import posthog from 'posthog-js';
	import { onMount } from 'svelte';

	export let data;
	$: ({ supabase } = data);
	onMount(() => {
		// [START] Supabase config
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			// [START] PostHog config
			if (newSession) {
				posthog.identify(newSession.user.id, { email: newSession.user.email });
			} else {
				setTimeout(() => {
					goto('/sign-in', { invalidateAll: true });
					posthog.reset();
				});
			}
			// [END] PostHog config
		});
		// [END] Supabase config

		return () => data.subscription.unsubscribe();
	});
</script>

<slot></slot>
