import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const zeelRef = useRef<HTMLHeadingElement>(null);
  const jainRef = useRef<HTMLHeadingElement>(null);
  const metaTopRef = useRef<HTMLDivElement>(null);
  const metaBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          pinSpacing: true,
        }
      });

      tl.to(zeelRef.current, {
        x: '-30vw',
        y: '-10vh',
        scale: 1.5,
        opacity: 0,
        ease: 'power2.inOut'
      }, 0);

      tl.to(jainRef.current, {
        x: '30vw',
        y: '10vh',
        scale: 1.5,
        opacity: 0,
        ease: 'power2.inOut'
      }, 0);

      tl.to([metaTopRef.current, metaBottomRef.current], {
        opacity: 0,
        y: (i) => i === 0 ? -50 : 50,
        ease: 'power2.inOut'
      }, 0);
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-background">
      {/* Top Metadata */}
      <div ref={metaTopRef} className="flex justify-between items-start w-full uppercase tracking-widest text-[10px] md:text-xs font-medium z-10">
        <div className="flex flex-col gap-1">
          <span>03 / Computer Engineering</span>
          <span className="text-foreground/50">Student</span>
        </div>
        <div className="text-right">
          <span>2026</span>
        </div>
      </div>

      {/* Main Typography */}
      <div className="flex flex-col justify-center flex-grow relative z-0 pointer-events-none">
        <h1 
          ref={zeelRef}
          className="font-display text-[22vw] leading-[0.75] tracking-tighter uppercase -ml-[2vw] will-change-transform"
        >
          Zeel
        </h1>
        <h1 
          ref={jainRef}
          className="font-display text-[22vw] leading-[0.75] tracking-tighter uppercase text-right -mr-[2vw] will-change-transform"
        >
          Jain
        </h1>
      </div>

      {/* Bottom Metadata */}
      <div ref={metaBottomRef} className="flex justify-between items-end w-full uppercase tracking-widest text-[10px] md:text-xs font-medium z-10">
        <div className="flex flex-col gap-1 max-w-[200px] md:max-w-[300px]">
          <span>Software / Web / Creative Development</span>
          <span className="text-foreground/50 mt-2">"Trying to improve 0.1% daily."</span>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span>Available for Internships</span>
          <span className="text-accent">Mumbai / India</span>
        </div>
      </div>
    </section>
  );
};
