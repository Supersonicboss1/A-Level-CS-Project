<script lang="ts">
	import CSSclasses from '$lib/CSSclasses';
	import type { User } from '$lib/types';
	import type { PageData } from './$types';
	import DataTable from './data-table.svelte';

	export let data: PageData;
	const users = data.users as User[];
</script>

{#if data.error}
	<h1 class={CSSclasses.h1}>
		{data.error}
	</h1>
{:else}
	<div class="container mx-auto py-10">
		<DataTable {users} />
	</div>
{/if}
