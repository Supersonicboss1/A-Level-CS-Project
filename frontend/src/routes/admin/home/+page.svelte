<script lang="ts">
	import CSSclasses from '$lib/CSSclasses';
	import { Button } from '$lib/components/ui/button';
	import type { User } from '$lib/types';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	const timeOfDay = new Date().getHours();
	const greeting =
		timeOfDay < 12 ? 'Good morning' : timeOfDay < 18 ? 'Good afternoon' : 'Good evening';
	export let data: PageData;
	const user = data.user ? data.user : ({} as User);
	function generateRandomNumber(minValue: number, maxValue: number) {
		return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

	}
	let complaintValue = generateRandomNumber(300, 75000);
	onMount(() => {
		setInterval(() => {
			// This is such a waste of time and electricity
			complaintValue += generateRandomNumber(1, 5);
		}, 500);
	});

</script>

<h1 class={`${CSSclasses.h1} text-slate-200 my-2`}>
	{greeting}, {user.firstName}
</h1>
<h2 class={CSSclasses.h2}>Here are some of your stats for this month!</h2>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
	<div class="bg-red-700 p-4 rounded-lg">
		<h3 class={CSSclasses.h3}>Total complaints about you</h3>
		<p class={CSSclasses.p}>{complaintValue}</p>
	</div>
	<div class="bg-blue-900 p-4 rounded-lg">
		<h3 class={CSSclasses.h3}>Company money wasted</h3>
		<p class={CSSclasses.p}>${generateRandomNumber(1e2, 1e8)}</p>
	</div>
		<div class="bg-green-800 p-4 rounded-lg">
		<h3 class={CSSclasses.h3}>Days from getting fired</h3>
		<p class={CSSclasses.p}>{generateRandomNumber(1, 4)}</p>
	</div>
</div>
<form method="POST">
<Button type='submit' class='my-6 mx-2' variant='destructive' on:click={() => toast.success('10 test users created and added to the database!')}>
	Create 10 new test users
</Button>
</form>