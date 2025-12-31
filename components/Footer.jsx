'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaTwitter, FaLinkedin, FaYoutube, FaArrowUp, FaFacebook, FaInstagram, FaCodepen, FaTimes } from 'react-icons/fa';

export default function Footer() {
  const footerRef = useRef(null);
  const linksRef = useRef([]);
  const socialRef = useRef([]);
  
  // Modal State
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      }
    });

    tl.fromTo(linksRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(socialRef.current, 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" }, 
      "-=0.4"
    );

    const magneticIcons = socialRef.current;
    magneticIcons.forEach((icon) => {
      if (!icon) return;
      icon.addEventListener('mousemove', (e) => {
        const rect = icon.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(icon, { x: x * 0.4, y: y * 0.4, duration: 0.3 });
      });
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, { x: 0, y: 0, duration: 0.3 });
      });
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

 const policies = {
    privacy: {
      title: "Privacy Policy",
      content: "Your privacy is important. We only collect basic analytics to improve user experience and ensure site security. No personal data is sold or shared with third parties. You have full control over your experience; no cookies are used to track you across other websites."
    },
    terms: {
      title: "Terms of Service",
      content: "By using this site, you agree that the content provided is for informational purposes. All projects, code samples, and intellectual property are property of Ebuka Ezike unless otherwise stated. Unauthorized duplication or commercial use without consent is prohibited."
    }
  };

  const socialLinks = [
    { icon: <FaTwitter />, url: 'https://x.com/jswithzikebuz' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/jswithzikebuz/' },
    { icon: <FaYoutube />, url: 'https://www.youtube.com/@ebuztrend407' },
    { icon: <FaFacebook />, url: 'https://www.facebook.com/jswithzikebuz' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/jswithzikebuz/' },
    { icon: <FaGithub />, url: 'https://github.com/zikebuz' },
    { icon: <FaCodepen />, url: 'https://codepen.io/jswithzikebuz' },
  ];

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer ref={footerRef} className="relative py-20 bg-white dark:bg-[#0f172a] overflow-hidden border-t border-gray-100 dark:border-gray-800/50">
      
      {/* Policy Modal Overlay */}
      <AnimatePresence>
        {modalContent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalContent(null)}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.5, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.5, y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl max-w-md w-full relative border border-gray-100 dark:border-gray-800"
            >
              <button 
                onClick={() => setModalContent(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-primary transition-colors"
              >
                <FaTimes size={20} />
              </button>
              <h3 className="text-2xl font-black text-primary mb-4 uppercase tracking-tighter">
                {modalContent.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                {modalContent.content}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        <button 
          onClick={scrollToTop}
          className="group mb-12 flex flex-col items-center gap-2 transition-all hover:-translate-y-2"
        >
          <div className="p-4 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 group-hover:bg-primary group-hover:text-white transition-colors shadow-lg shadow-black/5">
            <FaArrowUp className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Back to Top</span>
        </button>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12 text-center">
          {navLinks.map((link, i) => (
            <Link 
              key={link.name}
              href={link.href}
              ref={el => linksRef.current[i] = el}
              className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors uppercase tracking-widest"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16 max-w-full">
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              ref={el => socialRef.current[i] = el}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-white hover:bg-primary transition-colors text-lg md:text-xl shrink-0"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="w-full pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-400 uppercase tracking-widest text-center md:text-left">
          <p>© {new Date().getFullYear()} Ebuka Ezike portfolio</p>
          <div className="flex gap-6">
            <button 
              onClick={() => setModalContent(policies.privacy)}
              className="cursor-pointer hover:text-primary transition-colors uppercase"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setModalContent(policies.terms)}
              className="cursor-pointer hover:text-primary transition-colors uppercase"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}