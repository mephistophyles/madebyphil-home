import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const recentBuilds = [
  {
    title: 'Garden Planter Boxes',
    date: 'Jan 2026',
    category: 'Physical',
    description: 'Raised cedar planters for the backyard'
  },
  {
    title: 'CLI Tool Update',
    date: 'Dec 2025',
    category: 'Software',
    description: 'Added batch processing to my file organizer'
  },
  {
    title: 'Product Strategy Doc',
    date: 'Nov 2025',
    category: 'Business',
    description: 'Framework for prioritizing features'
  },
  {
    title: 'Kitchen Backsplash',
    date: 'Oct 2025',
    category: 'Physical',
    description: 'Subway tile install weekend project'
  },
  {
    title: 'API Wrapper Library',
    date: 'Sep 2025',
    category: 'Software',
    description: 'TypeScript wrapper for common services'
  }
];

export default function RecentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(item,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.08,
            scrollTrigger: {
              trigger: item,
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
    <section ref={sectionRef} className="section-flowing bg-[#F7F5F2] z-40">
      <div className="px-[6vw] max-w-4xl mx-auto">
        <h2 
          ref={headingRef}
          className="font-display headline-lg text-[#2D2A26] mb-10"
        >
          Recent builds
        </h2>
        
        <div className="space-y-4">
          {recentBuilds.map((build, index) => (
            <div 
              key={index}
              ref={el => { itemsRef.current[index] = el; }}
              className="bg-white rounded-xl p-5 card-shadow flex items-center justify-between group cursor-pointer hover:card-shadow-hover transition-all"
            >
              <div className="flex items-center gap-6">
                <span className="text-[#6B6560] text-sm w-24">{build.date}</span>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-display text-[#2D2A26] group-hover:text-[#D95D39] transition-colors">
                      {build.title}
                    </h3>
                    <span className="text-[#D95D39] text-xs font-medium px-2 py-0.5 bg-[#D95D39]/10 rounded-full">
                      {build.category}
                    </span>
                  </div>
                  <p className="body-text text-sm">{build.description}</p>
                </div>
              </div>
              <ArrowUpRight 
                size={18} 
                className="text-[#6B6560] group-hover:text-[#D95D39] transition-colors opacity-0 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
