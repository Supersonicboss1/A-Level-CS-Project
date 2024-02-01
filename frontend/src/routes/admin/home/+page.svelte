<script lang="ts">
	import type { User } from "$lib/types";
	import type { PageData } from "./$types";
    const timeOfDay = new Date().getHours();
    const greeting = timeOfDay < 12 ? "Good morning" : timeOfDay < 18 ? "Good afternoon" : "Good evening";
    export let data: PageData;
    const user = data.user ? data.user : {} as User;
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
{greeting}, <div class="text-slate-300">{user.firstName}</div>
</h1>