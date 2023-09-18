<script lang="ts">
	import { API } from '$lib/api';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Card from "$lib/components/ui/card";
	import * as Tabs from "$lib/components/ui/tabs";
	let response = '';
	let success = true;
	let DoBString = '';
	$: formData.dob = new Date(DoBString).getTime().toString();
	let confirmPassword = '';
	let formData = {
		password: '',
		email: '',
		name: '',
		dob: ''
	};
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to the app" />
</svelte:head>
<!-- <form class="dark font-sans "
	on:submit|preventDefault={() =>
		API.register(formData.email, formData.password, formData.name, formData.dob)}
>
	<h2>Sign Up</h2>
	<sup>or <a href="/auth/login">log in</a></sup>
	<br />
	<Label for="name">Name</Label>
	<Input
	class="m-1"
		type="text"
		name="name"
		id="name"
		placeholder="Name"
		aria-label="Name"
		bind:value={formData.name}
	/>
	<Label for="dob">Date of Birth</Label>
	<Input type="date" name="dob" id="dob" placeholder="24" bind:value={DoBString}
	class="m-1" />
	<Label for="email">Email Address</Label>
	<Input
	class="m-1"
		type="text"
		name="email"
		id="email"
		placeholder="omar@hotmail.co.uk"
		bind:value={formData.email}
	/>
	<Label for="password">Password</Label>
	<Input
	class="m-1"
		type="password"
		name="password"
		id="password"
		placeholder="••••••••"
		autocomplete="new-password"
		bind:value={formData.password}
	/>
	<Input
	class="m-1"
		type="password"
		name="confirmpassword"
		id="confirmpassword"
		placeholder="Confirm Password"
		autocomplete="new-password"
		bind:value={confirmPassword}
	/>
	<Button type="submit">Sign Up</Button>
	{#if success}
	{:else}
		<div class="error">
			<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24"
				><path
					fill="#FF0000"
					d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm0-4q.425 0 .713-.288T13 12V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v4q0 .425.288.713T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
				/></svg
			>
			{response}
		</div>
	{/if}
</form> -->
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
		  <Card.Description>
Create a new account here.
		  </Card.Description>
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
  </Tabs.Root>

<style lang="scss">
	* {
		transition: all;
	}
	form {
		width: 600px;
		margin: 0 auto;
		padding: 10vh;
		border-radius: 2vh;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	}

	/* Style for the labels */
	label {
		display: block;
		font-size: 16px;
		margin-bottom: 10px;
	}

	/* Style for the input fields */
	a {
		color: #078011;
		&:hover {
			color: #08b817;
		}
	}
</style>
