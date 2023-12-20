<script lang="ts">
	import DatePickerButton from '$lib/components/svelte/DatePickerButton.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Sign Up</Card.Title>
	</Card.Header>
	<Card.Content class="space-y-2">
		<div class="space-y-1">
			<Label for="name">Full Name</Label>
			<Input id="name" type="text" placeholder='' />
		</div>
		<div class="space-y-1">
			<Label for="email">Email Address</Label>
			<Input id="email" type="email" />
		</div>
		<div class="space-y-1">
			<Label for="password">Confirm Password</Label>
			<Input id="password" type="password" />
		</div>
		<div class="space-y-1">
			<Label for="dob">Date of Birth</Label>
			<DatePickerButton />
		</div>
	</Card.Content>
	<Card.Footer>
		<Button>Create Account</Button>
	</Card.Footer>
</Card.Root>
