import { getAllProjects, getFeaturedProjects } from './projects';
import { getAllArticles, getFeaturedArticles } from './articles';
import { getAllGalleryItems, getFeaturedGalleryItems } from './gallery';
import type { Project } from '@/types/project';
import type { Article } from '@/types/article';
import type { GalleryItem } from '@/types/gallery';

export type FeedCategory = 'Project' | 'Writing' | 'Gallery';

export type FeedItem =
  | { kind: 'project'; category: 'Project'; data: Project; date: string; title: string; description: string; tags: string[]; featured: boolean; image?: string; href: string }
  | { kind: 'article'; category: 'Writing'; data: Article; date: string; title: string; description: string; tags: string[]; featured: boolean; image?: string; href: string }
  | { kind: 'gallery'; category: 'Gallery'; data: GalleryItem; date: string; title: string; description: string; tags: string[]; featured: boolean; image?: string; href: string };

function projectToFeedItem(p: Project): FeedItem {
  return {
    kind: 'project',
    category: 'Project',
    data: p,
    date: p.date,
    title: p.title,
    description: p.description,
    tags: p.tags,
    featured: p.featured,
    image: p.image,
    href: `/projects/${p.slug}`,
  };
}

function articleToFeedItem(a: Article): FeedItem {
  return {
    kind: 'article',
    category: 'Writing',
    data: a,
    date: a.date,
    title: a.title,
    description: a.excerpt,
    tags: a.tags,
    featured: a.featured,
    image: a.image,
    href: `/writing/${a.slug}`,
  };
}

function galleryToFeedItem(g: GalleryItem): FeedItem {
  return {
    kind: 'gallery',
    category: 'Gallery',
    data: g,
    date: g.date,
    title: g.title,
    description: g.description || '',
    tags: g.tags,
    featured: g.featured,
    image: g.images[0],
    href: g.tier === 'feature' ? `/gallery/${g.slug}` : `/gallery`,
  };
}

let cachedFeed: FeedItem[] | null = null;

export function getAllFeedItems(): FeedItem[] {
  if (!cachedFeed) {
    const items: FeedItem[] = [
      ...getAllProjects().map(projectToFeedItem),
      ...getAllArticles().map(articleToFeedItem),
      ...getAllGalleryItems().map(galleryToFeedItem),
    ];
    cachedFeed = items.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  return cachedFeed;
}

export function getFeaturedFeedItems(): FeedItem[] {
  return [
    ...getFeaturedProjects().map(projectToFeedItem),
    ...getFeaturedArticles().map(articleToFeedItem),
    ...getFeaturedGalleryItems().map(galleryToFeedItem),
  ].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getRandomFeaturedFeedItems(count: number): FeedItem[] {
  const featured = getFeaturedFeedItems().filter(item => item.image);
  const shuffled = [...featured].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getAllFeedTags(): string[] {
  const tags = new Set<string>();
  for (const item of getAllFeedItems()) {
    for (const tag of item.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

export function getAvailableFeedCategories(): FeedCategory[] {
  const cats = new Set<FeedCategory>();
  for (const item of getAllFeedItems()) {
    cats.add(item.category);
  }
  return Array.from(cats);
}
