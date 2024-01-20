<script>
	import { UserCircle2 } from 'lucide-svelte';
	import { Avatar } from '../ui/avatar';
	import { Button } from '../ui/button';
	import * as Popover from '../ui/popover';
</script>

<div class="w-12 justify-center bottom-0 shadow-md rounded-full bg-gray-200 hover:bg-white">
	<Popover.Root>
		<Popover.Trigger>
			<Avatar class="my-2 text-xl rounded-xl translate-x-[0.4rem]">
				<UserCircle2 size={36} />
			</Avatar>
		</Popover.Trigger>
		<Popover.Content>
			<Button>Sign Out</Button>
		</Popover.Content>
	</Popover.Root>
</div>
