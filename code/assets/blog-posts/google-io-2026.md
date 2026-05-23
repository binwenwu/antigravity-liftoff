---
slug: google-io-2026
categories:
  - Product
author: The Antigravity Team
authorTitle: 
date: 2026-05-19T17:45:00.000Z
title: Google Antigravity @ I/O 2026
articleImage: blog/Google IO - Wide.jpg
---

In case you missed it, we announced *a lot* during the first day of Google I/O 2026! Here’s a quick rundown of everything we announced, with links to learn more.

## The Google Antigravity Ecosystem

We announced the building blocks that take Google Antigravity from a single product to a cohesive ecosystem of products, Google’s unified platform for builders to work with agents. 

We launched **Google Antigravity 2.0**, a standalone desktop application that delivers the first major step towards our vision of an independent agent-focused surface. [Read More](https://antigravity.google/blog/introducing-google-antigravity-2-0).

A CLI experience that uses the same agents? That’s **Google Antigravity CLI**, the most lightweight way to invoke, monitor, and interact with Antigravity agents, directly from your terminal. [Read More](https://antigravity.google/blog/introducing-google-antigravity-cli).

We also are bringing you direct access to the agent. The **Antigravity agent via the Gemini API** is now available for programmatic querying of the agent. [Read More](https://blog.google/innovation-and-ai/technology/developers-tools/managed-agents-gemini-api).

The **Google Antigravity SDK** is available today in preview for developers to build custom agents using the Antigravity agent harness that has been co-optimized with Gemini, all with complete control over their deployment. [Read More](https://antigravity.google/blog/introducing-google-antigravity-sdk).

Started prototyping in Google AI Studio Build but realized you want to continue with local development? AI Studio Build now also uses the Antigravity agent harness, and we’ve jointly introduced a new **AI Studio Build to Antigravity export flow**, which brings over not just your code, but also the context of your full agent conversation. [Read More](https://blog.google/innovation-and-ai/technology/developers-tools/google-ai-studio-io-2026).

For the first time, we are bringing the Antigravity ecosystem to Google Cloud customers, with Antigravity 2.0 and Antigravity CLI **available to Google Cloud customers through the Gemini Enterprise Agent Platform**. [Read More](https://antigravity.google/blog/google-antigravity-for-enterprises).

To build at scale, we’ve announced a new $100 per month Google AI Ultra plan. This new plan gives you priority access to Antigravity and five times the capacity of the Google AI Pro plan. We've simplified the monthly AI credit system, based on customer usage and feedback. Finally, as a thank you to Google AI Ultra subscribers, we’re also giving $100 in bonus credits over the upcoming holiday weekend for you to scale up your experimentation with Antigravity and your agents. [Read More](https://antigravity.google/blog/changes-to-antigravity-plans).

## The Core Antigravity Agent

The Antigravity agents are not just available in more places, but they are also a lot more powerful.

Delivering frontier performance for agents and coding, **Gemini 3.5 Flash**, is now the default Gemini Flash model on Google Antigravity. It’s our strongest agentic and coding model yet, outperforming Gemini 3.1 Pro on challenging coding and agentic benchmarks like Terminal-Bench 2.1 (76.2%), GDPval-AA (1656 Elo) and MCP Atlas (83.6%), and leading in multimodal understanding (84.2% on CharXiv Reasoning). Normally, 3.5 Flash is 4x faster than other frontier models, but for a limited time, it is 12x faster on Antigravity thanks to some further optimizations. [Read More](https://antigravity.google/blog/gemini-3-5-flash-in-google-antigravity).

And don’t let “Flash” fool you. Our researchers have been able to orchestrate the Antigravity agents to leverage Gemini 3.5 Flash to autonomously complete very impressive tasks, such as fully building a functional operating system. We are bringing a preview of this **agent team capability** to you as well! [Read More](https://antigravity.google/blog/google-antigravity-built-an-os).

These complex tasks were possible due to new core primitives to the Antigravity agent harness, including **dynamic subagents, asynchronous task management, and hooks**. [Read More](https://antigravity.google/blog/google-io-2026-feature-deep-dive).

## Product Features

Within Antigravity 2.0 and the Antigravity CLI, we’ve introduced a number of highly-requested product features to make working with the agents more effective, trustworthy, and valuable.

We have introduced **Scheduled Tasks** in Antigravity 2.0, where agents are invoked on pre-specified cron schedules with your pre-specified tasks.

With so many more agents, we are streamlining the management and organization of these agents by introducing **projects, worktree support, and new sidebar management**.

One of our personal favorites? **Live voice transcription** is now available using the latest Gemini Audio models because talking is a lot faster than typing.

Of course, there are many more new product features, including a slew of requested **slash commands**. Check out our updated [documentation](https://antigravity.google/docs) and [read more](https://antigravity.google/blog/google-io-2026-feature-deep-dive) about all of these new product features! 

## Google Antigravity for You

We are working with teams across Google to make it easier for you to build what *you* want to build.

The Android team introduced **Android skills and CLI** to Google Antigravity for Android developers to build applications end-to-end. [Read More](https://android-developers.googleblog.com/2026/05/android-cli-stable-1-0-agent-development.html). 

The Chrome team has made **Modern Web Guidance** skills easily available so that web developers can use Antigravity’s agents to develop with the most up-to-date web standards. [Read More](https://developer.chrome.com/docs/modern-web-guidance). 

If you are building applications with **Firebase**, the Firebase Skills give Antigravity’s agents additional context to build faster and better. [Read More](https://firebase.blog/posts/2026/05/google-io-2026-announcements). 

Finally, we are starting to expand into specialized verticals, introducing a new **Science Skills** bundle. This integrates insights from over 30 major life science databases to help researchers to perform complex and often manual workflows in minutes rather than hours. [Read More](https://storage.googleapis.com/deepmind-media/papers/google_deepmind_science_skills_for_antigravity_towards_efficient_and_reliable_scientific_workflows.pdf). 
