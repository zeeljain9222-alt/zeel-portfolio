import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from '@/components/CustomCursor';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ExperimentalSection } from '@/components/ExperimentalSection';
import { TechStackSection } from '@/components/TechStackSection';
import { ContactSection } from '@/components/ContactSection';

export default function Index() {
  useEffect(() => {
    // Hide default cursor globally
    document.documentElement.style.cursor = 'none';
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      document.documentElement.style.cursor = 'auto';
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-background">
      <CustomCursor />
      <div className="noise-overlay" />
      
      {/* Removed overflow-hidden and flex-col to fix GSAP pin-spacer shrinking issues */}
      <main className="w-full block">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperimentalSection />
        <TechStackSection />
        <ContactSection />
      </main>
    </div>
  );
}
