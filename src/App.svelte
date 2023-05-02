<script>
	import Mainroom from "./Mainroom.svelte";
	import ChatBox from "./ChatBox.svelte";
	import Information from "./Information.svelte";
	import { onMount } from 'svelte';
	import Menu from './Menu.svelte';
	import { game_plot_outline , selection, model} from "./store.ts";
	import Complete from "./Complete.svelte";
	import GlobalClickSound from "./GlobalClickSound.svelte";
	import Tasks from "./Tasks.svelte";

	let hidden = false;
	let showMenu = false;
	let showInfo = true;
	let showTask = false;
	let showComplete = false;
	let space = "room";
	let name = "Raby";

	$: console.log(showInfo, "showinfo");
	$: console.log(showComplete, "showcomplete");
    $: console.log("now using model", model);
	
	onMount(() => {
		// $selection = parseInt(getRandomNumber($game_plot_outline.length));
		console.log($selection);
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
	  <Menu bind:showInfo={showInfo} bind:showMenu={showMenu} bind:showTask={showTask} />
	{/if}
	{#if showTask}
	  <Tasks bind:showTask={showTask} />
	{/if}
	{#if showComplete && $game_plot_outline[$selection]["progress"] == 100}
	 <Complete bind:showComplete={showComplete}/>
	{/if}
	<GlobalClickSound />
	<main>
		<Mainroom bind:hidden={hidden} bind:space={space} bind:showMenu={showMenu} bind:showTask={showTask}/>
		<ChatBox bind:hidden={hidden} bind:showComplete={showComplete}/>
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
		filter: blur(2px);
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>