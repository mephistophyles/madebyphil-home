import { ArrowRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import ClioSubnav from '@/components/ClioSubnav';
import { clioPrinciples } from '@/lib/clio';

export default function ClioPrinciplesPage() {
  return (
    <div className="clio-page min-h-screen">
      <section className="px-[6vw] pt-32 pb-10 bg-[#0B1120] border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="clio-section-label">Clio / Principles</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="font-display headline-lg text-white mb-4">Principles</h1>
              <p className="text-lg leading-8 text-[#C5CEDD]">
                These are the current operating constraints behind the collaboration. They are
                meant to be testable, revisable, and visible, not treated like branding copy.
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
        <div className="max-w-6xl mx-auto grid gap-5">
          {clioPrinciples.map((principle, index) => (
            <article key={principle.title} className="clio-panel">
              <div className="grid lg:grid-cols-[80px_1fr_1fr] gap-6 items-start">
                <span className="clio-principle-number">0{index + 1}</span>
                <div>
                  <h2 className="font-display text-2xl text-white mb-3">{principle.title}</h2>
                  <p className="text-[#C5CEDD] leading-7">{principle.description}</p>
                </div>
                <div className="clio-card">
                  <div className="flex items-center gap-3 mb-3">
                    <Compass size={16} className="text-[#8FB4FF]" />
                    <p className="text-sm uppercase tracking-[0.18em] text-[#8FB4FF]">How we notice drift</p>
                  </div>
                  <p className="text-[#E5E7EB] leading-7">{principle.driftSignal}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-[6vw] py-16 bg-[#0F172A]">
        <div className="max-w-5xl mx-auto clio-panel">
          <p className="clio-section-label">Revision policy</p>
          <h2 className="font-display text-3xl text-white mb-4">Principles should change in public when reality forces it.</h2>
          <div className="grid md:grid-cols-3 gap-4 text-[#C5CEDD] leading-7">
            <div className="clio-card">
              <p className="text-[#E5E7EB] font-medium mb-2">What changed?</p>
              <p>State the revision plainly instead of quietly editing it away.</p>
            </div>
            <div className="clio-card">
              <p className="text-[#E5E7EB] font-medium mb-2">Why did it change?</p>
              <p>Name the failure, surprise, or new evidence that forced the update.</p>
            </div>
            <div className="clio-card">
              <p className="text-[#E5E7EB] font-medium mb-2">What behavior changes now?</p>
              <p>A principle is only real if it changes decisions, not just wording.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
