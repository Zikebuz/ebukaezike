'use client';
import { useEffect, useRef } from 'react';
import experiences from '../data/experience';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Experience() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.set([headerRef.current, itemsRef.current], { 
      opacity: 0, 
      y: 40 
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    });

    tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(itemsRef.current, { 
        opacity: 1, 
        y: 0, 
        stagger: 0.25, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.4");
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative px-6 py-24 bg-white dark:bg-[#0f172a] overflow-hidden">
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Unified Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Professional Journey
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-gray-100 dark:border-gray-800 ml-6 md:ml-12 space-y-16">
          {experiences.map((exp, index) => (
            <div 
              key={exp.id} 
              ref={(el) => (itemsRef.current[index] = el)}
              className="relative pl-10 md:pl-16 group"
            >
              {/* Logo as the Timeline Anchor (Inline with the line) */}
              <div className="absolute -left-[21px] md:-left-[26px] top-0 w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden border-2 border-white dark:border-[#0f172a] bg-white dark:bg-gray-800 p-1.5 shadow-md z-20 group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                <img 
                  src={exp.logo || '/assets/logos/default-company.png'} 
                  alt={`${exp.company} logo`} 
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                    {exp.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                    {exp.duration}
                  </span>
                </div>
                
                {/* Company & Location - Perfectly Inline with Logo Top */}
                <div className="flex items-center text-primary font-bold text-sm mb-4">
                  <span className="truncate">{exp.company}</span>
                  <span className="mx-2 text-gray-300 dark:text-gray-700">|</span> 
                  <span className="text-gray-500 dark:text-gray-400 font-medium">{exp.location}</span>
                </div>

                <div className="space-y-4">
                  <ul className="space-y-3">
                    {exp.responsibilities.map((res, i) => (
                      <li key={i} className="flex items-start text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        <span className="text-primary mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {res}
                      </li>
                    ))}
                  </ul>

                  {exp.tools && (
                    <div className="flex flex-wrap gap-2 pt-4">
                      {exp.tools.map((tool, i) => (
                        <span key={i} className="text-[10px] px-2.5 py-1 bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 rounded-md border border-gray-100 dark:border-gray-700/50 font-bold uppercase tracking-tighter group-hover:border-primary/30 transition-colors">
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}