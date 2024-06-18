<script lang="ts">
	import { Button } from '$lib/shadcn/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator
	} from '$lib/shadcn/components/ui/dropdown-menu';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({ user } = data);
</script>

<!-- Navbar -->
<nav class="fixed flex w-full items-center justify-between px-8 py-4">
	<!-- Logo -->
	<a href="/"><iconify-icon icon="carbon:logo-svelte" class="text-[40px] text-orange-500" /></a>

	<!-- Nav Items -->
	<ol class="flex gap-2">
		<li>
			<DropdownMenu>
				<DropdownMenuTrigger asChild let:builder>
					<Button builders={[builder]} variant="link"
						>Products <iconify-icon icon="mdi:chevron-down" /></Button
					>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Products</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem class="cursor-pointer">Some amazing product</DropdownMenuItem>
					<DropdownMenuItem class="cursor-pointer">Another product</DropdownMenuItem>
					<DropdownMenuItem class="cursor-pointer">A third product</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</li>
		<li>
			<Button variant="link">Solutions</Button>
		</li>
		<li>
			<Button variant="link">Pricing</Button>
		</li>
		<li>
			<Button variant="link">About</Button>
		</li>
	</ol>

	<!-- Admin Link -->
	{#if user}
		<Button href="/admin">Go to portal</Button>
	{:else}
		<Button href="/sign-in">Get Started</Button>
	{/if}
</nav>

<slot />
