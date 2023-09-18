<script>
	import { page } from '$app/stores';
	import { Button } from "$lib/components/ui/button";
	import * as Popover from "$lib/components/ui/popover";
	import { ExternalLink, Moon, Sun, UserCircle2 } from 'lucide-svelte';
	import Switch from './components/ui/switch/switch.svelte';
	import { isDarkMode } from './stores';
	import * as Avatar from "$lib/components/ui/avatar";
	import AvatarFallback from './components/ui/avatar/avatar-fallback.svelte';
</script>

<header>
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
		<Popover.Root>
			<Popover.Trigger class="m-5 bg-secondary rounded-full"><Avatar.Root>
				<Avatar.Fallback><UserCircle2/></Avatar.Fallback> <!--Add if statement, if logged in show initials, otherwise  user icon-->
			  </Avatar.Root></Popover.Trigger> 
			<Popover.Content class="grid">
				<Button href="/auth/account" class="m-2">
					Log In <ExternalLink class=" ml-2 w-5 text-secondary invert" />

				</Button>
				<br/>
				<div class="flex w-32">
				<Sun class="wr-5 flex-1 " />
				<!-- svelte-ignore a11y-missing-attribute -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<a class="flex-1" on:click={
					() => {
						$isDarkMode = !$isDarkMode;
						localStorage.theme = $isDarkMode ? 'dark' : 'light';
						document.documentElement.classList.toggle('dark');
					}
				}>

				<Switch
				checked={$isDarkMode}
				/>
</a>
<Moon class="w-5 flex-1" />
</div>
			</Popover.Content>
		  </Popover.Root>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(71, 71, 71, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}
	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

</style>
