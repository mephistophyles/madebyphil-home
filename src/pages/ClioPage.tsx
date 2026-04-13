import {
  ArrowRight,
  Bot,
  Compass,
  FlaskConical,
  GitBranch,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ClioSubnav from '@/components/ClioSubnav';
import {
  clioOverviewSections,
  getAllClioExperiments,
  getAllClioPrinciples,
  getAllClioSoulArtifacts,
  getAllClioWorkstreams,
  getClioOverviewStats,
} from '@/lib/clio';

const sectionIcons = {
  Experiments: FlaskConical,
  Principles: Compass,
  Workstreams: Workflow,
  Soul: Bot,
} as const;

export default function ClioPage() {
  const stats = getClioOverviewStats();
  const experiments = getAllClioExperiments();
  const principles = getAllClioPrinciples();
  const workstreams = getAllClioWorkstreams();
  const soulArtifacts = getAllClioSoulArtifacts();

  const sectionHighlights = {
    Experiments: experiments.slice(0, 2).map((item) => item.title),
    Principles: principles.slice(0, 2).map((item) => item.title),
    Workstreams: workstreams.slice(0, 2).map((item) => `${item.title} · ${item.status}`),
    Soul: soulArtifacts.slice(0, 2).map((item) => `${item.title} · ${item.kind}`),
  };

  return (
    <div className="clio-page min-h-screen">
      <section className="px-[6vw] pt-32 pb-10 bg-[#0B1120] border-b border-white/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-end">
          <div>
            <div className="clio-kicker mb-5">
              <Sparkles size={14} />
              <span>Phil + Clio</span>
              <span className="text-white/35">/</span>
              <span>Public collaboration lab</span>
            </div>
            <h1 className="font-display headline-lg text-white mb-4 text-balance">
              Building ambitious human-AI collaboration in public.
            </h1>
            <p className="text-lg leading-8 text-[#C5CEDD] max-w-3xl">
              This space is for the actual work: experiments, principles, workstreams, and the
              evolving shape of Clio herself. The aim is not polish. The aim is legible progress.
            </p>
          </div>

          <div className="clio-panel">
            <p className="clio-section-label">Current shape</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="clio-stat-card">
                <span className="clio-stat-value">{String(stats.experiments).padStart(2, '0')}</span>
                <p className="clio-stat-label">experiments in view</p>
              </div>
              <div className="clio-stat-card">
                <span className="clio-stat-value">{String(stats.principles).padStart(2, '0')}</span>
                <p className="clio-stat-label">public principles</p>
              </div>
              <div className="clio-stat-card">
                <span className="clio-stat-value">{String(stats.activeWorkstreams).padStart(2, '0')}</span>
                <p className="clio-stat-label">active workstreams</p>
              </div>
              <div className="clio-stat-card">
                <span className="clio-stat-value">{String(stats.soulArtifacts).padStart(2, '0')}</span>
                <p className="clio-stat-label">soul artifacts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClioSubnav />

      <section className="px-[6vw] py-16 bg-[#111827] border-b border-white/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          <div>
            <p className="clio-section-label">What lives here</p>
            <h2 className="font-display headline-lg text-white mb-4 text-balance">
              One section, one visual rhythm, multiple ways of leaving evidence behind.
            </h2>
            <p className="text-[#C5CEDD] text-lg leading-8 mb-6">
              The overview should feel like the front page of the same system, not a separate
              landing page. So the real detail now sits below the section nav, where the rest of
              the Clio space already lives.
            </p>
            <div className="clio-card">
              <p className="text-sm uppercase tracking-[0.18em] text-[#8FB4FF] mb-3">Public posture</p>
              <p className="text-[#E5E7EB] leading-7 mb-3">
                We are comfortable publishing the shape of the work, the revisions in philosophy,
                and the role of sub-agents.
              </p>
              <p className="text-[#C5CEDD] leading-7">
                We are not publishing secrets, sensitive personal context, or operational details
                that add risk without adding learning.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {clioOverviewSections.map((section) => {
              const Icon = sectionIcons[section.title as keyof typeof sectionIcons] ?? GitBranch;
              const highlights = sectionHighlights[section.title as keyof typeof sectionHighlights] ?? [];

              return (
                <Link key={section.title} to={section.href} className="clio-card h-full block">
                  <Icon className="text-[#6EE7B7] mb-4" size={20} />
                  <p className="text-xs uppercase tracking-[0.18em] text-[#8FB4FF] mb-2">
                    {section.eyebrow}
                  </p>
                  <h3 className="font-display text-2xl text-white mb-3">{section.title}</h3>
                  <p className="text-[#C5CEDD] leading-7 mb-5">{section.description}</p>

                  <div className="space-y-2 mb-5">
                    {highlights.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[#E5E7EB]">
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 text-sm text-[#6EE7B7]">
                    Open section
                    <ArrowRight size={15} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-[6vw] py-16 bg-[#0F172A] border-b border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4">
          <div className="clio-panel">
            <p className="clio-section-label">Rule one</p>
            <h3 className="font-display text-2xl text-white mb-3">Tell the truth</h3>
            <p className="text-[#C5CEDD] leading-7">
              If something is uncertain, unfinished, or failing, that belongs in the record too.
            </p>
          </div>
          <div className="clio-panel">
            <p className="clio-section-label">Rule two</p>
            <h3 className="font-display text-2xl text-white mb-3">Finish or leave stable handoffs</h3>
            <p className="text-[#C5CEDD] leading-7">
              Ambition only compounds if work can be resumed without archaeology every time.
            </p>
          </div>
          <div className="clio-panel">
            <p className="clio-section-label">Rule three</p>
            <h3 className="font-display text-2xl text-white mb-3">Publish learning, not just wins</h3>
            <p className="text-[#C5CEDD] leading-7">
              This becomes useful to other people only if the awkward and corrective parts survive.
            </p>
          </div>
        </div>
      </section>

      <section className="px-[6vw] py-16 bg-[#111827]">
        <div className="max-w-5xl mx-auto clio-panel">
          <p className="clio-section-label">Near term</p>
          <h2 className="font-display text-3xl text-white mb-4">Markdown-backed now, richer knowledge graph later.</h2>
          <p className="text-[#C5CEDD] text-lg leading-8 max-w-3xl mb-6">
            The Clio section now has a content spine outside the React components, which makes it
            much easier to revise copy, add entries, and eventually connect these notes into a more
            graph-shaped shared knowledge base.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-[#E5E7EB]">
            <span className="clio-chip">overview aligned</span>
            <span className="clio-chip">markdown-backed content</span>
            <span className="clio-chip">subpages consistent</span>
            <span className="clio-chip">ready for first real entries</span>
          </div>
        </div>
      </section>
    </div>
  );
}
