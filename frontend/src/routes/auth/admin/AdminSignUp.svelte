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
			<Input id="name" type="text" placeholder='Muhammed "NEET" Islam' />
		</div>
		<div class="space-y-1">
			<Label for="email">Email Address</Label>
			<Input id="email" type="email" placeholder='muaazmotors@cineverse.com' />
		</div>
		<div class="space-y-1">
			<Label for="password">Password</Label>
			<Input id="password" type="password" />
		</div>
		<div class="space-y-1">
			<Label for="adminkey">Admin Key</Label>
			<Input id="adminkey" type="text" placeholder='LEONARD + ((-4e^(πi) * (cos^2x + sin^2x) + 1) / (lim (x → 0) ((e^x - 1) / x)))' />
		</div>
	</Card.Content>
	<Card.Footer>
		<Button>Create Account</Button>
	</Card.Footer>
</Card.Root>
