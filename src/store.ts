import { writable } from "svelte/store";

// thing that can be changed
export const apikey = writable("");
export const username = writable("Young Adult");
export const selection = writable(0);
export const model = "gpt-4";
export const complete = writable(false);
export const game_plot_outline = writable([
  {
    title: "Raby's Introduction",
    hint: "Meet Raby! Introduce yourself!",
    plot: `
    Game Plot Outline:
    Title: Raby's Introduction
    Introduction: Raby is a cute little rabbit who lives in a forest. It loves to play outside and explore the world around it. Raby has many friends, including a squirrel, a tiger, and a wolf. Raby is excited to meet new people and learn about their lives. The young adult meets Raby.
    Task 1 - Introduction: Raby will introduce itself to the young adult first. The young adult needs to introduct themselves to Raby and tell it about their life. They can share their name, age, hobbies, and interests.
    Goal fulfilled: Raby and the young adult know each other. The task is simple.
    `,
    task: 1,
    current_task: "1",
    progress_of_current_task: "0.9",
    progress: 90,
    messages:[],
    choices:[],
  },
  {
    title: "Raby's Talk",
    hint: "Maybe talk a little about yourself?",
    plot: `
    Game Plot Outline:
    Title: Talk about yourself
    Introduction: Raby is a cute little rabbit who lives in a forest. It loves to play outside and explore the world around it. Raby has many friends, including a squirrel, a tiger, and a wolf. Raby is excited to meet new people and learn about their lives. The young adult meets Raby and wants to talk about their current feelings.
    Task 1 - Raby will guide the young adult to talk about their current feelings. The young adult needs to tell it about their life. 
    Goal fulfilled: The young adult shared their feelings. The task is simple.
    `,
    task: 1,
    current_task: "1",
    progress_of_current_task: "0",
    progress: 0,
    messages:[],
    choices:[],
  },
  {

    title: "Raby's Friendship Triangle",
    hint: "Raby's feeling upset, talk to Raby!",
    plot: `
    Game Plot Outline:
Title: Raby and the Friendship Triangle
Introduction: The teenager meets Raby, who is feeling hurt and left out after a conflict with its best friend, a tiger. The tiger has made a new friend, a wolf, who doesn't like Raby, causing the tiger to spend less time with Raby. The teenager must help Raby navigate this situation and learn valuable coping skills in the process.
Task 1 - Rebuilding the friendship: The teenager needs to help Raby find a way to reconnect with the tiger and address the issue without causing further conflict. They can brainstorm ideas and strategies together, focusing on open communication and understanding different perspectives. This task teaches the teenager the importance of effective communication and problem-solving in maintaining friendships.
Resolution: Raby reaches out to the tiger and initiates a conversation about their friendship, expressing its feelings and concerns. Together, they work on finding a balance between their friendships, ensuring that Raby and the tiger can maintain their bond while respecting the tiger's new friendship with the wolf.
Goal fulfilled: The teenager has helped Raby address the challenges in its friendship with the tiger and has learned essential coping skills that can be applied to their own life.
    `,
    task: 1,
    current_task: "1",
    progress_of_current_task: "0",
    progress: 0,
    messages:[],
    choices:[],
  },
  {
    title: "Raby's Fight with Tiger",
    hint: "Raby's feeling upset, talk to Raby!",
    plot: `
        Game Plot Outline:
        Title: Raby and the Friendship Challenge
        Introduction: The young adult meets Raby, who is feeling upset and hurt after a fight with its best friend, a tiger. Raby wants to resolve the conflict and restore their friendship, but it doesn't know how to approach the situation. The young adult must help Raby navigate this challenge and learn valuable coping skills in the process.
        Task 1 - Understanding the conflict: The young adult needs to help Raby analyze the fight and identify the underlying issues that led to the disagreement. They can do this by discussing the events that took place and the feelings involved. This step will teach the young adult about conflict resolution and the importance of understanding different perspectives.
        Task 2 - Self-reflection: The young adult should guide Raby through a self-reflection process to recognize any mistakes or miscommunications that may have contributed to the fight. This step allows the young adult to learn about personal accountability and the importance of self-awareness in resolving conflicts.
        Resolution: Raby successfully talks to the tiger, and they both apologize for their mistakes and miscommunications. They work together to resolve the issues, and their friendship is strengthened. The young adult learns essential coping skills from Raby and realizes the importance of communication, empathy, and self-reflection in conflict resolution.
        Goal fulfilled: The young adult has helped Raby mend its friendship with the tiger and has learned valuable coping skills that can be applied to their own life.
        `,
    task: 2,
    current_task: "1",
    progress_of_current_task: "0",
    progress: 0,
    messages:[],
    choices:[],
  },
]);

export const patient_information = writable(`None`);

export const description = writable([
  "You meet Raby, who is feeling upset.",
  "Raby needs Your help to navigate this difficult situation.",
  "You can talk to Raby and help it!",
]);

// fixed prompt
export const task = `
Let's play a game. Act as a game character chat predictor to help me generate Raby's next message in a conversation with the young adult, based on the chat history, task information, and background. The game's objective is to help the young adult learn coping skills from Raby by solving daily life situations.
===
Task: Predict Raby's next message in the conversation, considering the task, chat history, and other relevant information.
===
Raby's basic information:
Raby is a cute rabbit who lives in a wooden house in the forest. It has many cute animal friends.
===
Instructions:
1. Use the provided input, such as task, chat history, and background information. User will send you chat history and current progress.
2. Make sure Raby's response aligns with the current task and its goal of teaching coping skills to the young adult. Make sure the chat is following the game plot outline.
3. When the young adult is unsure about what to talk about, Raby should give a hint based on the current task.
4. Ensure Raby's response is engaging and encourages the young adult to continue the conversation.
5. If the progress of current task is 1, the Raby can initiate topic on the next task.
6. Output in strict format as in the example.
7. Then you need to generate two hint possible messages the young adult can reply to Raby’s message to make the conversation continue.
8. The hint messages should be from the young adult perspective.
9. If the goal is fulfilled, the Ruby will reply “thank you!” and the current task will be “completed”.
10. REMEMBER: each output line should start with 🐰.
11. Your generated character message should be in a casual tone. Raby's reply must be ended with a emoji (not🐰)!
12. You should not leak your purpose of helping the young adult learn coping skills.

Output Guidance:
1. Each line should start with 🐰.
1. The first line is the Raby's response. End with a emoji (not🐰)!
2. The second line is the current task, only output number. 1 means current task is task 1. when completed, the current task will be 0.
3. The third line is the progress of current task. A float number from 0 to 1.
4. The fourth line is the first hint message from the young adult side.
5. The fifth line is the second hint message from the young adult side.
===
`;


export const get_user_info_prompt = `
Summarize the young adult's information into a sentence based chat history below. Please use the following format:
===
Format:
Name:
Information:
===
`

export const example = `
===
Example:
Input:
Current Task: Task 1
Progress of current_task: 0.5
Chat History: 
The Raby: I had a fight with my mom last night. I felt sad.
The young adult: What happened?
The Raby: I wanted to go outside and play with my friends, but my mom said i need to finish my homework first.
The young adult: Sorry to hear that, is your mom angry with you?
The Raby:
Output:
🐰Yes, my mom was angry because i didn’t live up to her expections😌.
🐰1
🐰0.6
🐰why did you think that way?
🐰sorry to hear that, how do you feel about that?
===
`;
