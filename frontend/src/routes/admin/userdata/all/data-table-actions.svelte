<script lang="ts">
	import DeleteAccount from '$lib/components/svelte/DeleteAccount.svelte';
	import EditAccount from '$lib/components/svelte/EditAccount.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { User } from '$lib/types';
	import { MoreHorizontal } from 'lucide-svelte';
	export let userData: User;
	let openDelete: boolean;
	let openEdit: boolean;
	function setOpen(open: boolean) {
		// wha??? why??? why does this work??? why does this fix the bug???
		open = false;
		open = true;
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
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item on:click={() => navigator.clipboard.writeText(String(userData.id))}>
				Copy user ID
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={() => setOpen(openEdit)} class="text-blue-500">Edit account details</DropdownMenu.Item>

		<DropdownMenu.Item on:click={() => setOpen(openDelete)} class="text-red-500">Delete account</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
<DeleteAccount userID={userData.id} open={openDelete} customOpen={true} />
<EditAccount userInfo={{
	firstName: userData.firstName,
	lastName: userData.lastName,
	email: userData.email,
	dob: userData.dob,
	id: userData.id,
	token: userData.token,
	password: '',
}} open={openEdit} customOpen={true} />
