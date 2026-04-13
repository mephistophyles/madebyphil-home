export type GalleryOrigin = 'original' | 'remix' | 'commission';
export type GalleryTier = 'snapshot' | 'showcase' | 'feature';

export interface GalleryAttribution {
  creator: string;
  url?: string;
  license?: string;
}

export interface GalleryFrontmatter {
  title: string;
  description?: string;
  origin: GalleryOrigin;
  date: string;
  featured: boolean;
  images: string[];
  tags: string[];
  filament?: string;
  printer?: string;
  project_slug?: string;
  attribution_creator?: string;
  attribution_url?: string;
  attribution_license?: string;
}

export interface GalleryItem extends GalleryFrontmatter {
  slug: string;
  content: string;
  tier: GalleryTier;
  attribution?: GalleryAttribution;
}

export function detectTier(content: string): GalleryTier {
  const trimmed = content.trim();
  if (trimmed.length === 0) return 'snapshot';
  if (trimmed.length < 200) return 'showcase';
  return 'feature';
}
