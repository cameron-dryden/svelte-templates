<script lang="ts">
	import { Button } from '$lib/shadcn/components/ui/button';
	import type { LayoutData } from './$types';

	// export let data: LayoutData;
</script>

<!-- Navbar -->
<div class="w-full">
	<div class="mx-auto flex w-4/5 items-center gap-4 rounded-lg bg-primary p-2">
		<!-- Logo -->
		<iconify-icon class="text-[30px] text-primary-foreground" icon="ph:sketch-logo" />

		<!-- Links -->
		<div class="flex-1">
			<Button class="text-primary-foreground" variant="link" href="/">Home</Button>
			<Button class="text-primary-foreground" variant="link" href="/about">About</Button>
			<Button class="text-primary-foreground" variant="link" href="/contact">Contact</Button>
		</div>

		<!-- Sign Up -->
		<Button variant="ghost" class="text-primary-foreground" href="/sign-up">Sign Up</Button>
	</div>
</div>

<slot />
