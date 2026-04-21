'use client';

import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

const FOCUS_POINTS = [
  { id: 1, title: 'Engineering Precision', desc: 'Applying structured logic to complex problems.' },
  { id: 2, title: 'Star-Level Teaching', desc: 'Illuminating the darkest corners of calculus.' },
  { id: 3, title: 'Model Solves', desc: 'Crafting elegant, optimal solutions.' },
];

export default function BioSection() {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-24 min-h-screen flex items-center z-10" id="bio">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Column 1: Interactive Portrait */}
        <div 
          className="relative flex justify-center items-center w-full aspect-square max-w-md mx-auto"
          onMouseEnter={() => setIsPhotoHovered(true)}
          onMouseLeave={() => setIsPhotoHovered(false)}
        >
          {/* Wireframe Cage */}
          <motion.div 
            className="absolute inset-0 border-2 border-[#00bfff]/30 rounded-full border-dashed"
            animate={{ rotate: 360, scale: isPhotoHovered ? 1.05 : 1 }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 0.5 } }}
          />
          <motion.div 
            className="absolute inset-4 border border-[#0077ff]/40 rounded-full"
            animate={{ rotate: -360, scale: isPhotoHovered ? 1.1 : 1 }}
            transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, scale: { duration: 0.5 } }}
          />

          {/* Hover orbital rings with formulas */}
          {isPhotoHovered && (
            <motion.div 
              className="absolute inset-[-20%] rounded-full border border-cyan-300/20"
              initial={{ opacity: 0, scale: 0.8, rotateX: 60 }}
              animate={{ opacity: 1, scale: 1, rotateZ: 360 }}
              transition={{ rotateZ: { duration: 10, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.3 } }}
              style={{ transformStyle: 'preserve-3d' }}
            >
               <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-300 font-mono text-xs whitespace-nowrap">∫ e^x dx = e^x + C</span>
               <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-cyan-300 font-mono text-xs whitespace-nowrap">E = mc²</span>
               <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-300 font-mono text-xs whitespace-nowrap -rotate-90">sin²θ + cos²θ = 1</span>
               <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-cyan-300 font-mono text-xs whitespace-nowrap rotate-90">∇ × E = -∂B/∂t</span>
            </motion.div>
          )}

          {/* Photo */}
          <div className="relative w-3/4 h-3/4 overflow-hidden rounded-full border-4 border-[#00bfff]/50 box-glow z-10 transition-transform duration-500 hover:scale-105">
            {/* The user provided 3 images, image_1.png is the photo according to request. We'll use a placeholder if not found, but we can assume they are uploaded? The request says "photo from image_1.png". Since I don't have the files in the workspace (they are attached to the chat), I should use standard placeholder. Actually, let's look if there are files in the workspace. */}
            <Image 
            src="/profile.jpg"
            alt="Eng. Shehab Elebady" 
            fill 
            className="object-cover" 
            priority
            />
          </div>
        </div>

        {/* Column 2: Text */}
        <div className="flex flex-col space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-8 bg-[#0a1128]/60 backdrop-blur-md border border-[#00bfff]/20 rounded-2xl box-glow"
          >
            <h2 className="font-orbitron text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#00bfff] to-[#0077ff] mb-6">
              Welcome to the Orbit
            </h2>
            <p className="font-sans text-lg text-gray-300 leading-relaxed">
              Welcome to the orbit of Eng. Shehab Elebady, a Computer Engineering graduate from a top university and a seasoned mathematics educator. Merging the precision of an engineer with the creativity of a &apos;Star&apos; teacher, Shehab transforms the challenges of mathematics into a galaxy of solutions. His mission is clear: to guide every student from zero knowledge to a heroic understanding of mathematics.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-4">
            {FOCUS_POINTS.map((point) => (
              <motion.div
                key={point.id}
                onMouseEnter={() => setHoveredPoint(point.id)}
                onMouseLeave={() => setHoveredPoint(null)}
                className={`relative flex-1 min-w-[200px] p-4 cursor-none border transition-all duration-300 overflow-hidden ${
                  hoveredPoint === point.id 
                    ? 'bg-[#00bfff]/20 border-[#00bfff] scale-105' 
                    : 'bg-[#0a1128]/40 border-[#00bfff]/30'
                } rounded-xl`}
              >
                <h3 className="font-orbitron text-[16px] text-[#00ffff] mb-2">{point.title}</h3>
                
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: hoveredPoint === point.id ? 'auto' : 0, 
                    opacity: hoveredPoint === point.id ? 1 : 0 
                  }}
                  className="font-sans text-sm text-gray-400"
                >
                  {point.desc}
                </motion.div>
                
                {/* Decorative math symbol */}
                <div className="absolute right-2 bottom-0 text-4xl text-white/5 font-mono select-none pointer-events-none">
                  {point.id === 1 ? '∑' : point.id === 2 ? '★' : '∞'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
