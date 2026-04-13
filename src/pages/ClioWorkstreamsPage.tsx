import { ArrowRight, CheckCircle2, PauseCircle, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ClioSubnav from '@/components/ClioSubnav';
import { clioWorkstreams } from '@/lib/clio';

const statusIcon: Record<string, typeof PlayCircle> = {
  Active: PlayCircle,
  'In progress': PauseCircle,
};

export default function ClioWorkstreamsPage() {
  return (
    <div className="clio-page min-h-screen">
      <section className="px-[6vw] pt-32 pb-10 bg-[#0B1120] border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="clio-section-label">Clio / Workstreams</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="font-display headline-lg text-white mb-4">Workstreams</h1>
              <p className="text-lg leading-8 text-[#C5CEDD]">
                This is where longer arcs live. Every workstream should show its owner, current
                state, what done means, and what happens if it needs to pause.
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
          {clioWorkstreams.map((workstream) => {
            const StatusIcon = statusIcon[workstream.status] ?? CheckCircle2;
            return (
              <article key={workstream.title} className="clio-panel">
                <div className="flex flex-wrap items-start justify-between gap-5 mb-5">
                  <div>
                    <h2 className="font-display text-2xl text-white mb-2">{workstream.title}</h2>
                    <p className="text-sm uppercase tracking-[0.18em] text-[#8FB4FF]">Owner: {workstream.owner}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-[#E5E7EB]">
                    <StatusIcon size={16} className="text-[#6EE7B7]" />
                    {workstream.status}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="clio-card">
                    <p className="text-sm uppercase tracking-[0.18em] text-[#8FB4FF] mb-2">Done means</p>
                    <p className="text-[#C5CEDD] leading-7">{workstream.done}</p>
                  </div>
                  <div className="clio-card">
                    <p className="text-sm uppercase tracking-[0.18em] text-[#8FB4FF] mb-2">Next step</p>
                    <p className="text-[#C5CEDD] leading-7">{workstream.nextStep}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-[6vw] py-16 bg-[#0F172A]">
        <div className="max-w-5xl mx-auto clio-panel">
          <p className="clio-section-label">Stable handoff rule</p>
          <h2 className="font-display text-3xl text-white mb-4">If a workstream pauses, it should still be easy to restart.</h2>
          <div className="grid md:grid-cols-3 gap-4 text-[#C5CEDD] leading-7">
            <div className="clio-card">
              <p className="text-[#E5E7EB] font-medium mb-2">State</p>
              <p>What is true right now, not what we hope will be true later.</p>
            </div>
            <div className="clio-card">
              <p className="text-[#E5E7EB] font-medium mb-2">Blockers</p>
              <p>What is waiting on human input, infrastructure, or a decision.</p>
            </div>
            <div className="clio-card">
              <p className="text-[#E5E7EB] font-medium mb-2">Next action</p>
              <p>The very next thing someone should do to wake the thread back up.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
