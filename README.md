# madebyphil.com

My personal homepage — a place to share the projects I build across software, woodworking, 3D printing, and whatever else I get into.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui** (new-york style)
- **GSAP + ScrollTrigger** for scroll animations
- Markdown files with YAML frontmatter for all content

## Content

Projects live in `content/projects/` and writing in `content/writing/`. Each markdown file becomes a page — the filename is the URL slug. Add frontmatter fields like `featured: true` to surface content on the homepage.

See `CLAUDE.md` for the full frontmatter schema and content conventions.

## Development

```bash
npm install
npm run dev       # dev server with HMR
npm run build     # type-check + production build
npm run preview   # preview production build locally
```

## Fork it

Feel free to fork this and use it as a starting point for your own personal site. Swap out the content, tweak the palette in `src/index.css`, and make it yours.
