<script>
  import { fade } from "svelte/transition";
  import ApiKeyModal from './ApiKeyModal.svelte';
  import { apikey, selection, game_plot_outline } from "./store.ts";

  let openApiKeyModal = false;
  export let showInfo = false;
  export let showMenu = false;
  function getRandomNumber(maxValue) {
		// console.log("getRandomNumber", maxValue);
		return Math.floor(Math.random() * maxValue);
	}
  $: console.log($selection, "selection");

  function hideMenu() {
    showMenu = false;
  }

  function stopPropagation(event) {
    event.stopPropagation();
  }
</script>


<ApiKeyModal
  bind:open={openApiKeyModal}
  setOpen={(value) => (openApiKeyModal = value)}
  setApiKey={(value) => ($apikey = value)}
/>

<div class="menu" transition:fade={{ duration: 100 }} on:click={hideMenu}>
  <h1 class="title" on:click={stopPropagation}>Game Menu</h1>
  <ul class="menu-items" on:click={stopPropagation}>
    <li class="menu-item">
      <a on:click={()=>{$selection = parseInt(getRandomNumber($game_plot_outline.length));}}>
        Task {$selection + 1}: {$game_plot_outline[$selection]["title"]}
      </a>
    </li>
    <li class="menu-item"><a href="/">Restart</a></li>
    <li class="menu-item"><a on:click={() => (showInfo = true)}>Show Info</a></li>
    <li class="menu-item"><a on:click={() => (openApiKeyModal = true)}>Settings</a></li>
    <li class="menu-item">
      <a href="https://github.com/jw782cn/PetGame">About</a>
    </li>
    
  </ul>
  <div class="footer" on:click={stopPropagation}>
    <a class="hint" href="https://www.buymeacoffee.com/chty627"> Made with ❤️ by Chenran, if you like it, buy me a coffer☕️</a>
  </div>
</div>

<style>
  .footer {
      position: absolute;
      bottom: 10px;
      width: 100%;
      padding: 0.5rem;
      text-align: center;
    }
    .hint {
      font-size: 14px;
      margin-bottom: 0.2rem;
      color:rgb(255, 172, 113);
    }
  .menu {
    background-color: rgb(255, 227, 206);
    color: rgb(255, 172, 113);
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 800;
    font-family: Comic Sans MS;
  }

  .title {
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  .menu-items {
    list-style: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  .menu-item {
    margin-bottom: 1rem;
  }

  .menu-item a {
    display: block;
    text-decoration: none;
    font-size: 2rem;
    color: rgb(255, 172, 113);
    padding: 1rem 2rem;
    border: 2px solid rgb(255, 172, 113);
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .menu-item a:hover {
    background-color: rgb(255, 172, 113);
    color: #fff;
  }
</style>
