'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { items, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-4 flex items-center justify-between ${
    scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
  }`;

  const linkClass = "text-sm uppercase tracking-wider transition-colors text-white/60 hover:text-white";

  return (
    <nav className={navClass}>
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className="text-xl font-bold tracking-widest text-white cursor-pointer"
      >
        MATCHA
      </button>
      
      <div className="flex gap-8 items-center">
        <a href="#about" className={linkClass}>Our Story</a>
        <a href="#shop" className={linkClass}>Shop</a>
        <a href="#contact" className={linkClass}>Contact</a>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="text-sm uppercase tracking-wider transition-colors text-white hover:text-white/80 ml-4 border border-white/20 px-4 py-2 rounded-full"
        >
          Cart ({items.reduce((acc, item) => acc + item.quantity, 0)})
        </button>
      </div>
    </nav>
  );
}
