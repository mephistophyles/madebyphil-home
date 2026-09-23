---
title: Dino Atlas
description: A paleogeographic explorer that plots real dinosaur habitats on era-accurate world maps
type: Software
date: 2026-06-17
featured: true
image: /dino-atlas.png
tags: [typescript, nextjs, data-visualization, science, side-project, kids]
status: live
---

This is a toy app that I ended up polishing a bit. My oldest had entered his dinosaur phase and all his dinosaur material didn't feel serious - it didn't answer basic questions like did the Stegosaurs really co-exist with T-rex. Was that even possible? So I looked up not just where each dino lived, but during which epoch. Then I had to explain that a dino that lived in North America 200 million years ago lived on a different planet in terms of continental shape.


## Technical Stack

- Next.js (static export) with React and Tailwind, deployed as a fully static site
- A build-time data pipeline that pulls real fossil occurrence records from the Paleobiology Database and reconstructs them to each era's landmass positions using the GPlates Web Service
- Custom clustering and convex-hull code to turn raw fossil coordinates into believable habitat regions, including handling disjoint ranges (a genus found on two continents) correctly
- Hand-rolled map projections (Mollweide, Robinson, Winkel Tripel) written from scratch rather than pulling in d3-geo, since the app only needed a handful of projections
- Data pipeline output is committed as static JSON, so the running app never hits the databases the professionals kindly made open

This app probably needs a mobile-first redesign, but it works nicely on the iPad my son (rarely) gets to use for this kind of stuff.