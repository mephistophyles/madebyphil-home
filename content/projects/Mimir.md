---
title: Mimir
description: A pipeline that turns everything I read and listen to into a corroborated, cross-linked vault of atomic claims
type: Software
date: 2026-07-09
featured: true
image: /mimir.jpg
tags: [python, llm, rag, sqlite, developer-tools]
status: in-progress
link: https://github.com/mephistophyles/knowledge-pipeline
---

Mimir is my personal knowledge pipeline. It ingests the newsletters, podcasts, and articles I actually consume, pulls out the individual claims being made, and writes them into a git-backed Obsidian vault as atomic notes — each one tied back to the exact source, model, and prompt version that produced it. The idea is an operating memory I can actually query later instead of a pile of half-read tabs and podcast episodes I half-remember.

There are a lot of 'second brain' mechanics out there, but I want to combine book notes, my thoughts, and those of experts I read. The idea is simple, make their ideas and mine accessible in queries in a way that I can pull on the thread and see where the idea comes from. Provenance of an idea is a first class aspect of this.

I also wanted to get hands-on with evals, encoding, RAG, information knowledge, swapping in various LLMs to see their effect. 

## Technical Stack

- Python, Typer CLI, FastAPI + HTMX dashboard for the control plane
- SQLite as the state machine (jobs, controls, runs, costs, claims) plus sqlite-vec for embedding search
- Provider-agnostic LLM layer — one adapter routes to OpenAI, OpenRouter, NVIDIA, or local Ollama per stage
- trafilatura for web extraction, git for the vault itself
- Terraform-provisioned AWS box (EC2 + S3 + Route 53) for always-on operation, moving off the laptop

## What I Learned

A lot of the building surfaced questions that I hadn't thought of ahead of time. I learned that there are hidden complexities of agentic workflows. Surfacing those challenges and addressing their trade offs makes it possible to reason about them for future use cases. Having a pricing dimension also showed me how cheap some of the open weight models actually are, and that they're really only 1 step away from implementation. It affected how I reason about the build of [Forked Fiction](../projects/Forked%20Fiction.md).