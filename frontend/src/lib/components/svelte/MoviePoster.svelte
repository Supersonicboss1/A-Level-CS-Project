<script lang="ts">
	import type { Movie } from '$lib/data/movies';
	import { Calendar, Dna } from 'lucide-svelte';
	import * as HoverCard from '../ui/hover-card';
	import { Separator } from '../ui/separator';

	export let info: Movie;
	let mouseOnImage = false;
</script>

<HoverCard.Root>
	<HoverCard.Trigger>
		<img alt="movie poster" class="carousel-image" src={info.posterURL} />
	</HoverCard.Trigger>
	<HoverCard.Content class="pointer-events-none">
		<div class="flex flex-col items-start justify-center">
			<h1 class="text-xl font-bold">{info.title}</h1>

			<h2 class="text-lg font-semibold flex-none flex">
				<Calendar class={'w-5 mr-1'} />
				{info.year}
			</h2>
			<h2 class="flex flex-none">
				<Dna class={'w-5 mr-1'} />
				{info.genres[0]}
			</h2>
			<Separator />
			<p class="text-md text-ellipsis overflow-hidden max-w-[200px]">{info.description}</p>
		</div>
	</HoverCard.Content>
</HoverCard.Root>

<style lang="postcss">
	.carousel-image {
		@apply h-[450px] w-[300px] max-w-xs flex-none rounded-xl bg-cover bg-center bg-no-repeat opacity-30 transition-all duration-150 hover:scale-105 hover:rounded-3xl hover:opacity-100 hover:shadow-xl hover:shadow-neutral-200;
	}
</style>
