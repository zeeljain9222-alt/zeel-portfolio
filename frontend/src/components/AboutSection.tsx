import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 1,
        }
      });

      // Staggered reveal and Z-depth for huge text
      textRefs.current.forEach((el, index) => {
        if (!el) return;
        tl.fromTo(el, 
          { 
            y: 100, 
            opacity: 0, 
            rotateX: -45, 
            z: -200 * index 
          },
          { 
            y: 0, 
            opacity: 1, 
            rotateX: 0, 
            z: 0, 
            ease: 'power3.out' 
          },
          index * 0.1 // stagger
        );
        
        // Horizontal shift
        tl.to(el, {
          x: index % 2 === 0 ? '5vw' : '-5vw',
          ease: 'none'
        }, 0);
      });

      // Paragraph reveal
      tl.fromTo(paraRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0.3
      );

      // Grid parallax
      tl.to(gridRef.current, {
        y: '10vh',
        ease: 'none'
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-10 w-full flex flex-col justify-center px-6 md:px-24 py-24 md:py-32 overflow-hidden bg-background perspective-[1000px]">
      
      {/* Subtle animated grid background */}
      <div 
        ref={gridRef}
        className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          height: '150%',
          top: '-25%'
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-center">
        
        <div className="flex-1 flex flex-col perspective-[1000px]">
          {['I BUILD', 'SOFTWARE', 'AND DIGITAL', 'EXPERIENCES.'].map((line, i) => (
            <div 
              key={i} 
              ref={el => textRefs.current[i] = el}
              className="font-display text-[12vw] md:text-[8vw] leading-[0.85] tracking-tighter uppercase will-change-transform transform-style-3d"
            >
              {line}
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/3 flex justify-end">
          <p 
            ref={paraRef}
            className="font-sans text-sm md:text-base leading-relaxed text-foreground/80 font-medium max-w-sm uppercase tracking-wider"
          >
            Zeel is a Computer Engineering student deeply interested in software engineering, web development, and crafting creative frontend experiences that blur the line between technology and art.
          </p>
        </div>

      </div>
    </section>
  );
};
