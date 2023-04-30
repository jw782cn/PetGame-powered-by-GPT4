<script>
  import { fade } from "svelte/transition";
  import { apikey, task, game_plot_outline, patient_information, username, example, current_task, progress_of_current_task} from "./store.ts";
  import { afterUpdate } from "svelte";
  import ApiKeyModal from './ApiKeyModal.svelte';

  let openApiKeyModal = false;
  let choices = [];
  let firstTimeHint = "Your task to help Raby...Say hi to Raby!";

  export let hidden = false;
  export let messages = [];
  
  // dev mode only
  $apikey = "";
  // $: console.log($apikey);

  function assembleMessage() {
    const system_prompt = task + $game_plot_outline + $patient_information + example;
    let chat_history = "chat history: \n";
    messages.forEach((message) => {
      if (message.role === "user") {
        chat_history += $username + ": " + message.content + "\n";
      } else if (message.role === "assistant") {
        chat_history += "Raby: " + message.content + "\n";
      }
    });
    chat_history += "Raby: ";
    const user_input = "current task: " + $current_task + "\n" + "progess: " 
    + $progress_of_current_task + "\n" + chat_history
    + "\nREMEMBER: each output line should start with 🐰.";
    return [{ content: system_prompt, role: "system" }, { content: user_input, role: "user" }];
  }

  let newMessage = "";
  let typing = false;
  

  async function sendMessage() {
    choices = [];
    typing = true;
    if (newMessage.trim() !== "") {
      messages = [...messages, { content: newMessage, role: "user" }];
      newMessage = "Raby is typing...";
      const messages_for_openai = assembleMessage();
      console.log(messages_for_openai);
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + $apikey,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: messages_for_openai,
            temperature: 0.6,
            max_tokens: 200,
            stream: true,
          }),
        }
      );
      const reader = response.body.getReader();
      let content = "";
      let all_content = "";
      let current = -1;
      let choice = "";
      $current_task = "";
      $progress_of_current_task = "";
      messages = [...messages, { content: "", role: "assistant" }];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        content = new TextDecoder().decode(value);
        // console.log(text);
        const lines = content.split("\n");
        lines.forEach((line) => {
          if (line.startsWith("data:")) {
            if (line.substring(6) == "[DONE]") {
              console.log(lines)
              return;
            }
            const jsonObject = JSON.parse(line.substring(6));
            const firstChoice = jsonObject.choices[0];
            if (firstChoice.delta && firstChoice.delta.content) {
              // Return the content value
              const new_content = firstChoice.delta.content;
              all_content += new_content;
              // console.log(new_content);
              if (new_content == "🐰"){
                current += 1;
                if (current == 3){
                  newMessage = "Possible Choices...";
                }
                if (current >= 3){
                  choices = [...choices, choice];
                }
              }
              else{
                // console.log("what happend?", new_content, current)
                if (current == 0){
                  const last_message = messages[messages.length - 1]["content"];
                  // add to last message in messages
                  messages = [
                    ...messages.slice(0, -1),
                    { content: last_message + new_content, role: "assistant" },
                  ];
                }else if (current == 1){
                  $current_task += new_content;
                }else if (current == 2){
                  $progress_of_current_task += new_content;
                }else{
                  const last_choice = choices[choices.length - 1];
                  choices = [
                    ...choices.slice(0, -1),
                    last_choice + new_content.replace('\n',''),
                  ]
                }
              }
            }
          }
        });
      }
      newMessage = "";
      console.log(all_content);
      $current_task = $current_task.replace('\n','');
      $progress_of_current_task = $progress_of_current_task.replace('\n','');
      console.log(choices, $current_task, $progress_of_current_task);
    }
    typing = false;
  }

  // $: console.log($current_task, $progress_of_current_task, choices);
  let messagesContainer;

  const scrollToBottom = async (node) => {
    node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
  }; 
  afterUpdate(() => {
    if (messagesContainer){
      scrollToBottom(messagesContainer);
    }
  });

  // when user click the choice, new_message will be set to the choice
  function handleChoice(event){
    newMessage = event.target.innerText;
    choices = [];
    sendMessage();
  }
  

</script>

<ApiKeyModal
  bind:open={openApiKeyModal}
  setOpen={(value) => (openApiKeyModal = value)}
  setApiKey={(value) => ($apikey = value)}
/>

{#if hidden}
  <div
    class="chat-container"
    in:fade={{ delay: 100 }}
    out:fade={{ delay: 100 }}
  >
    <div class="chat-title">Raby🐰</div>
    <div class="messages-wrapper" bind:this={messagesContainer}>
        <div class="message hint">
          <div class="message-text" in:fade={{ delay: 500 }}>
            {firstTimeHint}
          </div>
        </div>
      {#each messages as message}
        <div class="message {message.role}">
          <div class="message-text" in:fade={{ delay: 80 }}>
            {message.content}
          </div>
        </div>
      {/each}
      {#if choices.length > 0}
        <div class="message hint">
          <div class="message-text" in:fade={{ delay: 80 }}>
            You could say...
          </div>
        </div>
      {/if}
      {#each choices as choice}
        <div class="message choice">
          <div class="message-text" in:fade={{ delay: 80 }} on:click={handleChoice}>
            {choice}
          </div>
        </div>
      {/each}
    </div>
    <div class="input-container">
      <input
        type="text"
        bind:value={newMessage}
        placeholder={$apikey === "" ? "please set apikey in settings" : "Type your message"}
        on:keydown={(e) => e.key === "Enter" && sendMessage()}
        disabled={typing || $apikey === ""}
      />
      {#if $apikey === ""}
      <button on:click={() => (openApiKeyModal = true)} >Set Api Key</button>
      {/if}
      <button on:click={sendMessage} disabled={typing || $apikey === ""}>Send</button>
    </div>
  </div>
{/if}

<style>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 500px;
    width: 600px;
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
    font-family: Comic Sans MS;
    z-index: 1; /* Add this line */
  }

  .chat-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: rgb(255, 172, 113);
    font-family: Comic Sans MS;
    margin-bottom: 1rem;
    text-shadow: 1px 1px 2px rgb(248, 106, 5);
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
    font-family: Comic Sans MS;
  }

  .message.user {
    justify-content: flex-end;
  }

  .message-text {
    background-color: rgb(255, 172, 113);
    color: #fff;
    padding: 8px 12px;
    border-radius: 16px;
    max-width: 75%;
    word-wrap: break-word;
    font-size: 20px;
    line-height: 1.4;
    text-align: left;
  }

  .message.user .message-text {
    background-color: rgb(255, 172, 113);
    color: #fff;
  }

  .message.choice {
    justify-content: center;
  }

  .message.choice .message-text {
    cursor: grab;
  }

  .message.hint {
    justify-content: center;
  }

  .message.hint .message-text {
    background-color: transparent;
    font-size: 14px;
    color: rgb(255, 172, 113);
  }

  .message.assistant .message-text {
    background-color: #fff;
    color: rgb(255, 172, 113);
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

  input:focus {
    outline: 2px solid rgb(255, 146, 68);
  }

  button {
    margin-left: 8px;
    padding: 8px 12px;
    background-color: rgb(255, 172, 113);
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  button:disabled {
    background-color: #ccc;
    color: #fff;
    cursor: not-allowed;
  }

  button:hover {
    background-color: rgb(255, 146, 68);
  }
</style>
