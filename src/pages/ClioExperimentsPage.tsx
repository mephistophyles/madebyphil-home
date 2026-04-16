import { FlaskConical, Target } from 'lucide-react';
import ClioMarkdown from '@/components/ClioMarkdown';
import ClioSubnav from '@/components/ClioSubnav';
import { getAllClioExperiments } from '@/lib/clio';

const experimentFormat = [
  'Question: what are we actually trying to learn?',
  'Hypothesis: what do we think is true before we test it?',
  'Method: what did we actually do?',
  'Result: what happened, including ambiguity or failure?',
  'Next move: what changed because of the experiment?',
];

const statusClass: Record<string, string> = {
  Live: 'bg-[#6EE7B7]/15 text-[#6EE7B7] border border-[#6EE7B7]/25',
  Planned: 'bg-[#8FB4FF]/15 text-[#8FB4FF] border border-[#8FB4FF]/25',
  Queued: 'bg-white/5 text-[#E5E7EB] border border-white/10',
};

export default function ClioExperimentsPage() {
  const experiments = getAllClioExperiments();

  return (
    <div className="clio-page min-h-screen">
      <section className="px-[6vw] pt-32 pb-10 bg-[#0B1120] border-b border-white/10">
        <div className="max-w-6xl mx-auto max-w-6xl">
          <p className="clio-section-label">Clio / Experiments</p>
          <h1 className="font-display headline-lg text-white mb-4">Experiments</h1>
          <p className="text-lg leading-8 text-[#C5CEDD] max-w-3xl">
            This is the public testing ground. Every experiment should make a clear bet, show its
            work, and leave behind a useful artifact even when it goes sideways.
          </p>
        </div>
      </section>

      <ClioSubnav />

      <section className="px-[6vw] py-16 bg-[#111827] border-b border-white/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
          <div className="clio-panel">
            <div className="flex items-center gap-3 mb-4">
              <FlaskConical size={18} className="text-[#6EE7B7]" />
              <p className="text-sm uppercase tracking-[0.18em] text-[#8FB4FF]">Current experiment stack</p>
            </div>
            <div className="space-y-5">
              {experiments.map((experiment) => (
                <article key={experiment.slug} className="clio-card">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h2 className="font-display text-2xl text-white flex-1 min-w-[240px]">{experiment.title}</h2>
                    <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${statusClass[experiment.status]}`}>
                      {experiment.status}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm leading-7 text-[#C5CEDD] mb-5">
                    <div>
                      <p className="text-[#E5E7EB] font-medium mb-1">Question</p>
                      <p>{experiment.question}</p>
                    </div>
                    <div>
                      <p className="text-[#E5E7EB] font-medium mb-1">Hypothesis</p>
                      <p>{experiment.hypothesis}</p>
                    </div>
                    <div>
                      <p className="text-[#E5E7EB] font-medium mb-1">Success looks like</p>
                      <p>{experiment.success}</p>
                    </div>
                    <div>
                      <p className="text-[#E5E7EB] font-medium mb-1">Next step</p>
                      <p>{experiment.nextStep}</p>
                    </div>
                  </div>
                  <ClioMarkdown content={experiment.content} />
                </article>
              ))}
            </div>
          </div>

          <div className="clio-panel">
            <div className="flex items-center gap-3 mb-4">
              <Target size={18} className="text-[#8FB4FF]" />
              <p className="text-sm uppercase tracking-[0.18em] text-[#8FB4FF]">Writeup format</p>
            </div>
            <p className="text-[#C5CEDD] leading-7 mb-5">
              Every experiment page should leave behind enough evidence that someone else can see
              what we thought, what we tried, and what changed our mind.
            </p>
            <ol className="space-y-3">
              {experimentFormat.map((item, index) => (
                <li key={item} className="clio-card flex items-start gap-4">
                  <span className="clio-principle-number">0{index + 1}</span>
                  <span className="text-[#E5E7EB] leading-7">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
