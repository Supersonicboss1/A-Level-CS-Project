<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { loginFormSchema, type LoginFormSchema } from './schema';
	export let form: SuperValidated<LoginFormSchema>;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Sign In</Card.Title>
	</Card.Header>
	<Form.Root schema={loginFormSchema} {form} let:config method="POST" action="?/login">
		<Card.Content class="space-y-2">
			<Form.Field name="email" {config}>
				<Form.Item class="space-y-1">
					<Form.Label for="email">Email Address</Form.Label>
					<Form.Input placeholder="tim.apple@cineverse.com" />
					<Form.Validation />
				</Form.Item>
			</Form.Field>

			<Form.Field name="password" {config}>
				<Form.Item class="space-y-1">
					<Form.Label for="password">Password</Form.Label>
					<Form.Input type="password" placeholder="hunter2" />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
		</Card.Content>
		<Card.Footer>
			<Button>Sign In</Button>
		</Card.Footer>
	</Form.Root>
</Card.Root>
