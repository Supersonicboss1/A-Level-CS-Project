<script lang="ts">
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
			<Input id="name" type="text" />
		</div>
		<div class="space-y-1">
			<Label for="email">Email Address</Label>
			<Input id="email" type="email" />
		</div>
		<div class="space-y-1">
			<Label for="password">Confirm Password</Label>
			<Input id="password" type="password" />
		</div>
		<div>
			<Label for="dob">Date of Birth</Label>
			<Input id="dob" type="date" />
		</div>
	</Card.Content>
	<Card.Footer>
		<Button>Save password</Button>
	</Card.Footer>
</Card.Root>
