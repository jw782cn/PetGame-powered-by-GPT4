import { writable } from "svelte/store";

// thing that can be changed
export const apikey = writable("");
export const username = writable("Sam");
export const selection = writable(5);
export const game_plot_outline = writable([
  {
    title: "Raby's Dilemma",
    plot: `
    Game Plot Outline:
    Title: Raby's Dilemma
    1. Introduction: The young adult meets Raby, who is feeling upset and controlled by its mom. Raby wants to go outside and play, but its mom insists that it stays home to do homework. Raby needs the young adult's help to navigate this difficult situation.
    2. Task 1 - Building understanding: The young adult needs to help Raby understand its mom's perspective. They can do this by presenting possible reasons why Raby's mom wants it to do homework. This step will help the young adult empathize with Raby's situation and learn about the importance of understanding different perspectives.
    3. Task 2 - Balancing priorities: The young adult must help Raby find a balance between its desire to play outside and the need to complete homework. They can brainstorm together to create a schedule that satisfies both Raby and its mom. This step teaches the young adult about time management and compromise.
    4. Task 3 - Communication skills: The young adult should guide Raby on how to effectively communicate with its mom. They can role-play different scenarios to practice assertiveness, active listening, and expressing emotions appropriately. This will help the young adult develop their communication skills, which are essential for coping with daily life situations.
    5. Resolution: Raby successfully talks to its mom about its feelings, and they reach a compromise. Raby can play outside for a while before focusing on its homework. The young adult learns valuable coping skills from Raby and realizes the importance of communication, understanding, and balancing priorities.
    6. Goal fulfilled: The young adult has helped Raby find a solution to its dilemma and has learned crucial coping skills to apply in their own life.
    `,
    task: 3,
    current_task: "1",
    progress_of_current_task: "0",
    progress: 0,
    messages:[],
    choices:[],
  },
  {
    title: "Raby's Road to Recovery",
    plot: `
        Game Plot Outline:
        Title: Raby's Road to Recovery
        Introduction: The young adult meets Raby, who is struggling with alcohol addiction after a painful breakup with its partner. Raby wants to stop drinking and regain control of its life, but it doesn't know how to cope with the emotional turmoil. The young adult must help Raby overcome this challenge and learn valuable coping skills along the way.
        Task 1 - Identifying emotions: The young adult needs to help Raby understand the emotions it is experiencing, such as sadness, anger, or loneliness. They can engage in conversations or use interactive activities to help Raby recognize and label its feelings. This step teaches the young adult about emotional awareness and the importance of acknowledging feelings.
        Task 2 - Healthy coping mechanisms: The young adult must introduce Raby to alternative, healthy coping mechanisms to replace alcohol consumption. They can explore options such as exercise, meditation, journaling, or seeking support from friends and family. This step helps the young adult learn about various coping strategies to handle challenging emotions.
        Task 3 - Building a support network: The young adult should assist Raby in creating a support network of friends and family to help Raby through tough times. They can role-play conversations or create a list of people Raby can reach out to for encouragement. This step highlights the importance of social connections for the young adult and their own well-being.
        Task 4 - Setting goals and creating a plan: The young adult and Raby need to work together to set realistic goals for Raby's recovery and develop a step-by-step plan to achieve them. This process teaches the young adult about goal-setting and the importance of having a structured plan to overcome obstacles.
        Resolution: Raby starts to implement the coping strategies and support network, gradually reducing its alcohol consumption. The young adult witnesses Raby's progress and learns essential coping skills that they can apply to their own life.
        Goal fulfilled: The young adult has successfully helped Raby take the first steps towards recovery from alcohol addiction and has acquired essential coping skills for dealing with emotional challenges in their own life.
        `,
    task: 4,
    current_task: "1",
    progress_of_current_task: "0",
    progress: 0,
    messages:[],
    choices:[],
  },
  {
    title: "Raby's Friendship Challenge",
    plot: `
        Game Plot Outline:
        Title: Raby and the Friendship Challenge
        Introduction: The young adult meets Raby, who is feeling upset and hurt after a fight with its best friend, a tiger. Raby wants to resolve the conflict and restore their friendship, but it doesn't know how to approach the situation. The young adult must help Raby navigate this challenge and learn valuable coping skills in the process.
        Task 1 - Understanding the conflict: The young adult needs to help Raby analyze the fight and identify the underlying issues that led to the disagreement. They can do this by discussing the events that took place and the feelings involved. This step will teach the young adult about conflict resolution and the importance of understanding different perspectives.
        Task 2 - Self-reflection: The young adult should guide Raby through a self-reflection process to recognize any mistakes or miscommunications that may have contributed to the fight. This step allows the young adult to learn about personal accountability and the importance of self-awareness in resolving conflicts.
        Task 3 - Developing empathy: The young adult must help Raby empathize with the tiger's point of view and feelings. They can use role-playing exercises or other interactive activities to help Raby better understand the tiger's perspective. This step highlights the importance of empathy in building strong relationships for the young adult.
        Task 4 - Communication and reconciliation: The young adult should coach Raby on how to effectively communicate with the tiger to address the conflict and express their feelings. They can practice various strategies such as active listening, assertiveness, and using "I" statements. This will help the young adult develop their communication skills, which are crucial for resolving conflicts and fostering healthy relationships.
        Resolution: Raby successfully talks to the tiger, and they both apologize for their mistakes and miscommunications. They work together to resolve the issues, and their friendship is strengthened. The young adult learns essential coping skills from Raby and realizes the importance of communication, empathy, and self-reflection in conflict resolution.
        Goal fulfilled: The young adult has helped Raby mend its friendship with the tiger and has learned valuable coping skills that can be applied to their own life.
        `,
    task: 4,
    current_task: "1",
    progress_of_current_task: "0",
    progress: 0,
    messages:[],
    choices:[],
  },
  {
    title: "Raby's Relationship Challenge",
    plot: `
    Game Plot Outline:
Title: Raby and the Relationship Balance
Introduction: The young adult meets Raby, who is facing challenges in its relationship with a squirrel named Jason. Jason has been asking too much of Raby, making Raby feel overwhelmed and unsure of how to handle the situation. The young adult must help Raby navigate this challenge and learn valuable coping skills in the process.
Task 1 - Analyzing the relationship dynamics: The young adult needs to help Raby evaluate its relationship with Jason and identify the areas where the balance is off. They can do this by discussing specific instances where Jason asked too much from Raby and how it affected Raby's well-being. This step will teach the young adult about the importance of healthy boundaries and balanced relationships.
Task 2 - Establishing boundaries and communicating effectively: The young adult should guide Raby on how to set healthy boundaries with Jason and effectively communicate its needs and concerns. They can practice various strategies such as assertiveness, active listening, and using "I" statements. This step will help the young adult develop essential communication skills and understand the importance of setting boundaries in relationships.
Resolution: Raby successfully talks to Jason about its feelings and the need for balance in their relationship. Together, they work on establishing healthier boundaries and improving their communication. The young adult learns valuable coping skills from Raby and gains insights into maintaining balanced relationships.
Goal fulfilled: The young adult has helped Raby address the challenges in its relationship with Jason and has learned crucial coping skills that can be applied to their own life.
    `,
    task: 2,
    current_task: "1",
    progress_of_current_task: "0",
    progress: 0,
    messages:[],
    choices:[],
  },
  {

    title: "Raby's Friendship Triangle",
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
    title: "Raby's Friendship Challenge",
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


export const patient_information = writable(`
Sam is 20 years old and had substance abuse for 1 year. He has some difficulty communicating with his parents.
`);
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
7. Then you need to generate three hint possible messages the young adult can reply to Raby’s message to make the conversation continue.
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
6. The sixth line is the third hint message from the young adult side.
===
`;

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
🐰I hear you. I understand. What happend next?
===
`;
