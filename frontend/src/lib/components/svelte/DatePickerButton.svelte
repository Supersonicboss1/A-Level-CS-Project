<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';
	import { DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date';
	import { Calendar as CalendarIcon } from 'lucide-svelte';
	import MonthDayPicker from './MonthDayPicker.svelte';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let value: DateValue | undefined = undefined;
	export let input = new Date();
	$: input = value?.toDate(getLocalTimeZone()) ?? new Date();
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<MonthDayPicker bind:value />
	</Popover.Content>
</Popover.Root>
