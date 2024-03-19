<script lang="ts">
	import CSSclasses from '$lib/CSSclasses';

	import InfiniteCarousel from '$lib/components/svelte/InfiniteCarousel.svelte';
	import { Button } from '$lib/components/ui/button';
	import type { MovieRead } from '$lib/types';
	import { ChevronRight } from 'lucide-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	const movies: MovieRead[] = data.movies ? data.movies : [];
</script>

<div
	class="justify-center bg-radial-gradient bg-opacity-50 backdrop-filter backdrop-blur-lg min-h-screen overflow-x-hidden"
>
	<div class="flex flex-col items-center">
		<center
			><h1 class={`lg:text-7xl ${CSSclasses.h1} md:text-5xl`}>
				Cineverse
				<span class="text-orange-500">Radar</span>
			</h1></center
		>
		<div
			class="flex flex-wrap justify-center items-center min-h-[50px] gap-4 my-10 -translate-x-20"
		>
			<InfiniteCarousel {movies} />

			<div>

					<center
						><Button href="/auth/user" class="transform hover:-translate-y-1 active:bg-orange-300 transition-all">
							Get Started
							<ChevronRight />
						</Button></center
					>
			</div>
		</div>
	</div>
</div>
