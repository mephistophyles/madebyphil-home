import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    title: 'The joy of building without a plan',
    date: 'Jan 15, 2026',
    category: 'Notes',
    excerpt: "Why I prefer to start before I know exactly where I'm going."
  },
  {
    title: 'Lessons from building Mokkapi',
    date: 'Dec 28, 2025',
    category: 'Software',
    excerpt: 'What I learned shipping a developer tool to production.'
  },
  {
    title: 'DIY mistakes I keep making',
    date: 'Nov 10, 2025',
    category: 'Physical',
    excerpt: 'Measure twice, cut once. And other things I forget.'
  }
];

export default function WritingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          }
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 65%',
              scrub: 1,
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="writing" className="section-flowing bg-[#F7F5F2] z-[60]">
      <div className="px-[6vw] max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 
            ref={headingRef}
            className="font-display headline-lg text-[#2D2A26]"
          >
            Writing
          </h2>
          <a href="#all-writing" className="text-[#D95D39] flex items-center gap-1 hover:gap-2 transition-all text-sm">
            View all <ArrowUpRight size={16} />
          </a>
        </div>
        
        <div className="space-y-4">
          {articles.map((article, index) => (
            <div 
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="bg-white rounded-xl p-6 card-shadow group cursor-pointer hover:card-shadow-hover transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#D95D39] text-xs font-medium px-2 py-0.5 bg-[#D95D39]/10 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-[#6B6560] text-sm">{article.date}</span>
                  </div>
                  <h3 className="font-display text-lg text-[#2D2A26] group-hover:text-[#D95D39] transition-colors mb-1">
                    {article.title}
                  </h3>
                  <p className="body-text text-sm">{article.excerpt}</p>
                </div>
                <ArrowUpRight 
                  size={18} 
                  className="text-[#6B6560] group-hover:text-[#D95D39] transition-colors flex-shrink-0 mt-1"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
