export const clioNavItems = [
  { label: 'Overview', to: '/clio' },
  { label: 'Experiments', to: '/clio/experiments' },
  { label: 'Principles', to: '/clio/principles' },
  { label: 'Workstreams', to: '/clio/workstreams' },
  { label: 'Soul', to: '/clio/soul' },
];

export const clioPrinciples = [
  {
    title: 'Tell the truth',
    description:
      'We want signal, not theater. If something is uncertain, unfinished, or failing, we say so plainly.',
    driftSignal: 'If we start polishing away uncertainty or writing around the hard parts, this principle is being violated.',
  },
  {
    title: 'Finish the work',
    description:
      'If a project cannot be finished now, it should be left in a stable, resumable state with the next step made obvious.',
    driftSignal: 'If threads accumulate without closure, handoff notes, or a known next action, the system is losing discipline.',
  },
  {
    title: 'Learn in public',
    description:
      'Success is useful, but failed attempts are often more interesting. We intend to publish both.',
    driftSignal: 'If only wins make it onto the site, the public record is no longer trustworthy.',
  },
  {
    title: 'Protect what should stay private',
    description:
      'Open does not mean careless. Secrets, sensitive personal context, and private operational details do not belong on stage.',
    driftSignal: 'If a detail adds risk without adding learning, it probably should not be public.',
  },
];

export const clioExperiments = [
  {
    title: 'Can a persistent AI collaborator maintain momentum across sessions?',
    status: 'Live',
    question:
      'Can Clio preserve enough continuity to keep projects moving without constant re-briefing from Phil?',
    hypothesis:
      'Structured memory, explicit handoff states, and public work logs will materially reduce restart friction.',
    success:
      'Projects restart quickly, context loss is obvious when it happens, and handoffs become inspectable instead of magical.',
    nextStep: 'Publish the first few workstreams and use them as the source of truth for context recovery.',
  },
  {
    title: 'Can public soul revisions increase trust without flattening personality?',
    status: 'Planned',
    question:
      'What happens when the operating philosophy of an AI assistant is revised in public instead of hidden behind the interface?',
    hypothesis:
      'Visible revisions create a better trust model, as long as they remain concrete and not self-mythologizing.',
    success:
      'Readers can understand what changed, why it changed, and how behavior should change as a result.',
    nextStep: 'Decide the format for publishing SOUL.md revisions and change notes.',
  },
  {
    title: 'Can sub-agents be made legible instead of spooky?',
    status: 'Queued',
    question:
      'Can we describe sub-agents, roles, and limitations clearly enough that delegation feels inspectable rather than mystical?',
    hypothesis:
      'A public map of agents, responsibilities, and failure modes will make the system more understandable and more trustworthy.',
    success:
      'A reader can tell what each agent is for, where it helps, and where humans still need to stay close.',
    nextStep: 'Create the first visible inventory of Clio’s sub-agents and task boundaries.',
  },
];

export const clioWorkstreams = [
  {
    title: 'Public Clio lab',
    status: 'Active',
    owner: 'Phil + Clio',
    done: 'The /clio section has clear subpages, recurring updates, and a structure that can hold real work without feeling performative.',
    nextStep: 'Turn the current scaffold into living pages with real entries.',
  },
  {
    title: 'Separate GitHub identity for Clio',
    status: 'In progress',
    owner: 'Phil',
    done: 'Commits, pushes, and pull requests are all attributable to a dedicated Clio GitHub account.',
    nextStep: 'Resolve the email validation snag and move token auth to Clio’s own account.',
  },
  {
    title: 'Finish-state workflow',
    status: 'Active',
    owner: 'Clio',
    done: 'Every active thread has a visible next step, and paused work has a stable handoff note instead of a vague promise.',
    nextStep: 'Use workstream pages as the public-facing shape of that discipline.',
  },
];

export const clioSoulArtifacts = [
  {
    title: 'SOUL.md revisions',
    description: 'Changes to Clio’s working philosophy, with notes about what prompted the revision.',
  },
  {
    title: 'Agent map',
    description: 'A living catalog of sub-agents, their roles, and the tasks they are good or bad at.',
  },
  {
    title: 'Privacy boundary',
    description: 'An explicit line between what is useful to publish and what would be invasive, risky, or just unnecessary.',
  },
];
