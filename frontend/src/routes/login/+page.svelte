<script lang="ts">
	let signInResponse = '';
	let formData = {
		username: 'test',
		password: 'test'
	};
	let isSignUp = false;
	export let data;
	const userData = {
		// @ts-ignore
		username: data.body.u.username,
		// @ts-ignore
		userID: data.body.u.user_id
	};
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>
<form on:submit|preventDefault={() => console.log(formData)}>
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
{userData.username}
{userData.userID}

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
