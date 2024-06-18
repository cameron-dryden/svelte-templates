<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/shadcn/components/ui/button';
	import posthog from 'posthog-js';

	export let data: PageData;

	$: ({ supabase } = data);
</script>

<div class="flex h-screen w-full items-center justify-center">
	<h1 class="text-2xl font-semibold">Admin</h1>
	<Button href="/admin/dashboard">Dashboard</Button>
	<Button
		on:click={() => {
			console.log('Sign out');
			supabase.auth.signOut();
		}}>Sign Out</Button
	>
</div>
