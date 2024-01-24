<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="ml-4">
	<h1 class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
		Hello, {data.firstName}
	</h1>
	<p>Welcome to the home page!</p>
</div>
