<script>
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { description } from './store.ts';
  
    let currentIndex = 0;
    let showHint = true;
    export let showInfo = true;
    $: text = $description[currentIndex];
    $: console.log(text);
  
    onMount(() => {
      setTimeout(() => {
        showHint = false;
      }, 3000);
    });
  
    function handleKeydown(event) {
      if (event.key === 'Enter') {
        if (currentIndex < $description.length - 1) {
          currentIndex += 1;
        }
        else {
            showInfo = false;
        }
      }
    }
  </script>
  
  <div
    class="game-description"
    on:keydown={handleKeydown}
    tabindex="0"
    transition:fade={{ duration: 100 }}
  >
  <div class="text-wrapper">
    <p class="text">{text}</p>
    {#if currentIndex === 0}
      <p class="hint">Press Enter</p>
    {/if}
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
  