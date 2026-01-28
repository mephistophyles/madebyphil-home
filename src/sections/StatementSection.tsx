import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
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
        .fromTo(photoRef.current,
          { x: '-60vw', opacity: 0, rotate: -2 },
          { x: 0, opacity: 1, rotate: 0, ease: 'none' },
          0
        )
        .fromTo(headlineRef.current?.querySelectorAll('.headline-line') || [],
          { x: '50vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0
        )
        .fromTo(bodyRef.current,
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(annotationRef.current,
          { scale: 0.7, opacity: 0, rotate: -10 },
          { scale: 1, opacity: 1, rotate: 0, ease: 'back.out(1.4)' },
          0.12
        );

      // SETTLE (30% - 70%) - elements hold position

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(photoRef.current,
          { x: 0, opacity: 1, rotate: 0 },
          { x: '-22vw', opacity: 0, rotate: -1, ease: 'power2.in' },
          0.7
        )
        .fromTo(headlineRef.current?.querySelectorAll('.headline-line') || [],
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(bodyRef.current,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(annotationRef.current,
          { rotate: 0, opacity: 1 },
          { rotate: 12, opacity: 0, ease: 'power2.in' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-[#0B0D10] z-20">
      {/* Left Portrait Card */}
      <div 
        ref={photoRef}
        className="image-card absolute"
        style={{ left: '6vw', top: '12vh', width: '38vw', height: '70vh' }}
      >
        <img 
          src="/phil_portrait_01.jpg" 
          alt="Phil portrait"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Statement */}
      <div 
        ref={headlineRef}
        className="absolute"
        style={{ left: '50vw', top: '18vh', width: '44vw' }}
      >
        <h2 className="font-display headline-lg text-[#F4F6FA]">
          <span className="headline-line block">I'M A</span>
          <span className="headline-line block text-accent">PRODUCT</span>
          <span className="headline-line block">STRATEGIST</span>
          <span className="headline-line block text-2xl mt-2 text-[#A7AFBF]">& BUILDER</span>
        </h2>
      </div>

      {/* Body Copy */}
      <p 
        ref={bodyRef}
        className="absolute body-text text-lg"
        style={{ left: '50vw', top: '60vh', width: '40vw', maxWidth: '460px' }}
      >
        I work at the intersection of user needs, business goals, and frontend execution—turning ambiguity into shipped product.
      </p>

      {/* Annotation */}
      <span 
        ref={annotationRef}
        className="annotation absolute"
        style={{ left: '44vw', top: '54vh' }}
      >
        (yes!)
      </span>
    </section>
  );
}
