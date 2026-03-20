---
title: Containqr
description: A simple tool to track where all your stored stuff is
type: Software
date: 2026-11-15
featured: true
image: /containqr-logo.png
tags: [typescript, api, docker, b2c]
status: completed
link: https://www.containqr.com
---

Containqr is a simple tool that lets you track all you storage containers and their contents in a single place. Add QR codes to each container to look up their contents (great when they're stacked or in awkward places) and search all the contents to figure out where that really specific thing is you need.

## The Problem

We all have too much stuff. It's stored in different places, in boxes we can't see inside easily. Where are the christmas lights? Where are the kids summer clothes sized 3t and up?

## The Solution

Incrementally (or in one big push) add QR codes to each container and log their contents. Then you can search them and find out where they're stored when you need something. Simple.

## Technical Stack

- TypeScript for type safety and React because it's easy to make things pretty
- Django for the server, and Google OAuth because you shouldn't trust me with any passwords
- Docker for easy deployment
- Stripe for easy, trustless payments.

## What I Learned

I've used this tool more often than I thought I would. Clones exist out there, but the best way to know this one will be around for a while (because you do need to pay for it) is that I use it too. Not every day, this is like insurance or data backups, you'll be glad you have it a few times a year and that alone will make it worth it.