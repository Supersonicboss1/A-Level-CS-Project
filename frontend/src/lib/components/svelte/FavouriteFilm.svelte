<script lang="ts">
	import { Heart } from "lucide-svelte";
	import Button from "../ui/button/button.svelte";
    import * as Tooltip from "$lib/components/ui/tooltip";
	import { toast } from "svelte-sonner";
    export const id: number = -1;
    export const signedIn = false;
    export let isFavourite = false;
    	const handleLike = () => {
            if (id == -1) {
                return
            }
		fetch('/kitAPI/addLiked', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		})
			.catch((err) => {
				console.log(err);
				toast.error('Something went wrong');
			});
	};
    function toggleFavourite() {
        if (!signedIn) {
            return;
        }
        console.log('toggling favourite');
        // call the backend here
        handleLike();
        isFavourite = !isFavourite;
    }
</script>

{#if signedIn}
<Tooltip.Root>
    <Tooltip.Trigger class='w-14'><Button variant='outline' class='hover:bg-red-600' on:click={toggleFavourite}>
        <Heart class="w-5 h-5" fill={isFavourite ? 'red' : 'none'} color={isFavourite ? 'red' : 'white'}/>
    </Button></Tooltip.Trigger>
    <Tooltip.Content>
      <p>Add to favourites</p>
    </Tooltip.Content>
  </Tooltip.Root>
{/if}