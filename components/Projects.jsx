'use client';
import { useState, useRef, useEffect } from 'react';
import projectsData from '../data/projects';
import ProjectModal from './ProjectModal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, ExternalLink } from 'lucide-react';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const cardsRef = useRef([]);

  const categories = ['All', ...new Set(projectsData.map(p => p.category))];
  
  const filteredProjects = projectsData.filter(project => {
    return (filter === 'All' || project.category === filter) &&
           project.title.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Set initial states for clean entry
    gsap.set([headerRef.current, filterRef.current, cardsRef.current], { 
      opacity: 0, 
      y: 30 
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      }
    });

    tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(filterRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .to(cardsRef.current, { 
        opacity: 1, 
        y: 0, 
        stagger: 0.1, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.3");
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative px-6 py-24 bg-gray-50 dark:bg-[#0f172a] overflow-hidden">
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Unified Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        {/* Modern Filter & Search Bar */}
        <div ref={filterRef} className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                  filter === cat 
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors dark:text-white"
            />
          </div>
        </div>

        {/* Projects Grid - Constrained to 5xl for "Slim" look */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <div className="bg-white p-3 rounded-full text-primary scale-0 group-hover:scale-100 transition-transform duration-500">
                      <ExternalLink className="w-6 h-6" />
                   </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2 block">
                  {project.category}
                </span>
                <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}