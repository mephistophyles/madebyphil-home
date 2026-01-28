import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Hammer, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    name: 'Software',
    count: 12,
    image: '/category_software.jpg',
    icon: Code,
    description: 'Apps, tools, and experiments'
  },
  {
    name: 'Physical',
    count: 8,
    image: '/category_physical.jpg',
    icon: Hammer,
    description: 'DIY, woodworking, house projects'
  },
  {
    name: 'Business',
    count: 5,
    image: '/category_business.jpg',
    icon: Lightbulb,
    description: 'Companies, strategy, products'
  }
];

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
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
          { y: '-20vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        scrollTl.fromTo(card,
          { y: '40vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05 + i * 0.03
        );
      });

      // EXIT
      scrollTl
        .fromTo(headlineRef.current,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.7
        );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        scrollTl.fromTo(card,
          { y: 0, opacity: 1 },
          { y: '15vh', opacity: 0, ease: 'power2.in' },
          0.72 + i * 0.02
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-[#F7F5F2] z-20">
      <div className="w-full px-[6vw]">
        <h2 
          ref={headlineRef}
          className="font-display headline-lg text-[#2D2A26] text-center mb-12"
        >
          Browse by type
        </h2>
        
        <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <div 
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="category-card group"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <category.icon size={18} className="text-[#D95D39]" />
                  <h3 className="font-display text-lg text-[#2D2A26]">{category.name}</h3>
                </div>
                <p className="body-text text-sm mb-2">{category.description}</p>
                <span className="text-[#D95D39] text-sm font-medium">{category.count} projects</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
