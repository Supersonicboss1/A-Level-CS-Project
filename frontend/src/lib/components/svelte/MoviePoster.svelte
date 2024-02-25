<script lang="ts">
	import CSSclasses from '$lib/CSSclasses';
	import type { Movie } from '$lib/data/movies';
	import { Calendar, Dna } from 'lucide-svelte';
	import * as Dialog from '../ui/dialog';
	import { Separator } from '../ui/separator';

	export let info: Movie | undefined = undefined;

</script>
{#if info == undefined}
<div class='carousel-image bg-muted'/>
{:else}
<Dialog.Root>
	<Dialog.Trigger class="cursor-pointer">
		<img alt="movie poster" class="carousel-image" src={info.posterURL} />
	</Dialog.Trigger>
	<Dialog.Content class="">
		<div class="">
			<h3 class={CSSclasses.h3}>{info.title}</h3>

			<h4 class={` flex-none flex ${CSSclasses.h4}`}>
				<Calendar class={'w-5 mr-1'} />
				{info.year}

				<Dna class={'w-5 ml-2 mr-1'} />
				{info.genres[0]}
			</h4>
			<Separator />
			<p class={CSSclasses.p}>{info.description}</p>
		</div>
	</Dialog.Content>
</Dialog.Root>
{/if}
<style lang="postcss">
	.carousel-image {
		/* @ts-ignore */
		@apply h-[450px] w-[300px] max-w-xs flex-none rounded-xl bg-cover bg-center bg-no-repeat opacity-30 transition-all duration-150 hover:rounded-3xl hover:opacity-100 hover:shadow-lg;
	}
</style>
