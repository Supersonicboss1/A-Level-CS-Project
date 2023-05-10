<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>
<script lang="ts">
	import { fetchBackend, fetchData, urlAPI } from "$lib/api";
	let formData = {
		username: 'test',
		password: 'test',
	}; 
	let isSignUp = false;
	console.log(formData);
	let showPassword = false;
	function submitForm() {
		if (isSignUp) {
			fetchBackend('/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
		} else {
			fetchBackend('/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			}).then((res) => {
				if (res.status === 200) {
					console.log(res);
				}
			});
		}
	}
</script>
<form on:submit|preventDefault={() => submitForm()}>
	<label for="username">Login</label>
	<input type="text" name="username" id="username" placeholder="saziz" bind:value={formData.username} />
	<label for="password">Password</label>
	<input type='password' name="password" id="password" placeholder="ilovehomework123" bind:value={formData.password}/> 
	<button type="submit" on:click={() => isSignUp = false}>Login</button>
	<button type="submit" on:click={() => isSignUp = true}>Sign Up</button>
</form>
{#await  fetchData('/auth/info?username=test')}
	<p>loading...</p>	
{:then f} 
	<p>{f}</p>
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
