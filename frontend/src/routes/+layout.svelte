<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.pcss';
</script>

<div class="dark bg-background w-full min-h-screen text-foreground">
	<slot />
	<Toaster theme="dark" position="bottom-right" />
</div>
