<script lang="ts">
	import { Button } from '$lib/shadcn/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/shadcn/components/ui/card';
	import { Input } from '$lib/shadcn/components/ui/input';
	import { Label } from '$lib/shadcn/components/ui/label';
	import { toast } from 'svelte-sonner';
	import type { ActionData } from './$types';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	export let form: ActionData;

	$: if (form) {
		if (form.success) {
			// ! Currently interupted by auth guard
			toast.success('Successfully logged in!');
			setTimeout(() => goto('/admin'), 1000);
		} else {
			toast.error('Error while loggin in', { description: form.error! });
		}
	}

	let loading = false;
</script>

<div class="flex h-screen w-full items-center justify-center">
	<Button href="/sign-up" variant="ghost" class="absolute right-4 top-4 md:right-8 md:top-8">
		Sign Up
	</Button>

	<Button href="/" variant="ghost" class="absolute left-4 top-4 md:left-8 md:top-8">Home</Button>

	<form
		method="POST"
		use:enhance={() => {
			loading = true;
			return ({ update }) => update().finally(() => (loading = false));
		}}
	>
		<Card class="w-full max-w-sm">
			<CardHeader>
				<CardTitle class="text-2xl">Login</CardTitle>
				<CardDescription>Enter your email below to login to your account.</CardDescription>
			</CardHeader>
			<CardContent class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" required name="email" disabled={loading} />
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input id="password" type="password" required name="password" disabled={loading} />
				</div>
			</CardContent>
			<CardFooter>
				<Button type="submit" class="w-full" disabled={loading}>
					{#if loading}
						<iconify-icon icon="line-md:loading-loop" class="mr-2" />
					{/if}
					Sign in
				</Button>
			</CardFooter>
		</Card>
	</form>
</div>
