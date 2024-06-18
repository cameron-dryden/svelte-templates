<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/shadcn/components/ui/button';
	import { Input } from '$lib/shadcn/components/ui/input';
	import { Label } from '$lib/shadcn/components/ui/label';
	import { toast } from 'svelte-sonner';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: if (form) {
		if (form.success) {
			// ! Currently interupted by auth guard
			toast.success('Successfully created account!');
			setTimeout(() => goto('/admin'), 1000);
		} else {
			toast.error('Error while signing up', { description: form.error! });
		}
	}

	let loading = false;
</script>

<div
	class="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<Button href="/sign-in" variant="ghost" class="absolute right-4 top-4 md:right-8 md:top-8">
		Sign In
	</Button>
	<div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
		<div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
					url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80);"
		/>
		<div class="relative z-20 flex items-center text-lg font-medium">Acme Inc</div>
		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
				<p class="text-lg">
					&ldquo;This library has saved me countless hours of work and helped me deliver stunning
					designs to my clients faster than ever before. Highly recommended!&rdquo;
				</p>
				<footer class="text-sm">Sofia Davis</footer>
			</blockquote>
		</div>
	</div>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
				<p class="text-sm text-muted-foreground">Enter your email below to create your account</p>
			</div>

			<!-- Form -->
			<div class="grid gap-6">
				<form
					method="POST"
					use:enhance={() => {
						loading = true;
						return ({ update }) => update().finally(() => (loading = false));
					}}
				>
					<div class="grid gap-2">
						<div class="grid gap-1">
							<Label for="email">Email</Label>
							<Input
								id="email"
								type="email"
								name="email"
								autocapitalize="none"
								autocomplete="email"
								autocorrect="off"
								disabled={loading}
							/>
						</div>
						<div class="grid gap-1">
							<Label for="password">Password</Label>
							<Input id="password" type="password" name="password" disabled={loading} />
						</div>
						<Button type="submit" disabled={loading}>
							{#if loading}
								<iconify-icon icon="line-md:loading-loop" class="mr-2" />
							{/if}
							Sign up with Email
						</Button>
					</div>
				</form>
				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<span class="w-full border-t" />
					</div>
					<div class="relative flex justify-center text-xs uppercase">
						<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
					</div>
				</div>
				<Button variant="outline" type="button" disabled={loading}>
					{#if loading}
						<iconify-icon icon="line-md:loading-loop"></iconify-icon>
					{:else}
						<iconify-icon icon="mdi:github" />
					{/if}
					GitHub
				</Button>
			</div>

			<p class="px-8 text-center text-sm text-muted-foreground">
				By clicking continue, you agree to our
				<a href="/terms" class="underline underline-offset-4 hover:text-primary">
					Terms of Service
				</a>
				and
				<a href="/privacy" class="underline underline-offset-4 hover:text-primary">
					Privacy Policy
				</a>
				.
			</p>
		</div>
	</div>
</div>
