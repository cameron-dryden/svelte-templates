<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		console.log(data);
	});
</script>

<div class="flex h-screen w-full items-center justify-center">
	<h1 class="text-2xl font-semibold">Admin</h1>
</div>
