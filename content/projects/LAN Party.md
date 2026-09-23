---
title: LAN Party
description: An opinionated host for local-multiplayer browser games, no installs required
type: Software
date: 2026-07-19
featured: true
image: /lan-party.png
tags: [typescript, react, websockets, games, cli]
status: in-progress
link: https://github.com/Made-By-Phil/lan-party
---

I wanted to run a game night without the usual friction: everyone digging through app stores, arguing about whose phone has the right app installed, or waiting for a shared screen to reconnect to wifi. LAN Party is my answer — run one command on a laptop, everyone else joins from a browser on their phone, and you're playing in under a minute.

## The Problem

Local multiplayer games are a great excuse to get people off their phones and looking at each other, but the tooling gets in the way. Native apps mean install friction and platform lock-in. Web-based party games usually mean someone's paying for a cloud server and hoping the internet holds up. None of that should matter when everyone playing is standing in the same room.

## The Solution

One computer hosts the party (`npx lan-party`), prints a LAN URL and QR code, and everyone else joins from a browser — no accounts, no installs. A spare laptop or TV can join as the shared screen for leaderboards and arena-style games. Identity is a token in localStorage, so people can drop off wifi or refresh mid-game and resume their seat, name, and points. Games themselves are drop-in folders of TypeScript with no build step — the host bundles them with esbuild at startup — so writing a new game is just writing a manifest, a server module, and a couple of React components.

The framework ships with no games of its own. The curated collection — Trivia, Blackjack, and Boom Grid (a real-time Bomberman-style arena) to start, with a growing set of community-style additions like Hearts, Checkers, Battleships, and Pictionary — lives in a sibling repo, [lan-party-games](https://github.com/Made-By-Phil/lan-party-games), and installs by name (`npx lan-party add trivia`).

## Technical Stack

- Node + TypeScript across the host, SDK, and all UIs, with React for the shell and game clients
- WebSockets for the host-authoritative game loop — all state lives on the host, clients just send actions and render snapshots
- esbuild bundling games at host startup, so game authors need zero toolchain of their own
- A separate curated games repo with its own CI validation, so third-party games can't take the party down
- Deliberately no security, no internet play, no persistence beyond the party itself — it's built to run among trusted people in one room, and staying honest about that scope kept the whole thing simple

## What I Learned

What's been interesting is creating this scaffolding has been interesting when you hand the agents.md file to claude vs codex. They seem to interpret game concepts and design requirements that are implicit differently. We've played this a few times at home, but it doesn't really compete with Mario Kart yet. Hopefully it can keep growing and handle some more complex games so the stickiness just grows. 