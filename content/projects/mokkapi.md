---
title: Mokkapi
description: Self-hosted API mocking tool for developers
type: Software
date: 2025-2-25
featured: true
image: /mokkapi-logo.png
tags: [django, api, docker, developer-tools]
status: pivoted
link: https://github.com/mokkapi/mokkapi
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

- TypeScript for type safety and a React frontend
- Django for the server
- Docker for easy deployment

## What I Learned

Getting the first one out the door is hard. Starting a business and putting yourself out there as an entrepreneur is scary. There is also a lot more that goes into building a product and then a business than just making working software. Talking to prospective customers taught me that if your product doesn't really excel at a use case you believe in, they won't even try it. I tried to do too much and build more than I talked to customers. 