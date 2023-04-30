<script>
	import Mainroom from "./Mainroom.svelte";
	import ChatBox from "./ChatBox.svelte";
	import Information from "./Information.svelte";
	import { onMount } from 'svelte';
	import Menu from './Menu.svelte';
	import { current_task } from "./store.ts";
	import Complete from "./Complete.svelte";

	let hidden = false;
	let showMenu = false;
	let showInfo = true;
	let space = "room";
	let name = "Raby";
	$: console.log(showInfo, "showinfo");

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
	{#if showInfo}
	  <Information bind:showInfo={showInfo}/>
	{/if}
	{#if showMenu}
	  <Menu bind:showInfo={showInfo}/>
	{/if}
	{#if $current_task == "complete"}
	 <Complete />
	{/if}

	<main>
		<Mainroom bind:hidden={hidden} bind:space={space} bind:showMenu={showMenu}/>
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