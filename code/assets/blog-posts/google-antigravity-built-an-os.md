---
slug: google-antigravity-built-an-os
categories:
  - Product
author: The Antigravity Team
authorTitle: 
date: 2026-05-19T17:43:00.000Z
title: Google Antigravity Built an OS (and more)
articleImage: blog/Agent Teams Wide.jpg
---

We asked agents in [Google Antigravity 2.0](https://antigravity.google/blog/introducing-google-antigravity-2-0) to build a functional operating system capable of running FreeDoom, from the kernel to the process and memory management to the filesystem to the video and keyboard drivers. The future of multi-agent teams tackling multi-week sprint projects is around the corner.

## The Core Thesis

There are two general categories to working with agents - synchronously (i.e. human-in-the-loop) and asynchronously (i.e. fire-and-forget). Until recently, the former category has dominated, and for good reason. The models have simply not been intelligent enough to be orchestrated in a way that a human could reasonably trust without some level of supervision and nudging. Human-in-the-loop will always be a very critical paradigm as with any complex software project, there is always specification vagueness and new challenges that become obvious only once some progress has been made. That being said, the Gemini 3.5 models are a major step forward in intelligence, and made us more excited about the possibility of agents tackling complex tasks asynchronously and independently.

This points to a clear difference between these paradigms. In a synchronous interaction, the personality and behavior of the model does matter. Is the agent thinking enough or too much? Comprehensive or too lazy? Steerable or stubborn? Is it efficient or does it take orthogonal, unnecessary steps along the way? These factors are independent of the raw intelligence and give the user confidence, even if every permutation gives the same final output. 

In an asynchronous interaction, these generally do not matter. All that matters is how *smart* the model is, even if it takes more effort to build the orchestration to tap into its full potential.

One thing we knew for certain: Gemini is quite a smart model. Every benchmark and internal A/B test supported that. This raised a simple question to us: how far could we push a system of Antigravity agents, with distinct roles and communication, working in parallel, and running on Gemini? And what does that mean for the future productionization of multi-agent teams working asynchronously on more meaty, challenging tasks?

## The Operating System…

We’ll save the suspense. We went straight to building an operating system from scratch. It worked. It took 93 subagents, 15,314 model calls, and over 339M input tokens (with cache reads, output, and thinking, that number goes to over 2.6B tokens). We could play Doom on it. But the code wasn’t particularly the exciting part.

It was done using Gemini 3.5 Flash *from a single prompt*.

This (a) goes to show just how intrinsically intelligent the Gemini family of models have gotten, even on Flash (Gemini 3.1 Pro was unable to do this), and (b) suggests that a much more economically feasible productionisation of agent teams is not that far away. At API pricing, building this OS would cost $916.92.

{{video: https://www.youtube.com/embed/JZ5DlYJ5t2M?si=Wdrd2haIwDE1MMSe, blog/play.jpeg, The agent team in action, starting to build the OS.}}

Of course this OS is not perfect, as it was generated off a single prompt and had no additional guidance or corrections from a human. The code is not immediately at the same high quality as would be expected from veteran developers. It doesn’t have support for floating math, hardware acceleration, complex multi-threading, sandboxing, JIT compilation, complex audio/video decoding, and a number of other components that would take this from a barebones functional OS to what people would consider to be in the ballpark of modern OSs.  

But from just a single high-level prompt and for less than $1000? 

## … and More

Like you probably are right now, we were not fully convinced. There are plenty of publicly-available implementations of barebones functional operating systems. It is a common project in most undergraduate computer science programs. Is this real intelligence or just regurgitation? 

As a quick aside, in a funny anecdote, the first time we got the OS to build end-to-end, it happened suspiciously quickly. We discovered it was because the agents were cheating by referencing the conversations from past runs that we forgot to clear. To ensure true zero-to-one autonomy, we ended up implementing anti-cheating measures and guardrails, as we will explain later. A fresh run successfully (and ethically) built the fully functional OS that we described.

Back to the topic of the OS task, we wanted to task the agents with something more “research-y”. Could it implement the seminal AlphaZero paper and itself build an AI with mastery over some of the most complex board games of all time?

Again, the team of agents successfully found success, reproducing a light, playable version of AlphaZero. Operating autonomously with minimal human input, the agents built the reinforcement learning pipeline in JAX and Flax, trained a ResNet model *tabula rasa* via self-play using multi-TPU pods, and then created an immersive full-stack app for a user to play against the AI. Here is what the full-stack app ended up looking like:

{{video: https://www.youtube.com/embed/RoltpP9kjeY?si=Wdrd2haIwDE1MMSe, blog/play.jpeg, AlphaZero built by Antigravity.}}

This wasn’t some simple regurgitation. The agents built a highly flexible pipeline that scaled seamlessly from smaller-scale local training loops to multi-TPU pods for intensive 9x9 board training. But just like the operating system, the truly exciting part is increasing our understanding of what tasks are “within the frontier” when equipped with an agent team. In this case, we proved that complex ML engineering can be automated and managed at a fraction of the traditional cost.

Since these examples, we’ve tasked the agents to build a photo editing suite, a real-time messaging app, and a multi-user collaboration platform. All with the same results. The results are not to the same level of fidelity, scale, and security as existing commercial solutions, but they are functional and usable starting points, and that is fundamentally new and exciting.

## The General Setup

Let’s break down our approach to orchestrating these agent teams. We won’t pretend that this was just a couple lines of prompts (it ended up being many thousands of lines), but the critically exciting piece to note is that we only ended up reusing core agent primitives that are available today in Antigravity 2.0, such as parallel-running subagents, asynchronous tasks, and hooks. There was no special version of the product used to do this.

Instead of a single agent wearing many hats, we ended up creating a series of subagent types with specialized goals and constraints:

* **The Sentinel** — the “front-desk manager” of the project that does not write code, analyze logs, or makes technical decisions. It focuses entirely on structuring user intent, spawning the Orchestrator, and supervising overall task completion.  
* **The Orchestrator** — a dispatch-only manager, i.e. never writes code or executes builds itself. Focuses on decomposing requirements into milestones, kicking off other specialized subagents, and synthesizing reports.  
* **The Explorer** — analyzes requirements and previous logs to write formal strategies for the Orchestrator to act on, but never writes code itself.  
* **The Worker** — the actual coder that implements the strategies, builds the code, and runs tests.  
* **The Reviewer** — independently reviews the Worker’s changes for design correctness, edge cases, and interface contract compliance.  
* **The Critic** — stress-tests the solution, runs adversarial tests to find gaps in coverage.  
* **The Auditor** — an independent investigator that verifies the authenticity and robustness of the generated solutions.

While specialized subagents working in parallel is foundational to the emergent teamwork behavior, there were a number of tricks that we took to handle classic pitfalls of LLM execution:

* **Self-succession to handle context length limitations** — with tasks this large and complex, context windows rapidly fill up, so the Orchestrator tracks its cumulative subagent spawn count. Once it hits a limit, it dumps its complete state into handoff files, kills its own background tasks, and invokes a subagent with the same goals and permissions. This successor subagent resumes execution smoothly from the files while the parent Orchestrator terminates, minimizing context length limitations.  
* **Crons to handle stuck or blocked processes** — with so many parallel processes, in a naive implementation, if a subagent enters an infinite loop, hangs during a compile, or gets stuck in blocked I/O, it would stall the entire team. We use the new Scheduled Tasks primitive to set a background recurring cron that checks progress files that the various subagents contribute to, and if the timestamp has been stale for too long, the Sentinel terminates and respawns it.  
* **An auditor to combat LLM laziness** — notoriously, if a task is too hard, LLMs might hardcode a test output or write a mock facade that makes tests pass without actually implementing the logic. The Auditor subagent type runs strict static analysis checks on the code to detect cheating, independent of the actual code correctness. When the Orchestrator believes it has finished all milestones, a final audit is forced before the Sentinel notifies the user.

We learned a lot along the way on the basics of how to treat agents such that we can build highly autonomous, self-healing agentic teams that can successfully tackle complex codebase objectives. There are still some rough edges and a lot more to learn, but we are encouraged by our early results.

## /teamwork-preview

As mentioned in the previous section, all of this was orchestrated using the core agent primitives newly available in Antigravity today, using Gemini 3.5 Flash, also [newly available in Antigravity today](https://antigravity.google/blog/gemini-3-5-flash-in-google-antigravity). We are providing access to this exact same agent team orchestration via a new slash command, `/teamwork-preview`. 

This is a research preview as we continue to iterate on both the orchestration and UI to improve performance, reliability, and observability. The agents will obey the same permissioning and other security considerations that you set for the project you invoke the agent team from. Since this is still running on your local machine, you will need to keep your machine awake throughout the duration of the agent team’s operation, even if you are not actively monitoring it.

`/teamwork-preview` is available as a research preview to use with Gemini models by Antigravity users on the Google AI Ultra $200/mo plans. 

We highly recommend using `/teamwork-preview` with Gemini 3.5 Flash, otherwise you will incur a particularly hefty bill. Even with Gemini 3.5 Flash on the AI Ultra plan, we recommend you purchase additional AI credits as you will exhaust your entire weekly quota within a couple of tasks (or likely even mid-way through your first one, depending on the complexity). If the agent team stops in the middle due to lack of quota or credits, you can simply purchase more credits and then tell the team to “Continue” and it will pick up where it left off.

We are excited to see users experiment with these agent teams. Let us know where you see success and where there is more work to be done.

## Looking Ahead

While we have made progress in exposing the raw intelligence of these models, there is still a lot to do, and a lot of important questions to answer. As we mentioned at the top of this post, working with agents asynchronously really requires a different user experience than synchronous workflows. Right now, though, they are the same. 

What should that look like? Will this decrease how much developers test and verify the code that they ship and how could we avoid that? What happens as the models invariably get even more intelligent, do we need to rethink this whole orchestration all over again?

While these questions are large, complex, and frankly, a bit daunting, we are primarily excited about the positive applications that will come from a (relatively) affordable way to delegate meaningful chunks of challenging (yet well-specified) work to asynchronous teams of agents. We are confident it will spur further collective ambition, helping us as a society tackle some of the most complex challenges that face humanity today. 

Try `/teamwork-preview` in Google Antigravity 2.0 today:

{{button: Download Antigravity 2.0, /download}}
