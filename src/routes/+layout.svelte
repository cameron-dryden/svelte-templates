<script>
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.css';
	import 'iconify-icon';

	export let data;
	$: ({ session, supabase } = data);

	onMount(() => {
		// [START] Supabase config
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		// [END] Supabase config

		return () => data.subscription.unsubscribe();
	});
</script>

<slot></slot>
