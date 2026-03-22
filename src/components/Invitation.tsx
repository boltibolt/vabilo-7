import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Invitation() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.invitation-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.invitation-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        '.hero-image-block',
        { opacity: 0, y: 18, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.hero-image-block',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        '.route-image',
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.route-image',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        '.children-note',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.children-note',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div
        className="invitation-card max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-[28px] shadow-xl p-5 sm:p-8 md:p-12 relative overflow-hidden paper-texture"
        style={{ opacity: 0 }}
      >
        <div className="absolute top-3 left-3 sm:top-5 sm:left-5 w-7 h-7 sm:w-10 sm:h-10 border-l-2 border-t-2 border-[#C9A962] rounded-tl-xl" />
        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 w-7 h-7 sm:w-10 sm:h-10 border-r-2 border-t-2 border-[#C9A962] rounded-tr-xl" />
        <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 w-7 h-7 sm:w-10 sm:h-10 border-l-2 border-b-2 border-[#C9A962] rounded-bl-xl" />
        <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 w-7 h-7 sm:w-10 sm:h-10 border-r-2 border-b-2 border-[#C9A962] rounded-br-xl" />

        <div className="hero-image-block mx-auto max-w-[1320px] mb-6 sm:mb-8" style={{ opacity: 0 }}>
          <img
            src="/images/zacetek.png"
            alt="Začetna slika poročnega vabila"
            className="w-full h-auto object-contain select-none rounded-[18px]"
          />
        </div>

        <div className="route-image mx-auto max-w-[1320px]" style={{ opacity: 0 }}>
          <img
            src="/images/route-section.png"
            alt="Potek poročnega dne"
            className="w-full h-auto object-contain select-none"
          />
        </div>

        <div className="children-note mt-8 sm:mt-10 pt-6 border-t border-[#E5DDD3]" style={{ opacity: 0 }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A962] flex-shrink-0" />
            <p className="font-body text-sm sm:text-base text-[#7A7A7A]">
              <span className="text-[#3D3D3D] font-medium">Pomembno:</span> Čeprav imava oba zelo rada otroke, si za ta večer želiva sproščenega vzdušja v družbi odraslih, zato bo pogostitev in slavje namenjeno le odraslim gostom.
 <br />
Prihod svatov pričakujemo ob 11:30 uri na Brdu pri Kranju, kjer vas bodo prijazno sprejele družice.
<br />
Parkirišče je zagotovljeno v garažni hiši pod hotelom Kempinski.
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <div className="h-px w-20 sm:w-28 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent" />
        </div>
      </div>
    </section>
  );
}
