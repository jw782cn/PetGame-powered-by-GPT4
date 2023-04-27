<script>
    import { apikey } from "./store.ts";
    export let open = false;
    export let setOpen;
    export let setApiKey;
  
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
  </script>
  
  <svelte:window on:keydown={closeOnEscape} />
  
  {#if open}
    <div class="modal" on:click={() => setOpen(false)}>
      <div class="modal-content" on:click={(e) => e.stopPropagation()}>
        <h2 class="modal-title">Enter OpenAI API Key</h2>
        <input
          class="api-key-input"
          type="text"
          bind:value={$apikey}
          placeholder="Your API Key"
        />
        <button class="submit-button" on:click={() => setOpen(false)}>Save</button>
      </div>
    </div>
  {/if}
  
  <style>
    .modal {
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }
  
    .modal-content {
      background-color: #fff;
      padding: 2rem;
      border-radius: 5px;
      max-width: 400px;
      width: 100%;
      text-align: center;
    }
  
    .modal-title {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  
    .api-key-input {
      font-size: 1rem;
      padding: 0.5rem;
      width: 100%;
    }
  
    .submit-button {
      display: inline-block;
      background-color: rgb(255, 172, 113);
      color: #fff;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      margin-top: 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .submit-button:hover {
      background-color: rgb(255, 142, 83);
    }
  </style>
  