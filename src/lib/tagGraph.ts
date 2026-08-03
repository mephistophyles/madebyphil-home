import { getAllArticles } from "./articles";
import { getAllProjects } from "./projects";
import type { Article } from "../types/article";
import type { Project } from "../types/project";

export type GraphContentItem = {
  id: string;
  typeLabel: "Writing" | "Project";
  title: string;
  summary: string;
  meta: string;
  href: string;
  tags: string[];
};

export type TagNode = { id: string; count: number; contentIds: string[] };
export type TagEdge = { id: string; source: string; target: string; cooccurrences: number; weight: number };
export type TagGraph = { content: GraphContentItem[]; nodes: TagNode[]; edges: TagEdge[] };

const normaliseTag = (tag: string) => tag.trim().toLowerCase().replaceAll(/\s+/g, "-");

const toWritingGraphItem = (article: Article): GraphContentItem => ({
  id: `writing:${article.slug}`,
  typeLabel: "Writing",
  title: article.title,
  summary: article.excerpt,
  meta: article.date,
  href: `/writing/${article.slug}`,
  tags: article.tags.map(normaliseTag),
});

const toProjectGraphItem = (project: Project): GraphContentItem => ({
  id: `projects:${project.slug}`,
  typeLabel: "Project",
  title: project.title,
  summary: project.description,
  meta: project.date,
  href: `/projects/${project.slug}`,
  tags: project.tags.map(normaliseTag),
});

const buildTagGraph = (content: GraphContentItem[]): TagGraph => {
  const nodes = new Map<string, TagNode>();
  const edges = new Map<string, Omit<TagEdge, "weight"> & { contribution: number }>();

  content.forEach((item) => {
    const tags = [...new Set(item.tags)].sort();
    tags.forEach((tag) => {
      const node = nodes.get(tag) ?? { id: tag, count: 0, contentIds: [] };
      node.count += 1;
      node.contentIds.push(item.id);
      nodes.set(tag, node);
    });
    tags.forEach((source, index) => tags.slice(index + 1).forEach((target) => {
      const id = `${source}--${target}`;
      const edge = edges.get(id) ?? { id, source, target, cooccurrences: 0, contribution: 0 };
      edge.cooccurrences += 1;
      edge.contribution += 1 / Math.max(tags.length - 1, 1);
      edges.set(id, edge);
    }));
  });

  return {
    content,
    nodes: [...nodes.values()].sort((a, b) => a.id.localeCompare(b.id)),
    edges: [...edges.values()].map(({ contribution, ...edge }) => ({
      ...edge,
      weight: contribution / Math.sqrt((nodes.get(edge.source)?.count ?? 1) * (nodes.get(edge.target)?.count ?? 1)),
    })),
  };
};

export const getTagGraph = (): TagGraph => buildTagGraph([
  ...getAllArticles().map(toWritingGraphItem),
  ...getAllProjects().map(toProjectGraphItem),
]);
