---
title: Retiring the Clio Project
excerpt: Retiring the project, but not Clio
category: AI
featured: false
tags: [experiments, AI, software]
date: 2026-08-03
---

Despite my writing's impression, I have been using and experimenting with Clio a fair bit still. I recently added my wife to a group chat with Clio, so we could collectively meal prep (based on seasonality, and we could update our preferences each week). However, the world has moved fast, and one thing that has been truly superceded is the need for Clio to be the central focus of my workflows. 

Clio remains, but is no longer the central communications hub. I was having Clio build full apps, and then host them in that same instance, this was obviously a bit limiting. So I took a minute to rethink the problem and read up on people who have done similar things. Specifically I draw a lot of inspiration from Mete Polat (https://metedata.substack.com/p/016-my-personal-software-journey). While I'm going down the Mac Mini rabbit hole, I am setting up something derived from it.

![Basic newtork topology for madebyphil](/madebyphil_access_topology_v2.png)

I've decided to use my site's domain as the main interface for public and private work. The tailscale network helps me protect things. 

![Workflows on new topology](/madebyphil_deploy_artifact_backup_flows.png)

Another evolution worth mentioning is that Clio is now more of an experimental platform. As is implied in the diagram above, once there's a use case that I want to put into production (effectively running the localhost version permanently), I have it create an app that lives in a monorepo, or use one of those [unreasonably effective HTML artifacts](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html). This maintains a ton of the same work of my prototype projects like the [dino-atlas](https://dino-atlas.madebyphil.com) I made for my son.

We're also going to take this one step further in the devops and maturity phase. We'll be using a durable postgres host across all projects. This means that down the line when I want to aggregate data, I can. But it also keeps most of the data in a similar format. There are also extensibility options here, since I can start to create other access routes (like a Cloudflare tunnel) for other users. This also supports what I'm doing from an AI infra perspective (more on that in another post).