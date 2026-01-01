'use client';
import { useState, useEffect, useRef } from 'react';
import { fetchRSS } from '../lib/rss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    fetchRSS().then((data) => {
      setPosts(data.items.slice(0, 6));
    });

    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Separate effect for animation once posts are loaded
  useEffect(() => {
    if (posts.length === 0) return;

    gsap.set([headerRef.current, cardsRef.current], { opacity: 0, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
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
  }, [posts]);

  return (
    <section id="blog" ref={sectionRef} className="px-6 py-24 bg-white dark:bg-[#0f172a] overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">Latest Insights</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <a
              key={post.guid}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (cardsRef.current[index] = el)}
              className="group flex flex-col bg-gray-50 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-primary/30 transition-all duration-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 flex-grow">{post.contentSnippet}</p>
                <div className="flex items-center text-primary font-bold text-xs uppercase tracking-widest">
                  Read Article <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}