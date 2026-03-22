import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Wedding date: June 6, 2026
    const weddingDate = new Date('2026-06-06T12:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="w-full py-10 sm:py-14 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#C9A962]" />
            <span className="text-[#C9A962] text-sm sm:text-base">✦</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-[#3D3D3D] uppercase tracking-wider">
              Vidimo se čez ...
            </h2>
            <span className="text-[#C9A962] text-sm sm:text-base">✦</span>
            <div className="h-px w-10 sm:w-12 bg-gradient-to-l from-transparent to-[#C9A962]" />
          </div>
        </div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-lg shadow-md border border-[#C9A962]/20 p-2 sm:p-4 md:p-5 w-full">
              <span className="font-script text-2xl sm:text-4xl md:text-5xl text-[#C9A962] block text-center">
                {formatNumber(timeLeft.days)}
              </span>
            </div>
            <span className="font-body text-xs sm:text-sm text-[#7A7A7A] mt-2 uppercase tracking-wider">
              Dni
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-lg shadow-md border border-[#C9A962]/20 p-2 sm:p-4 md:p-5 w-full">
              <span className="font-script text-2xl sm:text-4xl md:text-5xl text-[#C9A962] block text-center">
                {formatNumber(timeLeft.hours)}
              </span>
            </div>
            <span className="font-body text-xs sm:text-sm text-[#7A7A7A] mt-2 uppercase tracking-wider">
              Ur
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-lg shadow-md border border-[#C9A962]/20 p-2 sm:p-4 md:p-5 w-full">
              <span className="font-script text-2xl sm:text-4xl md:text-5xl text-[#C9A962] block text-center">
                {formatNumber(timeLeft.minutes)}
              </span>
            </div>
            <span className="font-body text-xs sm:text-sm text-[#7A7A7A] mt-2 uppercase tracking-wider">
              Min
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-lg shadow-md border border-[#C9A962]/20 p-2 sm:p-4 md:p-5 w-full">
              <span className="font-script text-2xl sm:text-4xl md:text-5xl text-[#C9A962] block text-center">
                {formatNumber(timeLeft.seconds)}
              </span>
            </div>
            <span className="font-body text-xs sm:text-sm text-[#7A7A7A] mt-2 uppercase tracking-wider">
              Sek
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
