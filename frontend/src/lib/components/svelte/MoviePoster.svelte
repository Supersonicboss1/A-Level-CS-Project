<script lang="ts">
	import type { Movie } from '$lib/data/movies';
	import { Calendar, Dna } from 'lucide-svelte';
	import * as Dialog from '../ui/dialog';
	import { Separator } from '../ui/separator';

	export let info: Movie;
</script>

<Dialog.Root>
	<Dialog.Trigger class='cursor-pointer'>
		<img alt="movie poster" class="carousel-image" src={info.posterURL} />
	</Dialog.Trigger>
	<Dialog.Content class="">
		<div class="">
			<h1 class="text-xl font-bold">{info.title}</h1>

			<h2 class="text-lg font-semibold flex-none flex">
				<Calendar class={'w-5 mr-1'} />
				{info.year}

				<Dna class={'w-5 ml-2 mr-1'} />
				{info.genres[0]}
			</h2>
			<Separator />
			<p class="text-md text-ellipsis overflow-hidden mt-2">{info.description}</p>
		</div>
	</Dialog.Content>
</Dialog.Root>

<style lang="postcss">
	.carousel-image {
		@apply h-[450px] w-[300px] max-w-xs flex-none rounded-xl bg-cover bg-center bg-no-repeat opacity-30 transition-all duration-150 hover:scale-105 hover:rounded-3xl hover:opacity-100 hover:shadow-lg hover:shadow-neutral-200;
	}
</style>
