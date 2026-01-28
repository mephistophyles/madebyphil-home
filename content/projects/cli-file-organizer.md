---
title: CLI File Organizer
description: Command-line tool for organizing downloads folder
type: Software
date: 2025-12-15
featured: false
image: /project_software.jpg
tags: [rust, cli, automation]
status: completed
link: https://github.com/example/file-organizer
---

A fast command-line tool that automatically organizes files in your downloads folder based on configurable rules.

## The Problem

My downloads folder was a disaster—hundreds of files accumulated over months. I needed something that could clean it up and keep it organized going forward.

## How It Works

The tool watches your downloads folder (or any folder you specify) and moves files based on rules you define:

```yaml
rules:
  - match: "*.pdf"
    destination: ~/Documents/PDFs
  - match: "*.{jpg,png,gif}"
    destination: ~/Pictures/Downloads
  - match: "*.dmg"
    destination: ~/Applications/Installers
```

It can run as a daemon for continuous organization, or as a one-time cleanup command.

## Why Rust?

I chose Rust for the performance and the excellent file system libraries. The tool needs to be fast enough that you don't notice it running in the background, and Rust delivers that.

## Recent Update (Dec 2025)

Added batch processing mode for cleaning up large backlogs. You can now preview what the tool will do before committing, and undo recent moves if something goes wrong.

## Installation

Available via Cargo: `cargo install file-organizer`
