<script lang="ts">
	import DeleteAccount from '$lib/components/svelte/DeleteAccount/DeleteAccount.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { User } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
	if (!data.user) throw new Error('No data');
	const user: User = data.user;
</script>



