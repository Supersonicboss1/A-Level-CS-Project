<script lang="ts">
	let signInResponse = '';
	import { fetchBackend, fetchData } from '$lib/api';
	import { token } from '$lib/stores';
	let formData = {
		username: 'test',
		password: 'test'
	};
	let isSignUp = false;
	console.log(formData);
	async function submitForm() {
		if (isSignUp) {
			let resl = await fetchBackend('/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});
			if (resl.status === 200) {
				console.log(resl);
				signInResponse = 'Sign up successful';
				const tok = await resl.text();
				console.log(tok);
				if (tok.length == 16) {
					token.set(await resl.text());
				}
			} else {
				signInResponse = 'Sign up failed';
			}
		} else {
			fetchBackend('/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			}).then((res) => {
				if (res.status === 200) {
					console.log(res);
					signInResponse = 'Sign in successful';
				} else {
					signInResponse = 'Sign in failed';
				}
			});
		}
	}
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>
<form on:submit|preventDefault={() => submitForm()}>
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
{#await fetchData('/auth/info?token=' + $token)}
	<p>loading...</p>
{:then f}
	{#if f.user_id}
		<p>User ID: {f.user_id} - Hello, {f.username}!</p>
	{/if}
{:catch error}
	<p style="color: red">{error}</p>
{/await}

<style>
	* {
		transition: all;
	}
	form {
		width: 300px;
		margin: 0 auto;
	}

	/* Style for the labels */
	label {
		display: block;
		font-size: 16px;
		margin-bottom: 10px;
	}

	/* Style for the input fields */
	input[type='text'],
	input[type='password'] {
		width: 100%;
		padding: 10px;
		margin-bottom: 20px;
		border: 1px solid #ccc;
		border-radius: 5px;
		box-sizing: border-box;
	}
</style>
