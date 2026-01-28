import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ExperimentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
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
        .fromTo(imageRef.current,
          { x: '-60vw', opacity: 0, rotate: -2 },
          { x: 0, opacity: 1, rotate: 0, ease: 'none' },
          0
        )
        .fromTo(headlineRef.current,
          { x: '50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(bodyRef.current,
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(annotationRef.current,
          { scale: 0.7, opacity: 0, rotate: -10 },
          { scale: 1, opacity: 1, rotate: 0, ease: 'back.out(1.4)' },
          0.15
        );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(imageRef.current,
          { x: 0, opacity: 1 },
          { x: '-20vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(headlineRef.current,
          { x: 0, opacity: 1 },
          { x: '16vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(bodyRef.current,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
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
    <section ref={sectionRef} className="section-pinned bg-[#0B0D10] z-[80]">
      {/* Left Image Card */}
      <div 
        ref={imageRef}
        className="image-card absolute"
        style={{ left: '6vw', top: '12vh', width: '40vw', height: '70vh' }}
      >
        <img src="/experiment_card_image.jpg" alt="Experiments" />
      </div>

      {/* Right Headline */}
      <div 
        ref={headlineRef}
        className="absolute"
        style={{ left: '52vw', top: '18vh', width: '42vw' }}
      >
        <h2 className="font-display headline-lg text-[#F4F6FA]">
          <span className="block">I</span>
          <span className="block text-accent">EXPERIMENT</span>
        </h2>
      </div>

      {/* Right Body */}
      <div 
        ref={bodyRef}
        className="absolute"
        style={{ left: '52vw', top: '50vh', width: '40vw', maxWidth: '440px' }}
      >
        <p className="body-text text-lg mb-6">
          Side projects, generative UI, and weird little prototypes that don't need a roadmap.
        </p>
        <a href="#experiments" className="text-[#C8FF2E] flex items-center gap-2 hover:gap-3 transition-all">
          See experiments <ArrowUpRight size={18} />
        </a>
      </div>

      {/* Annotation */}
      <span 
        ref={annotationRef}
        className="annotation absolute"
        style={{ left: '46vw', top: '48vh' }}
      >
        (play)
      </span>
    </section>
  );
}
