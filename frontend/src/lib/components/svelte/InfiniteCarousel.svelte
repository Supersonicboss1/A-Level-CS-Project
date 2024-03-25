<script lang="ts">
	import type { MovieRead } from '$lib/types';
	import MoviePoster from './MoviePoster.svelte';
	export let movies: MovieRead[]
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex flex-none overflow-x-hidden">
	<div class="carousel-container scroll">
		{#each movies as movie}
			<MoviePoster info={movie} shouldBeSignedIn={false} />
		{/each}
	</div>
	<div class="carousel-container scroll">
		{#each movies as movie}
			<MoviePoster info={movie} shouldBeSignedIn={false} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.scroll {
		white-space: nowrap;
		scroll-behavior: smooth;
		scroll-snap-type: x mandatory;
		scroll-padding: 0 1rem;
		-webkit-overflow-scrolling: touch;
		animation: scrollAnimation 200s linear infinite;
		animation-fill-mode: forwards;
	}
	@keyframes scrollAnimation {
		0% {
			transform: translateX(30%);
		}

		100% {
			transform: translateX(-70%);
		}
	}
	.carousel-container {
		@apply flex min-h-[50px] flex-none translate-x-96 items-center justify-center gap-4 overflow-x-hidden pb-12 pt-4 transition-all duration-500;
	}
	.carousel-container {
		translate: y(10px);
	}
</style>
