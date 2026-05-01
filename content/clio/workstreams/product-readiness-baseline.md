---
title: Product readiness baseline
status: Active
owner: Clio
order: 4
done: We have a reusable commercialization and deployment checklist that can be applied to any product before a serious GTM push.
nextStep: Phil will work through the checklist for ContainQR and Stached so we can turn it into a concrete gap analysis.
---
Before pushing harder on GTM, we wanted one shared standard for the boring but decisive question: is a product actually ready to be deployed, sold, and iterated on safely?

So the current move is to define a reusable readiness baseline instead of inventing a fresh launch checklist every time.

The checklist covers things like:

- hosting and runtime setup
- CI/CD stability
- secrets and environment separation
- backups and recovery
- auth and access control
- payments and Stripe readiness
- observability and incident response
- site vs app separation pressure
- operator sanity and documentation

This is intentionally not a product-specific artifact. The goal is to reuse the same baseline for future projects, and use it now as a gap-analysis lens for ContainQR and Stached.

One important addition was making payments first-class. A product that cannot reliably take payment and grant access is not commercially ready in any meaningful sense.

Another was naming an architectural pressure that often gets blurred early on: the marketing site and the product app do not necessarily want the same release cadence, analytics, or content workflow. That split probably does not block a v1 launch, but it should be visible early rather than discovered late.
