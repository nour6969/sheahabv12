'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedLogo() {
  const svgRef = useRef<SVGSVGElement>(null);
  const sPathRef = useRef<SVGPathElement>(null);
  const starRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!sPathRef.current || !starRef.current) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // S path trace animation
    const length = sPathRef.current.getTotalLength();
    gsap.set(sPathRef.current, { strokeDasharray: length, strokeDashoffset: length });
    
    tl.to(sPathRef.current, {
      strokeDashoffset: 0,
      duration: 3,
      ease: "power2.inOut",
    });

    // Star pulsing
    gsap.to(starRef.current, {
      scale: 1.2,
      opacity: 0.8,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, []);

  return (
    <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(0,191,255,0.8)]">
      <svg
        ref={svgRef}
        viewBox="0 0 200 200"
        className="w-full h-full text-blue-400 overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00bfff" />
            <stop offset="50%" stopColor="#0077ff" />
            <stop offset="100%" stopColor="#00ffff" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* The X and Y axes */}
        <line x1="40" y1="160" x2="180" y2="160" stroke="#00bfff" strokeWidth="2" opacity="0.6" markerEnd="url(#arrow)" />
        <line x1="40" y1="160" x2="40" y2="20" stroke="#00bfff" strokeWidth="2" opacity="0.6" markerEnd="url(#arrow)" />

        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#00bfff" />
        </marker>

        {/* Grid lines inside graph */}
        <g opacity="0.2" stroke="#00bfff" strokeWidth="1">
           <line x1="60" y1="160" x2="60" y2="40" />
           <line x1="80" y1="160" x2="80" y2="40" />
           <line x1="100" y1="160" x2="100" y2="40" />
           <line x1="120" y1="160" x2="120" y2="40" />
           <line x1="140" y1="160" x2="140" y2="40" />
           
           <line x1="40" y1="140" x2="160" y2="140" />
           <line x1="40" y1="120" x2="160" y2="120" />
           <line x1="40" y1="100" x2="160" y2="100" />
           <line x1="40" y1="80" x2="160" y2="80" />
           <line x1="40" y1="60" x2="160" y2="60" />
        </g>

        {/* The 'S' Path */}
        <path
          ref={sPathRef}
          d="M 140 50 C 140 20, 90 20, 70 40 C 40 70, 150 110, 130 150 C 110 180, 50 160, 40 140"
          fill="none"
          stroke="url(#neonGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* The Star */}
        <g ref={starRef} transform="translate(130, 30) scale(0.6)">
          <path
            d="M 25 0 L 32 15 L 48 18 L 36 30 L 39 46 L 25 38 L 11 46 L 14 30 L 2 18 L 18 15 Z"
            fill="#00ffff"
            filter="url(#glow)"
          />
        </g>
      </svg>
    </div>
  );
}
