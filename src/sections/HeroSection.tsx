import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const annotationRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      loadTl
        .fromTo(headlineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 }
        )
        .fromTo(subheadRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(ctaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(imagesRef.current?.querySelectorAll('.hero-image') || [],
          { opacity: 0, x: 50, rotate: 5 },
          { opacity: 1, x: 0, rotate: 0, duration: 0.7, stagger: 0.1 },
          '-=0.5'
        )
        .fromTo(annotationRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.6)' },
          '-=0.3'
        );

      // Scroll exit
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([headlineRef.current, subheadRef.current, ctaRef.current, annotationRef.current], {
              opacity: 1, x: 0, y: 0
            });
            gsap.set(imagesRef.current?.querySelectorAll('.hero-image') || [], {
              opacity: 1, x: 0, rotate: 0
            });
          }
        }
      });

      scrollTl
        .fromTo(headlineRef.current,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(subheadRef.current,
          { y: 0, opacity: 1 },
          { y: '-8vh', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(ctaRef.current,
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0, ease: 'power2.in' },
          0.74
        )
        .fromTo(imagesRef.current?.querySelectorAll('.hero-image') || [],
          { x: 0, opacity: 1 },
          { x: '15vw', opacity: 0, stagger: 0.02, ease: 'power2.in' },
          0.7
        )
        .fromTo(annotationRef.current,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-[#F7F5F2] z-10">
      <div className="w-full h-full flex items-center">
        {/* Left Content */}
        <div className="w-1/2 pl-[8vw] pr-8">
          <h1 
            ref={headlineRef}
            className="font-display headline-xl text-[#2D2A26] mb-6"
          >
            I build things.
          </h1>
          
          <p 
            ref={subheadRef}
            className="body-text text-lg max-w-md mb-8"
          >
            Software, Woodworking, DIY projects, 3D prints and sometimes companies. This is where I share what I'm working on.
          </p>
          
          <button 
            ref={ctaRef}
            className="btn-primary flex items-center gap-2"
          >
            Explore projects
            <ArrowDown size={18} />
          </button>
          
          <span 
            ref={annotationRef}
            className="annotation block mt-8 ml-4"
          >
            (hi!)
          </span>
        </div>

        {/* Right Images - Polaroid Collage */}
        <div 
          ref={imagesRef}
          className="w-1/2 h-full relative"
        >
          <div 
            className="hero-image image-card absolute"
            style={{ 
              right: '8vw', 
              top: '15vh', 
              width: '280px', 
              height: '200px',
              transform: 'rotate(-3deg)'
            }}
          >
            <img src="/hero_diy.jpg" alt="DIY project" />
          </div>
          
          <div 
            className="hero-image image-card absolute"
            style={{ 
              right: '4vw', 
              top: '35vh', 
              width: '260px', 
              height: '180px',
              transform: 'rotate(4deg)'
            }}
          >
            <img src="/hero_software.jpg" alt="Software project" />
          </div>
          
          <div 
            className="hero-image image-card absolute"
            style={{ 
              right: '12vw', 
              top: '52vh', 
              width: '240px', 
              height: '160px',
              transform: 'rotate(-2deg)'
            }}
          >
            <img src="/hero_business.jpg" alt="Business project" />
          </div>
          
          <div 
            className="hero-image image-card absolute"
            style={{ 
              right: '6vw', 
              top: '68vh', 
              width: '200px', 
              height: '140px',
              transform: 'rotate(5deg)'
            }}
          >
            <img src="/hero_workspace.jpg" alt="Workspace" />
          </div>
        </div>
      </div>
    </section>
  );
}
