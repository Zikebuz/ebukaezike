'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Terminal, Info } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-8">
        {/* Backdrop - Deeper blur for focus */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0f172a]/70 backdrop-blur-sm"
        />

        {/* Modal Content - Slimmed down to max-w-3xl */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-3xl bg-white dark:bg-[#1e293b] rounded-[2rem] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col border border-gray-100 dark:border-gray-700/50"
        >
          {/* Header Image Section - Reduced Height */}
          <div className="relative h-40 md:h-56 w-full shrink-0">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#1e293b] via-transparent to-transparent" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/30 backdrop-blur-md text-white rounded-full transition-all hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content - Tightened Padding */}
          <div className="px-6 py-6 md:px-10 md:py-8 overflow-y-auto custom-scrollbar">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1 block">
                  {project.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                  {project.title}
                </h2>
              </div>

              {/* Action Buttons - Compact */}
              <div className="flex gap-2">
                {project.liveLink && (
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary/90 transition-all shadow-md shadow-primary/10"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                  >
                    <Github className="w-3.5 h-3.5" /> Code
                  </a>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Side: Text content */}
              <div className="md:col-span-8 space-y-6">
                <section>
                  <div className="flex items-center gap-2 mb-2 text-primary/60">
                    <Info className="w-4 h-4" />
                    <h3 className="font-bold uppercase tracking-tighter text-[10px]">Project Description</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                    {project.fullDesc}
                  </p>
                </section>

                {project.caseStudy?.solution && (
                  <section>
                    <h3 className="font-bold uppercase tracking-tighter text-[10px] mb-2 text-primary/60">The Approach</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                      {project.caseStudy.solution}
                    </p>
                  </section>
                )}
              </div>

              {/* Right Side: Tech Stack - Slim Sidebar */}
              <div className="md:col-span-4">
                <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-4 border border-gray-100 dark:border-gray-700/40">
                  <div className="flex items-center gap-2 mb-4 text-primary/60">
                    <Terminal className="w-4 h-4" />
                    <h3 className="font-bold uppercase tracking-tighter text-[10px]">Stack</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.caseStudy?.tools.map((tool) => (
                      <span 
                        key={tool} 
                        className="px-2.5 py-1 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 rounded-lg text-[10px] font-bold border border-gray-200 dark:border-gray-700 shadow-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}