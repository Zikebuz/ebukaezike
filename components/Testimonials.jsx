'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import testimonialsData from '../data/testimonials';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // New state for pause control
  const total = testimonialsData.length;
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const sliderRef = useRef(null);

  const prevTestimonial = () => setCurrent((current - 1 + total) % total);
  const nextTestimonial = () => setCurrent((current + 1) % total);

  // --- AUTO-SLIDE LOGIC ---
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextTestimonial();
      }, 5000); // Slides every 5 seconds

      return () => clearInterval(interval);
    }
  }, [current, isPaused]); // Re-runs when current changes or pause state toggles

  // --- GSAP ENTRANCE ---
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.set([headerRef.current, sliderRef.current], { opacity: 0, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    });

    tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(sliderRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
  }, []);

  return (
    <section 
      id="testimonials" 
      ref={sectionRef} 
      className="relative px-6 py-24 bg-gray-50 dark:bg-[#0f172a] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Testimonials
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        {/* Added MouseEnter/Leave to pause auto-play while reading */}
        <div 
          ref={sliderRef} 
          className="relative group max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative overflow-hidden bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 shadow-xl min-h-[380px] md:min-h-[320px] flex items-center">
            
            <Quote className="absolute top-10 left-10 w-16 h-16 text-primary/5 -z-0" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="w-full p-10 md:p-16 text-center z-10"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <p className="text-lg md:text-xl italic text-gray-700 dark:text-gray-200 leading-relaxed mb-8">
                  &quot;{testimonialsData[current].quote}&quot;
                </p>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-1 bg-primary/20 rounded-full mb-4" />
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                    {testimonialsData[current].name}
                  </h4>
                  <p className="text-xs font-black uppercase tracking-widest text-primary mt-1">
                    {testimonialsData[current].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={prevTestimonial} 
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-gray-800 text-primary rounded-full shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-110 active:scale-95 transition-all z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextTestimonial} 
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-gray-800 text-primary rounded-full shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-110 active:scale-95 transition-all z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${idx === current ? 'w-8 bg-primary' : 'w-2 bg-gray-300 dark:bg-gray-700'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}