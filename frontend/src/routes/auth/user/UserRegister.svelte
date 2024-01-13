<script lang="ts">
	import DatePickerButton from '$lib/components/svelte/DatePickerButton.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { registerFormSchema, type RegisterFormSchema } from './schema';
	export let form: SuperValidated<RegisterFormSchema>;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Sign Up</Card.Title>
	</Card.Header>

	<Form.Root let:config schema={registerFormSchema} {form} method="POST" action="?/register">
		<Card.Content class="space-y-2">
			<div class="grid grid-cols-2">
				<Form.Field {config} name="firstName">
					<Form.Item class="space-y-1 mr-5">
						<Form.Label>First Name</Form.Label>
						<Form.Input type="text" placeholder="John" />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="lastName">
					<Form.Item class="space-y-1">
						<Form.Label for="lastname">Last Name</Form.Label>
						<Form.Input id="lastname" type="text" placeholder="Physics" />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>
			<Form.Field {config} name="email">
				<Form.Item class="space-y-1">
					<Form.Label for="email">Email Address</Form.Label>
					<Form.Input type="email" />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="password">
				<Form.Item class="space-y-1">
					<Form.Label for="password">Password</Form.Label>
					<Form.Input type="password" />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="dob">
				<Form.Item class="space-y-1">
					<Form.Label for="dob">Date of Birth</Form.Label>
					<DatePickerButton bind:input={form.data.dob} />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
		</Card.Content>
		<Card.Footer>
			<Button>Create Account</Button>
		</Card.Footer>
	</Form.Root>
</Card.Root>
