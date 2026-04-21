'use client';

import { useEffect, useState } from 'react';
import CustomCursor from '@/components/CustomCursor';
import Background3D from '@/components/Background3D';
import Hero from '@/components/Hero';
import BioSection from '@/components/BioSection';
import ResourceHub from '@/components/ResourceHub';
import Footer from '@/components/Footer';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative w-full min-h-screen text-white bg-transparent selection:bg-[#00bfff]/30">
      <CustomCursor />
      <Background3D />
      
      <Hero />
      <BioSection />
      <ResourceHub />
      <Footer />
    </main>
  );
}
