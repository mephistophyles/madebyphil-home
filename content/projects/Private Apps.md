---
title: Private Apps
description: A small family of self-hosted apps built for one household, not for a market
type: Software
date: 2026-08-18
featured: true
image: /pers-apps.jpg
tags: [python, fastapi, postgres, docker, self-hosted]
status: live
---

Not everything I build is meant to be sold. A handful of these are just apps my household actually uses every day, running on a box behind our tailnet. Chores, Monthly Close, Text Yourself and True Inflation all started the same way: something was mildly annoying, the existing SaaS answer wanted an account and a subscription, and the whole thing was a weekend of work.

## The Problem

The market for household software is genuinely bad. Every chore tracker wants a family account and a monthly fee. Every budgeting app wants read access to my bank. Every shared notes app is really a chat app wearing a hat. And all of them are built for the average household rather than mine, so you end up bending your habits around someone else's product decisions.

The other problem is that these apps are small. Too small to justify signing up for anything, but big enough that a spreadsheet stops working after a month.

## The Solution

Four small apps, each doing exactly one household job:

- **Chores** — a chore board grouped into daily, weekly and monthly cycles. It rolls over on its own, and every tick is logged against a person, append-only, so "who actually did the bins" has an answer.
- **Monthly Close** — a shared ledger. Import CSVs from checking, credit cards and investments, review the categorisation before it hits reporting, and close each month against category and savings targets.
- **Text Yourself** — a shared notebook shaped like message threads. Offline-first with a full local projection in IndexedDB, so it works on a phone in the garden.
- **True Inflation** — a personal inflation calculator. Same official CPI data, but weighted by what we actually spend rather than the average urban household.

## Technical Stack

- FastAPI and Postgres for anything with real state, plain HTML and Canvas where a build step would be overkill
- Docker Compose per app, each owning its own database, deployed by GitHub Actions
- No login screens and no user tables. The tailnet and an nginx reverse proxy handle identity, passing `X-Auth-User` down to the app
- A single-user mode in every app so it runs locally without any of that

## What I Learned

Deleting the auth system was the unlock. Once I accepted that the network boundary *is* the security boundary for something only two people can reach, each app got dramatically smaller — no sign-up flow, no password reset, no session handling, no email provider. That's most of the work in a normal CRUD app, gone.

It also turns out that building for a known set of users is a completely different discipline to building for a market. There's no need to generalise, no need to guess. If it doesn't fit, I change it that evening. These are the projects with the highest ratio of use to effort of anything I've built.
