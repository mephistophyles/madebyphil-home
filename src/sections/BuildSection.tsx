import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BuildSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
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
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(bodyRef.current,
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo(imageRef.current,
          { x: '60vw', opacity: 0, rotate: 2 },
          { x: 0, opacity: 1, rotate: 0, ease: 'none' },
          0
        )
        .fromTo(annotationRef.current,
          { scale: 0.7, opacity: 0, rotate: -8 },
          { scale: 1, opacity: 1, rotate: 0, ease: 'back.out(1.4)' },
          0.12
        );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(headlineRef.current,
          { x: 0, opacity: 1 },
          { x: '-16vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(bodyRef.current,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(imageRef.current,
          { x: 0, opacity: 1 },
          { x: '20vw', opacity: 0, ease: 'power2.in' },
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
    <section ref={sectionRef} className="section-pinned bg-[#0B0D10] z-50">
      {/* Left Headline */}
      <div 
        ref={headlineRef}
        className="absolute"
        style={{ left: '6vw', top: '14vh', width: '44vw' }}
      >
        <h2 className="font-display headline-lg text-[#F4F6FA]">
          <span className="block">I</span>
          <span className="block text-accent">BUILD</span>
        </h2>
      </div>

      {/* Left Body */}
      <p 
        ref={bodyRef}
        className="absolute body-text text-lg"
        style={{ left: '6vw', top: '48vh', width: '40vw', maxWidth: '460px' }}
      >
        Prototypes, design systems, and frontend architecture—built to ship, built to iterate.
      </p>

      {/* Right Image Card */}
      <div 
        ref={imageRef}
        className="image-card absolute"
        style={{ left: '54vw', top: '12vh', width: '40vw', height: '70vh' }}
      >
        <img src="/build_card_image.jpg" alt="Building" />
      </div>

      {/* Annotation */}
      <span 
        ref={annotationRef}
        className="annotation absolute"
        style={{ left: '48vw', top: '58vh' }}
      >
        (ship)
      </span>
    </section>
  );
}
