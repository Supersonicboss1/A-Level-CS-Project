<script lang="ts">
	import { DefaultService } from '$lib/api/index.js';
	let signInResponse = '';
	let formData = {
		// this is the data which will be sent to the API upon submission
		email: '',
		password: ''
	};
	function validateFormItem() {
		if (formData.email === '' || formData.password === '') {
			signInResponse = 'Please fill in all fields';
		} else if (formData.password.length < 8) {
			signInResponse = 'Password must be at least 8 characters';
		} else {
			signInResponse = '';
		}
	}
	function submitForm() {
		DefaultService.loginApiAuthLoginPost(formData)
			.then((res) => {
				signInResponse = res ? 'Success' : 'Failed';
			})
			.catch(() => {
				signInResponse = 'Sign in failed - do you have an account?';
			});
	}
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to the app" />
</svelte:head>
<form on:submit|preventDefault={() => submitForm()}>
	<h2>Login</h2>
	<sup>or <a href="/signup">sign up</a></sup>
	<label for="email">Email Address</label>
	<input
		type="text"
		name="email"
		id="email"
		placeholder="omar@hotmail.co.uk"
		bind:value={formData.email}
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
	{#if signInResponse === 'Success'}
		<script>
			// redirect to the home page if the user has successfully logged in
			import { goto } from '$app/navigation';
			goto('/');
		</script>
	{:else if signInResponse === ''}
		<!-- do nothing -->
	{:else}
		<div class="error">
			<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24"
				><path
					fill="#FF0000"
					d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm0-4q.425 0 .713-.288T13 12V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v4q0 .425.288.713T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
				/></svg
			>
			{signInResponse}
		</div>
	{/if}
</form>

<style lang="scss">
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
