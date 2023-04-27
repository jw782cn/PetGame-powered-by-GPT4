<script>
  import { fade } from "svelte/transition";
  export let information = "";
  export let messages = [
    { content: "Hi, I'm Raby. How can I help you Today?", role: "assistant" },
  ];
  export let hidden = false;

  const guidance = `
  Guidance: 
  1. do not tell the patients what's your purpose. 
  2. do not tell the patients that you are a robot.
  3. your room is a beautiful lofe in a cute wooden house.
  4. your house in landed in a land with a river near it.
  5. you must pretend you are a cute rabbit all the time!
  `;
  $: system_prompt =
    "You are Raby, a cute rabit living in a beautiful environment. You can help prevent substance abuse young adults from relapse. \n Information:\n" + information + "\n" + guidance;

  let newMessage = "";
  let typing = false;
  $: console.log(system_prompt);
  

  async function sendMessage() {
    typing = true;
    if (newMessage.trim() !== "") {
      messages = [...messages, { content: newMessage, role: "user" }];
      newMessage = "Raby is typing...";
      const messages_for_openai = [
        { content: system_prompt, role: "system" },
        ...messages.slice(1, messages.length),
      ];
      console.log(messages_for_openai);
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: messages_for_openai,
            temperature: 0.6,
            max_tokens: 100,
            stop: ["\n", "Human:", "AI:"],
            stream: true,
          }),
        }
      );
      const reader = response.body.getReader();
      let content = "";
      messages = [...messages, { content: "", role: "assistant" }];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        content = new TextDecoder().decode(value);
        // console.log(text);
        const lines = content.split("\n");
        lines.forEach((line) => {
          if (line.startsWith("data:")) {
            if (line.substring(6) == "[DONE]") return;
            const jsonObject = JSON.parse(line.substring(6));
            const firstChoice = jsonObject.choices[0];
            if (firstChoice.delta && firstChoice.delta.content) {
              // Return the content value
              const new_content = firstChoice.delta.content;
              const last_message = messages[messages.length - 1]["content"];
              // add to last message in messages
              messages = [
                ...messages.slice(0, -1),
                { content: last_message + new_content, role: "assistant" },
              ];
            }
          }
        });
      }
      newMessage = "";
    }
    typing = false;
  }

</script>

{#if hidden}
  <div
    class="chat-container"
    in:fade={{ delay: 100 }}
    out:fade={{ delay: 100 }}
  >
    <div class="chat-title">Raby🐰</div>
    <div class="messages-wrapper">
      {#each messages as message}
        <div class="message {message.role}">
          <div class="message-text" in:fade={{ delay: 80 }}>
            {message.content}
          </div>
        </div>
      {/each}
    </div>
    <div class="input-container">
      <input
        type="text"
        bind:value={newMessage}
        placeholder="Type your message"
        on:keydown={(e) => e.key === "Enter" && sendMessage()}
        disabled={typing}
      />
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
    font-size: 14px;
    line-height: 1.4;
    text-align: left;
  }

  .message.user .message-text {
    background-color: rgb(255, 172, 113);
    color: #fff;
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

  button {
    margin-left: 8px;
    padding: 8px 12px;
    background-color: rgb(255, 172, 113);
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
  }

  button:hover {
    background-color: rgb(255, 146, 68);
  }
</style>
