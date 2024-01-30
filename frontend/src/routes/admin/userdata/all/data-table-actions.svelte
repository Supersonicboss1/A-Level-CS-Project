<script lang="ts">
	import DeleteAccount from '$lib/components/svelte/DeleteAccount/DeleteAccount.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MoreHorizontal } from 'lucide-svelte';
	export let id: number;
	let open: boolean;
	function setOpen() {
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
			<DropdownMenu.Item on:click={() => navigator.clipboard.writeText(String(id))}>
				Copy user ID
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item class="text-blue-400">Change user details</DropdownMenu.Item>

		<DropdownMenu.Item on:click={setOpen} class="text-red-500">Delete account</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
<DeleteAccount userID={id} {open} customOpen={true} />
