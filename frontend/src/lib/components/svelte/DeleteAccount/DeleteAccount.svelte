<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { toast } from 'svelte-sonner';
	import { Button, buttonVariants } from '../../ui/button';
	export let userID: number;
	export let open: boolean;
	export let customOpen: boolean; // if the user wants to open the dialog from a different component - if this is false, avoid setting the value of open
	const handleDelete = () => {
		fetch(`/kitAPI/deleteAccount`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: userID })
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
		<Dialog.Trigger class={buttonVariants({ variant: 'destructive' })}>
			Delete account
		</Dialog.Trigger>
	{/if}
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete your account and remove this
				user's data from our servers.
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Button variant="destructive" on:click={handleDelete}>Delete Account</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
