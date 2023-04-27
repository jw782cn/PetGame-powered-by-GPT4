<script>
  import { onMount } from 'svelte';

  export let hidden = false;
  export let space = "room";
  export let information = "";

  const background_images = {
    "room": {
      "path": "/images/room1_high.jpg",
      "left": "outside",
    },
    "outside": {
      "path": "/images/outside.png",
      "right": "room",
    }
  }
  $: if(space) {
    information = "You are in the " + space + ".";
    console.log(information);
  }

  $: background_path = background_images[space]["path"];
  $: console.log(background_path);
  let isLoading = false;

  let isHovered = false;

  function handleClick() {
    // Handle click event here
    hidden=!hidden; 
  }

  function handleLoad() {
    isLoading = false;
    console.log('loaded');
  }

  function handleMouseEnter() {
    isHovered = true;
  }

  function handleMouseLeave() {
    isHovered = false;
  }

  function handleLeft() {
    space = background_images[space]["left"];
  }

  function handleRight() {
    space = background_images[space]["right"];
  }

</script>

{#if isLoading}
    <div class="loading-spinner"></div>
{:else}
<div class="game-scene-container">
  
  <div class="game-scene {isHovered || hidden ? 'blurred' : ''}" style="background-image: url({background_path});">
    {#if background_images[space]["left"]}
      <div class="triangle-button left" on:click={handleLeft}></div>
    {/if}
    {#if background_images[space]["right"]}
      <div class="triangle-button right" on:click={handleRight}></div>
    {/if}
  </div>
  <div class="animal-container">
    <img
      src="images/rabit.png"
      alt="Game Animal bird"
      class="animal {isHovered ? 'hovered' : ''} {hidden ? 'hidden' : ''}"
      on:click={handleClick}
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
    />
  </div>
</div>
{/if}

<style>

.game-scene-container {
    width: 100%;
    height: 100vh;
    position: relative; 
    z-index: 0;
  }

  .game-scene {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
    position: absolute;
    transition: filter 0.5s ease-in-out;
  }

  .blurred {
    filter: blur(5px);
  }

  img {
    position: absolute;
    transition: all 0.5s ease-in-out;
  }

  .animal {
    height: 300px;
    width: 300px;
    left: 300px;
    top: 300px;
    position: absolute;
    cursor: grab;
    /* pointer-events: none; */
    user-select: none;
    z-index: 1;
  }

  .animal-container {
    position: relative;
  }

  .hovered {
    transform: scale(1.1);
  }

  .hidden {
    transform: scale(1.2);
  }

  .left {
    top: 90%;
    left:2%;
    clip-path: polygon(0 50%, 100% 0, 100% 100%);
  }

  .right {
    top: 90%;
    left: 90%;
    clip-path: polygon(0 0%, 100% 50%, 0 100%);
  }


  .triangle-button {
    position: relative;
    transform: translateY(-20%), translateX(-20%);
    width: 50px;
    height: 50px;
    cursor: pointer;
    background-image: linear-gradient(to bottom right, #FFC485, #FFA848);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;
  }

  .triangle-button:hover {
    background-image: linear-gradient(to bottom right, #FFA848, #FFC485);
    transform: scale(1.2);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }

  .triangle-button:hover::before {
    background-image: linear-gradient(to bottom right, #FFA848, #FFC485);
  }

  .triangle-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -10px;
    width: 10px;
    height: 100%;
    background-image: linear-gradient(to bottom right, #FFC485, #FFA848);
    transition: all 0.2s ease-in-out;
  }


  .loading-spinner {
    position: absolute;
    top: 45%;
    left: 50%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid #ccc;
    border-top-color: #FFA848;
    animation: spin 1s infinite;
    transform-origin: 50% 50%; 
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

</style>
