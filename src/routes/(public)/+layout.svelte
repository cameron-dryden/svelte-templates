<script lang="ts">
	import { Button } from '$lib/shadcn/components/ui/button';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({ user, supabase } = data);
</script>

<!-- Navbar -->
<div class="w-full">
	<div class="mx-auto flex w-4/5 items-center gap-4 rounded-lg bg-primary p-2">
		<!-- Logo -->
		<iconify-icon class="text-[30px] text-primary-foreground" icon="ph:sketch-logo" />

		<!-- Links -->
		<div class="flex-1">
			<Button class="text-primary-foreground" variant="link" href="/">Home</Button>
			<Button
				class="text-primary-foreground"
				variant="link"
				on:click={() => {
					supabase.auth.signOut();
				}}>Sign Out</Button
			>
			<Button class="text-primary-foreground" variant="link" href="/admin">Admin</Button>
		</div>

		{#if user}
			<Button variant="ghost" class="text-primary-foreground" href="/admin">Admin</Button>
		{:else}
			<!-- Sign Up -->
			<Button variant="ghost" class="text-primary-foreground" href="/sign-up">Sign Up</Button>
		{/if}
	</div>
</div>

<slot />
