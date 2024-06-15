<script>
	import Button from '$lib/shadcn/components/ui/button/button.svelte';
</script>

<div class="bg-black/5">
	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

	<div class="flex flex-col">
		<h2 class="text-lg text-lime-500/90 hover:text-red-500">Tailwind Test</h2>

		<Button on:click={() => console.log('I work')}>shadcn test</Button>

		<h2>Iconify Test</h2>
		<iconify-icon
			icon="mdi:home"
			class="text-[48px] text-blue-400 transition-colors hover:text-purple-500"
		></iconify-icon>

		<Button>
			<iconify-icon icon="mdi:email-outline" class="mr-1 mt-0.5 text-[16px]"></iconify-icon>
			Login with Email
		</Button>
	</div>
</div>
