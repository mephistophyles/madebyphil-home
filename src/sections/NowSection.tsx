import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statusItems = [
  'Building a new product system.',
  'Writing weekly.',
  'Open for select consulting.'
];

export default function NowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

      gsap.fromTo(listRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 1,
          }
        }
      );

      gsap.fromTo(imageRef.current,
        { x: '10vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-flowing bg-[#0B0D10] z-[100] py-24">
      <div className="px-[6vw] flex flex-col lg:flex-row justify-between gap-12">
        <div className="lg:w-1/2">
          <h2 
            ref={headingRef}
            className="font-display headline-lg text-[#F4F6FA] mb-8"
          >
            <span className="text-accent">NOW</span>
          </h2>
          
          <ul ref={listRef} className="space-y-4">
            {statusItems.map((item, index) => (
              <li key={index} className="flex items-center gap-4 text-[#F4F6FA] text-lg">
                <span className="w-2 h-2 bg-[#C8FF2E] rounded-full animate-pulse" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div 
          ref={imageRef}
          className="image-card lg:w-[34vw] h-[44vh]"
        >
          <img 
            src="/build_card_image.jpg" 
            alt="Current work"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
