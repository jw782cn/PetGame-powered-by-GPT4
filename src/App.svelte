<script>
	export let name;
	import Mainroom from "./Mainroom.svelte";
	import ChatBox from "./ChatBox.svelte";
	let hidden = false;
</script>

<main>
	<Mainroom bind:hidden={hidden}/>
	<ChatBox bind:hidden={hidden}/>
</main>

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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>