<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { resetEmailFormSchema, type ResetEmailFormSchema } from './schema';
	export let form: SuperValidated<ResetEmailFormSchema>;
</script>

<div class="justify-center inset-0 grid-rows-2 grid py-10">
	<div class="w-[650px]">
		<Card.Root>
			<Card.Header>
				<Card.Title>Send reset email</Card.Title>
			</Card.Header>
			<Form.Root schema={resetEmailFormSchema} {form} let:config method="POST">
				<Card.Content class="space-y-2">
					<Form.Field name="email" {config}>
						<Form.Item class="space-y-1">
							<Form.Label for="email">Email Address</Form.Label>
							<Form.Input placeholder="omar@hotmail.co.uk" />
							<Form.Validation />
						</Form.Item>
					</Form.Field>
				</Card.Content>
				<Card.Footer>
					<Button type="submit">Send email</Button>
				</Card.Footer>
			</Form.Root>
		</Card.Root>
	</div>
</div>
