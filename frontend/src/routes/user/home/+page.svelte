<script lang="ts">
	import CSSclasses from '$lib/CSSclasses';
	import MoviePoster from '$lib/components/svelte/MoviePoster.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { ageRatings } from '$lib/types';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { ActionData, PageData } from './$types';
	import { recommendFormSchema, type RecommendFormSchema } from './schema';
	export let formSchema: SuperValidated<RecommendFormSchema>;
	export let data: PageData;
	export let form: ActionData;
	function isInFavourites(movie_id: number) {
		return data.likedMovies?.some((movie) => movie.id === movie_id);
	}
</script>
<div class="ml-4">
	<h1 class={`${CSSclasses.h1} p-4`}>
		Hello, {data.userData?.firstName}!
		<div
			class="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-white w-max p-2 pl-0"
		>
			Ready to watch?
		</div>
	</h1>
</div>
<Card.Root class="w-1/2 self-center ml-6">
	<Card.Header>
		<Card.Title>Generate Recommendations</Card.Title>
		<a class={CSSclasses.muted + " hover:underline text-blue-400"} href="/user/likedfilms">View your liked films?</a>
	</Card.Header>
	<Form.Root schema={recommendFormSchema} form={formSchema} let:config method="POST">
		<Card.Content class="space-y-2">
			<Form.Field name="genre" {config}>
				<Form.Item class="space-y-1 w-1/2">
					<Form.Label for="genre">Genre</Form.Label>
					<Form.Input placeholder="Thriller" />
					<Form.Validation />
				</Form.Item>
			</Form.Field>

			<Form.Field name="runtime" {config}>
				<Form.Item class="space-y-1 w-1/2">
					<Form.Label for="runtime">Minimum runtime in minutes</Form.Label>
					<Form.Input placeholder="60min" type="number" />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field name="ageRating" {config}>
				<Form.Item class="space-y-1 w-1/2">
					<Form.Label for="ageRating">Select an age rating</Form.Label>
					<Form.Select>
						<Form.SelectTrigger placeholder="Any age restrictions?" />
						<Form.SelectContent>
							{#each ageRatings as age}
								<Form.SelectItem value={age} label={age}>
									{age}
								</Form.SelectItem>
							{/each}
						</Form.SelectContent>
					</Form.Select>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
		</Card.Content>
		<Card.Footer>
			<Button type="submit">Get Recommendations</Button>
		</Card.Footer>
	</Form.Root>
</Card.Root>
<div class="grid-flow-col grid w-min m-3">

	{#if form?.data != null}
		{#each form.data as movie}
			<div class="m-3">
				<MoviePoster info={movie} isFavourite={isInFavourites(movie.id)} />
			</div>
		{/each}
	{/if}
</div>
