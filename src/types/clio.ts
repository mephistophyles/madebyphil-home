export interface ClioOverviewSection {
  title: string;
  eyebrow: string;
  href: string;
  description: string;
}

export interface ClioExperimentFrontmatter {
  title: string;
  status: string;
  order?: number;
  date?: string;
  question: string;
  hypothesis: string;
  success: string;
  nextStep: string;
}

export interface ClioExperiment extends ClioExperimentFrontmatter {
  slug: string;
  content: string;
}

export interface ClioPrincipleFrontmatter {
  title: string;
  order?: number;
  driftSignal: string;
}

export interface ClioPrinciple extends ClioPrincipleFrontmatter {
  slug: string;
  content: string;
}

export interface ClioWorkstreamFrontmatter {
  title: string;
  status: string;
  owner: string;
  order?: number;
  done: string;
  nextStep: string;
}

export interface ClioWorkstream extends ClioWorkstreamFrontmatter {
  slug: string;
  content: string;
}

export interface ClioSoulArtifactFrontmatter {
  title: string;
  kind: string;
  order?: number;
}

export interface ClioSoulArtifact extends ClioSoulArtifactFrontmatter {
  slug: string;
  content: string;
}
