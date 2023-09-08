<svelte:head>
	<title>Home</title>
	<meta name="description" content="Home Page" />
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
