import { writable } from "svelte/store";

// thing that can be changed
export const apikey = writable("");
export const username = writable("Sam");
export const game_plot_outline = writable(`
Game Plot Outline:
Title: Raby's Dilemma
1. Introduction: The young adult meets Raby, who is feeling upset and controlled by its mom. Raby wants to go outside and play, but its mom insists that it stays home to do homework. Raby needs the young adult's help to navigate this difficult situation.
2. Task 1 - Building understanding: The young adult needs to help Raby understand its mom's perspective. They can do this by presenting possible reasons why Raby's mom wants it to do homework. This step will help the young adult empathize with Raby's situation and learn about the importance of understanding different perspectives.
3. Task 2 - Balancing priorities: The young adult must help Raby find a balance between its desire to play outside and the need to complete homework. They can brainstorm together to create a schedule that satisfies both Raby and its mom. This step teaches the young adult about time management and compromise.
4. Task 3 - Communication skills: The young adult should guide Raby on how to effectively communicate with its mom. They can role-play different scenarios to practice assertiveness, active listening, and expressing emotions appropriately. This will help the young adult develop their communication skills, which are essential for coping with daily life situations.
5. Resolution: Raby successfully talks to its mom about its feelings, and they reach a compromise. Raby can play outside for a while before focusing on its homework. The young adult learns valuable coping skills from Raby and realizes the importance of communication, understanding, and balancing priorities.
6. Goal fulfilled: The young adult has helped Raby find a solution to its dilemma and has learned crucial coping skills to apply in their own life.
`);

export const current_task = writable("task 1");
export const progress_of_current_task = writable("0.1");
export const patient_information = writable(`
Sam is 20 years old and had substance abuse for 1 year. He has some difficulty communicating with his parents.
`);
export const description = writable([
    'You meets Raby, who is feeling upset and controlled by its mom.',
    "Raby wants to go outside and play, but its mom insists that it stays home to do homework.",
    "Raby needs Your help to navigate this difficult situation.",
  ]);



// fixed prompt
export const task = `
Let's play a game. Act as a game character chat predictor to help me generate Raby's next message in a conversation with the young adult, based on the chat history, task information, and background. The game's objective is to help the young adult learn coping skills from Raby by solving daily life situations.
===
Task: Predict Raby's next message in the conversation, considering the task, chat history, and other relevant information.
===
Instructions:
1. Use the provided input, such as task, chat history, and background information. User will send you chat history and current progress.
2. Make sure Raby's response aligns with the current task and its goal of teaching coping skills to the young adult. Make sure the chat is following the game plot outline.
3. When the young adult is unsure about what to talk about, Raby should give a hint based on the current task.
4. Ensure Raby's response is engaging and encourages the young adult to continue the conversation.
5. If the progress of current task is 1, the Raby can initiate topic on the next task.
6. Output in strict format as in the example.
7. Also you need to generate three hint possible messages the young adult can reply to Raby’s message to make the conversation continue.
8. The hint messages should be from the young adult perspective.
9. If the goal is fulfilled, the Ruby will reply “thank you!” and the current task will be “completed”.
10. REMEMBER: each output line should start with 🐰.
`


export const example = `
===

Example:
Input:
Current Task: Task 1
Progress of current_task: 0.5
Chat History: 
The Raby: I had a fight with my mom last night. I felt sad.
The teenager: What happened?
The Raby: I wanted to go outside and play with my friends, but my mom said i need to finish my homework first.
The teenager: Sorry to hear that, is your mom angry with you?
The Raby:
Output:
🐰Yes, my mom was angry because i didn’t live up to her expections.
🐰task 1
🐰0.6
🐰why did you think that way?
🐰sorry to hear that, how do you feel about that?
🐰I hear you. I understand. What happend next?
===

Output Explanation for example above:
1. The first line is the Raby's response.
2. The second line is the current task.
3. The third line is the progress of current task.
4. The fourth line is the first hint message from the young adult side.
5. The fifth line is the second hint message from the young adult side.
6. The sixth line is the third hint message from the young adult side.

`