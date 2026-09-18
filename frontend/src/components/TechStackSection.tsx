import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TechStackSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const mouseWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !scrollWrapperRef.current || !mouseWrapperRef.current) return;

      // Scroll-driven 3D rotation of the entire installation
      gsap.fromTo(scrollWrapperRef.current,
        { rotateX: 15, rotateY: -15 },
        {
          rotateX: -15,
          rotateY: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );

      // Parallax depth for individual technical elements
      gsap.utils.toArray('.tech-element').forEach((el: any) => {
        const depth = parseFloat(el.dataset.depth || '0');
        
        gsap.fromTo(el,
          { z: depth * -100, scale: 1 - (depth * 0.1) },
          {
            z: depth * 150,
            scale: 1 + (depth * 0.15),
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          }
        );
      });

      // Mouse-driven 3D micro-interaction for extra kinetic feel
      const xTo = gsap.quickTo(mouseWrapperRef.current, "rotationY", { duration: 1.5, ease: "power3.out" });
      const yTo = gsap.quickTo(mouseWrapperRef.current, "rotationX", { duration: 1.5, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10 to 10 degrees
        const y = (e.clientY / window.innerHeight - 0.5) * -20; // -10 to 10 degrees
        xTo(x);
        yTo(y);
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[120vh] w-full bg-background text-foreground overflow-hidden flex items-center justify-center perspective-[2000px]"
      data-cursor-type="tech"
    >
      
      {/* Global Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      {/* Top/Bottom Metadata */}
      <div className="absolute top-12 left-12 font-mono text-[10px] text-muted-foreground uppercase tracking-widest hidden md:block z-50">
        SYS.REQ. // V.4.0.0<br/>
        CALIBRATING_3D_MATRIX...<br/>
        <span className="text-accent mt-1 inline-block">STATUS: ONLINE</span>
      </div>
      
      <div className="absolute bottom-12 right-12 font-mono text-[10px] text-muted-foreground uppercase tracking-widest text-right hidden md:block z-50">
        TECHNICAL<br/>
        ANALYSIS_MATRIX
      </div>

      {/* 3D Composition Wrappers */}
      <div ref={scrollWrapperRef} className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center transform-style-3d">
        <div ref={mouseWrapperRef} className="relative w-full h-[80vh] transform-style-3d">

          {/* Decorative Geometric Rings / Technical Guides */}
          <div className="tech-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] border-[1px] border-foreground/10 rounded-full transform-style-3d pointer-events-none" data-depth="-1" />
          <div className="tech-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border-[1px] border-accent/10 rounded-full transform-style-3d pointer-events-none" data-depth="1" />
          <div className="tech-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[80vh] bg-foreground/5 transform-style-3d pointer-events-none" data-depth="0" />
          <div className="tech-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[1px] bg-foreground/5 transform-style-3d pointer-events-none" data-depth="0" />

          {/* Skill 1: HTML */}
          <div className="tech-element absolute top-[10%] left-[10%] md:left-[15%] transform-style-3d" data-depth="-0.5">
            <div className="font-mono text-[10px] text-muted-foreground mb-1 border-b border-foreground/10 pb-1">01 // MARKUP</div>
            <div className="font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase text-foreground mix-blend-multiply">HTML</div>
          </div>

          {/* Skill 2: CSS */}
          <div className="tech-element absolute top-[20%] right-[10%] md:right-[15%] transform-style-3d" data-depth="0.8">
            <div className="font-mono text-[10px] text-muted-foreground mb-1 border-b border-foreground/10 pb-1 text-right">02 // STYLE</div>
            <div className="font-display text-6xl md:text-8xl font-bold tracking-tighter uppercase text-foreground mix-blend-multiply">CSS</div>
          </div>

          {/* Skill 3: JAVA (Center / Core) */}
          <div className="tech-element absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 transform-style-3d z-50" data-depth="2">
            <div className="relative flex flex-col items-center">
              <div className="font-mono text-[10px] text-accent mb-2 text-center tracking-[0.3em] border border-accent/20 bg-accent/5 px-3 py-1">03 // CORE</div>
              <div className="font-display text-[18vw] md:text-[14vw] font-bold tracking-tighter uppercase text-foreground mix-blend-multiply leading-none">JAVA</div>
              {/* Subtle offset shadow/glitch layer */}
              <div className="absolute top-8 left-2 font-display text-[18vw] md:text-[14vw] font-bold tracking-tighter uppercase text-accent/20 pointer-events-none leading-none">JAVA</div>
            </div>
          </div>

          {/* Skill 4: C */}
          <div className="tech-element absolute bottom-[25%] left-[12%] md:left-[20%] transform-style-3d" data-depth="1.2">
            <div className="font-mono text-[10px] text-muted-foreground mb-1 border-b border-foreground/10 pb-1">04 // SYSTEM</div>
            <div className="font-display text-6xl md:text-8xl font-bold tracking-tighter uppercase text-foreground mix-blend-multiply">C</div>
          </div>

          {/* Skill 5: RDBMS / SQL */}
          <div className="tech-element absolute bottom-[15%] right-[12%] md:right-[20%] transform-style-3d" data-depth="-0.8">
            <div className="font-mono text-[10px] text-muted-foreground mb-1 border-b border-foreground/10 pb-1 text-right">05 // DATA</div>
            <div className="font-display text-4xl md:text-6xl font-bold tracking-tighter uppercase text-foreground mix-blend-multiply">RDBMS / SQL</div>
          </div>

        </div>
      </div>
      
    </section>
  );
};
