<script lang="ts">
	import type { PageData } from './$types';
	import DataTable from './data-table.svelte';

	export let data: PageData;
	const users = data.users || [];
</script>

<div class="container mx-auto py-10">
	<DataTable {users} />
</div>
