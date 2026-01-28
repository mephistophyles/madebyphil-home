import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          }
        }
      );

      gsap.fromTo(contentRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: contentRef.current,
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
    <section ref={sectionRef} id="about" className="section-flowing bg-[#F7F5F2] z-50">
      <div className="px-[6vw]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div 
            ref={imageRef}
            className="image-card w-64 h-80 flex-shrink-0"
          >
            <img 
              src="/about_photo.jpg" 
              alt="Phil"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div ref={contentRef}>
            <h2 className="font-display headline-lg text-[#2D2A26] mb-6">
              About
            </h2>
            
            <p className="body-text text-lg mb-6">
              I build things because I enjoy the process of turning ideas into reality. Sometimes that's code, sometimes that's wood, sometimes it's something entirely different.
            </p>
            
            <p className="body-text mb-6">
              I don't have a grand plan. I just like making stuff and sharing what I learn along the way. This site is a collection of those things—some finished, some abandoned, all part of the process.
            </p>
            
            <div className="flex gap-8 pt-4">
              <div>
                <span className="font-display text-3xl text-[#D95D39]">25+</span>
                <p className="body-text text-sm mt-1">Projects shared</p>
              </div>
              <div>
                <span className="font-display text-3xl text-[#D95D39]">3</span>
                <p className="body-text text-sm mt-1">Companies built</p>
              </div>
              <div>
                <span className="font-display text-3xl text-[#D95D39]">∞</span>
                <p className="body-text text-sm mt-1">Lessons learned</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
