<script>
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { description } from './store.ts';
  
    let currentIndex = 0;
    export let showInfo = true;
    $: text = $description[currentIndex];
  
    onMount(() => {
    });

    function nextPage(){
      if (currentIndex < $description.length - 1) {
          currentIndex += 1;
        }
        else {
            showInfo = false;
        }
    }
  
    function handleKeydown(event) {
      if (event.key === 'Enter') {
        nextPage();
      }
    }
  </script>
  
  <div
    class="game-description"
    on:keydown={handleKeydown}
    tabindex="0"
    transition:fade={{ duration: 100 }}
    on:click={nextPage}
  >
  <div class="text-wrapper">
    <p class="text">{text}</p>
  </div>
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
      outline:none;
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
  