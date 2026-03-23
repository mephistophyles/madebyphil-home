import type { Project, ProjectFrontmatter, ProjectType } from '@/types/project';

// Import all markdown files from content/projects
const projectFiles = import.meta.glob('/content/projects/*.md', {
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

function parseProject(filePath: string, rawContent: string): Project {
  const { data, content } = parseFrontmatter(rawContent);
  const frontmatter = data as unknown as ProjectFrontmatter;

  // Extract slug from file path (e.g., "/content/projects/mokkapi.md" -> "mokkapi")
  const slug = filePath.split('/').pop()?.replace('.md', '') || '';

  return {
    ...frontmatter,
    slug,
    content,
  };
}

function getAllProjectsSync(): Project[] {
  const projects: Project[] = [];

  for (const [path, rawContent] of Object.entries(projectFiles)) {
    projects.push(parseProject(path, rawContent as string));
  }

  // Sort by date (newest first)
  return projects.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Cached projects list
let cachedProjects: Project[] | null = null;

export function getAllProjects(): Project[] {
  if (!cachedProjects) {
    cachedProjects = getAllProjectsSync();
  }
  return cachedProjects;
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter(project => project.featured);
}

export function getRandomFeaturedProjects(count: number): Project[] {
  const featured = getFeaturedProjects();
  const shuffled = [...featured].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find(project => project.slug === slug);
}

export function getProjectsByType(type: ProjectType): Project[] {
  return getAllProjects().filter(project => project.type === type);
}

export function getAvailableProjectTypes(): ProjectType[] {
  const projects = getAllProjects();
  const types = new Set<ProjectType>();
  projects.forEach(p => types.add(p.type));
  return Array.from(types);
}

export function getProjectCounts(): Record<ProjectType, number> {
  const projects = getAllProjects();
  const counts = {} as Record<ProjectType, number>;
  for (const type of getAvailableProjectTypes()) {
    counts[type] = projects.filter(p => p.type === type).length;
  }
  return counts;
}
