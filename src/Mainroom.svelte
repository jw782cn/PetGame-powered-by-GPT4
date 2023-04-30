<script>
  import { onMount } from 'svelte';

  let audio;
  let isPlaying = false;
  let spinning = false;
  export let showMenu = false;

  onMount(async () => {
    try {
      const response = await fetch("/music/if-the-night-never-ends-no-oohs-ahhs-sad-moses-musicbed.mp3");
      const musicBlob = await response.blob();
      const musicURL = URL.createObjectURL(musicBlob);
      audio = new Audio(musicURL);
      audio.loop = true;
      audio.volume = 0.5;
      audio.play();
      spinning = true;
      isPlaying = true;
    } catch (error) {
      console.error("Error fetching the music file:", error);
    }
  });

  function toggleMusic() {
    if (isPlaying) {
      audio.pause();
      spinning = false;
    } else {
      audio.play();
      spinning = true;
    }
    isPlaying = !isPlaying;
  }

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

  //TODO：change backgrounds
  // {#if background_images[space]["left"]}
  //     <div class="triangle-button left" on:click={handleLeft}></div>
  //   {/if}
  //   {#if background_images[space]["right"]}
  //     <div class="triangle-button right" on:click={handleRight}></div>
  //   {/if}

</script>

{#if isLoading}
    <div class="loading-spinner"></div>
{:else}
<div class="game-scene-container">
  <div class="game-scene {isHovered || hidden ? 'blurred' : ''}" style="background-image: url({background_path});">
    <div class="header-wrapper" on:click={()=>{showMenu = true;}}>
      <h1 class="header">Raby🐰's house</h1>
    </div>
    
    <div class="music-button {spinning ? 'spinning' : ''}" on:click={toggleMusic}>
      <button>𝄞</button>
    </div>
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

.header {
  position: absolute;
  font-size: 2rem;
  font-weight: bold;
  font-family: Comic Sans MS;
  color: white;
  margin: 0;
}
.header-wrapper {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 350px;
  height: 60px;
  display: flex;
  background-color: #FFC485;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 8px #FFA848; /* Add box-shadow here */
}

.header-wrapper:hover {
  transform: scale(1.05);
}

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
    outline: #FFC485;
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


  .music-button {
    position: fixed;
    top: 10px;
    right: 10px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    margin: 0%;
    z-index: 1;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: center center;
    box-shadow: 0 4px 8px #FFA848; /* Add box-shadow here */
  }

  .music-button:hover {
    transform: scale(1.2);
  }

  .music-button button {
    background: #FFC485;
    border: none;
    width: 50px;
    height: 50px;
    margin: 0%;
    font-size: 25px;
    outline: none;
    border-radius: 100%;
    cursor: pointer;
    color: #ff991c;
  }

  .spinning {
    animation: spin 3s linear infinite;
  }

</style>
