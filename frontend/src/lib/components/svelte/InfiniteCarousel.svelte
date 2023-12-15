<script lang="ts">
	import { movies } from '$lib/data/movies';
	import MoviePoster from './MoviePoster.svelte';
</script>

<div class="flex flex-none overflow-x-hidden">
	<div class="carousel-container scroll">
		{#each movies as movie}
			<MoviePoster info={movie} />
		{/each}
	</div>
	<div class="carousel-container scroll">
		{#each movies as movie}
			<MoviePoster info={movie} />
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
		animation: scrollAnimation 0s linear infinite;
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
		@apply my-10 flex min-h-[50px] flex-none translate-x-96 items-center justify-center gap-4 overflow-x-hidden pb-24 pt-8 transition-all duration-500;
	}
</style>
