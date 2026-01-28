import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    title: 'Start with the user, not the solution.',
    description: 'Understanding the problem deeply before jumping to answers.'
  },
  {
    title: 'Ship small, learn fast.',
    description: 'Iteration beats perfection. Every time.'
  },
  {
    title: 'Clarity beats cleverness.',
    description: 'Simple is hard. But simple wins.'
  }
];

export default function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal
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

      // Intro reveal
      gsap.fromTo(introRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 1,
          }
        }
      );

      // Cards stagger
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { x: '-10vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.12,
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
    <section ref={sectionRef} className="section-flowing bg-[#0B0D10] z-[90] py-24">
      <div className="px-[6vw]">
        <h2 
          ref={headingRef}
          className="font-display headline-lg text-[#F4F6FA] mb-4"
        >
          <span className="text-accent">PRINCIPLES</span>
        </h2>
        
        <p ref={introRef} className="body-text text-lg max-w-[52ch] mb-12">
          A few rules I return to when things get complicated.
        </p>

        <div className="space-y-6">
          {principles.map((principle, index) => (
            <div 
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="border-l-2 border-[#C8FF2E] pl-6 py-2 max-w-[58vw]"
            >
              <h3 className="text-[#F4F6FA] font-display text-xl mb-2">
                {principle.title}
              </h3>
              <p className="body-text">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
