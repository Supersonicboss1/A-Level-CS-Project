<script lang="ts">
	import AdminSignUp from './AdminSignUp.svelte';

	import AdminSignIn from './AdminSignIn.svelte';

	import * as Tabs from '$lib/components/ui/tabs';
	import { Unlock } from 'lucide-svelte';
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

			<a
				href="/auth/user"
				class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
				><Unlock class="w-4 mr-2" />Not an employee?</a
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
