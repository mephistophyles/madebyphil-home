---
title: Mokkapi
description: Self-hosted API mocking tool for developers
type: Software
date: 2025-11-15
featured: true
image: /project_1.jpg
tags: [typescript, api, docker, developer-tools]
status: completed
link: https://github.com/example/mokkapi
---

Mokkapi is a lightweight, self-hosted API mocking tool designed to help developers create and manage mock endpoints during development.

## The Problem

When building frontend applications, you often need to work with APIs that don't exist yet, or you need to test edge cases that are difficult to reproduce with real backends. Most existing solutions are either cloud-based (requiring internet) or overly complex for simple use cases.

## The Solution

Mokkapi runs locally via Docker and provides a simple YAML-based configuration for defining mock endpoints. It supports:

- **Dynamic responses** based on request parameters
- **Latency simulation** for testing loading states
- **Error injection** for testing error handling
- **Request logging** for debugging

## Technical Stack

- TypeScript for type safety
- Express.js for the server
- Docker for easy deployment
- YAML configuration for simplicity

## What I Learned

Building Mokkapi taught me a lot about developer experience design. The biggest lesson was that configuration should be dead simple—if someone has to read documentation to set up basic mocks, you've already failed.
