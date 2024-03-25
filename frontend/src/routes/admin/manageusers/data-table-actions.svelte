<script lang="ts">
	import DeleteAccount from '$lib/components/svelte/DeleteAccount.svelte';
	import EditAccount from '$lib/components/svelte/EditAccount.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { User } from '$lib/types';
	import { MoreHorizontal } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	export let userData: User;
	let openDelete: boolean;
	let openEdit: boolean;
	function setOpenEdit() {
		// This is a hack to force the dropdown to close when the user clicks on an item due to focus issues with the UI library
		openEdit = false;
		openEdit = true;
	}
	function setOpenDelete() {
		// This is a hack to force the dropdown to close when the user clicks on an item due to focus issues with the UI library
		openDelete = false;
		openDelete = true;
	}
	function resetLikedFilms() {
		fetch('/kitAPI/resetLiked', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: userData.id })
		})
			.then((res) => {
				if (res.ok) {
					console.log('success');
					toast.success('Liked films reset');
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error('Something went wrong');
			});
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative w-8 h-8 p-0">
			<span class="sr-only">Open menu</span>
			<MoreHorizontal class="w-4 h-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		{#if userData.id !== null && userData.id !== undefined}
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item on:click={() => navigator.clipboard.writeText(String(userData.id))}>
				Copy user ID
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={() => setOpenEdit()} class="text-blue-500"
			>Edit account details</DropdownMenu.Item
		>
				<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={resetLikedFilms} class="text-orange-500"
			>Reset liked films</DropdownMenu.Item
		>
		<DropdownMenu.Item on:click={() => setOpenDelete()} class="text-red-500"
			>Delete account</DropdownMenu.Item
		>

		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
{#if userData.id !== null && userData.id !== undefined}
<DeleteAccount userID={userData.id} open={openDelete} customOpen={true} />
<EditAccount
	userInfo={{
		firstName: userData.firstName,
		lastName: userData.lastName,
		email: userData.email,
		dob: userData.dob,
		id: userData.id,
		token: userData.token,
		password: ''
	}}
	open={openEdit}
	customOpen={true}
/>
{/if}