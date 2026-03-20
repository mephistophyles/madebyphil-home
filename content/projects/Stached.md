---
title: Stached
description: Open Source and SaaS offering for static JSON and other data
type: Software
date: 2026-03-20
featured: true
image: /stached-logo2.png
tags: [typescript, python, api, docker, developer-tools]
status: live
link: https://www.stached.io
---

Stached is the pivot from what was originally Mokkapi. The attempt to focus both on testing capabilities and static deployment wasn't useful. More than one conversation ended with me being asked how I use the tool, and that was just this narrow use case.

## The Problem

You don't always need a separate backend for each project. Some config files or data files are shared across multiple projects. Rather than store them all in S3, Mongo or a gist, relatively static ones can be stored in a single place. You get all the benefits of a web server and API to pull data (password or JWT authentication) while not needing to duplicate the effort.

## The Solution

One backend service focused on delivering static files wherever they are needed. If the use case is too simple for CDN, or S3, or Mongo, think of Stached. Built for rapic prototyping and maximum flexibility with the minimum of config and overhead.

## Technical Stack

- Django backend to build on a rock solid platform for APIs, auth and extensibility
- Open source by default so you can deploy it yourself and extend it as you want
- Simple SaaS pricing, with an equally simple managed services version if this becomes a cornerstone of your development process
- API first, web interface is nice but optional.

## What I Learned

Building Mokkapi taught me a lot about the customer experience. Don't try to do too many things. Just do one thing really well. In this case we're just stashing data for easy and regular access later. All my use cases port over and now I have more focus for the product while being able to use it genuinely for all other projects.