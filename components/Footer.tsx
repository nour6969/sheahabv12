'use client';

import { motion } from 'motion/react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative w-full py-12 overflow-hidden bg-black/80 backdrop-blur-md border-t border-[#00bfff]/20 z-10">
      
      {/* Background drifting math symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
         <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap font-mono text-4xl text-[#00bfff] flex gap-24 pt-4"
         >
            <span>∑(n=1 to ∞) 1/n² = π²/6</span>
            <span>e^(iπ) + 1 = 0</span>
            <span>F = G(m₁m₂)/r²</span>
            <span>∇ × B = μ₀J + μ₀ε₀(∂E/∂t)</span>
            <span>{`Eng. Shehab Elebady`.repeat(5)}</span>
            <span>∑(n=1 to ∞) 1/n² = π²/6</span>
            <span>e^(iπ) + 1 = 0</span>
         </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center space-y-6">
        
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="space-y-2"
        >
          <h2 className="font-orbitron font-bold text-2xl text-white tracking-widest text-glow">
             Eng. Shehab Elebady
          </h2>
          <p className="font-sans text-gray-400 italic">
            &quot;Designed to inspire.&quot; | The Math Star
          </p>
        </motion.div>

        <div className="flex gap-6 z-20">
           <Link href="#" className="text-gray-500 hover:text-[#00bfff] transition-colors cursor-none">
             <Facebook size={24} />
           </Link>
           <Link href="#" className="text-gray-500 hover:text-[#00bfff] transition-colors cursor-none">
             <Twitter size={24} />
           </Link>
           <Link href="#" className="text-gray-500 hover:text-[#00bfff] transition-colors cursor-none">
             <Instagram size={24} />
           </Link>
           <Link href="#" className="text-gray-500 hover:text-[#00bfff] transition-colors cursor-none">
             <Linkedin size={24} />
           </Link>
        </div>
        
        <p className="font-sans text-xs text-gray-600 mt-8">
           © {new Date().getFullYear()} Eng. Shehab Elebady. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
