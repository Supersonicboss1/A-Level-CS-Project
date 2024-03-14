<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import CSSclasses from '$lib/CSSclasses';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { loginFormSchema, type LoginFormSchema } from './schema';
	export let form: SuperValidated<LoginFormSchema>;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Sign In</Card.Title>
		<a href="/auth/user/reset/email" class={CSSclasses.muted + ' hover:underline space-y-2'}
			>Forgot your password?</a
		>
	</Card.Header>
	<Form.Root schema={loginFormSchema} {form} let:config method="POST" action="?/login">
		<Card.Content class="space-y-2">
			<Form.Field name="email" {config}>
				<Form.Item class="space-y-1">
					<Form.Label for="email">Email Address</Form.Label>
					<Form.Input placeholder="omar@hotmail.co.uk" />
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
			<Button type="submit">Sign In</Button>
		</Card.Footer>
	</Form.Root>
</Card.Root>
