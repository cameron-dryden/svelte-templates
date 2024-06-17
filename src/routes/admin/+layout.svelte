<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	$: ({ supabase } = data);
	onMount(() => {
		// [START] Supabase config
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession) {
				setTimeout(() => {
					goto('/sign-in', { invalidateAll: true });
				});
			}
		});
		// [END] Supabase config

		return () => data.subscription.unsubscribe();
	});
</script>

<slot></slot>
