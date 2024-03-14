<script lang="ts">
	import CSSclasses from '$lib/CSSclasses';
	import type { MovieRead } from '$lib/types';
	import { Baby, Calendar, Dna, Star, Timer } from 'lucide-svelte';
	import * as Dialog from '../ui/dialog';
	import { Separator } from '../ui/separator';
	import FavouriteFilm from './FavouriteFilm.svelte';
	export let info: MovieRead | undefined = undefined;

</script>
{#if info == undefined}
<div class='carousel-image bg-muted'/>
{:else}
<Dialog.Root>
	<Dialog.Trigger class="cursor-pointer">
		<img alt="movie poster" class="carousel-image" src={info.poster_url} />
	</Dialog.Trigger>
	<Dialog.Content class="">
		<div class="">
			<h3 class={CSSclasses.h3}>{info.title}</h3>

			<h4 class={` flex-none flex ${CSSclasses.h4}`}>
				<Calendar class={'w-5 mr-1'} />
				{info.year}

				<Dna class={'w-5 ml-3 mr-1'} />
				{info.genre}

				<Baby class={'w-5 ml-3 mr-1'} />
				{info.age_rating}

				<Timer class={'w-5 ml-3 mr-1'} />
				{info.runtime}min

				<Star class={'w-5 ml-3 mr-1'} />
				{info.rating}
			</h4>
			<Separator />
			<p class={CSSclasses.p}>{info.description}</p>
		</div>
		<FavouriteFilm id={info.id}/>
	</Dialog.Content>
</Dialog.Root>
{/if}
<style lang="postcss">
	.carousel-image {
		@apply h-[450px] w-[300px] max-w-xs flex-none rounded-xl bg-cover bg-center bg-no-repeat opacity-30 transition-all duration-150 hover:rounded-3xl hover:opacity-100 hover:shadow-lg;
	}
</style>
