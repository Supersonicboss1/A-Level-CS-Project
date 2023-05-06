<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>
<script lang="ts">
	let showPassword = false;
	const urlAPI = `https://${import.meta.env.VITE_CSNAME}-8000.preview.app.github.dev/api/`;
	async function fetchBackend(route: string) {
		const x = urlAPI + route;
		// check if any double slashes after https://
		const y = x.replace(/([^:]\/)\/+/g, '$1');
		return fetch(y, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-Github-Token': 'ghu_6RiErA4QT7TtwYn55bZ1Vq01ejPclh0C7SWj'
			}
		});
	}
</script>
<form on:submit={() => fetchBackend('/auth/login')}>
	<label for="username">Login</label>
	<input type="text" name="username" id="username" placeholder="saziz" />
	<label for="password">Password</label>
	<input type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder="ilovehomework123"  />
	<button type="button" on:click={() => showPassword = !showPassword}>
		{showPassword ? 'Hide' : 'Show'} password
	</button>
	<button type="submit" formaction={urlAPI + 'auth/login'}>Login</button>
	<button type="submit" formaction={urlAPI + 'auth/register'}>Sign Up</button>
</form>
{#await fetchBackend('/auth/info?username=test')}
	
{:then f} 
	f
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
