<script lang="ts">
	// const urlAPI = 'https://supersonicboss1-turbo-tribble-6rwr74774r72xv69-8000.preview.app.github.dev/api'
	import { API } from '$lib/api';
	async function d(): Promise<string[]> {
		let d = await API.get('/api', {});
		console.log(d);
		// @ts-ignore
		return d.data;
	}
	let data = d();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<main>
		{#await data}
			<p>loading...</p>
		{:then d}
			{#each d as item}
				<p>{item}</p>
			{/each}
		{:catch error}
			<p style="color: red">{error}</p>
		{/await}
		<slot />
	</main>
	<button class="primary-button"
		on:click={async () => {
			await API.get('/api/add', { params: { query: { data: 'test' } } });
			console.log('done');
			data = d();
		}}
	>
		INCREASE
	</button>
	<button
		on:click={async () => {
			await API.get('/api/clear', {});
			data = d();
		}}
	>
		CLEAR
	</button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
