<script>
  import { fade } from "svelte/transition";
  import { selection, game_plot_outline } from "./store.ts";
  import Footer from "./Footer.svelte";

  export let showTask = false;

  function hideTask() {
    showTask = false;
  }

  function stopPropagation(event) {
    event.stopPropagation();
  }

  function selectTask(index) {
    $selection = index;
    showTask = false;
  }
</script>

<div class="menu" transition:fade={{ duration: 100 }} on:click={hideTask}>
  <h1 class="title" on:click={stopPropagation}>Tasks</h1>
  <ul class="menu-items" on:click={stopPropagation}>
    {#each $game_plot_outline as task, index}
      <li class="menu-item">
        <a
          on:click={() => {
            selectTask(index);
          }}
        >
          {task["title"]}
          {task["progress"]}%
        </a>
      </li>
    {/each}
  </ul>
  <Footer />
</div>

<style>
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
    z-index: 810;
    font-family: Comic Sans MS;
    overflow-y: scroll;
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
