<script lang="ts">
	import CSSclasses from '$lib/CSSclasses';
	import type { User } from '$lib/types';
	import type { PageData } from './$types';
	const timeOfDay = new Date().getHours();
	const greeting =
		timeOfDay < 12 ? 'Good morning' : timeOfDay < 18 ? 'Good afternoon' : 'Good evening';
	export let data: PageData;
	const user = data.user ? data.user : ({} as User);
</script>

<h1 class={CSSclasses.h1}>
	{greeting},
	<div class="text-slate-300">{user.firstName}</div>
</h1>
