<script lang="ts">
	import { Heart } from "lucide-svelte";
	import Button from "../ui/button/button.svelte";
    import * as Tooltip from "$lib/components/ui/tooltip";
    export const id: number = -1;
    export let isFavourite: boolean = false;
</script>



<Tooltip.Root>
    <Tooltip.Trigger class='w-14'><Button variant='outline' class='hover:bg-red-600' on:click={() => isFavourite = !isFavourite}>
        <Heart class="w-5 h-5" fill={isFavourite ? 'red' : 'none'} color={isFavourite ? 'red' : 'white'}/>
    </Button></Tooltip.Trigger>
    <Tooltip.Content>
      <p>Add to favourites</p>
    </Tooltip.Content>
  </Tooltip.Root>