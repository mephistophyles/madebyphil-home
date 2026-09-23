---
title: Weighted Insights
description: Weighted polling for teams where not every vote should count the same
type: Software
date: 2026-01-17
featured: true
image: /weighted.jpg
tags: [react, django, postgresql, b2b, saas]
status: in-progress
---

I wanted a polling solution, both real-time and longer term. I wanted to get feedback on portfolio as well as product roadmaps. I didn't believe every vote was worth the same, so I needed an engine that could handle that. I also wanted to allow some users to perform weighted choice voting. This led me here.

## The Solution

Weighted Insights lets me define tiers (Free, Supporter, Pro, Enterprise, or whatever fits) with a vote weight attached to each one, assign voters to a tier, and run polls using single-choice, ranked-choice, or point-allocation voting. Results can be viewed either weighted or raw, so you can see both what your most invested users want and what the crowd wants, side by side. It's also useful for post-fact weighting. 

## Technical Stack

- React, TypeScript, and shadcn/ui on the frontend, with Vite and Vitest for build and tests
- Django backend for multi-tenant auth, organizations, and JWT-based API access
- PostgreSQL with a tenant-discriminator pattern so every org's data stays scoped
- Docker Compose for local Postgres + Redis during development
- Recharts for weighted vs. unweighted results visualization

## What I Learned

The frontend came together fast starting from a Lovable-generated scaffold, and it was enough to prove the core idea works: seeing the same poll flip its winner depending on whether you weight it is a genuinely useful "aha" moment to show someone. The goal is to eventually make this a continuous functionality for supporters or backers (financial or just watching my repo). That way I can automate feedback gathering (human or agent). 