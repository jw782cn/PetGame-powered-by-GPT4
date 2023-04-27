<script>
  import Draggable from "./Draggable.svelte";

  export let hidden = false;
  let isHovered = false;

  function handleClick() {
    // Handle click event here
    hidden=!hidden; 
  }

  function handleMouseEnter() {
    isHovered = true;
  }

  function handleMouseLeave() {
    isHovered = false;
  }
</script>

<div class="game-scene-container">
  <div class="game-scene {isHovered || hidden ? 'blurred' : ''}">
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

<style>

.game-scene-container {
    width: 100%;
    height: 100vh;
    position: relative; 
    z-index: 0;
  }

  .game-scene {
    background-image: url("/images/room1_high.jpg");
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

</style>
