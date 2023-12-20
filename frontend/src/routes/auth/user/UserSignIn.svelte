<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Sign In</Card.Title>
	</Card.Header>
	<Card.Content class="space-y-2">
		<div class="space-y-1">
			<Label for="email">Email Address</Label>
			<Input id="email" placeholder="omar@hotmail.co.uk" />
		</div>
		<div class="space-y-1">
			<Label for="password">Password</Label>
			<Input id="password" type="password" />
		</div>
	</Card.Content>
	<Card.Footer>
		<Button>Sign In</Button>
	</Card.Footer>
</Card.Root>
