<script lang="ts">
	import { API } from '$lib/api';
	let response = '';
	let success = true;
	let DoBString = '';
	$: formData.dob = new Date(DoBString).getTime().toString();
	let confirmPassword = '';
	let formData = {
		password: '',
		email: '',
		name: '',
		dob: ''
	};
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to the app" />
</svelte:head>
<form
	on:submit|preventDefault={() =>
		API.register(formData.email, formData.password, formData.name, formData.dob)}
>
	<h2>Sign Up</h2>
	<sup>or <a href="/auth/login">log in</a></sup>
	<label for="name">Name</label>
	<input
		type="text"
		name="name"
		id="name"
		placeholder="Name"
		aria-label="Name"
		bind:value={formData.name}
	/>
	<label for="dob">Date of Birth</label>
	<input type="date" name="dob" id="dob" placeholder="24" bind:value={DoBString} />
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
		autocomplete="new-password"
		bind:value={formData.password}
	/>
	<input
		type="password"
		name="confirmpassword"
		id="confirmpassword"
		placeholder="Confirm Password"
		autocomplete="new-password"
		bind:value={confirmPassword}
	/>
	<button type="submit">Sign Up</button>
	{#if success}
		<!-- do nothing -->
	{:else}
		<div class="error">
			<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24"
				><path
					fill="#FF0000"
					d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm0-4q.425 0 .713-.288T13 12V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v4q0 .425.288.713T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
				/></svg
			>
			{response}
		</div>
	{/if}
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
