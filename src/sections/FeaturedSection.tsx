import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const featuredProjects = [
  {
    title: 'Mokkapi',
    description: 'Self-hosted API mocking tool for developers',
    category: 'Software',
    image: '/project_1.jpg'
  },
  {
    title: 'Built-in Bookshelves',
    description: 'Custom shelving unit for the living room',
    category: 'Physical',
    image: '/project_2.jpg'
  },
  {
    title: 'Analytics Dashboard',
    description: 'Data visualization platform for small teams',
    category: 'Software',
    image: '/project_3.jpg'
  }
];

export default function FeaturedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE
      scrollTl
        .fromTo(headlineRef.current,
          { y: '-15vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        scrollTl.fromTo(card,
          { y: '30vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05 + i * 0.04
        );
      });

      // EXIT
      scrollTl
        .fromTo(headlineRef.current,
          { y: 0, opacity: 1 },
          { y: '-8vh', opacity: 0, ease: 'power2.in' },
          0.7
        );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        scrollTl.fromTo(card,
          { y: 0, opacity: 1 },
          { y: '12vh', opacity: 0, ease: 'power2.in' },
          0.72 + i * 0.02
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section-pinned bg-[#F7F5F2] z-30">
      <div className="w-full px-[6vw]">
        <div ref={headlineRef} className="flex items-center justify-between mb-10 max-w-5xl mx-auto">
          <h2 className="font-display headline-lg text-[#2D2A26]">
            Featured builds
          </h2>
          <a href="#all-projects" className="text-[#D95D39] flex items-center gap-1 hover:gap-2 transition-all text-sm">
            View all <ArrowUpRight size={16} />
          </a>
        </div>
        
        <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
          {featuredProjects.map((project, index) => (
            <div 
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="project-card group cursor-pointer"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="text-[#D95D39] text-xs font-medium uppercase tracking-wide">
                  {project.category}
                </span>
                <h3 className="font-display text-lg text-[#2D2A26] mt-1 mb-2">
                  {project.title}
                </h3>
                <p className="body-text text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
