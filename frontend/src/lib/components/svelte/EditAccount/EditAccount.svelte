<script lang="ts">
	import * as Dialog from '$lib/components/ui/alert-dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { EditUser, User } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { Button, buttonVariants } from '../../ui/button';
	export let userInfo: User;
	let editableUserInfo: EditUser
	$: editableUserInfo = {
		firstName: userInfo.firstName,
		lastName: userInfo.lastName,
		email: userInfo.email,
		dob: userInfo.dob,
		id: userInfo.id,
		token: userInfo.token,
		password: '',
	}
	export let open: boolean = false;
	export let customOpen: boolean = false; // if the user wants to open the dialog from a different component - if this is false, avoid setting the value of open
	const handleEdit = () => {
		fetch(`/kitAPI/editAccount`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ editableUserInfo })
		})
			.then((res) => {
				console.log(res.ok);
				toast.success('Account deleted successfully');
				customOpen ? (open = false) : null;
				console.log('invalidating');
				window.location.reload(); // TODO: this better
			})
			.catch((err) => {
				console.log(err);
				toast.error('Something went wrong');
				customOpen ? (open = false) : null;
			});
	};
</script>

<Dialog.Root bind:open>
	{#if customOpen === false}
		<Dialog.Trigger class={buttonVariants({ variant: 'destructive' })}>Edit account</Dialog.Trigger>
	{/if}
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit User</Dialog.Title>
		</Dialog.Header>
		<div class="grid grid-cols-2">
			<div class="space-y-1 mr-5">
				<Label>First Name</Label>
				<Input type="text" bind:value={editableUserInfo.firstName}/>
			</div>

			<div class="space-y-1">
				<Label for="lastname">Last Name</Label>
				<Input id="lastname" type="text" placeholder="Physics" bind:value={editableUserInfo.lastName} />
			</div>
		</div>

		<div class="space-y-1">
			<Label for="email">Email Address</Label>
			<Input type="email" bind:value={editableUserInfo.email}/>
		</div>

		<div class="space-y-1">
			<Label for="password">Password</Label>
			<Input type="password" bind:value={editableUserInfo.password}/>
		</div>

		<div class="space-y-1">
			<Label for="dob">Date of Birth</Label>
			<Input type="date" bind:value={editableUserInfo.dob} />
		</div>

		<Dialog.Footer>
			<Button variant="secondary" on:click={() => (customOpen ? (open = false) : null)}>
				Cancel
			</Button>
			<Button variant="destructive" on:click={handleEdit}>Complete Changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
