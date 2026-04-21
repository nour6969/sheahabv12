'use client';

import { motion } from 'motion/react';
import { MessageCircle, Users, Youtube } from 'lucide-react';
import Link from 'next/link';

interface PortalProps {
  href: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

const Portal = ({ href, title, icon, color, delay }: PortalProps) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="block w-full max-w-sm cursor-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: "backOut" }}
        whileHover="hover"
        className="relative group aspect-square flex flex-col items-center justify-center p-8 rounded-full"
      >
        {/* SVG Warping Filter */}
        <svg className="absolute w-0 h-0">
          <filter id={`warp-${delay}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="3" result="noise" className="warp-noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" className="warp-map" />
          </filter>
        </svg>

        {/* Background glowing ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border-4 opacity-50 mix-blend-screen transition-colors duration-300"
          style={{ borderColor: color }}
          variants={{
            hover: {
              scale: 1.1,
              rotate: 180,
              filter: `url(#warp-${delay})`,
              borderWidth: "8px",
              opacity: 1
            }
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Additional rotating rings for 3D feel */}
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-dashed opacity-30"
          style={{ borderColor: color }}
          variants={{
             hover: { rotate: -180, scale: 0.9, opacity: 0.8 }
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        <motion.div 
          className="relative z-10 flex flex-col items-center space-y-4"
          variants={{
             hover: { scale: 1.2 }
          }}
        >
          <div className="p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10" style={{ color: color, boxShadow: `0 0 20px ${color}` }}>
            {icon}
          </div>
          <h3 className="font-orbitron font-bold text-center text-sm md:text-base leading-tight text-white group-hover:text-glow">
            {title}
          </h3>
        </motion.div>

        {/* Hover particles */}
        <motion.div 
          className="absolute inset-[-20%] rounded-full opacity-0 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${color} 0%, transparent 60%)` }}
          variants={{
             hover: { opacity: 0.2, scale: 1.2 }
          }}
        />
      </motion.div>
    </Link>
  );
};

export default function ResourceHub() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-32 z-10" id="resources">
        {/* Title */}
        <motion.div
           initial={{ opacity: 0, y: -30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-24"
        >
           <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-4 tracking-wider uppercase">
             The Math Star Hub
           </h2>
           <p className="font-sans text-gray-400 max-w-2xl mx-auto">
             Enter the portals below to access personalized guidance, community support, and top-tier mathematical solutions.
           </p>
        </motion.div>

        {/* Portals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
            
            <Portal
              href="https://wa.me/201201212002"
              title="Contact Directly for Personalized Guidance"
              color="#25D366" /* WhatsApp Green */
              delay={0.1}
              icon={<MessageCircle size={48} />}
            />

            <Portal
              href="https://chat.whatsapp.com/EqW5kZnqCIG4i9viyVeMsb"
              title="Join the Q&A Group (Solutions & Support)"
              color="#00bfff" /* Deep blue/cyan */
              delay={0.3}
              icon={<Users size={48} />}
            />

            <Portal
              href="https://www.youtube.com/@engshehabelebady1"
              title="Access Model Exam Solutions"
              color="#FF0000" /* YouTube Red */
              delay={0.5}
              icon={<Youtube size={48} />}
            />

        </div>
    </section>
  );
}
