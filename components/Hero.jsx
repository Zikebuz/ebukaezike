'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { FaDownload, FaEnvelope, FaLock } from 'react-icons/fa';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Loader Component that handles the actual ready state
const ThreeLoader = ({ isReady }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        // If 3D is ready, jump to 100, otherwise slow down at 90
        if (isReady) return 100;
        if (prev >= 90) return 90;
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [isReady]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex flex-col items-center justify-center w-full h-full space-y-4 bg-white dark:bg-[#0f172a]"
    >
      <div className="relative w-20 h-20">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-gray-100 dark:text-gray-800" />
          <circle
            cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="3" fill="transparent"
            strokeDasharray={226}
            strokeDashoffset={226 - (226 * progress) / 100}
            className="text-primary transition-all duration-500 ease-out"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-primary">
          {progress}%
        </span>
      </div>
      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 animate-pulse">
        {isReady ? "Launching..." : "Powering Up Engine"}
      </p>
    </motion.div>
  );
};

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });

export default function Hero() {
  const [isSceneReady, setIsSceneReady] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [targetLink, setTargetLink] = useState('');
  const [activeType, setActiveType] = useState('');
  const [error, setError] = useState(false);

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);

  const CONTRACT_CODE = process.env.NEXT_PUBLIC_CONTRACT_CV_ACCESS_CODE;
  const FULLTIME_CODE = process.env.NEXT_PUBLIC_FULLTIME_CV_ACCESS_CODE;

  // Listen for the 3D Scene to finish its internal mounting
  useEffect(() => {
    const handleSceneLoad = () => {
      // Adding a slight delay to ensure smooth transition
      setTimeout(() => setIsSceneReady(true), 800);
    };
    window.addEventListener('three-scene-ready', handleSceneLoad);
    return () => window.removeEventListener('three-scene-ready', handleSceneLoad);
  }, []);

  const handleResumeClick = (e, link, type) => {
    e.preventDefault();
    setTargetLink(link);
    setActiveType(type);
    setShowGate(true);
  };

  const handleUnlock = () => {
    const correctCode = activeType === 'contract' ? CONTRACT_CODE : FULLTIME_CODE;
    if (passkey === correctCode) {
      window.open(targetLink, '_blank');
      setShowGate(false);
      setPasskey('');
      setError(false);
    } else {
      setError(true);
      gsap.to(".gate-modal", { x: 10, duration: 0.1, repeat: 3, yoyo: true });
    }
  };

  useEffect(() => {
    const targets = [titleRef.current, subtitleRef.current, textRef.current, buttonsRef.current];
    gsap.fromTo(targets,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power4.out", delay: 0.5 }
    );
  }, []);

  return (
    <section id="hero" className="relative flex flex-col md:flex-row items-center justify-between py-16 px-6 bg-white dark:bg-[#0f172a] overflow-hidden min-h-[75vh]">

      {/* ACCESS GATE MODAL CODE (Hidden for brevity, keep your existing code here) */}
      <AnimatePresence>
        {showGate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            {/* ... (Your existing Gate Modal Content) ... */}
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="gate-modal bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-gray-100 dark:border-gray-700">
              <FaLock className="mx-auto text-primary mb-4" size={30} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-tighter"> View My {activeType === 'contract' ? 'Contract' : 'Full-Time'} Resume </h3>
              <input type="password" value={passkey} onChange={(e) => setPasskey(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleUnlock()} className={`w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border mb-4 focus:outline-none focus:border-primary text-gray-900 dark:text-white transition-all ${error ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`} placeholder="Access Code" autoFocus />
              <div className="flex gap-3">
                <button onClick={() => { setShowGate(false); setPasskey(''); setError(false); }} className="flex-1 py-3 text-gray-500 font-bold uppercase text-[10px] tracking-widest">Cancel</button>
                <button onClick={handleUnlock} className="flex-1 py-3 bg-primary text-white rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">Unlock</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10" />

      <div className="w-full md:w-1/2 space-y-6 md:ml-16 z-10">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight opacity-0">
          I'm <span className="text-primary">Ebuka</span>
        </h1>
        <h2 ref={subtitleRef} className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 opacity-0">
          IT Consultant & Engineer
        </h2>
        <p ref={textRef} className="text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed font-semibold opacity-0">
          Helping businesses scale through expert IT Support & troubleshooting, system automation, and full-stack web development.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2 opacity-0">
          <a href="#contact" className="w-full sm:w-auto justify-center px-7 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center">
            <FaEnvelope className="mr-2" /> Hire Me
          </a>
          <button onClick={(e) => handleResumeClick(e, 'https://docs.google.com/document/d/1ha8ekeMjwcXWe__kyWZKZge1SdE-VEDCSRBSKhAYwqc/edit?usp=sharing', 'contract')} className="w-full sm:w-auto justify-center px-7 py-3 border-2 border-primary/40 text-slate-900 dark:text-white rounded-xl font-bold hover:border-primary transition-all flex items-center bg-white/50 dark:bg-transparent">
            <FaDownload className="mr-2" /> Contract Resume 
          </button>
          <button onClick={(e) => handleResumeClick(e, 'https://docs.google.com/document/d/1sjmWq2vKOuv7_gJZzq315lmKsG3VoJ_BUHdShT5ex_o/edit?usp=sharing', 'fulltime')} className="w-full sm:w-auto justify-center px-7 py-3 border-2 border-primary/40 text-slate-900 dark:text-white rounded-xl font-bold hover:border-primary transition-all flex items-center bg-white/50 dark:bg-transparent">
            <FaDownload className="mr-2" /> Full-Time Resume
          </button>
        </div>
      </div>

      {/* 3D SCENE CONTAINER */}
      <div className="w-full md:w-1/2 flex justify-center items-center relative min-h-[320px] md:min-h-[450px]">
        <AnimatePresence mode="wait">
          {!isSceneReady && (
            <div className="absolute inset-0 z-20">
              <ThreeLoader isReady={isSceneReady} />
            </div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ opacity: isSceneReady ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="w-80 h-80 md:w-[450px] md:h-[450px]"
        >
          <ThreeScene />
        </motion.div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
}