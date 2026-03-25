import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

interface EnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function Envelope({ onOpen, isOpen }: EnvelopeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Envelope fade in
      tl.fromTo(envelopeRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
      );
      
      // Seal pop in
      tl.fromTo(sealRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.4'
      );
      
      // Instruction fade up
      tl.fromTo('.envelope-instruction',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // Hover effect on seal
  useEffect(() => {
    if (!hasClicked && !isOpen) {
      gsap.to(sealRef.current, {
        scale: isHovered ? 1.05 : 1,
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  }, [isHovered, hasClicked, isOpen]);

  const handleSealClick = () => {
    if (hasClicked || isOpen) return;
    setHasClicked(true);
    
    const tl = gsap.timeline({
      onComplete: () => {
        onOpen();
      }
    });
    
    // Seal press effect
    tl.to(sealRef.current, {
      scale: 0.9,
      duration: 0.1,
      ease: 'power2.in'
    });
    
    // Seal releases and fades out
    tl.to(sealRef.current, {
      scale: 1.3,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
    
    // Envelope opens - scale up and fade out
    tl.to(envelopeRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut'
    }, '-=0.2');
    
    // Hide instruction
    tl.to('.envelope-instruction', {
      opacity: 0,
      duration: 0.3
    }, '-=0.5');
  };

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-screen flex flex-col items-center justify-center py-8 px-4 bg-[#FAF8F5] text-center overflow-hidden"
    >
      {/* Closed Envelope */}
      <div 
        ref={envelopeRef}
        className="relative mx-auto flex justify-center"
        style={{ opacity: 0 }}
      >
        {/* Envelope Image - CLOSED */}
        <div className="relative w-[300px] h-[200px] sm:w-[380px] sm:h-[260px] md:w-[450px] md:h-[300px] mx-auto">
          <img 
            src="/images/kuverta.png" 
            alt="Envelope"
            className="block w-full h-full object-contain drop-shadow-xl mx-auto"
          />
          
          {/* Wax Seal - positioned on the envelope */}
          <div 
            ref={sealRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            onClick={handleSealClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ opacity: 0 }}
          >
            <div className="relative seal-glow rounded-full">
              <img 
                src="/images/pecat.png" 
                alt="Wax Seal"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Instruction Text */}
      <p className="envelope-instruction mt-6 font-body text-sm sm:text-base text-[#7A7A7A] italic opacity-0 text-center">
        S klikom na pečat odprete vabilo.
      </p>
    </div>
  );
}
