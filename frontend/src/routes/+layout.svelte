<script lang="ts">
	import { isDarkMode } from '$lib/stores';
	import { onMount } from 'svelte';
	import '../app.postcss';
	import Header from '../lib/Header.svelte';
	import './styles.scss';
	onMount(() => {
			if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark')
			$isDarkMode = true;
			} else {
			document.documentElement.classList.remove('dark')
			$isDarkMode = false;
			}

		})
</script>

<div class="app">
	<Header />
	<main>
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
