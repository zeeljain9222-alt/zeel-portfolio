import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const zeelRef = useRef<HTMLHeadingElement>(null);
  const jainRef = useRef<HTMLHeadingElement>(null);
  const metaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  const zeelLetters = "ZEEL".split("");
  const jainLetters = "JAIN".split("");

  useEffect(() => {
    // Entrance Animation
    const entranceTl = gsap.timeline();
    
    entranceTl
      .fromTo(lineRef.current, 
        { scaleX: 0, transformOrigin: 'center' }, 
        { scaleX: 1, duration: 1.5, ease: 'expo.inOut' }
      )
      .fromTo(metaRefs.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo('.hero-letter-zeel',
        { y: '120%', opacity: 0, rotateZ: 10 },
        { y: '0%', opacity: 1, rotateZ: 0, duration: 1, stagger: 0.05, ease: 'power4.out' },
        '-=0.8'
      )
      .fromTo('.hero-letter-jain',
        { y: '-120%', opacity: 0, rotateZ: -10 },
        { y: '0%', opacity: 1, rotateZ: 0, duration: 1, stagger: 0.05, ease: 'power4.out' },
        '-=0.9'
      );

    // Scroll Animation
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
        pin: true,
        pinSpacing: false, // Set to false so the next section immediately scrolls over this one
      }
    });

    scrollTl.to('.hero-letter-zeel', {
      x: (i) => (i - 1.5) * -50,
      y: -100,
      scale: 1.2,
      opacity: 0,
      stagger: 0.05,
      ease: 'power2.inOut'
    }, 0);

    scrollTl.to('.hero-letter-jain', {
      x: (i) => (i - 1.5) * 50,
      y: 100,
      scale: 1.2,
      opacity: 0,
      stagger: 0.05,
      ease: 'power2.inOut'
    }, 0);

    scrollTl.to([metaRefs.current, lineRef.current], {
      opacity: 0,
      y: (i) => i % 2 === 0 ? -50 : 50,
      ease: 'power2.inOut'
    }, 0);
    
    return () => {
      entranceTl.kill();
      scrollTl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-background z-0">
      
      {/* Decorative Line */}
      <div ref={lineRef} className="absolute top-1/2 left-12 right-12 h-[1px] bg-foreground/10 -translate-y-1/2 z-0" />

      {/* Top Metadata */}
      <div className="flex justify-between items-start w-full uppercase tracking-widest text-[10px] md:text-xs font-medium z-10">
        <div ref={el => metaRefs.current[0] = el} className="flex flex-col gap-1">
          <span className="text-foreground">03 / Computer Engineering</span>
          <span className="text-foreground/50">Student</span>
        </div>
        <div ref={el => metaRefs.current[1] = el} className="text-right">
          <span className="text-foreground">2026</span>
        </div>
      </div>

      {/* Main Typography */}
      <div className="flex flex-col justify-center flex-grow relative z-0 pointer-events-none overflow-hidden">
        <h1 
          ref={zeelRef}
          className="font-display text-[22vw] leading-[0.75] tracking-tighter uppercase -ml-[2vw] flex"
        >
          {zeelLetters.map((letter, i) => (
            <span key={i} className="hero-letter-zeel inline-block relative will-change-transform">{letter}</span>
          ))}
        </h1>
        <h1 
          ref={jainRef}
          className="font-display text-[22vw] leading-[0.75] tracking-tighter uppercase text-right -mr-[2vw] flex justify-end"
        >
          {jainLetters.map((letter, i) => (
            <span key={i} className="hero-letter-jain inline-block relative will-change-transform">{letter}</span>
          ))}
        </h1>
      </div>

      {/* Bottom Metadata */}
      <div className="flex justify-between items-end w-full uppercase tracking-widest text-[10px] md:text-xs font-medium z-10">
        <div ref={el => metaRefs.current[2] = el} className="flex flex-col gap-1 max-w-[200px] md:max-w-[300px]">
          <span className="text-foreground">Software / Web / Creative Development</span>
          <span className="text-foreground/50 mt-2 text-accent">"Trying to improve 0.1% daily."</span>
        </div>
        <div ref={el => metaRefs.current[3] = el} className="flex flex-col gap-1 text-right">
          <span className="text-foreground">Available for Internships</span>
          <span className="text-foreground/70">Mumbai / India</span>
        </div>
      </div>
    </section>
  );
};
