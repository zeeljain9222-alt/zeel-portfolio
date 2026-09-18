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
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance Animation
    const entranceTl = gsap.timeline();
    
    entranceTl
      .fromTo(lineRef.current, 
        { scaleX: 0, transformOrigin: 'left' }, 
        { scaleX: 1, duration: 1.5, ease: 'expo.inOut' }
      )
      .fromTo([metaTopRef.current, metaBottomRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(zeelRef.current,
        { y: '100%', opacity: 0, rotateZ: 5 },
        { y: '0%', opacity: 1, rotateZ: 0, duration: 1.2, ease: 'power4.out' },
        '-=0.8'
      )
      .fromTo(jainRef.current,
        { y: '-100%', opacity: 0, rotateZ: -5 },
        { y: '0%', opacity: 1, rotateZ: 0, duration: 1.2, ease: 'power4.out' },
        '-=1'
      );

    // Scroll Animation
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
        pinSpacing: true,
      }
    });

    scrollTl.to(zeelRef.current, {
      x: '-30vw',
      scale: 1.2,
      opacity: 0,
      ease: 'power2.inOut'
    }, 0);

    scrollTl.to(jainRef.current, {
      x: '30vw',
      scale: 1.2,
      opacity: 0,
      ease: 'power2.inOut'
    }, 0);

    scrollTl.to([metaTopRef.current, metaBottomRef.current, lineRef.current], {
      opacity: 0,
      y: (i) => i === 0 ? -50 : 50,
      ease: 'power2.inOut'
    }, 0);
    
    return () => {
      entranceTl.kill();
      scrollTl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-background">
      
      {/* Decorative Line */}
      <div ref={lineRef} className="absolute top-1/2 left-0 w-full h-[1px] bg-foreground/10 -translate-y-1/2 z-0" />

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
      <div className="flex flex-col justify-center flex-grow relative z-0 pointer-events-none overflow-hidden">
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
          <span className="text-foreground/50 mt-2 text-accent">"Trying to improve 0.1% daily."</span>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span>Available for Internships</span>
          <span className="text-foreground/70">Mumbai / India</span>
        </div>
      </div>
    </section>
  );
};
