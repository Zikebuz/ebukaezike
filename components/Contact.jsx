'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaEnvelope, FaPhoneAlt, FaWhatsapp
} from 'react-icons/fa';

export default function Contact() {
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.set([headerRef.current, formRef.current, infoRef.current], { 
      opacity: 0, 
      y: 30 
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    });

    tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to([formRef.current, infoRef.current], { 
        opacity: 1, 
        y: 0, 
        stagger: 0.2, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.4");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.target);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);
    formData.append("subject", "New Portfolio Message from " + formData.get("name"));

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
        e.target.reset();
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="px-6 py-24 bg-white dark:bg-[#0f172a] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Unified Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Contact Form - Occupies 3/5 of the grid */}
          <div ref={formRef} className="lg:col-span-3 order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800/40 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] border border-gray-100 dark:border-gray-700/50 shadow-sm">
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary transition-all text-gray-800 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary transition-all text-gray-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary transition-all text-gray-800 dark:text-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 shadow-lg shadow-primary/20
                  ${status === 'sending' ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 hover:scale-[1.01] active:scale-95'}`}
              >
                {status === 'sending' ? 'Dispatching Message...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="mt-4 text-center text-green-500 font-bold animate-pulse">✅ Sent! I'll reach out shortly.</p>
              )}
              {status === 'error' && (
                <p className="mt-4 text-center text-red-500 font-bold">❌ Error. Please try WhatsApp directly.</p>
              )}
            </form>
          </div>

          {/* Contact Info - Occupies 2/5 of the grid */}
          <div ref={infoRef} className="lg:col-span-2 order-1 lg:order-2 lg:pt-10 space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Let&apos;s build something great.</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Whether you have a specific project in mind or just want to say hi, my inbox is always open. 
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: FaEnvelope, label: 'Email', value: 'ezikeebuka@yahoo.com', href: 'mailto:ezikeebuka@yahoo.com' },
                { icon: FaPhoneAlt, label: 'Call', value: '+234 802 138 0594', href: 'tel:+2348021380594' },
                { icon: FaWhatsapp, label: 'WhatsApp', value: 'Chat with me', href: 'https://wa.me/2348021380594' }
              ].map((item, idx) => (
                <a key={idx} href={item.href} target={item.label === 'WhatsApp' ? '_blank' : ''} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <item.icon className="text-xl" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</p>
                    <p className="text-gray-700 dark:text-gray-200 font-semibold group-hover:text-primary transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Socials</p>
              <div className="flex gap-4">
                {[
                  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/jswithzikebuz/' },
                  { icon: FaFacebook, href: 'https://www.facebook.com/jswithzikebuz' },
                  { icon: FaInstagram, href: 'https://www.instagram.com/jswithzikebuz/' },
                  { icon: FaTwitter, href: 'https://x.com/jswithzikebuz' },
                  { icon: FaCodepen, href: 'https://codepen.io/jswithzikebuz' },
                  { icon: FaGithub, href: 'https://github.com/zikebuz' }
                ].map((social, idx) => (
                  <a key={idx} href={social.href} target="_blank" className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all hover:-translate-y-1">
                    <social.icon />
                  </a>
                ))}
              </div>
            </div> */}
          </div>

        </div>
      </div>
    </section>
  );
}