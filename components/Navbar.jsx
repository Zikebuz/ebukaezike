'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from './ThemeProvider';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [navOpen, setNavOpen] = useState(false);
  
  // DETAIL: Changed initial state to 'hero' so the "Home" text is highlighted by default on page load.
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);

  const logo = "/images/logo.png";

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Services', id: 'services' },
    { name: 'Blog', id: 'blog' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Store', id: 'store' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "expo.out" });
    tl.fromTo(logoRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, "-=0.5");
    tl.fromTo(linksRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: "power2.out" }, "-=0.3");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const scrollPosition = window.scrollY + 120;

      // DETAIL: This "if" block checks if the user is at the top of the page.
      // If scroll is less than 100px from top, it sets activeSection to 'hero'.
      // This is what passes the highlight to the "Home" text and prevents "About" from stealing it.
      if (window.scrollY < 100) {
        setActiveSection('hero');
        return; 
      }

      for (const link of navLinks) {
        const section = document.getElementById(link.id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setNavOpen(false); 

    // DETAIL: Updates activeSection immediately when a user clicks, so the text highlight moves instantly.
    setActiveSection(id);

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: id === 'hero' ? 0 : offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 150); 
  };

  return (
    <nav ref={navRef} className={`fixed top-0 w-full z-50 transition-all duration-500 py-4 ${isScrolled ? 'bg-white/70 dark:bg-[#0f172a]/70 backdrop-blur-xl shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-12">

          {/* DETAIL: This Link handles the "Home" section highlight */}
          <Link href="/" ref={logoRef} className="group flex items-center gap-2" onClick={(e) => handleScrollTo(e, 'hero')}>
            <div className="relative">
              <img src={logo} alt="logo" className="w-8 h-8 object-contain transition-transform group-hover:rotate-[360deg]" />
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* DETAIL: This is where the highlight is passed to the "Home" text.
                If activeSection is 'hero', it uses 'text-primary' (the highlight color).
                Otherwise, it uses the standard black/white colors. */}
            <span className={`font-black text-xl tracking-tighter uppercase transition-colors duration-300 
              ${activeSection === 'hero' ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>
              Home
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-gray-100/50 dark:bg-gray-800/40 p-1 rounded-full border border-gray-200/50 dark:border-gray-700/50">
            {navLinks.map((link, index) => (
              <button key={link.id} ref={el => linksRef.current[index] = el} onClick={(e) => handleScrollTo(e, link.id)}
                className={`relative px-5 py-2 text-[11px] font-black uppercase tracking-[0.15em] transition-all rounded-full ${activeSection === link.id ? 'text-white' : 'text-gray-500 dark:text-gray-400 hover:text-primary'}`}>
                {/* DETAIL: Your original pill highlight remains untouched for all other sections. */}
                {activeSection === link.id && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-primary rounded-full -z-10" transition={{ type: "spring", bounce: 0.25, duration: 0.6 }} />}
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700 active:scale-95">
              {theme === 'dark' ? <FaSun size={14} className="text-yellow-400" /> : <FaMoon size={14} />}
            </button>
            <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2.5 rounded-xl bg-primary text-white active:scale-90">
              {navOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {navOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-2xl overflow-hidden border-b border-gray-100 dark:border-gray-800">
            <div className="flex flex-col p-6 gap-4">
              {/* DETAIL: Added Home to mobile menu so the text highlight works on mobile too. */}
              <button onClick={(e) => handleScrollTo(e, 'hero')} className={`text-left text-lg font-bold tracking-tight transition-colors ${activeSection === 'hero' ? 'text-primary' : 'text-gray-500'}`}>
                Home
              </button>
              {navLinks.map((link) => (
                <button key={link.id} onClick={(e) => handleScrollTo(e, link.id)} className={`text-left text-lg font-bold tracking-tight transition-colors ${activeSection === link.id ? 'text-primary' : 'text-gray-500'}`}>
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}