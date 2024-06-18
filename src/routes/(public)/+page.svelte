<script>
	import Button from '$lib/shadcn/components/ui/button/button.svelte';
</script>

<div
	class="flex h-screen w-full flex-col items-center justify-center"
	style="background-image: linear-gradient(to right bottom, transparent 50%, rgba(255, 0, 0, 0.1), transparent);"
>
	<div class="flex max-w-[70%] flex-col items-center gap-4">
		<h1 class="text-center text-6xl font-bold">Welcome to SvelteKit Templates</h1>
		<p class="text-center text-muted-foreground">
			This is a template for your next SvelteKit app. Lorem ipsum dolor sit, amet consectetur
			adipisicing elit. Sunt libero, aspernatur nulla consectetur harum possimus totam voluptatem
			nisi quasi praesentium nobis explicabo minima necessitatibus voluptates vel ipsum cum minus
			non.
		</p>

		<div class="mt-8 flex gap-8">
			<Button href="/sign-in">Get Started</Button>
			<Button variant="outline">Learn More</Button>
		</div>
	</div>
</div>
