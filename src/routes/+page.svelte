<script>
	import Button from '$lib/shadcn/components/ui/button/button.svelte';
	import 'iconify-icon';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div class="flex flex-col">
	<h2 class="text-lg text-lime-500/90 hover:text-red-500">Tailwind Test</h2>

	<Button on:click={() => console.log('I work')}>shadcn test</Button>

	<h2>Iconify Test</h2>
	<iconify-icon
		icon="mdi:home"
		class="text-[48px] transition-colors text-blue-400 hover:text-purple-500"
	></iconify-icon>

	<Button>
		<iconify-icon icon="mdi:email-outline" class="text-[16px] mr-1 mt-0.5"></iconify-icon>
		Login with Email
	</Button>
</div>
