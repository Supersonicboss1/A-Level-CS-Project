<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MoreHorizontal } from 'lucide-svelte';
	export let id: number;
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
		<DropdownMenu.Item>Change user details</DropdownMenu.Item>
		<DropdownMenu.Item>Delete user</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
