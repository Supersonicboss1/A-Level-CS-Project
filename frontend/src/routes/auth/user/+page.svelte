<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Tabs from '$lib/components/ui/tabs';
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to the app" />
</svelte:head>
<div class="flex justify-center items-center h-screen">
<Tabs.Root value="account" class="w-[650px] self-center rounded-xl">
	<Tabs.List class="grid w-full grid-cols-2">
		<Tabs.Trigger value="account">Log in</Tabs.Trigger>
		<Tabs.Trigger value="password">Sign Up</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="account">
		<Card.Root>
			<Card.Header>
				<Card.Title>Sign In</Card.Title>
				<Card.Description>
					Log into your existing account here
					<a href="/auth/forgot">Forgot your password?</a>
				</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="space-y-1">
					<Label for="email">Email Address</Label>
					<Input id="email" placeholder="omar@hotmail.co.uk" />
				</div>
				<div class="space-y-1">
					<Label for="password">Password</Label>
					<Input id="password" type="password" />
				</div>
			</Card.Content>
			<Card.Footer>
				<Button>Save changes</Button>
			</Card.Footer>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="password">
		<Card.Root>
			<Card.Header>
				<Card.Title>Password</Card.Title>
				<Card.Description>Create a new account here.</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="space-y-1">
					<Label for="name">Full Name</Label>
					<Input id="name" type="text" />
				</div>
				<div class="space-y-1">
					<Label for="emailnew">Email Address</Label>
					<Input id="emailnew" type="email" />
				</div>
				<div class="space-y-1">
					<Label for="passwordnew">Confirm Password</Label>
					<Input id="passwordnew" type="password" />
				</div>
				<div>
					<Label for="dob">Date of Birth</Label>
					<Input id="dob" type="date" />
				</div>
			</Card.Content>
			<Card.Footer>
				<Button>Save password</Button>
			</Card.Footer>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value='employee'>
		Employee?
	</Tabs.Content>
</Tabs.Root>
</div>