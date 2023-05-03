<script>
  import { fade } from "svelte/transition";
  import {
    apikey,
    task,
    game_plot_outline,
    patient_information,
    get_user_info_prompt,
    username,
    example,
    selection,
    model,
  } from "./store.ts";
  import { afterUpdate } from "svelte";
  import ApiKeyModal from "./ApiKeyModal.svelte";
  import { onMount } from "svelte";

  let openApiKeyModal = false;
  let choices = [];
  let talktoofast = "";

  export let hidden = false;
  export let showComplete = false;
  export let messages = [];

  onMount(() => {
    messages = $game_plot_outline[$selection]["messages"];
    choices = $game_plot_outline[$selection]["choices"];
  });

  function update_messages() {
    console.log("update messages");
    messages = $game_plot_outline[$selection]["messages"];
    choices = $game_plot_outline[$selection]["choices"];
    console.log(messages);
    newMessage = "";
    typing = false;
  }

  $: $selection, update_messages();

  // dev mode only
  $apikey = "";
  // $: console.log($apikey);


  function assembleintro() {
    const system_prompt = get_user_info_prompt;
    let chat_history = "chat history: \n";
    let messages = $game_plot_outline[0]["messages"];
    messages.forEach((message) => {
      if (message.role === "user") {
        chat_history += $username + ": " + message.content + "\n";
      }
    });
    const messages_for_openai = system_prompt + chat_history;
    return [
      { content: "You are a help assistant.", role: "system" },
      { content: messages_for_openai, role: "user" },
    ];
  }

  async function completeintro() {
    const messages_for_openai = assembleintro();
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + $apikey,
        // "OpenAI-Organization": "org-8EQxuW6VB8Xs0WfTsuByGPVL",
      },
      body: JSON.stringify({
        model: model,
        messages: messages_for_openai,
        temperature: 0.6,
        max_tokens: 200,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
      return;
    }
    const data = await response.json();
    console.log(data);
    const system_response = data.choices[0]["message"]["content"];
    console.log(system_response);
    $patient_information = system_response;
  }

  $: if ($game_plot_outline[0]["progress"] == 100) {
    if ($patient_information == "None") {
      completeintro();
    }
  }
  $: if ($game_plot_outline[$selection]["progress"] == 100){
    newMessage = "You have completed this task!";
  }


  function assembleMessage() {
    const system_prompt =
      task +
      $game_plot_outline[$selection]["plot"] +
      "\nRaby is now talking to a young adult, here's their info, please use this info to answer questions.\n" +
      $patient_information +
      example;
    let chat_history = "chat history: \n";
    messages.forEach((message) => {
      if (message.role === "user") {
        chat_history += $username + ": " + message.content + "\n";
      } else if (message.role === "assistant") {
        chat_history += "Raby: " + message.content + "\n";
      }
    });
    chat_history += "Raby: ";
    const user_input =
      "current task: task" +
      $game_plot_outline[$selection]["current_task"] +
      "\n" +
      "progess of current task: " +
      $game_plot_outline[$selection]["progress_of_current_task"] +
      "\n" +
      chat_history +
      "\nREMEMBER: each output line should start with 🐰.\n REMEMBER: Last three lines should be written from the perspective of the young adult!";
    const gpt_3_5_input = system_prompt + "\n===\nINPUT:\n" + user_input;
    if (model === "gpt-3.5-turbo") {
      return [
        { content: "You are a help assistant.", role: "system" },
        { content: gpt_3_5_input, role: "user" },
      ];
    } else {
      // model gpt-4
      return [
        { content: system_prompt, role: "system" },
        { content: user_input, role: "user" },
      ];
    }
  }

  let newMessage = "";
  let typing = false;

  function updateProgress() {
    $game_plot_outline[$selection]["current_task"] = $game_plot_outline[
      $selection
    ]["current_task"].replace("\n", "");
    $game_plot_outline[$selection]["progress_of_current_task"] =
      $game_plot_outline[$selection]["progress_of_current_task"].replace(
        "\n",
        ""
      );
    console.log(
      choices,
      $game_plot_outline[$selection]["current_task"],
      $game_plot_outline[$selection]["progress_of_current_task"]
    );
    $game_plot_outline = $game_plot_outline;
    if ($game_plot_outline[$selection]["current_task"] === "complete") {
      $game_plot_outline[$selection]["progress"] = 100;
    } else {
      const current_task = parseInt(
        $game_plot_outline[$selection]["current_task"]
      );
      const progress_of_current_task = parseFloat(
        $game_plot_outline[$selection]["progress_of_current_task"]
      );
      const task_num = $game_plot_outline[$selection]["task"];
      // console.log(current_task, progress_of_current_task, task_num);
      const progress = Math.floor(
        ((current_task + progress_of_current_task - 1) * 100) / task_num
      );
      $game_plot_outline[$selection]["progress"] = progress;
      // console.log(progress);
    }
    $game_plot_outline = $game_plot_outline;
  }

  async function sendMessage() {
    choices = [];
    typing = true;
    talktoofast = "";
    if (newMessage.trim() !== "") {
      messages = [...messages, { content: newMessage, role: "user" }];
      newMessage = "Raby is typing...";
      const messages_for_openai = assembleMessage();
      console.log(messages_for_openai);
      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + $apikey,
              // "OpenAI-Organization": "org-8EQxuW6VB8Xs0WfTsuByGPVL",
            },
            body: JSON.stringify({
              model: model,
              messages: messages_for_openai,
              temperature: 0.6,
              max_tokens: 200,
              stream: true,
            }),
          }
        );
        if (!response.ok) {
          messages = [...messages.slice(0, -1)];
          newMessage = "";
          talktoofast = "You are talking too fast! Please slow down.";
          throw new Error(`HTTP error! status: ${response}`);
          return;
        }
        const reader = response.body.getReader();
        let content = "";
        let all_content = "";
        let current = -1;
        let choice = "";
        $game_plot_outline[$selection]["current_task"] = "";
        $game_plot_outline[$selection]["progress_of_current_task"] = "";
        messages = [...messages, { content: "", role: "assistant" }];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          content = new TextDecoder().decode(value);
          const lines = content.split("\n");
          lines.forEach((line) => {
            if (line.startsWith("data:")) {
              if (line.substring(6) == "[DONE]") {
                console.log("Done!");
                // console.log(lines)
                return;
              }
              const jsonObject = JSON.parse(line.substring(6));
              const firstChoice = jsonObject.choices[0];
              if (firstChoice.delta && firstChoice.delta.content) {
                // Return the content value
                const new_content = firstChoice.delta.content;
                all_content += new_content;
                // console.log(new_content);
                if (new_content == "🐰") {
                  current += 1;
                  if (current == 3) {
                    // fixing the bug of \n
                    updateProgress();
                    if ($game_plot_outline[$selection]["progress"] == 100) {
                      reader.cancel(); 
                      newMessage = "You have completed this task!";
                      $game_plot_outline[$selection]["messages"] = messages;
                      $game_plot_outline[$selection]["choices"] = [];
                      $game_plot_outline = $game_plot_outline;
                      showComplete = true;
                      return;
                    }
                    newMessage = "Possible Choices...";
                  }
                  if (current >= 3) {
                    choices = [...choices, choice];
                  }
                } else {
                  // console.log("what happend?", new_content, current)
                  if (current == 0) {
                    const last_message =
                      messages[messages.length - 1]["content"];
                    // add to last message in messages
                    messages = [
                      ...messages.slice(0, -1),
                      {
                        content: last_message + new_content,
                        role: "assistant",
                      },
                    ];
                  } else if (current == 1) {
                    $game_plot_outline[$selection]["current_task"] +=
                      new_content;
                    $game_plot_outline = $game_plot_outline;
                  } else if (current == 2) {
                    $game_plot_outline[$selection][
                      "progress_of_current_task"
                    ] += new_content;
                    $game_plot_outline = $game_plot_outline;
                  } else {
                    const last_choice = choices[choices.length - 1];
                    choices = [
                      ...choices.slice(0, -1),
                      last_choice + new_content.replace("\n", ""),
                    ];
                  }
                }
              }
            }
          });
        }
        newMessage = "";
        console.log(all_content);
      } catch (error) {
        console.error("Error:", error);
        console.log($game_plot_outline[$selection]);
      }
    }
    typing = false;
    $game_plot_outline[$selection]["messages"] = messages;
    $game_plot_outline[$selection]["choices"] = choices;
    $game_plot_outline = $game_plot_outline;
  }

  // $: console.log($current_task, $progress_of_current_task, choices);
  let messagesContainer;

  const scrollToBottom = async (node) => {
    node.scroll({ top: node.scrollHeight, behavior: "smooth" });
  };
  afterUpdate(() => {
    if (messagesContainer) {
      scrollToBottom(messagesContainer);
    }
  });

  // when user click the choice, new_message will be set to the choice
  function handleChoice(event) {
    if (typing) {
      return;
    }
    newMessage = event.target.innerText;
    choices = [];
    console.log(newMessage);
    sendMessage();
  }
</script>

<ApiKeyModal
  bind:open={openApiKeyModal}
  setOpen={(value) => (openApiKeyModal = value)}
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
          {$game_plot_outline[$selection]["hint"]}
        </div>
      </div>
      {#each messages as message}
        <div class="message {message.role}">
          <div class="message-text" in:fade={{ delay: 80 }}>
            {message.content}
          </div>
        </div>
      {/each}
      {#if talktoofast != ""}
        <div class="message hint">
          <div class="message-text" in:fade={{ delay: 80 }}>
            {talktoofast}
          </div>
        </div>
      {/if}
      {#if choices.length > 0}
        <div class="message hint">
          <div class="message-text" in:fade={{ delay: 80 }}>
            You could say...
          </div>
        </div>
      {/if}
      {#each choices as choice}
        <div class="message choice">
          <div
            class="message-text"
            in:fade={{ delay: 80 }}
            on:click={handleChoice}
          >
            {choice}
          </div>
        </div>
      {/each}
    </div>
    <div class="input-container">
      <input
        type="text"
        bind:value={newMessage}
        placeholder={$apikey === ""
          ? "please set apikey in settings"
          : "Type your message"}
        on:keydown={(e) => e.key === "Enter" && sendMessage()}
        disabled={typing || $apikey === "" || $game_plot_outline[$selection]["progress"] == 100}
      />
      {#if $apikey === ""}
        <button on:click={() => (openApiKeyModal = true)}>Set Api Key</button>
      {/if}
      <button on:click={sendMessage} disabled={typing || $apikey === "" || $game_plot_outline[$selection]["progress"] == 100}
        >Send</button
      >
    </div>
  </div>
{/if}

<style>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 70%;
    width: 50%;
    max-width: 600px;
    border: 1px solid #ccc;
    background-color: #f2f2f2;
    margin: 0 auto;
    border-radius: 20px;
    padding: 16px;
    padding-bottom: 6px;
    position: fixed;
    overflow-y: scroll;
    top: 15%;
    right: 8%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    font-family: Comic Sans MS;
    z-index: 1;
  }

  .chat-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: rgb(255, 172, 113);
    font-family: Comic Sans MS;
    margin-bottom: 1rem;
    text-shadow: 1px 1px 2px rgb(248, 106, 5);
  }

  .messages-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    margin-bottom: 16px;
  }

  .messages-wrapper::-webkit-scrollbar {
    display: none;
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
