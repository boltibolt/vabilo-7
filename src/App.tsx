import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Envelope from './components/Envelope';
import Countdown from './components/Countdown';
import Invitation from './components/Invitation';
import Gifts from './components/Gifts';
import DressCode from './components/DressCode';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (isEnvelopeOpen && contentRef.current) {
      // Fade in the content after envelope opens
      gsap.fromTo(contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out', delay: 0.3 }
      );
      
      // Smooth scroll to content
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 600);
    }
  }, [isEnvelopeOpen]);

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Envelope Section */}
      <div className={`transition-all duration-1000 ${isEnvelopeOpen ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <Envelope onOpen={handleEnvelopeOpen} isOpen={isEnvelopeOpen} />
      </div>

      {/* Main Content - Shown after envelope opens */}
      <div 
        ref={contentRef}
        className={`transition-opacity duration-1000 ${isEnvelopeOpen ? 'opacity-100' : 'opacity-0 hidden'}`}
      >
        {/* Wedding Invitation Card */}
        <Invitation />

        {/* Countdown Timer */}
        <Countdown />

        {/* Dress Code */}
        <DressCode />

        {/* RSVP Form */}
        <RSVP />

        {/* Gifts Section */}
        <Gifts />
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
