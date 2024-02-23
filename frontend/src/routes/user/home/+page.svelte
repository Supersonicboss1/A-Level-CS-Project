<script lang="ts">
	export const runtimeOptions = [
    {
        label: "Under 90 minutes",
        value: [0, 90],
    },
    {
        label: "90 - 120 minutes",
        value: [91, 120],
    },
    {
        label: "Over 120 minutes",
        value: [121, Infinity],
    }
]
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import CSSclasses from '$lib/CSSclasses';
	import { ageRatings, genres } from '$lib/data/movies';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { recommendFormSchema, type RecommendFormSchema } from './schema';
	export let form: SuperValidated<RecommendFormSchema>;
	export let data: PageData;
</script>

<div class="ml-4">
	<h1 class={`${CSSclasses.h1} p-4`}>
		Hello, {data.firstName}!
		<div class="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-white w-min p-2">
			Ready to watch? 🍿
		</div>
	</h1>
</div>
<Card.Root>
	<Card.Header>
		<Card.Title>Sign In</Card.Title>
	</Card.Header>
	<Form.Root schema={recommendFormSchema} {form} let:config method="POST">
		<Card.Content class="space-y-2">
			<Form.Field name="genre" {config}>
				<Form.Item class="space-y-1">
					<Form.Label for="genre">Genre</Form.Label>
					<Form.Select>
						{#each genres as genre}
							<Form.SelectItem value={genre} />
						{/each}
					</Form.Select>
					<Form.Validation />
				</Form.Item>
			</Form.Field>

			<Form.Field name="runtime" {config}>
				<Form.Item class="space-y-1">
					<Form.Label for="genre">Runtime</Form.Label>
					<Form.Select>
						{#each runtimeOptions as runtime}
							<Form.SelectItem value={runtime.value} label={runtime.label} />
						{/each}
					</Form.Select>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field name="ageRating" {config}>
				<Form.Item class="space-y-1">
					<Form.Label for="ageRating">Age Rating</Form.Label>
					<Form.Select>
						{#each ageRatings as rating}
							<Form.SelectItem value={rating} />
						{/each}
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
