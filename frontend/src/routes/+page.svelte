<script lang="ts">
	import { DefaultService } from '$lib/api';

	// const urlAPI = 'https://supersonicboss1-turbo-tribble-6rwr74774r72xv69-8000.preview.app.github.dev/api'
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<main>
		<h1>Home</h1>
		<slot />
	</main>
	<div class="buttons" />
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
