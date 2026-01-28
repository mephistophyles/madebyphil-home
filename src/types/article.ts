export type ArticleCategory = 'Notes' | 'Software' | 'Physical' | 'Business';

export interface ArticleFrontmatter {
  title: string;
  excerpt: string;
  category: ArticleCategory;
  date: string;
  featured: boolean;
  tags: string[];
  image?: string;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
}
