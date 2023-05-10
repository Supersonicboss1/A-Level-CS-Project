<script lang="ts">
	// const urlAPI = 'https://supersonicboss1-turbo-tribble-6rwr74774r72xv69-8000.preview.app.github.dev/api'
	import { fetchBackend, urlAPI } from '$lib/api';
	console.log(urlAPI);
	async function fetch_data() {
		const response = await fetchBackend('/');

		const data = await response.json();
		console.log(data);
		return data;
	}
	let d = fetch_data();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<main>
		{#await d}
			<p>loading...</p>
		{:then d}
			Count: {d.length}
			{#each d as item}
				<p>{item}</p>
			{/each}
		{:catch error}
			<p style="color: red">{error}</p>
		{/await}
		<slot />
	</main>
	<button
		on:click={async () => {
			await fetchBackend('/add?data=OMAR');
			d = fetch_data();
		}}
	>
		INCREASE THE OMARS
	</button>
	<button
		on:click={async () => {
			await fetch(urlAPI + '/clear');
			d = fetch_data();
		}}
	>
		CLEAR THE OMARS
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
