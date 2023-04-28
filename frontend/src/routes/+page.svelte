<script>
	async function fetch_data() {
		const response = await fetch('http://localhost:8000/api/');
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
			await fetch('http://localhost:8000/api/add?data=OMAR');
			d = fetch_data();
		}}
	>
		INCREASE THE OMARS
	</button>
	<button
		on:click={async () => {
			await fetch('http://localhost:8000/api/clear');
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
