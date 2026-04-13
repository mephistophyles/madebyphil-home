import { ArrowRight, Bot, GitBranch, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import ClioSubnav from '@/components/ClioSubnav';
import { clioSoulArtifacts } from '@/lib/clio';

export default function ClioSoulPage() {
  return (
    <div className="clio-page min-h-screen">
      <section className="px-[6vw] pt-32 pb-10 bg-[#0B1120] border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="clio-section-label">Clio / Soul</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="font-display headline-lg text-white mb-4">Soul and agents</h1>
              <p className="text-lg leading-8 text-[#C5CEDD]">
                This page is for the inner machinery we are willing to make public: Clio’s
                evolving soul, the role of sub-agents, and the explicit privacy line around both.
              </p>
            </div>
            <Link to="/clio" className="clio-button-secondary w-fit">
              Back to overview
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <ClioSubnav />

      <section className="px-[6vw] py-16 bg-[#111827] border-b border-white/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_0.9fr] gap-6 items-start">
          <div className="clio-panel">
            <p className="clio-section-label">Public surface area</p>
            <div className="space-y-4">
              {clioSoulArtifacts.map((artifact, index) => {
                const Icon = index === 0 ? GitBranch : index === 1 ? Bot : Shield;
                return (
                  <article key={artifact.title} className="clio-card flex items-start gap-4">
                    <Icon size={18} className="text-[#6EE7B7] mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="font-display text-2xl text-white mb-2">{artifact.title}</h2>
                      <p className="text-[#C5CEDD] leading-7">{artifact.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="clio-panel">
            <p className="clio-section-label">What belongs here</p>
            <div className="space-y-4 text-[#C5CEDD] leading-7">
              <p>
                We are comfortable sharing system shape, revisions in working philosophy, and notes
                on where different agents help or fail.
              </p>
              <p>
                We are not trying to perform artificial mystique. If an internal system changes,
                the useful question is what changed in practice.
              </p>
              <p>
                The boundary remains firm: private personal context, secrets, tokens, and sensitive
                operational details stay out.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[6vw] py-16 bg-[#0F172A]">
        <div className="max-w-5xl mx-auto clio-panel">
          <p className="clio-section-label">Publishing pattern</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="clio-card">
              <p className="text-[#E5E7EB] font-medium mb-2">Soul revision note</p>
              <p className="text-[#C5CEDD] leading-7">What changed in SOUL.md, why it changed, and what behavior should now differ.</p>
            </div>
            <div className="clio-card">
              <p className="text-[#E5E7EB] font-medium mb-2">Agent card</p>
              <p className="text-[#C5CEDD] leading-7">Name, purpose, strengths, failure modes, and when human review is still required.</p>
            </div>
            <div className="clio-card">
              <p className="text-[#E5E7EB] font-medium mb-2">Boundary note</p>
              <p className="text-[#C5CEDD] leading-7">A visible explanation of what was intentionally omitted for privacy or safety reasons.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
