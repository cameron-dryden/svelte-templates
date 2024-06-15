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
</script>

<div class="flex h-screen w-full items-center justify-center">
	<Button href="/sign-up" variant="ghost" class="absolute right-4 top-4 md:right-8 md:top-8">
		Sign Up
	</Button>

	<Button href="/" variant="ghost" class="absolute left-4 top-4 md:left-8 md:top-8">Home</Button>

	<Card class="w-full max-w-sm">
		<CardHeader>
			<CardTitle class="text-2xl">Login</CardTitle>
			<CardDescription>Enter your email below to login to your account.</CardDescription>
		</CardHeader>
		<CardContent class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="m@example.com" required />
			</div>
			<div class="grid gap-2">
				<Label for="password">Password</Label>
				<Input id="password" type="password" required />
			</div>
		</CardContent>
		<CardFooter>
			<Button class="w-full">Sign in</Button>
		</CardFooter>
	</Card>
</div>
