<script lang="ts">
	import { DefaultService } from '$lib/api/index.js';
	let signInResponse = '';
	let confirmPassword = '';
	let formData = {
		password: '',
		email: '',
		firstName: '',
		lastName: '',
		age: 0
	};
	let isValid = false;
	function validateFormItem() {}

	function submitForm() {
		DefaultService.registerApiAuthRegisterPost(formData)
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
<form on:submit|preventDefault={() => submitForm()}>
	<h2>Sign Up</h2>
	<sup>or <a href="/login" title="sign up coming soon to a website near you!">log in</a></sup>
	<label for="namegrid">Name</label>
	<div class="namegrid">
		<input
			type="text"
			name="fname"
			id="fname"
			placeholder="First Name"
			bind:value={formData.firstName}
		/>
		<input
			type="text"
			name="lname"
			id="lname"
			placeholder="Last Name"
			bind:value={formData.lastName}
		/>
	</div>
	<label for="age">Age</label>
	<input type="text" name="age" id="age" placeholder="24" bind:value={formData.age} />
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
	<input
		type="password"
		name="password"
		id="password"
		placeholder="Confirm Password"
		bind:value={confirmPassword}
	/>
	<button type="submit" on:click={() => submitForm()} disabled={isValid}>Sign Up</button>
	<p>{signInResponse}</p>
</form>

<style lang="scss">
	.namegrid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 5px;
		grid-row: 2;
	}
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
