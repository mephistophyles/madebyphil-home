---
title: Lessons from building Mokkapi
excerpt: What I learned shipping a developer tool to production.
category: Software
date: 2025-12-28
featured: true
tags: [developer-tools, api, lessons-learned]
---

After six months of building and shipping Mokkapi, here's what I've learned about creating developer tools.

## Developer Experience is Product Experience

When your users are developers, the line between "product" and "developer experience" disappears. The API *is* the product. The documentation *is* the product. The error messages *are* the product.

I spent more time on error messages than I expected. A good error message tells you:
1. What went wrong
2. Where it went wrong
3. How to fix it

Bad error messages just say "invalid configuration" and leave you guessing.

## Defaults Matter More Than Features

Early on, I kept adding configuration options. "Let users customize everything!" It felt like I was being user-friendly.

But I was actually creating work. Every option is a decision someone has to make. The best defaults are ones that work for 90% of use cases without any configuration at all.

Now my rule is: if a feature needs configuration to be useful, the feature isn't ready yet.

## Documentation is a Design Tool

Writing documentation before building features changed how I think about design. If a feature is hard to explain, it's probably hard to use.

The documentation-first approach also reveals unnecessary complexity. When you find yourself writing paragraphs to explain a simple concept, that's a signal to simplify the concept.

## Ship Something Small, Then Iterate

The first version of Mokkapi did one thing: return static JSON responses for defined endpoints. That's it. No dynamic responses, no latency simulation, no request logging.

That tiny version taught me more about what users actually needed than any amount of planning would have. Real feedback from real usage beats hypothetical requirements every time.

## The 90% Trap

There's a dangerous moment in every project where it's "90% done." This is usually when the real work begins.

The last 10% includes:
- Edge cases you didn't consider
- Platform-specific bugs
- Documentation
- Error handling
- Installation and setup experience

I've learned to multiply my "90% done" estimate by three to get the actual remaining work.

## What's Next

Mokkapi is stable now, and I'm using it in my own projects. I'm not planning to commercialize it—it's more valuable to me as a tool and a learning experience than as a product.

But the lessons apply to everything I build next.
