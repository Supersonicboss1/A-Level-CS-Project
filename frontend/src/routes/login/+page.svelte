<script lang="ts">
	import { afterUpdate, onDestroy } from 'svelte';

	let signInResponse = '';
	let formData = {
		username: 'test',
		password: 'test'
	};
	let isLoaded = false;
	afterUpdate(() => {
		isLoaded = true;
	});
	onDestroy(() => {
		isLoaded = false;
	});
	let isSignUp = false;
	export let data;
	function submitForm() {
		
	}
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>
<form on:submit|preventDefault={() => submitForm()} class:fullyLoaded={isLoaded}>
	<label for="username">Login</label>
	<input
		type="text"
		name="username"
		id="username"
		placeholder="saziz"
		bind:value={formData.username}
	/>
	<label for="password">Password</label>
	<input
		type="password"
		name="password"
		id="password"
		placeholder="ilovehomework123"
		bind:value={formData.password}
	/>
	<button type="submit" on:click={() => (isSignUp = false)}>Login</button>
	<button type="submit" on:click={() => (isSignUp = true)}>Sign Up</button>
</form>
<p>{signInResponse}</p>
{data.username}
{data.user_id}

<style lang="scss">
	* {
		transition: all;
	}
	form {
		width: 300px;
		margin: 0 auto;
		background-color: #171717;
		padding: 10vh;
		border-radius: 2vh;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		transition: transform 1s ease-in-out;
	}

	/* Style for the labels */
	label {
		display: block;
		font-size: 16px;
		margin-bottom: 10px;
	}

	/* Style for the input fields */

	button {
		&:hover {
			outline: 3px solid #078011;
			transition: all 0.15s ease-in-out;
		}
		&:active {
			transition: all 0.05s ease-in-out;
			background-color: #078011;
		}
	}
</style>
