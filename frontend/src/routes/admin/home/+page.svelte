<script lang="ts">
	import CSSclasses from '$lib/CSSclasses';
	import { Button } from '$lib/components/ui/button';
	import type { User } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	const timeOfDay = new Date().getHours();
	const greeting =
		timeOfDay < 12 ? 'Good morning' : timeOfDay < 18 ? 'Good afternoon' : 'Good evening';
	export let data: PageData;
	const user = data.user ? data.user : ({} as User);

</script>

<h1 class={`${CSSclasses.h1} text-slate-200 my-2`}>
	{greeting}, {user.firstName}
</h1>
<h2 class={CSSclasses.h2}>Ready to get down to business?</h2>

	<Button href="/admin/manageusers" class=" my-2 mx-2">Manage Users</Button>

<form method="POST">
	<Button
		type="submit"
		class="mx-2"
		variant="destructive"
		on:click={() => toast.success('10 test users created and added to the database!')}
	>
		Create 10 new test users
	</Button>
</form>
