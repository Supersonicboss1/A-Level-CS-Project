<script lang="ts">
	import { movies } from '$lib/data/movies';
	import MoviePoster from './MoviePoster.svelte';
	let isHovering = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="flex flex-none overflow-x-hidden"
	on:mouseenter={() => (isHovering = true)}
	on:mouseleave={() => (isHovering = false)}
>
	<div class="carousel-container scroll" class:pause={isHovering}>
		{#each movies as movie}
			<MoviePoster info={movie} />
		{/each}
	</div>
	<div class="carousel-container scroll" class:pause={isHovering}>
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
		animation: scrollAnimation 200s linear infinite;
		animation-fill-mode: forwards;
	}
	.pause {
		animation-play-state: paused;
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
		@apply my-6 flex min-h-[50px] flex-none translate-x-96 items-center justify-center gap-4 overflow-x-hidden py-16 pb-24 pt-8 transition-all duration-500;
	}
</style>
