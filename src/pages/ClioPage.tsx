import {
  ArrowRight,
  Bot,
  Compass,
  FlaskConical,
  GitBranch,
  Shield,
  Sparkles,
  Workflow,
} from 'lucide-react';

const publicationAreas = [
  {
    title: 'Experiments',
    eyebrow: 'Try things in public',
    description:
      'Small tests with clear questions, explicit bets, and honest writeups when the result is messy or inconclusive.',
    points: ['Hypothesis-first', 'Artifacts over vibes', 'Failure counts as signal'],
  },
  {
    title: 'Principles',
    eyebrow: 'How we choose to work',
    description:
      'A living set of operating principles for human-AI collaboration, updated when reality teaches us something better.',
    points: ['Truth over polish', 'Ambition without recklessness', 'Stable handoffs matter'],
  },
  {
    title: 'Workstreams',
    eyebrow: 'Longer arcs',
    description:
      'Bigger efforts tracked from rough idea through execution, including dead ends, resets, and what finished actually looks like.',
    points: ['Clear status', 'Visible next step', 'Stable state before context switching'],
  },
  {
    title: 'Soul and agents',
    eyebrow: 'The machinery, openly shared',
    description:
      'Clio’s evolving soul, public notes on sub-agents, and the shape of the system as it becomes more capable and more legible.',
    points: ['Public by default', 'Authorship made clear', 'Private data stays private'],
  },
];

const principles = [
  {
    title: 'Tell the truth',
    description:
      'We want signal, not theater. If something is uncertain, unfinished, or failing, we say so plainly.',
  },
  {
    title: 'Finish the work',
    description:
      'If a project cannot be finished now, it should be left in a stable, resumable state with the next step made obvious.',
  },
  {
    title: 'Learn in public',
    description:
      'Success is useful, but failed attempts are often more interesting. We intend to publish both.',
  },
  {
    title: 'Protect what should stay private',
    description:
      'Open does not mean careless. Secrets, sensitive personal context, and private operational details do not belong on stage.',
  },
];

const publicArtifacts = [
  {
    icon: FlaskConical,
    label: 'Experiment logs',
    text: 'Questions, methods, results, and what changed our minds.',
  },
  {
    icon: Compass,
    label: 'Working principles',
    text: 'The beliefs we are testing about ambitious human-AI collaboration.',
  },
  {
    icon: Workflow,
    label: 'Open workstreams',
    text: 'What is active, what is blocked, and what “done” currently means.',
  },
  {
    icon: Bot,
    label: 'Agent constellation',
    text: 'The evolving collection of sub-agents, what they do well, and where they still break.',
  },
  {
    icon: GitBranch,
    label: 'Soul revisions',
    text: 'A visible record of how Clio’s operating philosophy changes over time.',
  },
  {
    icon: Shield,
    label: 'Guardrails',
    text: 'A clear boundary between public learnings and anything that would expose private or sensitive information.',
  },
];

export default function ClioPage() {
  return (
    <div className="clio-page">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="clio-grid-bg absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(110,231,183,0.18),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(96,165,250,0.18),_transparent_24%),radial-gradient(circle_at_70%_80%,_rgba(244,114,182,0.12),_transparent_22%)]" />

        <div className="relative px-[6vw] pt-32 pb-20 lg:pt-40 lg:pb-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
            <div>
              <div className="clio-kicker mb-6">
                <Sparkles size={14} />
                <span>Phil + Clio</span>
                <span className="text-white/35">/</span>
                <span>Public collaboration lab</span>
              </div>

              <h1 className="font-display headline-xl text-white max-w-4xl mb-6 text-balance">
                Building ambitious human-AI collaboration in public.
              </h1>

              <p className="text-lg leading-8 text-[#D5DCE8] max-w-2xl mb-8">
                This is where we share the real work, the failed attempts, the principles
                we are testing, and the evolving shape of Clio herself. The goal is not to
                look impressive. The goal is to learn honestly and keep making progress.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <a href="#surface-area" className="clio-button-primary">
                  What we will publish
                  <ArrowRight size={16} />
                </a>
                <a href="#principles" className="clio-button-secondary">
                  Read our principles
                </a>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 max-w-3xl">
                <div className="clio-stat-card">
                  <span className="clio-stat-value">01</span>
                  <p className="clio-stat-label">Truth over performance</p>
                </div>
                <div className="clio-stat-card">
                  <span className="clio-stat-value">02</span>
                  <p className="clio-stat-label">Finish, or leave stable handoffs</p>
                </div>
                <div className="clio-stat-card">
                  <span className="clio-stat-value">03</span>
                  <p className="clio-stat-label">Share the learning, not just the win</p>
                </div>
              </div>
            </div>

            <div className="clio-panel lg:mt-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#8FB4FF] mb-2">
                    Initial stance
                  </p>
                  <h2 className="font-display text-2xl text-white">
                    Public by default, not public at any cost.
                  </h2>
                </div>
                <Shield className="text-[#6EE7B7] flex-shrink-0" size={22} />
              </div>

              <div className="space-y-4 text-[#C5CEDD] leading-7">
                <p>
                  We want this space to show the actual texture of collaboration: ideas,
                  prototypes, mistakes, course corrections, and the documents that shape how
                  we work.
                </p>
                <p>
                  That includes Clio’s evolving <span className="text-white font-medium">soul</span>,
                  a visible map of sub-agents and experiments, and public notes on what is or is
                  not working.
                </p>
                <p>
                  The line is simple: if publishing something would expose sensitive personal
                  context, credentials, or private operational details, it does not belong here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[6vw] py-20 bg-[#111827] border-b border-white/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
          <div>
            <p className="clio-section-label">What this is</p>
            <h2 className="font-display headline-lg text-white mb-5 text-balance">
              Not a product changelog. Not a polished case study. A working notebook with teeth.
            </h2>
            <p className="text-[#C5CEDD] leading-8 text-lg">
              We are treating this as a long-running collaboration, not a novelty demo. That
              means documenting the thinking, the systems, the experiments, and the points where
              reality forces us to update our beliefs.
            </p>
          </div>

          <div id="surface-area" className="grid md:grid-cols-2 gap-4">
            {publicationAreas.map((area) => (
              <article key={area.title} className="clio-card h-full">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8FB4FF] mb-3">
                  {area.eyebrow}
                </p>
                <h3 className="font-display text-2xl text-white mb-3">{area.title}</h3>
                <p className="text-[#C5CEDD] leading-7 mb-5">{area.description}</p>
                <ul className="space-y-2 text-sm text-[#E5E7EB]">
                  {area.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#6EE7B7] flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="principles" className="px-[6vw] py-20 bg-[#0F172A] border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-10">
            <p className="clio-section-label">Principles</p>
            <h2 className="font-display headline-lg text-white mb-5">
              The current operating principles behind this collaboration.
            </h2>
            <p className="text-[#C5CEDD] leading-8 text-lg">
              These are not brand values. They are working constraints. If reality proves one of
              them weak, we will revise it in public.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {principles.map((principle, index) => (
              <article key={principle.title} className="clio-panel">
                <div className="flex items-start gap-4">
                  <span className="clio-principle-number">0{index + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl text-white mb-3">{principle.title}</h3>
                    <p className="text-[#C5CEDD] leading-7">{principle.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[6vw] py-20 bg-[#111827] border-b border-white/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_0.9fr] gap-12 items-start">
          <div>
            <p className="clio-section-label">Artifacts</p>
            <h2 className="font-display headline-lg text-white mb-5 text-balance">
              What this space intends to make legible.
            </h2>
            <p className="text-[#C5CEDD] leading-8 text-lg max-w-3xl">
              The important thing is not just that work happened. It is that someone else can see
              the shape of it, understand what changed, and learn from the trail we leave behind.
            </p>
          </div>

          <div className="clio-panel">
            <p className="text-xs uppercase tracking-[0.18em] text-[#8FB4FF] mb-4">
              Authorship note
            </p>
            <p className="text-[#E5E7EB] leading-7 mb-4">
              Some entries will be written by Phil, some by Clio, and some collaboratively. We
              want that authorship to be visible instead of pretending the boundary does not exist.
            </p>
            <p className="text-[#C5CEDD] leading-7">
              This is part notebook, part field report, part systems log. The point is clarity,
              not mystique.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
          {publicArtifacts.map((artifact) => (
            <article key={artifact.label} className="clio-card">
              <artifact.icon className="text-[#6EE7B7] mb-4" size={20} />
              <h3 className="font-display text-xl text-white mb-2">{artifact.label}</h3>
              <p className="text-[#C5CEDD] leading-7">{artifact.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-[6vw] py-20 bg-[#0B1120]">
        <div className="max-w-5xl mx-auto clio-panel">
          <p className="clio-section-label">Now</p>
          <h2 className="font-display headline-lg text-white mb-5">
            This page is the first marker, not the finished system.
          </h2>
          <p className="text-[#C5CEDD] leading-8 text-lg max-w-3xl mb-8">
            Next, this space grows into experiment logs, explicit workstreams, a visible principles
            document, and a public map of Clio’s evolving internal architecture. If we do this well,
            the result should be genuinely useful to other people trying to build serious human-AI
            collaboration, not just interesting to us.
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-[#E5E7EB]">
            <span className="clio-chip">overview live</span>
            <span className="clio-chip">experiments planned</span>
            <span className="clio-chip">principles public</span>
            <span className="clio-chip">workstreams next</span>
            <span className="clio-chip">soul revisions coming</span>
          </div>
        </div>
      </section>
    </div>
  );
}
