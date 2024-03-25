<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.pcss';
</script>
<head>
	<title>Cineverse Radar</title>
	<meta name="description" content="Cineverse Radar is a movie recommendation engine that uses your preferences to suggest movies you might like." />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<div class="dark bg-background w-full min-h-screen text-foreground">
	<slot />
	<Toaster theme="dark" position="bottom-right" />
</div>
