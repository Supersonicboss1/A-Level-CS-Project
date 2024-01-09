<script lang="ts">
	import DatePickerButton from '$lib/components/svelte/DatePickerButton.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Form from '$lib/components/ui/form';

	import { formSchema, type FormSchema } from "./schema";
	import type { SuperValidated } from "sveltekit-superforms";
	export let form: SuperValidated<FormSchema>;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Sign Up</Card.Title>
	</Card.Header>
	<Card.Content class="space-y-2">
		<Form.Root let:config schema={formSchema} {form}>
		<Form.Field {config} name='firstname' class="space-y-1">
			<Form.Item>
				<Form.Label for="firstname">First Name</Form.Label>
				<Form.Input id="firstname" type="text" placeholder='' />
			</Form.Item>
		</Form.Field>
		<Form.Field class="space-y-1" name='lastname'>
			<Form.Item>
				<Form.Label for="lastname">Last Name</Form.Label>
				<Form.Input id="lastname" type="text" placeholder='' />
			</Form.Item>
		</Form.Field>
		<Form.Field class="space-y-1" name='email'>
			<Form.Item>
			<Form.Label for="email">Email Address</Form.Label>
			<Form.Input id="email" type="email" />
			</Form.Item>
		</Form.Field>
		<Form.Field class="space-y-1" name='password'>
			<Form.Item>
			<Form.Label for="password">Password</Form.Label>
			<Form.Input id="password" type="password" />
			</Form.Item>
		</Form.Field>
		<Form.Field class="space-y-1" name='dob'>
			<Form.Item>
			<Form.Label for="dob">Date of Birth</Form.Label>
			<DatePickerButton />
			</Form.Item>
		</Form.Field>
	</Form.Root>
	</Card.Content>
	<Card.Footer>
		<Button>Create Account</Button>
	</Card.Footer>
</Card.Root>
