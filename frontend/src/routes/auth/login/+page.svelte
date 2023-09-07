<script lang="ts">
	let formData = {
		// this is the data which will be sent to the API upon submission
		email: '',
		password: ''
	};
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to the app" />
</svelte:head>
<form method="post">
	<h2>Login</h2>
	<sup>or <a href="/auth/signup">sign up</a></sup>
	<label for="email">Email Address</label>
	<input
		type="text"
		name="email"
		id="email"
		placeholder="example@example.co.uk"
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
	<button type="submit">Login</button>
	Forgot your password?
	<a href="/forgot">Reset it</a>
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
