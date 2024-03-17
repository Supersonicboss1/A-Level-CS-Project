<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Heart } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import Button from '../ui/button/button.svelte';
	export let movie_id: number = -1;
	export let signedIn = false;
	export let isFavourite = false;
	const toggleFavourite = () => {
		if (signedIn == false || movie_id == -1) {
			return;
		}
		// isFavorite is the current state of the movie, so !isFavourite will be the state we want to change to
		const route = !isFavourite ? '/kitAPI/addLiked' : '/kitAPI/removeLiked';
		fetch(route, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: movie_id })
		})
			.then((res) => {
				if (res.ok) {
					console.log('success');
					isFavourite = !isFavourite;
					if (isFavourite) {
						toast.success('Added to favourites');
					} else {
						toast.success('Removed from favourites');
					}
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error('Something went wrong');
			});
	};
</script>
<div class="flex justify-between">
{#if signedIn}
	<Tooltip.Root>
		<Tooltip.Trigger class="w-14"
			><Button variant="outline" class="hover:bg-red-600" on:click={toggleFavourite}>
				<Heart
					class="w-5 h-5"
					fill={isFavourite ? 'red' : 'none'}
					color={isFavourite ? 'red' : 'white'}
				/>
			</Button></Tooltip.Trigger
		>
		<Tooltip.Content>
			{isFavourite ? 'Remove from favourites' : 'Add to favourites'}
		</Tooltip.Content>
	</Tooltip.Root>
{/if}
<Button class='w-28'>
    Buy Tickets
</Button>
</div>