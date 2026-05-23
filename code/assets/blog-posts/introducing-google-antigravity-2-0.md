---
slug: introducing-google-antigravity-2-0
categories:
  - Product
author: The Antigravity Team
authorTitle: 
date: 2026-05-19T17:44:00.000Z
title: Introducing Google Antigravity 2.0
articleImage: blog/AGY2 Wide.jpg
---

Google Antigravity 2.0 is a new, standalone desktop application that fully delivers on a truly agent-optimized experience, available on macOS, Linux, and Windows (download [here](https://antigravity.google/download)). Users interact with powerful agents both synchronously and asynchronously, and there is no IDE. While it retains many of the core principles of the Antigravity IDE’s Agent Manager surface, it is a completely separate desktop application. It is [available to enterprises](https://antigravity.google/blog/google-antigravity-for-enterprises), [powered by the latest Gemini models](https://antigravity.google/blog/gemini-3-5-flash-in-google-antigravity), and orchestrates agents [capable of completing complex tasks](https://antigravity.google/blog/google-antigravity-built-an-os). 

Let us walk through the high level of the new features and capabilities. For more demos and deep dives, check out [this blog post](https://antigravity.google/blog/google-io-2026-feature-deep-dive).

At the core is still an agent. You can synchronously have a conversation with an agent, view the artifacts it produces, and provide feedback directly on the artifacts to guide towards your desired outcomes:

![Agent-first layout of Antigravity 2.0.](blog/agy2-layout.jpg)

These agents are more powerful than before. Some new capabilities include:

* Dynamic subagents: the main agent can dynamically choose to define and invoke subagents to complete focused subtasks, thereby not polluting the main agents’ context window and allowing for parallelism of work.  
* Asynchronous task management: Tasks and commands are managed and can run asynchronously to not block the main agent from continuing its work.   
* JSON hooks: You can now define hooks in a simple JSON format, allowing you to intercept and control the Antigravity agent’s behavior.

A brand new way of interacting with agents in Antigravity 2.0 is through Scheduled Tasks, where you can define crons to trigger the invocation of Antigravity agents on a predefined schedule. No longer do you need to manually invoke every agent:

![Set recurring schedules or one-off timers using the /schedule command or Scheduled Tasks.](blog/scheduled-task.png)

We’ve also removed the tight coupling between agent and repository. Instead of agent conversations being grouped by “workspace” (i.e. repository), they are now grouped by “project,” which can correspond to multiple folders and enforce its own agent settings and permissions. This allows you to let agents access more information and tackle more complex tasks, while still providing the knobs to put appropriate, specific guardrails.

There is a whole list of new fun slash commands:

* /goal: Run until the specified task is completely finished, not asking for intermediate input from the user.  
* /grill-me: Before starting to implement, ask questions back to align on the specific details of the plan.  
* /schedule: Run an instruction as a one-time timer in the future or on some recurring schedule (via Scheduled Tasks)  
* /browser: We heard the feedback that the agents were still not capable enough to determine exactly when to be using the browser. So for now, we’ve made it such that an explicit slash command controls these behaviors. When used, the agent diligently uses the browser primitives, and when not, it will ignore.

One favorite new feature is that the voice input (mic icon next to text input boxes) now does live transcription of your words, as opposed to collecting the raw audio file to pass into the model:

{{video: https://www.youtube.com/embed/8vFlYFkZrJY?si=Wdrd2haIwDE1MMSe, blog/play.jpeg, Live voice transcription.}}

And of course, there is a long list of UI polish and performance improvements to make Antigravity 2.0 the most powerful and intuitive way to work with agents: sidebar organization, standalone conversations, a sleek review flow for changes, new UI elements for all of the new agent capabilities, and much more.

Again, check out [this deep-dive](https://antigravity.google/blog/google-io-2026-feature-deep-dive) into a number of the new features in Antigravity 2.0.

## Why a 2.0?

When we launched the Google Antigravity IDE in November 2025, there was no agent-first GUI surface in the market. We wanted to prove that such a surface worked, at least for software development. So, while the core of the Antigravity IDE was a familiar agent-powered IDE, we introduced the Agent Manager, a second surface that stripped away much of the “IDE” UI. This allowed users to focus on the agent conversations themselves, the artifacts the agents produced, and multi-agent management. Since that launch, millions of developers have adopted the Antigravity IDE, and this agent-first paradigm has become standard across the industry.

However, we knew the entire time that:

* At some point, coding would expand to knowledge work, both because the models would become better and because naturally there is a ceiling to the overall value we can provide users by accelerating *just* coding.  
* In such a world, tying together an IDE and agent-first surface in a single application would be confusing and potentially daunting to those less familiar with code and IDEs. Even without this separation, we have been pleasantly surprised how many people have adopted the Agent Manager in the Antigravity IDE for such non-development tasks, but it is not particularly intuitive.  
* The product, agent harness, and model layers all had to be co-optimized and co-developed, and while agentic coding is a necessary step towards general model intelligence, it is not sufficient. 

We’ve been busy in the last few months so that we could:

* Integrate the Antigravity product agent harness with the Gemini training and evaluation stacks  
* Rearchitect the product to be agent-first from the ground up, independent of an IDE or other dev-specific concepts such as repositories  
* Round out the Antigravity platform with more surfaces and tooling to be a complete offering (see the launches for the [Antigravity CLI](https://antigravity.google/blog/introducing-google-antigravity-cli), the [Antigravity SDK](https://antigravity.google/blog/introducing-google-antigravity-sdk), and more). 

## Getting Started with Antigravity 2.0

If you are brand new to Google Antigravity, visit our [download page](https://antigravity.google/download). 

If you already have installed the Antigravity IDE, when that application next updates, it will automatically update to Antigravity 2.0. At this point, you will be asked if you would like to still keep the Antigravity IDE, which is recommended for developers:

{{video: https://www.youtube.com/embed/kPYWWeiRhj0?si=Wdrd2haIwDE1MMSe, blog/play.jpeg, Update screen from the Antigravity IDE to Antigravity 2.0.}}

These two applications will be differentiated on your machine’s dock via icon background. Antigravity 2.0 has the logo on a white background while Antigravity IDE has the logo on top of a black grid:

![Antigravity IDE and Antigravity 2.0 logos, respectively.](blog/app-icons.png)

## The Antigravity IDE

Although Antigravity 2.0 is the future, we won’t disrupt your workflows right away. For now, both the Antigravity IDE application itself *and* the Agent Manager in the Antigravity IDE will remain available. In an upcoming release, we will remove the Agent Manager from the Antigravity IDE, turning the IDE into a purely agent-powered IDE. 

We recommend dual-wielding Antigravity 2.0 with your IDE of choice, whether it is the Antigravity IDE or otherwise. Googlers have already been dual wielding Antigravity 2.0 with a whole host of IDEs! We will have compatible extensions and plugins into other popular IDEs shortly.

## Looking Forward

Alongside Antigravity 2.0, we have introduced a [CLI](https://antigravity.google/blog/introducing-google-antigravity-cli), [SDK](https://antigravity.google/blog/introducing-google-antigravity-sdk), [API](https://blog.google/innovation-and-ai/technology/developers-tools/managed-agents-gemini-api), and more. We have built integrations with other Google products and tech stacks. And we have the momentum of the model and agent harness being co-optimized. 

This is just the beginning. We look forward to launching remote control, more product integrations, cloud-deployed agents, and much more.

{{button: Download Antigravity 2.0, /download}}
