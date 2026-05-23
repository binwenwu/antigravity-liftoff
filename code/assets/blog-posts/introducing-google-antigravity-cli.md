---
slug: introducing-google-antigravity-cli
categories:
  - Product
author: The Antigravity Team
authorTitle: 
date: 2026-05-19T17:42:00.000Z
title: Google Antigravity CLI
articleImage: blog/AGY CLI Blog - Wide.png
---

The Google Antigravity CLI is the most lightweight way to invoke, monitor, and interact with Antigravity agents, directly from your terminal.

## About Antigravity CLI

The Antigravity CLI complements [Google Antigravity 2.0](https://antigravity.google/blog/introducing-google-antigravity-2-0) as a terminal UI alternative. These products use the same Antigravity agent harness, share the same settings, and allow for easy import of conversations started in the CLI to Antigravity 2.0. 

The Antigravity CLI focuses on all of the core functionalities of invoking, monitoring, and interacting with Antigravity agents. It does not try to be a GUI, which is better suited to Antigravity 2.0. This way, it remains perfect for users who prefer a true fast and lightweight CLI experience.

{{video: https://www.youtube.com/embed/F6sjqXRALY4?si=Wdrd2haIwDE1MMSe, blog/play.jpeg, The Antigravity CLI in action.}}

## Getting Started with Antigravity CLI

Follow the instructions on the [download page](https://antigravity.google/download) to install the Antigravity CLI. For users of Gemini CLI, follow [these guides](https://antigravity.google/docs/gcli-migration) to help transfer many of your existing skills, MCP servers, and more customizations.

Read the full documentation of available slash commands, settings, and keybindings at [the Antigravity CLI docs](https://antigravity.google/docs/cli-overview).

## Antigravity CLI and Antigravity 2.0

As mentioned earlier, agents in the Antigravity CLI and Antigravity 2.0 use the same agent harness. This means that future improvements to the core agents will automatically be applied to both product surfaces. A primary goal for the Antigravity CLI was the consolidation of a single agent harness across Google-built developer surfaces for more rapid future improvements.

Common settings are also shared across both products. So, as an example, you do not have to worry about forgetting to set particular agent permissions on Antigravity CLI if you have already set them in Antigravity 2.0, and vice versa.

By default, conversations are not shared across the two products. However, you can pull up conversations started in the Antigravity CLI from Antigravity 2.0 using the @conversation dropdown:

{{video: https://www.youtube.com/embed/w7A-YtMYr0o?si=Wdrd2haIwDE1MMSe, blog/play.jpeg, Seeing Antigravity CLI conversations in Antigravity 2.0.}}

## Antigravity CLI and Gemini CLI

At Google, we will drive the most long-term value to our users by having a single, cohesive developer product offering that leverages a shared agent harness co-optimized with Gemini models. As part of this unification effort, the Antigravity CLI took inspiration from core Gemini CLI product and harness components. This brings the best insights into a focused CLI and agent experience for developers. Read more about migrating your workflows from the Gemini CLI to the Antigravity CLI [here](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)

## Looking Forward

The Antigravity CLI will continue to inherit and incorporate improvements to the core harness and agentic paradigms. Antigravity 2.0 will be optimized for comprehensiveness in its feature set, while the Antigravity CLI will be optimized for speed and low overhead. 

We are excited to expand the Google Antigravity offering with the Antigravity CLI, which will continue to be a key piece of the overall Antigravity product offering.

{{button: Download Antigravity CLI, /download}}
