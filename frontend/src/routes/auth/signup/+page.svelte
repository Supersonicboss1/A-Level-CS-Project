<script lang="ts">
	let signInResponse = '';
	let confirmPassword = '';
	let DoBString = '';
	$: formData.dob = new Date(DoBString).getTime().toString();

	let formData = {
		password: '',
		email: '',
		firstName: '',
		lastName: '',
		dob: ''
	};
	function validateDate() {
		// get current date in milliseconds
		const currentYear = new Date().getTime();
		// get date of birth in milliseconds
		const dob = new Date(DoBString).getTime();
		// get difference between current year and year of birth
		const age = currentYear - dob;
		// convert difference to years
		const ageInYears = age / 31536000000; // 31536000000 is the number of milliseconds in a year (probably)
		// if age is less than 16
		if (ageInYears < 16) {
			return false;
		} else {
			return true;
		}
	}
	$: console.log(formData);
	function validateForm() {
		if (validateDate() === false) {
			// if under 16
			signInResponse = 'You must be at least 16 years old to use this service';
		} else if (formData.password.length < 8) {
			signInResponse = 'Password must be at least 8 characters';
		} else if (formData.password !== confirmPassword) {
			signInResponse = 'Passwords do not match';
		} else if (formData.email.includes('@') === false) {
			signInResponse = 'Please enter a valid email address';
		} else if (formData.firstName === '' || formData.lastName === '') {
			signInResponse = 'Please enter your full name';
		} else {
			signInResponse = '';
		}
	}

	function submitForm() {
		// fetch register
	}
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to the app" />
</svelte:head>
<form on:input={() => validateForm()} on:submit|preventDefault={() => submitForm()}>
	<h2>Sign Up</h2>
	<sup>or <a href="/auth/login">log in</a></sup>
	<label for="namegrid">Name</label>
	<div class="namegrid">
		<input
			type="text"
			name="fname"
			id="fname"
			placeholder="First Name"
			aria-label="First Name"
			bind:value={formData.firstName}
		/>
		<input
			type="text"
			name="lname"
			id="lname"
			placeholder="Last Name"
			aria-label="Last Name"
			bind:value={formData.lastName}
		/>
	</div>
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
		name="password"
		id="password"
		placeholder="Confirm Password"
		autocomplete="new-password"
		bind:value={confirmPassword}
	/>
	<button type="submit" on:click={() => submitForm()} disabled={signInResponse != ''}
		>Sign Up</button
	>
	{#if signInResponse == '' || signInResponse == 'Success'}
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
