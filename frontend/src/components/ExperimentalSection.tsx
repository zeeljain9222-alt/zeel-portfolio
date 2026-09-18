import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ExperimentalSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
        }
      });

      // Background grid scaling
      tl.fromTo('.exp-grid', 
        { scale: 1, opacity: 0.1 }, 
        { scale: 1.5, opacity: 0.3, rotation: 5, ease: 'none' }, 
        0
      );

      // Horizontal moving text
      tl.fromTo('.exp-text-1', { x: '-20vw' }, { x: '20vw', ease: 'none' }, 0);
      tl.fromTo('.exp-text-2', { x: '20vw' }, { x: '-20vw', ease: 'none' }, 0);

      // Diagonal geometric lines
      tl.fromTo('.exp-line-1', { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, ease: 'none' }, 0);
      tl.fromTo('.exp-line-2', { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, ease: 'none' }, 0);

      // Floating fragments
      tl.fromTo('.exp-frag-1', { y: '50vh', rotation: 0 }, { y: '-50vh', rotation: 180, ease: 'none' }, 0);
      tl.fromTo('.exp-frag-2', { y: '-30vh', x: '-20vw', rotation: 45 }, { y: '30vh', x: '20vw', rotation: -45, ease: 'none' }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-background overflow-hidden flex items-center justify-center">
      
      {/* Grid Background */}
      <div 
        className="exp-grid absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* Geometric Lines */}
      <div className="exp-line-1 absolute top-1/3 left-0 w-full h-[2px] bg-accent/50 -rotate-12" />
      <div className="exp-line-2 absolute top-0 right-1/3 w-[2px] h-full bg-foreground/20 rotate-12" />

      {/* Typography */}
      <div className="relative z-10 flex flex-col items-center justify-center mix-blend-difference text-background pointer-events-none">
        <div className="exp-text-1 font-display text-[15vw] leading-[0.8] tracking-tighter uppercase whitespace-nowrap">
          Digital
        </div>
        <div className="exp-text-2 font-display text-[15vw] leading-[0.8] tracking-tighter uppercase whitespace-nowrap text-transparent" style={{ WebkitTextStroke: '2px var(--background)' }}>
          Artworks
        </div>
      </div>

      {/* Geometric Fragments */}
      <div className="exp-frag-1 absolute left-1/4 w-32 h-32 border-4 border-accent rounded-full opacity-50" />
      <div className="exp-frag-2 absolute right-1/4 w-48 h-48 border-2 border-foreground/30 opacity-50" />
      
      {/* Small coordinates/metadata */}
      <div className="absolute bottom-12 left-12 font-mono text-xs uppercase tracking-widest text-foreground/50">
        LAT_40.7128<br/>LONG_-74.0060<br/>SEC_04_FRAGMENTS
      </div>

    </section>
  );
};
