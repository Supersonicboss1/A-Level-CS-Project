<script lang="ts">
	import { DefaultService } from "$lib/api";

	// const urlAPI = 'https://supersonicboss1-turbo-tribble-6rwr74774r72xv69-8000.preview.app.github.dev/api'
	
	async function d(): Promise<string[]> {
		let d = await DefaultService.readRootApiGet();
		console.log(d + 'test');
		// @ts-ignore
		return d
	}
	let data = d();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<main>
		{#await data then d}
			{#each d as item}
				<p>{item}</p>
			{/each}
		{:catch error}
			<p style="color: red">{error}</p>
		{/await}
		<slot />
	</main>
	<div class="buttons">
		<button
			on:click={async () => {
				await DefaultService.addNewDataApiAddGet('test');
				console.log('done');
				data = d();
			}}
		>
			INCREASE
		</button>
		<button
			class="warning"
			on:click={async () => {
				await DefaultService.clearDataApiClearGet();
				data = d();
			}}
		>
			CLEAR
		</button>
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
	.buttons {
		position: absolute;
		bottom: 0;
		display: flex;
		margin: 2vh;
		button {
			margin: 0 0.5vh;
			width: 20vh;
			text-align: center;
		}
	}
	button.warning {
		&:hover {
			outline: 3px solid #ff0000;
			transition: all 0.15s ease-in-out;
		}
		&:active {
			transition: all 0.05s ease-in-out;
			background-color: #ff0000;
		}
	}
</style>
