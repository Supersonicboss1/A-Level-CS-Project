<script lang="ts">
	import CSSclasses from '$lib/CSSclasses';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="ml-4">
	<h1 class={CSSclasses.h1}>
		Hello, {data.firstName}
	</h1>
	<p>Welcome to the home page!</p>
</div>
