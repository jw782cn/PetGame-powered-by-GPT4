<script>
	import Mainroom from "./Mainroom.svelte";
	import ChatBox from "./ChatBox.svelte";
	import { onMount } from 'svelte';
	import Menu from './Menu.svelte';

	let hidden = false;
	let showMenu = false;
	let space = "room";
	let name = "Raby";

	onMount(() => {
		window.addEventListener('keydown', handleKeyDown);
	});

	function handleKeyDown(event) {
		if (event.key === 'Escape') {
			console.log('Escape key pressed')
			showMenu = !showMenu;
		}
	}
</script>


<div>
	{#if showMenu}
	  <Menu />
	{/if}

	<main>
		<Mainroom bind:hidden={hidden} bind:space={space} />
		<ChatBox bind:hidden={hidden} />
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}
	main {
		text-align: center;
		/* padding: 1em; */
		/* max-width: 240px; */
		/* margin: 0 auto; */
	}

	.blurred {
		filter: blur(5px);
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>