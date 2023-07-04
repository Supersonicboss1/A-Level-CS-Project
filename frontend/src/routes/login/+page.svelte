<script lang="ts">
	import { DefaultService } from '$lib/api/index.js';
	let signInResponse = '';
	let formData = {
		username: '',
		password: ''
	};
	let isLoaded = false;
	function submitForm() {
		DefaultService.loginApiAuthLoginPost(formData)
			.then((res) => {
				signInResponse = res ? 'Success' : 'Failed';
			})
			.catch(() => {
				signInResponse = 'Sign up failed - does the user already exist?';
			});
	}
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to the app" />
</svelte:head>
<form on:submit|preventDefault={() => submitForm()} class:fullyLoaded={isLoaded}>
	<h2>Login</h2>
	<sup>or <a href="/signup" title="sign up coming soon to a website near you!">sign up</a></sup>
	<label for="username">Email Address</label>
	<input
		type="text"
		name="username"
		id="username"
		placeholder="omar@hotmail.co.uk"
		bind:value={formData.username}
	/>
	<label for="password">Password</label>
	<input
		type="password"
		name="password"
		id="password"
		placeholder="••••••••"
		bind:value={formData.password}
	/>
	<button type="submit" on:click={() => submitForm()}>Login</button>
	Forgot your password?
	<a href="/forgot" title="ok, maybe this doesn't exist right now...">Reset it</a>
	<p>{signInResponse}</p>
</form>

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
	a {
		color: #078011;
		&:hover {
			color: #08b817;
		}
	}
</style>
