<script lang="ts">
	import CSSclasses from '$lib/CSSclasses';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="ml-4">
	<h1 class={`${CSSclasses.h1} p-4`}>
		Hello, {data.firstName}! Ready to do some
		<div class="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-white w-min p-2">
			usering?
		</div>
	</h1>
	<p>Welcome to the home page!</p>
</div>
