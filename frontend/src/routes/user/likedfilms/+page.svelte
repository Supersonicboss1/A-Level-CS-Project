<script lang="ts">
	import CSSclasses from "$lib/CSSclasses";
	import MoviePoster from "$lib/components/svelte/MoviePoster.svelte";
	import type { PageData } from "./$types";

    export let data: PageData;
        	function isInFavourites(movie_id: number) {
		return data.likedMovies?.some((movie) => movie.id === movie_id);
	}
</script>
<div class="m-4">
<h1 class={CSSclasses.h1 + " mb-1"}>View your liked films!</h1>
<p class={CSSclasses.muted}>Here are the movies you have liked so far. You can click on the heart icon to remove them from your favourites. <b>These will influence your recommendations!</b></p>
</div>
<div class="grid grid-cols-5 gap-4">
{#if data.likedMovies && data.likedMovies.length > 0}
    {#each data.likedMovies as movie}
        <MoviePoster info={movie} isFavourite={isInFavourites(movie.id)} />
    {/each}
{:else}
    <p>No liked movies yet</p>
{/if}
</div>