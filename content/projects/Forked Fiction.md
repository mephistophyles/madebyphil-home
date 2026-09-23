---
title: Forked Fiction
description: A narrative engine that lets readers reshape public-domain stories around their own preferences
type: Software
date: 2026-08-05
featured: true
image: /forked-fiction.png
tags: [python, fastapi, react, llm, research]
status: in-progress
---

Forked Fiction is a research harness for a narrative engine that transforms stories the way a reader wants them told: swap a character's gender, remove a POV, dial the tone, backtrack and try a different fork, and have the system own the consequences of that change instead of just splicing in broken prose. It's the pivot of an earlier version of the same idea, which put author-side tooling first. This version inverts that: the LLM does the transformation work directly, for readers reshaping stories and eventually for writers exploring continuations of a draft.

## The Problem

"Choose your own adventure" and fan-fiction both gesture at the same itch: what if this story went differently? Doing that well by hand is enormous manual labor. Doing it with a raw LLM prompt gets you prose that drifts, forgets earlier promises, or quietly breaks the parts of the story that were supposed to stay locked. Nobody wants a personalized story that loses the plot along the way.

## The Solution

A pure-Python engine ingests a public-domain work into a structured "canon" — scenes, threads, characters, POV map, and which elements are locked, resistant, or free to change. Readers request deltas (typed operations, tagged variables, or freeform asks), and the engine routes each one through a tiered transformation pipeline: deterministic edits where possible, small-model rewrites where sufficient, frontier-model generation where the structure itself needs to change. Guardrails catch changes that would orphan a payoff and re-plan around them rather than just letting the story go slack. Every generation call is logged with its full config, so the work doubles as an experiment log answering real questions about fidelity, guardrails, and generation economics — not just a demo.

## Technical Stack

- Python engine, deliberately kept headless and separable from the app around it
- FastAPI harness exposing the engine, plus the delta-capture and experiment tooling
- React + Vite + TypeScript reader for the actual reading experience
- Postgres for canon and fork-state storage
- All model traffic routed through OpenRouter, mixing frontier and small models by task

## What I Learned

The earlier author-tooling version of this idea put the crafting burden on the author and just supported branching around it — technically sound, but nobody used it that way. Flipping the leverage so the model does the transformation work directly is a much better fit for how people actually want to read. This build is still mid-experiment: five public-domain works are ingested and distilled, guardrails and forking are working end to end, and the next phase is inviting real readers in to see whether the personalized version is actually one they'd choose to read.
