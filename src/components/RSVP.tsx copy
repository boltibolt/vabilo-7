import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Check, Users, Mail, User, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

const accommodationOptions = ['100-150 eur', '150-200 eur', '200 eur +'];

export default function RSVP() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: 1,
    attending: 'yes',
    needsAccommodation: false,
    accommodationBudget: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.rsvp-header',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.rsvp-header',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.form-field',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.rsvp-form',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const details = [
      `Ime in priimek: ${formData.name}`,
      `Email: ${formData.email}`,
      `Število oseb: ${formData.guests}`,
      `Udeležba: ${formData.attending === 'yes' ? 'Da, pridem/pridemo.' : 'Žal ne morem/moremo.'}`,
      `Potrebujem/potrebujemo prenočišče: ${
        formData.attending === 'yes'
          ? (formData.needsAccommodation ? 'Da' : 'Ne')
          : 'Ni relevantno'
      }`
    ];

    if (formData.attending === 'yes' && formData.needsAccommodation && formData.accommodationBudget) {
      details.push(`Cenovni razred prenočišča: ${formData.accommodationBudget}`);
    }

    if (formData.message.trim()) {
      details.push(`Sporočilo: ${formData.message}`);
    }

    const subject = encodeURIComponent(`RSVP - ${formData.name} - Poročna udeležba`);
    const body = encodeURIComponent(details.join('\n'));

    window.location.href = `mailto:mitja.boltezar@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A962', '#D4BC7A', '#FAF8F5', '#A68B4B']
      });

      gsap.to('.rsvp-form', {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: 'power2.in'
      });

      gsap.fromTo('.success-message',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.3 }
      );
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isCheckbox = e.target instanceof HTMLInputElement && e.target.type === 'checkbox';
    const checked = e.target instanceof HTMLInputElement ? e.target.checked : false;

    setFormData(prev => {
      const next = {
        ...prev,
        [name]: isCheckbox ? checked : name === 'guests' ? Number(value) : value
      };

      if (name === 'attending' && value === 'no') {
        next.needsAccommodation = false;
        next.accommodationBudget = '';
      }

      if (name === 'needsAccommodation' && !checked) {
        next.accommodationBudget = '';
      }

      return next;
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="rsvp-header text-center mb-8 sm:mb-10" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#C9A962]" />
            <span className="text-[#C9A962] text-base sm:text-lg">✦</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-[#3D3D3D] uppercase tracking-wider">
              RSVP
            </h2>
            <span className="text-[#C9A962] text-base sm:text-lg">✦</span>
            <div className="h-px w-10 sm:w-12 bg-gradient-to-l from-transparent to-[#C9A962]" />
          </div>
          <p className="font-body text-base sm:text-lg text-[#7A7A7A]">
            Prosimo, da potrdite svojo udeležbo najkasneje do 5.5.2026.
          </p>
        </div>

        {/* Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="rsvp-form space-y-4 sm:space-y-6">
            {/* Name Field */}
            <div className="form-field relative" style={{ opacity: 0 }}>
              <label className="block font-body text-sm text-[#7A7A7A] mb-1.5 sm:mb-2">
                Ime in priimek
              </label>
              <div className="relative">
                <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#C9A962]" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-elegant pl-10 sm:pl-12 text-sm sm:text-base"
                  placeholder="Vnesite svoje ime"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-field relative" style={{ opacity: 0 }}>
              <label className="block font-body text-sm text-[#7A7A7A] mb-1.5 sm:mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#C9A962]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-elegant pl-10 sm:pl-12 text-sm sm:text-base"
                  placeholder="vas@email.com"
                />
              </div>
            </div>

            {/* Number of Guests */}
            <div className="form-field relative" style={{ opacity: 0 }}>
              <label className="block font-body text-sm text-[#7A7A7A] mb-1.5 sm:mb-2">
                Število oseb
              </label>
              <div className="relative">
                <Users className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#C9A962]" />
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="input-elegant pl-10 sm:pl-12 appearance-none cursor-pointer text-sm sm:text-base"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Attending Radio */}
            <div className="form-field" style={{ opacity: 0 }}>
              <label className="block font-body text-sm text-[#7A7A7A] mb-2 sm:mb-3">
                Ali se boste udeležili?
              </label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex-shrink-0">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === 'yes'}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#C9A962] peer-checked:bg-[#C9A962] peer-checked:border-[#C9A962] transition-all duration-200" />
                    <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                  </div>
                  <span className="font-body text-sm sm:text-base text-[#3D3D3D] group-hover:text-[#C9A962] transition-colors">
                    Da, pridem/pridemo.
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex-shrink-0">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === 'no'}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#C9A962] peer-checked:bg-[#C9A962] peer-checked:border-[#C9A962] transition-all duration-200" />
                    <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                  </div>
                  <span className="font-body text-sm sm:text-base text-[#3D3D3D] group-hover:text-[#C9A962] transition-colors">
                    Žal, ne morem/moremo.
                  </span>
                </label>
              </div>
            </div>

            {/* Accommodation */}
            {formData.attending === 'yes' && (
              <div className="form-field" style={{ opacity: 0 }}>
                <label className="block font-body text-sm text-[#7A7A7A] mb-2 sm:mb-3">
                  Prenočišče
                </label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        name="needsAccommodation"
                        checked={formData.needsAccommodation}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md border-2 border-[#C9A962] bg-white peer-checked:bg-[#C9A962] peer-checked:border-[#C9A962] transition-all duration-200" />
                      <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                    </div>
                    <span className="font-body text-sm sm:text-base text-[#3D3D3D] group-hover:text-[#C9A962] transition-colors leading-relaxed">
                      Potrebujem/potrebujemo prenočišče.
                    </span>
                  </label>

                  {formData.needsAccommodation && (
                    <div className="rounded-lg border border-[#C9A962]/20 bg-white/80 p-4 sm:p-5 space-y-4">
                      <p className="font-body text-sm sm:text-base text-[#3D3D3D]">
                        Izberite želeni cenovni razred:
                      </p>

                      <div className="space-y-3">
                        {accommodationOptions.map(option => (
                          <label key={option} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex-shrink-0">
                              <input
                                type="radio"
                                name="accommodationBudget"
                                value={option}
                                checked={formData.accommodationBudget === option}
                                onChange={handleChange}
                                required={formData.needsAccommodation}
                                className="peer sr-only"
                              />
                              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#C9A962] peer-checked:bg-[#C9A962] peer-checked:border-[#C9A962] transition-all duration-200" />
                              <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                            </div>
                            <span className="font-body text-sm sm:text-base text-[#3D3D3D] group-hover:text-[#C9A962] transition-colors">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>

                      <p className="font-body text-xs sm:text-sm text-[#7A7A7A] italic leading-relaxed">
                        V primeru, da se odločite za prenočišče, nama morate sporočiti najkasneje do 10.4.2026.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Message Field */}
            <div className="form-field relative" style={{ opacity: 0 }}>
              <label className="block font-body text-sm text-[#7A7A7A] mb-1.5 sm:mb-2">
                Sporočilo (opcijsko)
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-[#C9A962]" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="input-elegant pl-10 sm:pl-12 pt-2.5 sm:pt-3 resize-none text-sm sm:text-base"
                  placeholder="Dodatno sporočilo..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-field pt-2 sm:pt-4" style={{ opacity: 0 }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn w-full py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-[#C9A962] via-[#D4BC7A] to-[#C9A962] bg-[length:200%_100%] text-white font-display text-base sm:text-lg uppercase tracking-wider rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed btn-shine flex items-center justify-center gap-2 sm:gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-sm sm:text-base">Pošiljanje...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Pošlji odgovor</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Success Message */
          <div className="success-message text-center py-10 sm:py-12" style={{ opacity: 0 }}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-[#C9A962] flex items-center justify-center">
              <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-[#3D3D3D] mb-2 sm:mb-3">
              Hvala za vaš odgovor!
            </h3>
            <p className="font-body text-base sm:text-lg text-[#7A7A7A]">
              {formData.attending === 'yes' 
                ? 'Navdušena sva, da boste z nama!' 
                : 'Žal nam je, da se ne morete udeležiti.'}
            </p>
            <p className="font-body text-xs sm:text-sm text-[#7A7A7A] mt-3 sm:mt-4">
              Email odprt v vašem odjemalcu. Prosimo, pošljite ga.
            </p>
          </div>
        )}

        {/* Bottom decoration */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center">
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent" />
        </div>
      </div>
    </section>
  );
}
