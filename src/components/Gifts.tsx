import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gift } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Gifts() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gifts-header',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gifts-header',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.gifts-content',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gifts-content',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="gifts-header text-center mb-6 sm:mb-8" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#C9A962]" />
            <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A962]" />
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-[#3D3D3D] uppercase tracking-wider">
              Obdarovanje
            </h2>
            <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A962]" />
            <div className="h-px w-10 sm:w-12 bg-gradient-to-l from-transparent to-[#C9A962]" />
          </div>
        </div>

        {/* Content */}
        <div 
          className="gifts-content bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-5 sm:p-8 border border-[#C9A962]/20"
          style={{ opacity: 0 }}
        >
          <p className="font-body text-base sm:text-lg md:text-xl text-[#3D3D3D] text-center leading-relaxed">
            Začela bova z ustvarjanjem najinega doma, treh mikrovalovnih pečic res ne potrebujeva. Najbolj bova vesela kakršnegakoli prispevka.
          </p>
          
          {/* Decorative element */}
          <div className="mt-5 sm:mt-6 flex items-center justify-center">
            <div className="h-px w-16 sm:w-20 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
