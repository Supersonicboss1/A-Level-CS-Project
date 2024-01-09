<script lang="ts">
	
	import InfiniteCarousel from '$lib/components/svelte/InfiniteCarousel.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ChevronRight } from 'lucide-svelte';
</script>

<div
	class="justify-center bg-radial-gradient bg-opacity-50 backdrop-filter backdrop-blur-lg min-h-screen overflow-x-hidden"
>
	<div class="flex flex-col items-center">
		<h1 class="text-8xl">
			Cineverse
			<span class="text-orange-500">Radar</span>
		</h1>
		<div
			class="flex flex-wrap justify-center items-center min-h-[50px] gap-4 my-10 -translate-x-20"
		>
			<InfiniteCarousel />

			<div>
				<a href="/auth/user">
					<Button
						class="transform hover:-translate-y-1 hover:scale-105 hover:rotate-2 active:bg-orange-300 active:rotate-2 active:scale-110 transition-all"
					>
						Get Started
						<ChevronRight />
					</Button>
				</a>
			</div>
		</div>
	</div>
</div>
