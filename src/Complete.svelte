<script>
  import Footer from "./Footer.svelte";
  import { fade } from "svelte/transition";
  import {
    selection,
    game_plot_outline,
    complete,
  } from "./store.ts";
  let text = "You complete the Task!";
  export let showComplete = false;
  $: nexthint = "Click to next task! " + $game_plot_outline[$selection]["title"] + "!";
  let hint = "Congradualations! You've completed all the tasks!";

  function hideComplete() {
    if ($selection < $game_plot_outline.length - 1) {
      $selection += 1;
    }
    console.log("clicking complete");
    showComplete = false;
  }

  function isComplete() {
    $complete = $game_plot_outline.every((element) => element["progress"] >= 100);
  }

  $: $game_plot_outline, isComplete();
  $: console.log("complet", $complete);
</script>

<div
  class="game-description"
  transition:fade={{ duration: 100 }}
  on:click={hideComplete}
>
  <div class="text-wrapper">
    <p class="text">{text}</p>
    {#if $complete}
      <p class="hint">{hint}</p>
    {:else}
      <p class="hint">{nexthint}</p>
    {/if}
  </div>
  <Footer />
</div>

<style>
  .game-description {
    background-color: rgb(255, 227, 206);
    color: rgb(255, 172, 113);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 900;
    overflow: hidden;
    font-family: Comic Sans MS;
    outline: none;
  }
  .text-wrapper {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .text {
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
  }

  .hint {
    font-size: 1.2rem;
    color: #fff;
    margin-top: 1rem;
    opacity: 0.8;
  }
</style>
