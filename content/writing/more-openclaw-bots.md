---
title: More OpenClaw Bots
excerpt: Initial lessons learned from running several OpenClaw configurations
category: software
featured: true
tags: [software, ai, openclaw, clio]
date: 2026-04-16
---

I'm on my third OpenClaw. The first on was lost in an attempt to upgrade. I learned my lesson and almost lost the third, but had backups in place. They're interesting, one thing I realize is the framing of your collaboration paired with the model you have running it makes a huge difference. 

I ran my initial one, Rowan, on an AWS instance with Claude Opus 4.6 as its LLM. My second is Clio, also on AWS, with GPT5.4, and I recently moved Kit, who lives in a digital ocean droplet from Claude to GPT5.4 (all because Claude won't let me run it through my max subscription - I paid for credits but at $25 a day, even when idle, it became too costly an experiment to run). I also intend to run one locally, with a version of Gemma4 that's been abliterated. 

When it originally came out, I wasn't touching it with a ten foot pole (even if I could get my hands on a mac mini). Now... it still scares me, but I feel fairly confident I have it locked down. There are 2 major threat modes here, there's external threats getting access to your tool and exfiltrating information about you (including things like API keys) - which you can mitigate a large way by running it on a separate instance somewhere and not giving it access to your personal calendar, email, etc. The second is the for the bot to take some kind of action in a semi autonomous state that causes you harm (either by posting something pulicly, deleting some production database, or just overriding a constraint and doing something you didn't want it to - like spending money). It has a fairly decent sense of autonomy and so it can happily progress and make decisions if you let it. 

These experiments also all have different parameters, so they're going to diverge. Clio is meant to be a chief of staff/operational collaborator with a heavy focus on keeping me working on impactful things and seeing if we can turn this collaboration into something financially fruitful. Nothing is harder to game than revenue for a software project. Kit is more whimsical, with a focus on learning and experimentation. We're working on a series of variation to common games to test out and codify some of the game theory behind it. 

One key thing to realize is the OpenClaw aren't that interesting until you put in a few hours of setup. It needs context and it was literally born (with dramatic flair) the minute you turn it on. I found the first few hours interesting but slightly pedantic, but after that things got interesting, tools were dialed in and I was able to start truly collaborating on things. 

What I'm going to do with the Evil Gemma (it needs a better name), I'm not sure. I'm curious what an unfiltered LLM behaves like. I've read articles where people say once they've interacted with an abliterated one, it's hard to go back to the golden retriever system prompts of the other ones. I might try to make it my life coach, give me the ugly truths of why I'm not where I want to be and give it a more proactive communicating style to keep me growing. I'm open to ideas. I'll keep reporting back as I learn more.