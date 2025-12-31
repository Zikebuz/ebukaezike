'use client';
import { useEffect, useRef } from 'react';
import servicesData from '../data/services';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Laptop, Code, Video, Settings, ShieldCheck, BarChart, Search, Music, FileText } from 'lucide-react';

const getIcon = (id) => {
  const icons = {
    1: <Settings className="w-6 h-6" />, 2: <Code className="w-6 h-6" />,
    3: <Video className="w-6 h-6" />, 4: <Settings className="w-6 h-6" />,
    5: <ShieldCheck className="w-6 h-6" />, 6: <BarChart className="w-6 h-6" />,
    7: <Search className="w-6 h-6" />, 8: <Music className="w-6 h-6" />,
    9: <FileText className="w-6 h-6" />,
  };
  return icons[id] || <Laptop className="w-6 h-6" />;
};

export default function Services() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Set Initial State
    gsap.set([headerRef.current, cardsRef.current], { opacity: 0, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%', // Consistent start point
        toggleActions: 'play none none none',
      }
    });

    tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(cardsRef.current, { 
        opacity: 1, 
        y: 0, 
        stagger: 0.1, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.4");
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative px-6 py-24 bg-gray-50 dark:bg-[#0f172a] overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">Professional Services</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white dark:bg-gray-800/40 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-primary/30 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {getIcon(service.id)}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100 leading-tight">{service.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{service.description}</p>
              </div>
              <div className="pt-4 border-t border-gray-50 dark:border-gray-700/50">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{service.priceRange}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}