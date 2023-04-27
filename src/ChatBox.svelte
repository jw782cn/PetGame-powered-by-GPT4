<script>
    import { fade } from 'svelte/transition';
    export let messages = [];
    export let hidden = false;
  
    let newMessage = "";
  
    function sendMessage() {
      if (newMessage.trim() !== "") {
        messages = [...messages, { text: newMessage, sender: "user" }, { text: "yes?", sender: "animal" }];
        newMessage = "";
      }
    }
    function toggleVisibility() {
        hidden = !hidden;
    }

  </script>

{#if hidden}
<div class="chat-container" in:fade={{ delay: 100 }} out:fade={{ delay: 100 }}>
    <div class="messages-wrapper">
        {#each messages as message}
          <div class="message {message.sender}">
            <div class="message-text">{message.text}</div>
          </div>
        {/each}
      </div>
    <div class="input-container">
        <input type="text" bind:value={newMessage} placeholder="Type your message" on:keydown={(e) => e.key === 'Enter' && sendMessage()} />
        <button on:click={sendMessage}>Send</button>
    </div>
  </div>
{/if}
  
  <style>
    .chat-container {
      display: flex;
      flex-direction: column;
      height: 450px;
      width: 500px;
      max-width: 600px;
      border: 1px solid #ccc;
      background-color: #f2f2f2;
      margin: 0 auto;
      border-radius: 20px;
      padding: 16px;
      padding-bottom: 6px;
      position: fixed;
      overflow-y: scroll;
      bottom: 100px; /* Add this line */
      right: 100px; /* Add this line */
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Add this line */
      z-index: 100; /* Add this line */
    }

    /* Add the following style block */
  .messages-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    margin-bottom: 16px;
  }
  
    .message {
      display: flex;
      align-items: flex-end;
      margin-bottom: 8px;
    }
  
    .message.user {
      justify-content: flex-end;
    }
  
    .message-text {
        background-color: #007aff;
        color: #fff;
        padding: 8px 12px;
        border-radius: 16px;
        max-width: 75%;
        word-wrap: break-word;
        font-size: 14px; 
        line-height: 1.4; 
  }

    .message.user .message-text {
        background-color: #007aff;
        color: #fff;
    }

    .message.animal .message-text {
        background-color: #fff;
        color: #007aff;
    }
  
    .input-container {
      display: flex;
      margin-top: 16px;
    }
  
    input {
      flex-grow: 1;
      padding: 8px;
      border-radius: 20px;
      border: 1px solid #ccc;
    }
  
    button {
      margin-left: 8px;
      padding: 8px 12px;
      background-color: #007aff;
      color: #fff;
      border: none;
      border-radius: 20px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #005eb8;
    }
  </style>
  
 
  

  