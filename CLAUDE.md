# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server with HMR
- `npm run build` - Type-check with TypeScript and build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Architecture

This is a personal portfolio/homepage built with React 19, TypeScript, Vite, and Tailwind CSS. It uses shadcn/ui components (new-york style) with Radix UI primitives.

### Key Technologies
- **GSAP + ScrollTrigger**: Used for scroll-based animations and section pinning. The main App.tsx sets up a global snap behavior for pinned sections.
- **shadcn/ui**: Component library configured in `components.json`. Add components with `npx shadcn@latest add <component>`.

### Project Structure
- `src/pages/` - Page components (HomePage, ProjectsPage, ProjectPage, WritingPage, ArticlePage, AboutPage)
- `src/components/ui/` - shadcn/ui components
- `src/components/` - App-specific components (Navigation, Layout, etc.)
- `src/lib/utils.ts` - Contains `cn()` helper for merging Tailwind classes
- `src/lib/projects.ts` - Project content utilities (getAllProjects, getFeaturedProjects, getProjectBySlug, etc.)
- `src/lib/articles.ts` - Article content utilities (getAllArticles, getRecentArticles, getArticleBySlug, etc.)
- `src/types/` - TypeScript type definitions (project.ts, article.ts)
- `content/projects/` - Markdown files for project content
- `content/writing/` - Markdown files for blog articles

### Styling Conventions
- **Typography**: Space Grotesk for headings (`font-display`), Inter for body (`font-body`), Caveat for handwritten annotations (`font-handwritten`)
- **Colors**: Warm palette with cream background (#F7F5F2), dark brown text (#2D2A26), coral accent (#D95D39)
- **CSS Variables**: Defined in `src/index.css` using HSL values for theming
- **Custom classes**: `.section-pinned` for full-viewport pinned sections, `.section-flowing` for normal scrolling sections

### Path Aliases
`@/*` maps to `./src/*` (configured in tsconfig.json and vite.config.ts)

## Content System

Projects and articles are managed as markdown files with YAML frontmatter. Content is loaded at build time via Vite's `import.meta.glob`.

### Adding a Project
Create a markdown file in `content/projects/` with this frontmatter:

```yaml
---
title: Project Title
description: Short description for cards/lists
type: Software | Physical | Business
date: 2026-01-15
featured: true | false
image: /project_image.jpg
tags: [tag1, tag2, tag3]
status: completed | in-progress
link: https://external-url.com (optional)
---

Full project content in markdown...
```

The filename becomes the URL slug (e.g., `mokkapi.md` → `/projects/mokkapi`).

### Adding an Article
Create a markdown file in `content/writing/` with this frontmatter:

```yaml
---
title: Article Title
excerpt: Short description for cards/lists
category: Notes | Software | Physical | Business
date: 2026-01-15
featured: true | false
tags: [tag1, tag2]
image: /optional_image.jpg (optional)
---

Full article content in markdown...
```

The filename becomes the URL slug (e.g., `my-post.md` → `/writing/my-post`).

### Content Utilities
- `src/lib/projects.ts` - `getAllProjects()`, `getFeaturedProjects()`, `getProjectBySlug(slug)`, `getProjectsByType(type)`, `getProjectCounts()`
- `src/lib/articles.ts` - `getAllArticles()`, `getRecentArticles(count)`, `getArticleBySlug(slug)`, `getArticlesByCategory(category)`, `getArticleCounts()`
