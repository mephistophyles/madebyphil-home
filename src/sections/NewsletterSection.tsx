import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section ref={sectionRef} className="section-flowing bg-[#F7F5F2] z-[70]">
      <div className="px-[6vw]">
        <div 
          ref={contentRef}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="font-display headline-lg text-[#2D2A26] mb-4">
            Get updates
          </h2>
          
          <p className="body-text text-lg mb-8">
            New projects, write-ups, and whatever I'm learning.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-3 justify-center mb-4">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 max-w-xs bg-white border border-[#6B6560]/20 rounded-xl px-4 py-3 text-[#2D2A26] placeholder:text-[#6B6560]/50 focus:outline-none focus:border-[#D95D39] transition-colors"
            />
            <button 
              type="submit"
              className="btn-primary flex items-center gap-2"
              disabled={subscribed}
            >
              {subscribed ? (
                <>
                  <Check size={18} />
                  Subscribed
                </>
              ) : (
                <>
                  <Send size={18} />
                  Subscribe
                </>
              )}
            </button>
          </form>

          <p className="text-[#6B6560] text-sm">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
