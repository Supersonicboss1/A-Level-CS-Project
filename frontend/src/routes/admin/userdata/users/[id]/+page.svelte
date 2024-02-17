<script lang="ts">
	import type { User } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
	if (!data.user) throw new Error('No data');
	const user: User = data.user;
</script>
