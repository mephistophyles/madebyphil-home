import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subcopyRef = useRef<HTMLDivElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const cardCRef = useRef<HTMLDivElement>(null);
  const annotationRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(headlineRef.current,
          { y: '-30vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(subcopyRef.current,
          { y: '16vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo(cardARef.current,
          { x: '60vw', opacity: 0, rotate: 6, scale: 0.96 },
          { x: 0, opacity: 1, rotate: 0, scale: 1, ease: 'none' },
          0
        )
        .fromTo(cardBRef.current,
          { x: '60vw', y: '-40vh', opacity: 0, rotate: -6 },
          { x: 0, y: 0, opacity: 1, rotate: 0, ease: 'none' },
          0.05
        )
        .fromTo(cardCRef.current,
          { y: '70vh', opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, ease: 'none' },
          0.1
        )
        .fromTo(annotationRef.current,
          { scale: 0.7, opacity: 0, rotate: -8 },
          { scale: 1, opacity: 1, rotate: 0, ease: 'back.out(1.4)' },
          0.18
        );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(headlineRef.current,
          { x: 0, opacity: 1 },
          { x: '-12vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(subcopyRef.current,
          { y: 0, opacity: 1 },
          { y: '8vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(cardARef.current,
          { x: 0, opacity: 1 },
          { x: '22vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(cardBRef.current,
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(cardCRef.current,
          { y: 0, opacity: 1 },
          { y: '18vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(annotationRef.current,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-[#0B0D10] z-30">
      {/* Left Headline */}
      <div 
        ref={headlineRef}
        className="absolute"
        style={{ left: '6vw', top: '10vh', width: '40vw' }}
      >
        <h2 className="font-display headline-lg text-[#F4F6FA]">
          <span className="block">SELECTED</span>
          <span className="block text-accent">WORK</span>
        </h2>
      </div>

      {/* Left Subcopy */}
      <div 
        ref={subcopyRef}
        className="absolute"
        style={{ left: '6vw', top: '34vh', width: '34vw' }}
      >
        <p className="body-text text-lg mb-6">
          A few things I've built, led, or shipped—across product, UI, and systems.
        </p>
        <a href="#projects" className="text-[#C8FF2E] flex items-center gap-2 hover:gap-3 transition-all">
          View all projects <ArrowUpRight size={18} />
        </a>
      </div>

      {/* Project Card A - Top Right */}
      <div 
        ref={cardARef}
        className="image-card absolute cursor-pointer group"
        style={{ left: '56vw', top: '10vh', width: '18vw', height: '22vw' }}
      >
        <img src="/project_card_a.jpg" alt="Project 1" />
        <div className="absolute inset-0 bg-[#0B0D10]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <div>
            <p className="text-[#C8FF2E] font-display text-sm">Mokkapi</p>
            <p className="text-[#A7AFBF] text-xs">API Mocking Tool</p>
          </div>
        </div>
      </div>

      {/* Project Card B - Middle Right */}
      <div 
        ref={cardBRef}
        className="image-card absolute cursor-pointer group"
        style={{ left: '76vw', top: '18vh', width: '18vw', height: '22vw' }}
      >
        <img src="/project_card_b.jpg" alt="Project 2" />
        <div className="absolute inset-0 bg-[#0B0D10]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <div>
            <p className="text-[#C8FF2E] font-display text-sm">Design System</p>
            <p className="text-[#A7AFBF] text-xs">Component Library</p>
          </div>
        </div>
      </div>

      {/* Project Card C - Lower */}
      <div 
        ref={cardCRef}
        className="image-card absolute cursor-pointer group"
        style={{ left: '56vw', top: '56vh', width: '38vw', height: '26vh' }}
      >
        <img src="/project_card_c.jpg" alt="Project 3" />
        <div className="absolute inset-0 bg-[#0B0D10]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <div>
            <p className="text-[#C8FF2E] font-display text-sm">Product Strategy</p>
            <p className="text-[#A7AFBF] text-xs">Consulting Work</p>
          </div>
        </div>
      </div>

      {/* Annotation */}
      <span 
        ref={annotationRef}
        className="annotation absolute"
        style={{ left: '46vw', top: '46vh' }}
      >
        (explore)
      </span>
    </section>
  );
}
