import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ConsultSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
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
        .fromTo(servicesRef.current,
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
        .fromTo(servicesRef.current,
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
    <section ref={sectionRef} className="section-pinned bg-[#0B0D10] z-[60]">
      {/* Left Image Card */}
      <div 
        ref={imageRef}
        className="image-card absolute"
        style={{ left: '6vw', top: '12vh', width: '40vw', height: '70vh' }}
      >
        <img src="/consult_card_image.jpg" alt="Consulting" />
      </div>

      {/* Right Headline */}
      <div 
        ref={headlineRef}
        className="absolute"
        style={{ left: '52vw', top: '16vh', width: '42vw' }}
      >
        <h2 className="font-display headline-lg text-[#F4F6FA]">
          <span className="block">I</span>
          <span className="block text-accent">CONSULT</span>
        </h2>
      </div>

      {/* Services List */}
      <div 
        ref={servicesRef}
        className="absolute"
        style={{ left: '52vw', top: '48vh', width: '40vw', maxWidth: '400px' }}
      >
        <ul className="space-y-4 mb-8">
          <li className="flex items-center gap-3 text-[#F4F6FA]">
            <span className="w-2 h-2 bg-[#C8FF2E] rounded-full" />
            Product strategy & roadmaps
          </li>
          <li className="flex items-center gap-3 text-[#F4F6FA]">
            <span className="w-2 h-2 bg-[#C8FF2E] rounded-full" />
            Design systems & UI architecture
          </li>
          <li className="flex items-center gap-3 text-[#F4F6FA]">
            <span className="w-2 h-2 bg-[#C8FF2E] rounded-full" />
            Prototyping & validation
          </li>
        </ul>
        
        <button className="btn-primary flex items-center gap-2">
          <Calendar size={18} />
          Book a call
        </button>
      </div>

      {/* Annotation */}
      <span 
        ref={annotationRef}
        className="annotation absolute"
        style={{ left: '46vw', top: '46vh' }}
      >
        (work)
      </span>
    </section>
  );
}
