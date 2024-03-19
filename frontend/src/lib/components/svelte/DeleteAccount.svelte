<script lang="ts">
	import * as Dialog from '$lib/components/ui/alert-dialog';
	import { toast } from 'svelte-sonner';
	import { Button, buttonVariants } from '../ui/button';
	export let userID: number;
	export let open = false;
	export let customOpen = false; // if the user wants to open the dialog from a different component - if this is false, avoid setting the value of open
	const handleDelete = () => {
		fetch('/kitAPI/deleteAccount', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: userID })
		})
			.then((res) => {
				console.log(res.ok);
				toast.success('Account deleted successfully');
				if (customOpen) {
					open = false
				}
				console.log('invalidating');
				window.location.reload(); // TODO: this better
			})
			.catch((err) => {
				console.log(err);
				toast.error('Something went wrong');
				if (customOpen) {
					open = false
				}
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
			<Dialog.Title>Are you absolutely sure?</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete this account and remove this
				user's data from our servers.
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Button variant="secondary" on:click={() => (open = false)}>
				Cancel
			</Button>
			<Button variant="destructive" on:click={handleDelete}>Delete Account</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
