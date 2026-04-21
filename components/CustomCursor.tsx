'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button'))) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor point */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-blue-400 rounded-full pointer-events-none z-[100] shadow-[0_0_10px_#00bfff]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />

      {/* Orbiting structure for hover state */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-blue-500 rounded-full pointer-events-none z-[99] flex items-center justify-center mix-blend-screen"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 1 : 0.4,
          borderRadius: isHovering ? '10%' : '50%',
          rotate: isHovering ? 90 : 0
        }}
        transition={{ type: "tween", ease: "circOut", duration: 0.2 }}
      >
        {isHovering && (
          <div className="relative w-full h-full animate-spin [animation-duration:3s]">
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-blue-400/50 -translate-x-1/2" />
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-blue-400/50 -translate-y-1/2" />
          </div>
        )}
      </motion.div>
    </>
  );
}
