<script lang="ts">
	import AdminSignUp from './AdminSignUp.svelte';

	import AdminSignIn from './AdminSignIn.svelte';

	import * as Tabs from '$lib/components/ui/tabs';
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to the app" />
</svelte:head>
<div class=" justify-center inset-0 grid-rows-2 grid py-10">
	<Tabs.Root value="login" class="w-[650px] self-center rounded-xl ">
		<Tabs.List class="grid w-full grid-cols-3">
			<Tabs.Trigger value="login">Log in</Tabs.Trigger>
			<Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>

			<Tabs.Trigger value="employee" on:click={() => (window.location.href = '/auth/user')}
				>User</Tabs.Trigger
			>
		</Tabs.List>
		<Tabs.Content value="login">
			<AdminSignIn />
		</Tabs.Content>
		<Tabs.Content value="signup">
			<AdminSignUp />
		</Tabs.Content>
	</Tabs.Root>
</div>
