'use client';
import { useState, useEffect, useRef } from 'react';
import products from '@/data/products';
import { FaShoppingCart, FaRegHeart, FaHeart, FaChevronRight, FaCheckCircle } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

export default function Store() {
  const [wishlist, setWishlist] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  // --- WISHLIST PERSISTENCE ---
  useEffect(() => {
    const savedWishlist = localStorage.getItem('ebuka-portfolio-wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const isAdding = !prev.includes(id);
      const updated = isAdding 
        ? [...prev, id] 
        : prev.filter((item) => item !== id);
      
      localStorage.setItem('ebuka-portfolio-wishlist', JSON.stringify(updated));
      
      if (isAdding) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
      
      return updated;
    });
  };

  // --- GSAP ANIMATION ---
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, ease: "expo.out" }
    )
    .fromTo(cardsRef.current, 
      { opacity: 0, scale: 0.95, y: 20 }, 
      { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power4.out" }, 
      "-=0.6"
    );
  }, []);

  return (
    <section id="store" ref={sectionRef} className="relative py-24 px-6 bg-gray-50/50 dark:bg-[#0b1221]">
      
      {/* Toast Notification for Wishlist */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[100] bg-gray-900 dark:bg-primary text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <FaCheckCircle className="text-green-400" />
            <span className="text-xs font-black uppercase tracking-widest">Added to Wishlist</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Slim Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Shop Resources</span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-4 uppercase">
            Digital Assets
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Premium tools to accelerate your digital skills and master modern workflows.
          </p>
        </div>

        {/* --- CENTERED FLEX GRID --- */}
        <div className="flex flex-wrap justify-center gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative bg-white dark:bg-gray-800/40 rounded-[2rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 flex flex-col w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] min-w-[280px] max-w-[320px]"
            >
              {/* Image Area */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Wishlist Status Badge */}
                {wishlist.includes(product.id) && (
                  <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full z-20">
                    <span className="text-[8px] font-black text-white uppercase tracking-tighter">In Wishlist</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                
                {/* Wishlist Toggle Button */}
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 p-2.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full shadow-sm hover:scale-110 transition-all active:scale-90 z-20 group/heart"
                >
                  {wishlist.includes(product.id) ? (
                    <FaHeart className="text-red-500 w-3.5 h-3.5" />
                  ) : (
                    <FaRegHeart className="text-gray-600 dark:text-gray-300 w-3.5 h-3.5 group-hover/heart:text-red-400 transition-colors" />
                  )}
                </button>
              </div>

              {/* Compact Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight mb-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-6 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Slim Footer Action */}
                <div className="mt-auto flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Price</span>
                    <span className="text-xl font-black text-primary tracking-tighter">
                      {product.price}
                    </span>
                  </div>
                  <button className="flex items-center gap-2 px-5 py-3 bg-gray-900 dark:bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary dark:hover:bg-white dark:hover:text-primary transition-all shadow-lg shadow-black/10">
                    Get Now <FaChevronRight className="w-2 h-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}