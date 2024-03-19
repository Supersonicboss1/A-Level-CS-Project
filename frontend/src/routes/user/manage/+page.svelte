<script lang="ts">
	import CSSclasses from "$lib/CSSclasses";
	import DeleteAccount from "$lib/components/svelte/DeleteAccount.svelte";
	import EditAccount from "$lib/components/svelte/EditAccount.svelte";
	import * as Card from "$lib/components/ui/card";
	import type { PageData } from "./$types";
    export let data: PageData
    const userDataWithPassword = {
        id: data.userData.id,
        email: data.userData.email,
        dob: data.userData.dob,
        firstName: data.userData.firstName,
        lastName: data.userData.lastName,
        password: "",
        token: data.userData.token
    }
</script>
{#if data.userData}
<Card.Root class="w-1/2 self-center m-6">
	<Card.Header>
		<Card.Title>{data.userData.firstName} {data.userData.lastName}</Card.Title>
		<a class={CSSclasses.muted + " hover:underline hover:text-blue-400"} href="/user/likedfilms">View your liked films?</a>
	</Card.Header>
		<Card.Content class="space-y-2 text-sm text-slate-300">
            User ID: {data.userData.id}
            <br/>
            Email: {data.userData.email}
            <br/>
            Date of Birth: {data.userData.dob}
		</Card.Content>
		<Card.Footer class='space-x-2'>
            <EditAccount userInfo={userDataWithPassword}/>
            <DeleteAccount userID={data.userData.id}/>
		</Card.Footer>

</Card.Root>
{/if}