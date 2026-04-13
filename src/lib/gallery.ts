import type { GalleryItem, GalleryFrontmatter, GalleryOrigin, GalleryAttribution } from '@/types/gallery';
import { detectTier } from '@/types/gallery';

// Import all markdown files from content/gallery
const galleryFiles = import.meta.glob('/content/gallery/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

// Simple browser-compatible frontmatter parser
function parseFrontmatter(rawContent: string): { data: Record<string, unknown>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: rawContent };
  }

  const [, yamlContent, markdownContent] = match;
  const data: Record<string, unknown> = {};

  // Parse YAML-like frontmatter line by line
  const lines = yamlContent.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmed.slice(0, colonIndex).trim();
    let value: unknown = trimmed.slice(colonIndex + 1).trim();

    // Parse arrays like [tag1, tag2, tag3]
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^['"]|['"]$/g, ''));
    }
    // Parse booleans
    else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }
    // Remove surrounding quotes from strings
    else if (typeof value === 'string') {
      value = value.replace(/^['"]|['"]$/g, '');
    }

    data[key] = value;
  }

  return { data, content: markdownContent.trim() };
}

function parseGalleryItem(filePath: string, rawContent: string): GalleryItem {
  const { data, content } = parseFrontmatter(rawContent);
  const frontmatter = data as unknown as GalleryFrontmatter;

  // Extract slug from file path
  const slug = filePath.split('/').pop()?.replace('.md', '') || '';

  // Build attribution from flat fields
  let attribution: GalleryAttribution | undefined;
  if (frontmatter.attribution_creator) {
    attribution = {
      creator: frontmatter.attribution_creator,
      url: frontmatter.attribution_url,
      license: frontmatter.attribution_license,
    };
  }

  return {
    ...frontmatter,
    slug,
    content,
    tier: detectTier(content),
    attribution,
  };
}

function getAllGalleryItemsSync(): GalleryItem[] {
  const items: GalleryItem[] = [];

  for (const [path, rawContent] of Object.entries(galleryFiles)) {
    items.push(parseGalleryItem(path, rawContent as string));
  }

  // Sort by date (newest first)
  return items.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Cached gallery items
let cachedItems: GalleryItem[] | null = null;

export function getAllGalleryItems(): GalleryItem[] {
  if (!cachedItems) {
    cachedItems = getAllGalleryItemsSync();
  }
  return cachedItems;
}

export function getFeaturedGalleryItems(): GalleryItem[] {
  return getAllGalleryItems().filter(item => item.featured);
}

export function getRecentGalleryItems(count: number): GalleryItem[] {
  return getAllGalleryItems().slice(0, count);
}

export function getGalleryItemBySlug(slug: string): GalleryItem | undefined {
  return getAllGalleryItems().find(item => item.slug === slug);
}

export function getGalleryItemsByOrigin(origin: GalleryOrigin): GalleryItem[] {
  return getAllGalleryItems().filter(item => item.origin === origin);
}

export function getAvailableOrigins(): GalleryOrigin[] {
  const items = getAllGalleryItems();
  const origins = new Set<GalleryOrigin>();
  items.forEach(i => origins.add(i.origin));
  return Array.from(origins);
}

export function getGalleryItemCounts(): Record<GalleryOrigin, number> {
  const items = getAllGalleryItems();
  const counts = {} as Record<GalleryOrigin, number>;
  for (const origin of getAvailableOrigins()) {
    counts[origin] = items.filter(i => i.origin === origin).length;
  }
  return counts;
}
