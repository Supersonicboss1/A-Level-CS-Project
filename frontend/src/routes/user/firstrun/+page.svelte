<script lang="ts">
	import CSSclasses from "$lib/CSSclasses";
	import MoviePoster from "$lib/components/svelte/MoviePoster.svelte";
	import { Button } from "$lib/components/ui/button";
	import type { PageData } from "./$types";

    export let data: PageData
    function isInFavourites(movie_id: number) {
		return data.likedMovies?.some((movie) => movie.id === movie_id);
	}
</script>

<h1 class="text-4xl font-bold">Welcome to Cineverse Radar!</h1>
<p class={CSSclasses.muted}>We're glad you're here. Let's get you started with some recommendations.</p>
<p class={CSSclasses.muted}>Click on any films you like, then click the <b>heart button</b> to tune your recommendations!</p>
<p class={CSSclasses.muted}>When you're done tuning your recommendations, click <b>finish</b> at the bottom of the page!</p>
{#if data.movies && data.movies.length > 0}
    <div class="grid grid-cols-5 gap-4">
        {#each data.movies as movie}
            <MoviePoster info={movie} isFavourite={isInFavourites(movie.id)} /> <!-- isFavourite SHOULD be false, but technically nothing stops an existing user from coming here. -->
        {/each}
    </div>
{/if}
<div class="flex justify-center m-10">

<Button href="/user/home" class={'w-56 hover:bg-orange-500 transition-all'}>
    Finish
</Button>
</div>