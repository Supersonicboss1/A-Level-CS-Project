<script>
	import Button from "$lib/components/ui/button/button.svelte";
	import { Radar } from "lucide-svelte";
	import { toast } from "svelte-sonner";
    function logOut() {
        fetch("/kitAPI/logOut", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        window.location.href = "/";
        toast.success("Logged out successfully!");
    }
</script>
<!-- Header bar with log out button-->

    <div class="flex justify-between items-center bg-muted text-slate-200 p-3 rounded-xl">
        <a href="/">
            <Radar/>
        </a>
        <Button variant='outline' on:click={logOut} >Log out</Button>
    </div>

<slot/>