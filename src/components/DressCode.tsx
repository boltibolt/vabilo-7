import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DressCode() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const recommendedColors = [
    { name: 'Rumena', color: '#E0BB2F' },
    { name: 'Temno modra', color: '#1a365d', mobileLabel: ['Temno', 'modra'] },
    { name: 'Temno zelena', color: '#1a472a', mobileLabel: ['Temno', 'zelena'] },
    { name: 'Rjava', color: '#5D4037' },
    { name: 'Siva', color: '#8A8A8A' }
  ];

  const notRecommendedColors = [
    { name: 'Šampanjec', color: '#B8AA8A' },
    { name: 'Oranžna', color: '#DD6B20' },
    { name: 'Rdeča', color: '#C53030' },
    { name: 'Roza', color: '#D53F8C' },
    { name: 'Vijolična', color: '#805AD5' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.dresscode-header',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.dresscode-header',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.recommended-color',
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.recommended-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.notrecommended-color',
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.notrecommended-section',
            start: 'top 80%',
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
      <div className="max-w-3xl mx-auto">
        <div className="dresscode-header text-center mb-8 sm:mb-10" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#C9A962]" />
            <span className="text-[#C9A962] text-sm sm:text-base">✦</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-[#3D3D3D] uppercase tracking-wider">
              Kodeks Oblačenja
            </h2>
            <span className="text-[#C9A962] text-sm sm:text-base">✦</span>
            <div className="h-px w-10 sm:w-12 bg-gradient-to-l from-transparent to-[#C9A962]" />
          </div>
        </div>

        <div className="recommended-section mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            <h3 className="font-display text-base sm:text-lg text-[#3D3D3D] uppercase tracking-wide">
              Priporočene barve
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-1 gap-y-4 sm:gap-x-2 sm:gap-y-5 md:justify-between">
            {recommendedColors.map((item, index) => (
              <div 
                key={index}
                className="recommended-color w-[84px] sm:w-[96px] md:w-[104px] flex flex-col items-center gap-1.5 sm:gap-2 text-center"
                style={{ opacity: 0 }}
              >
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md"
                  style={{ 
                    backgroundColor: item.color,
                    boxShadow: `0 3px 10px ${item.color}50`
                  }}
                />
                <span className="font-body text-xs sm:text-sm text-[#3D3D3D] text-center leading-tight min-h-[2.2rem] sm:min-h-[2.5rem] flex items-center justify-center">
                  {item.mobileLabel ? (
                    <>
                      <span className="sm:hidden">{item.mobileLabel[0]}<br />{item.mobileLabel[1]}</span>
                      <span className="hidden sm:inline">{item.name}</span>
                    </>
                  ) : (
                    item.name
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center my-6 sm:my-8">
          <div className="h-px w-24 sm:w-28 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent" />
        </div>

        <div className="notrecommended-section">
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            <h3 className="font-display text-base sm:text-lg text-[#3D3D3D] uppercase tracking-wide text-center">
              Prosiva, da se izognete spodnjim barvam.
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-1 gap-y-4 sm:gap-x-2 sm:gap-y-5 md:justify-between">
            {notRecommendedColors.map((item, index) => (
              <div 
                key={index}
                className="notrecommended-color w-[84px] sm:w-[96px] md:w-[104px] flex flex-col items-center gap-1.5 sm:gap-2 text-center"
                style={{ opacity: 0 }}
              >
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-sm flex items-center justify-center"
                  style={{ 
                    backgroundColor: item.color,
                    boxShadow: `0 2px 6px ${item.color}40`
                  }}
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-md" strokeWidth={3} />
                </div>
                <span className="font-body text-xs sm:text-sm text-[#7A7A7A] text-center leading-tight min-h-[2.2rem] sm:min-h-[2.5rem] flex items-center justify-center">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 text-center">
          <p className="font-body text-sm sm:text-base text-[#7A7A7A] italic">
            Hvala za razumevanje in upoštevanje najinih želja!
          </p>
        </div>
      </div>
    </section>
  );
}
