<script lang="ts">
	import { OpenAPI } from '$lib/api';
	OpenAPI.BASE = import.meta.env.VITE_isWeb ? `https://${import.meta.env.VITE_CSNAME}-8000.preview.app.github.dev` : 'http://127.0.0.1:8000';
	import Header from './Header.svelte';
	import './styles.scss';
	export let data;
</script>

<div class="app">
	<Header />
	Hello, {data.username}!
	<main class="">
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
