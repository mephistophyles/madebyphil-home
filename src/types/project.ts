export type ProjectType = 'Software' | 'Physical' | 'Business';
export type ProjectStatus = 'completed' | 'in-progress';

export interface ProjectFrontmatter {
  title: string;
  description: string;
  type: ProjectType;
  date: string;
  featured: boolean;
  image: string;
  tags: string[];
  status: ProjectStatus;
  link?: string;
}

export interface Project extends ProjectFrontmatter {
  slug: string;
  content: string;
}
