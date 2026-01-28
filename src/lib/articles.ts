import type { Article, ArticleFrontmatter, ArticleCategory } from '@/types/article';

// Import all markdown files from content/writing
const articleFiles = import.meta.glob('/content/writing/*.md', {
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

function parseArticle(filePath: string, rawContent: string): Article {
  const { data, content } = parseFrontmatter(rawContent);
  const frontmatter = data as unknown as ArticleFrontmatter;

  // Extract slug from file path (e.g., "/content/writing/my-post.md" -> "my-post")
  const slug = filePath.split('/').pop()?.replace('.md', '') || '';

  return {
    ...frontmatter,
    slug,
    content,
  };
}

function getAllArticlesSync(): Article[] {
  const articles: Article[] = [];

  for (const [path, rawContent] of Object.entries(articleFiles)) {
    articles.push(parseArticle(path, rawContent as string));
  }

  // Sort by date (newest first)
  return articles.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Cached articles list
let cachedArticles: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (!cachedArticles) {
    cachedArticles = getAllArticlesSync();
  }
  return cachedArticles;
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter(article => article.featured);
}

export function getRecentArticles(count: number = 2): Article[] {
  return getAllArticles().slice(0, count);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find(article => article.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return getAllArticles().filter(article => article.category === category);
}

export function getAvailableArticleCategories(): ArticleCategory[] {
  const articles = getAllArticles();
  const categories = new Set<ArticleCategory>();
  articles.forEach(a => categories.add(a.category));
  return Array.from(categories);
}

export function getArticleCounts(): Record<ArticleCategory, number> {
  const articles = getAllArticles();
  const counts = {} as Record<ArticleCategory, number>;
  for (const category of getAvailableArticleCategories()) {
    counts[category] = articles.filter(a => a.category === category).length;
  }
  return counts;
}
