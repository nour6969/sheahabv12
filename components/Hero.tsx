'use client';

import { motion } from 'motion/react';
import AnimatedLogo from './AnimatedLogo';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const sloganRef = useRef<HTMLHeadingElement>(null);

  const title = "Eng. Shehab Elebady".split("");

  useEffect(() => {
    // Slogan writing effect
    if (sloganRef.current) {
       const text = sloganRef.current.innerText;
       sloganRef.current.innerHTML = "";
       
       const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 });
       
       text.split("").forEach((char, i) => {
         const span = document.createElement("span");
         span.innerText = char;
         span.style.opacity = "0";
         span.style.textShadow = "0 0 10px rgba(0, 191, 255, 0)";
         sloganRef.current?.appendChild(span);
         
         tl.to(span, {
           opacity: 1,
           textShadow: "0 0 20px rgba(0, 191, 255, 0.8)",
           duration: 0.1,
           ease: "power2.in"
         }, i * 0.05);

         // Fade down the intense glow right after appearing
         tl.to(span, {
            textShadow: "0 0 5px rgba(0, 191, 255, 0.3)",
            duration: 0.5
         }, i * 0.05 + 0.1);
       });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>, index: number) => {
    // Particle trail effect on hover
    const el = lettersRef.current[index];
    if (el) {
       gsap.to(el, {
          y: -10,
          scale: 1.2,
          color: "#ffffff",
          textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff",
          duration: 0.2,
          ease: "power1.out",
          onComplete: () => {
             gsap.to(el, {
                y: 0,
                scale: 1,
                color: "#00bfff",
                textShadow: "0 0 10px rgba(0, 191, 255, 0.5)",
                duration: 0.5,
                ease: "bounce.out"
             });
          }
       });
    }
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10" id="hero">
      
      {/* Animated Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "backOut" }}
      >
        <AnimatedLogo />
      </motion.div>

      {/* Main Title with Hover effects */}
      <motion.h1 
        className="font-orbitron font-bold text-4xl sm:text-6xl md:text-7xl mt-8 text-[#00bfff] text-glow select-none"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {title.map((char, index) => (
           <span 
             key={index} 
             ref={(el) => { lettersRef.current[index] = el; }}
             onMouseEnter={(e) => handleMouseMove(e, index)}
             className="inline-block transition-colors"
           >
             {char === " " ? "\u00A0" : char}
           </span>
        ))}
      </motion.h1>

      <motion.h2
         ref={sloganRef}
         className="font-sans font-black text-xl sm:text-2xl mt-4 md:mt-6 text-white tracking-widest uppercase"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1, delay: 1 }}
      >
         From Zero to Hero in Mathematics
      </motion.h2>

      <motion.p
         className="font-mono text-sm sm:text-base mt-8 text-gray-400 max-w-2xl px-4 tracking-wide"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1, delay: 2 }}
      >
         <span className="text-cyan-400">Computer Engineer</span> | Passionate Mathematics Educator | <span className="text-cyan-400 text-glow">&apos;The Math Star&apos;</span>
      </motion.p>
      
      <motion.div 
         className="absolute bottom-10 left-1/2 -translate-x-1/2"
         animate={{ y: [0, 10, 0] }}
         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="block w-[1px] h-16 bg-gradient-to-b from-[#00bfff] to-transparent mx-auto"></span>
      </motion.div>

    </section>
  );
}
