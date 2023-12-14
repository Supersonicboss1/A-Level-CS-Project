<script lang="ts">
	import InfiniteCarousel from '$lib/components/svelte/InfiniteCarousel.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ChevronRight } from 'lucide-svelte';
</script>

<div class="relative bg-radial-gradient bg-opacity-50 backdrop-filter backdrop-blur-lg h-screen">
	<div class="flex flex-col items-center">
		<h1 class="text-8xl">
			Cineverse
			<span class="text-8xl text-orange-500">Radar</span>
		</h1>
		<div
			class="flex flex-wrap justify-center items-center min-h-[50px] gap-4 my-10 -translate-x-20"
		>
			<InfiniteCarousel />
			<a href="/auth/user?page=register">
				<Button>
					Get Started
					<ChevronRight />
				</Button>
			</a>
		</div>
	</div>
</div>
