---
title: SimAnt 2026
description: A modern homage to Maxis's SimAnt — a GPU-simulated leafcutter colony with no pathfinding, just emergent trails
type: Software
date: 2026-07-24
featured: true
image: /simant.jpg
tags: [typescript, webgl2, simulation, game, stigmergy]
status: in-progress
---

SimAnt 2026 is my homage to Maxis's 1991 SimAnt, not a remake of it. No sprites, no scripted ant AI — just 10,000 individually dumb agents that coordinate the way real ants do: by dropping and sensing pheromone in a shared field. I wanted to leverage ants being 'dumb' agents, but eventually add a fun game element. The ability to possess an ant is planned, but we need clearer game mechanics first. This was mostly a PoC to show that a browser could handle 10k ants just doing their thing.

## The Idea

I'd already tried this once, in a repo called antWar, built from a single one-shot prompt back in June. It worked as a proof of concept but it was a toy, not a simulation. SimAnt 2026 is the real attempt: build the stigmergic engine properly first, prove it holds up at scale, and only then layer a game on top of it. Everything downstream — foraging, the nest, the colony's economy, castes, the queen — depends on that foundation being solid.

## The Game

Right now there's no "game" in the traditional sense — you watch. Agents pour out of the nest, find the nearest food, lay a bright trail, harvest it to zero, and a new trail forms to another source while the first fades. That was M0: prove the pheromone-field architecture works before building anything on it.

Since then it's grown a second domain (an actual nest, dug underground, connected to the surface by a gate), a working economy (cut leaf, cache it, process it, garden fungus, eat the food), and a full ant lifecycle — the queen lays, larvae eat, they eclose into castes by feeding, and old ants die, closing the population loop. The current question/next step is rescaling time and colony size down to something a person could actually play with, rather than watch.

## Technical Stack

- TypeScript, Vite, and Pixi.js for rendering
- WebGL2 + OffscreenCanvas: simulation and rendering both run inside a worker off the main thread
- Two pheromone channels (trail, home) as an RGBA32F ping-pong texture, updated by raw WebGL2 deposit/diffuse/decay passes
- A CPU reference backend that mirrors the GPU field, used for deterministic tests and headless CI
- Struct-of-arrays agent storage over one flat ArrayBuffer, allocation-free per-tick kernel

## Next steps

As soon as I get the rescaling right, I plan to introduce a few gamified milestones. Eventually I do want a hive that works almost entirely autonomously, within a world scenario that has win criteria. 