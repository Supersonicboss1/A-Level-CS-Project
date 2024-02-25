<script lang="ts">
	export const runtimeOptions = [
				{
			label: 'Any',
			value: "0-Infinity"
		},
		{
			label: 'Under 90 minutes',
			value: '0-90'
		},
		{
			label: '90 - 120 minutes',
			value: '91-120'
		},
		{
			label: 'Over 120 minutes',
			value: '121-Infinity'
		}
	];
	import CSSclasses from '$lib/CSSclasses';
	import MoviePoster from '$lib/components/svelte/MoviePoster.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { ageRatings, genres } from '$lib/data/movies';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { ActionData, PageData } from './$types';
	import { recommendFormSchema, type RecommendFormSchema } from './schema';
	export let formSchema: SuperValidated<RecommendFormSchema>;
	export let data: PageData;
	export let form: ActionData;
</script>

<div class="ml-4">
	<h1 class={`${CSSclasses.h1} p-4`}>
		Hello, {data.firstName}!
		<div
			class="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-white w-max p-2 pl-0"
		>
			Ready to watch?
		</div>
	</h1>
</div>
<Card.Root class='w-1/2 self-center ml-6'>
	<Card.Header>
		<Card.Title>Generate Recommendations</Card.Title>
	</Card.Header>
	<Form.Root schema={recommendFormSchema} form={formSchema} let:config method="POST">
		<Card.Content class="space-y-2">
			<Form.Field name="genre" {config}>
				<Form.Item class="space-y-1 w-1/2">
					<Form.Label for="genre">Genre</Form.Label>
					<Form.Select >
						<Form.SelectTrigger placeholder='What genre do you want to watch?'/>
						<Form.SelectContent>
							{#each genres as genre}
								<Form.SelectItem value={genre} label={genre} >
									{genre}
								</Form.SelectItem>
							{/each}
						</Form.SelectContent>
					</Form.Select>
					<Form.Validation />
				</Form.Item>
			</Form.Field>

			<Form.Field name="runtime" {config}>
				<Form.Item class="space-y-1 w-1/2">
					<Form.Label for="runtime">Runtime</Form.Label>
						<Form.Select >
						<Form.SelectTrigger placeholder='How long should the film be?'/>
						<Form.SelectContent>
							{#each runtimeOptions as runtime}
								<Form.SelectItem value={runtime.value} label={runtime.label} >
									{runtime.label}
								</Form.SelectItem>
							{/each}
						</Form.SelectContent>
					</Form.Select>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field name="ageRating" {config}>
				<Form.Item class="space-y-1 w-1/2">
					<Form.Label for="ageRating">Age Rating</Form.Label>
					<Form.Select >
						<Form.SelectTrigger placeholder='Any age restrictions?'/>
						<Form.SelectContent>
							{#each ageRatings as age}
								<Form.SelectItem value={age} label={age} >
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
{#if form?.data == null}
{#each Array(3) as _}
	<div class="m-3">
		<MoviePoster />
	</div>
{/each}
{:else}
	{#each form.data as movie}
	<div class="m-3">
		<MoviePoster info={movie} />
	</div>
	{/each}

{/if}
</div>