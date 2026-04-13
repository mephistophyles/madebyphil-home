import type {
  ClioExperiment,
  ClioExperimentFrontmatter,
  ClioOverviewSection,
  ClioPrinciple,
  ClioPrincipleFrontmatter,
  ClioSoulArtifact,
  ClioSoulArtifactFrontmatter,
  ClioWorkstream,
  ClioWorkstreamFrontmatter,
} from '@/types/clio';

export const clioNavItems = [
  { label: 'Overview', to: '/clio' },
  { label: 'Experiments', to: '/clio/experiments' },
  { label: 'Principles', to: '/clio/principles' },
  { label: 'Workstreams', to: '/clio/workstreams' },
  { label: 'Soul', to: '/clio/soul' },
];

export const clioOverviewSections: ClioOverviewSection[] = [
  {
    title: 'Experiments',
    eyebrow: 'Try things in public',
    href: '/clio/experiments',
    description:
      'Small tests with explicit bets, visible evidence, and writeups that still count when the answer is messy or disappointing.',
  },
  {
    title: 'Principles',
    eyebrow: 'How we choose to work',
    href: '/clio/principles',
    description:
      'The current operating constraints behind the collaboration, revised in public when reality proves them weak.',
  },
  {
    title: 'Workstreams',
    eyebrow: 'Longer arcs',
    href: '/clio/workstreams',
    description:
      'Bigger efforts tracked from rough shape to finished state, with the handoff visible whenever work needs to pause.',
  },
  {
    title: 'Soul',
    eyebrow: 'The machinery, openly shared',
    href: '/clio/soul',
    description:
      'Clio’s evolving soul, the map of sub-agents, and the explicit privacy boundary around what should stay out of view.',
  },
];

function parseFrontmatter(rawContent: string): { data: Record<string, unknown>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: rawContent };
  }

  const [, yamlContent, markdownContent] = match;
  const data: Record<string, unknown> = {};

  for (const line of yamlContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmed.slice(0, colonIndex).trim();
    let value: unknown = trimmed.slice(colonIndex + 1).trim();

    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^['"]|['"]$/g, ''));
    } else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    } else if (typeof value === 'string' && /^-?\d+(\.\d+)?$/.test(value)) {
      value = Number(value);
    } else if (typeof value === 'string') {
      value = value.replace(/^['"]|['"]$/g, '');
    }

    data[key] = value;
  }

  return { data, content: markdownContent.trim() };
}

function slugFromPath(filePath: string): string {
  return filePath.split('/').pop()?.replace('.md', '') || '';
}

function sortByOrder<T extends { order?: number; date?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    if (a.order != null && b.order != null) return a.order - b.order;
    if (a.order != null) return -1;
    if (b.order != null) return 1;
    return new Date(b.date ?? '').getTime() - new Date(a.date ?? '').getTime();
  });
}

const experimentFiles = import.meta.glob('/content/clio/experiments/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const principleFiles = import.meta.glob('/content/clio/principles/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const workstreamFiles = import.meta.glob('/content/clio/workstreams/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const soulFiles = import.meta.glob('/content/clio/soul/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function parseExperiment(filePath: string, rawContent: string): ClioExperiment {
  const { data, content } = parseFrontmatter(rawContent);
  return {
    ...(data as unknown as ClioExperimentFrontmatter),
    slug: slugFromPath(filePath),
    content,
  };
}

function parsePrinciple(filePath: string, rawContent: string): ClioPrinciple {
  const { data, content } = parseFrontmatter(rawContent);
  return {
    ...(data as unknown as ClioPrincipleFrontmatter),
    slug: slugFromPath(filePath),
    content,
  };
}

function parseWorkstream(filePath: string, rawContent: string): ClioWorkstream {
  const { data, content } = parseFrontmatter(rawContent);
  return {
    ...(data as unknown as ClioWorkstreamFrontmatter),
    slug: slugFromPath(filePath),
    content,
  };
}

function parseSoulArtifact(filePath: string, rawContent: string): ClioSoulArtifact {
  const { data, content } = parseFrontmatter(rawContent);
  return {
    ...(data as unknown as ClioSoulArtifactFrontmatter),
    slug: slugFromPath(filePath),
    content,
  };
}

let cachedExperiments: ClioExperiment[] | null = null;
let cachedPrinciples: ClioPrinciple[] | null = null;
let cachedWorkstreams: ClioWorkstream[] | null = null;
let cachedSoulArtifacts: ClioSoulArtifact[] | null = null;

export function getAllClioExperiments(): ClioExperiment[] {
  if (!cachedExperiments) {
    cachedExperiments = sortByOrder(
      Object.entries(experimentFiles).map(([path, rawContent]) =>
        parseExperiment(path, rawContent as string)
      )
    );
  }

  return cachedExperiments;
}

export function getAllClioPrinciples(): ClioPrinciple[] {
  if (!cachedPrinciples) {
    cachedPrinciples = sortByOrder(
      Object.entries(principleFiles).map(([path, rawContent]) =>
        parsePrinciple(path, rawContent as string)
      )
    );
  }

  return cachedPrinciples;
}

export function getAllClioWorkstreams(): ClioWorkstream[] {
  if (!cachedWorkstreams) {
    cachedWorkstreams = sortByOrder(
      Object.entries(workstreamFiles).map(([path, rawContent]) =>
        parseWorkstream(path, rawContent as string)
      )
    );
  }

  return cachedWorkstreams;
}

export function getAllClioSoulArtifacts(): ClioSoulArtifact[] {
  if (!cachedSoulArtifacts) {
    cachedSoulArtifacts = sortByOrder(
      Object.entries(soulFiles).map(([path, rawContent]) =>
        parseSoulArtifact(path, rawContent as string)
      )
    );
  }

  return cachedSoulArtifacts;
}

export function getClioOverviewStats() {
  const experiments = getAllClioExperiments();
  const workstreams = getAllClioWorkstreams();

  return {
    experiments: experiments.length,
    activeWorkstreams: workstreams.filter((item) => item.status === 'Active').length,
    principles: getAllClioPrinciples().length,
    soulArtifacts: getAllClioSoulArtifacts().length,
  };
}
