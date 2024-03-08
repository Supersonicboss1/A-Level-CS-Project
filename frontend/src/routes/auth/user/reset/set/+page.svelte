<script lang='ts'>
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { resetFormSchema, type ResetFormSchema } from './schema';
    export let form: SuperValidated<ResetFormSchema>;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Create new password</Card.Title>
	</Card.Header>
	<Form.Root schema={resetFormSchema} {form} let:config method="POST">
		<Card.Content class="space-y-2">
			<Form.Field name="token" {config}>
				<Form.Item class="space-y-1">
					<Form.Label for="email">Token</Form.Label>
					<Form.Input />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field name="newPassword" {config}>
				<Form.Item class="space-y-1">
					<Form.Label for="email">New password</Form.Label>
					<Form.Input />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
		</Card.Content>
		<Card.Footer>
			<Button type="submit">Submit</Button>
		</Card.Footer>
	</Form.Root>
</Card.Root>