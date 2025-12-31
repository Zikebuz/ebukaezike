'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial states
    gsap.set([headerRef.current, contentRef.current, skillsRef.current.children], { 
      opacity: 0, 
      y: 40 
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 65%',
        toggleActions: 'play none none none',
      }
    });

    tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(contentRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .to(skillsRef.current.children, { 
        opacity: 1, 
        y: 0,
        scale: 1, 
        stagger: 0.1, 
        duration: 0.6,
        ease: "back.out(1.2)" 
      }, "-=0.4");
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative px-6 py-24 bg-white dark:bg-[#0f172a] overflow-hidden">
      
      {/* This creates a hard visual break that helps the fade-out from Hero feel cleaner */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-50 dark:from-[#0d1321] to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div ref={contentRef} className="max-w-3xl mx-auto mb-20 text-center">
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
            I am a versatile IT professional with <span className="text-primary font-bold">5+ years of experience</span> bridging the gap between expert remote and onsite technical support. I specialize in building scalable web applications with a proven <span className="text-primary font-bold">96% reduction in load times</span>, while maintaining a 95% first-contact resolution rate.
          </p>
        </div>

        <div className="md:px-12">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 border-l-4 border-primary pl-4">
            Key Skills & Tools
          </h3>
          
          <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* ... skillGroups map from previous code ... */}
            {[
               { name: "IT Support", desc: "M365, Win 10/11, Troubleshooting" },
               { name: "Web Development", desc: "React, Node.js, TailwindCSS" },
               { name: "Technical VA", desc: "Automation, Data, Support" },
               { name: "Cloud & DevOps", desc: "CI/CD, Cloudflare, Firebase" },
               { name: "Digital Media", desc: "Premiere Pro, Figma, Canva" },
               { name: "Technical Writing", desc: "Documentation, SEO, Strategy" }
            ].map((skill, index) => (
              <div 
                key={index}
                className="flex items-start p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 hover:border-primary/50 transition-colors group"
              >
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">{skill.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}