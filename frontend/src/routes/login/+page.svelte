<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<form action="">
	<label for="username">Login</label>
	<input type="text" name="username" id="username" placeholder="saziz" />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" placeholder="ilovehomework123" />
	<button type="submit">Login</button>
</form>

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
