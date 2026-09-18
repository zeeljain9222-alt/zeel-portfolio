import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const zeelLetters = "ZEEL".split("");
  const jainLetters = "JAIN".split("");

  useEffect(() => {
    // Entrance Animation
    const entranceTl = gsap.timeline();
    
    entranceTl
      .fromTo('.border-line', 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 1.5, ease: 'expo.inOut', stagger: 0.2 }
      )
      .fromTo('.meta-text',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, stagger: 0.05, ease: 'power3.out' },
        '-=1'
      )
      .fromTo('.hero-letter-zeel',
        { y: '120%', opacity: 0, rotateZ: 8, scale: 0.9 },
        { y: '0%', opacity: 1, rotateZ: 0, scale: 1, duration: 1.2, stagger: 0.04, ease: 'power4.out' },
        '-=0.8'
      )
      .fromTo('.hero-letter-jain',
        { y: '120%', opacity: 0, rotateZ: 8, scale: 0.9 },
        { y: '0%', opacity: 1, rotateZ: 0, scale: 1, duration: 1.2, stagger: 0.04, ease: 'power4.out' },
        '-=1.1'
      )
      .fromTo('.hero-accent-shape',
        { scale: 0, rotation: -90, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: 'expo.out' },
        '-=1.2'
      );

    // Scroll Animation
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
        pin: true,
        pinSpacing: false, // Allows next section to overlap smoothly
      }
    });

    scrollTl.to('.hero-letter-zeel', {
      x: (i) => (i - 1.5) * -40,
      y: -120,
      opacity: 0,
      stagger: 0.02,
      ease: 'power2.inOut'
    }, 0);

    scrollTl.to('.hero-letter-jain', {
      x: (i) => (i - 1.5) * 40,
      y: -80,
      opacity: 0,
      stagger: 0.02,
      ease: 'power2.inOut'
    }, 0);

    scrollTl.to('.meta-text, .border-line, .hero-accent-shape', {
      opacity: 0,
      y: -40,
      ease: 'power2.inOut'
    }, 0);
    
    return () => {
      entranceTl.kill();
      scrollTl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-background z-0">
      
      {/* Top Metadata */}
      <div className="w-full flex justify-between items-start uppercase tracking-widest text-[10px] md:text-xs font-medium z-10 pb-6 relative">
        <div className="border-line absolute bottom-0 left-0 w-full h-[1px] bg-foreground/15 origin-left" />
        <div className="flex flex-col gap-1 overflow-hidden">
          <span className="meta-text text-foreground">03 / Computer Engineering</span>
          <span className="meta-text text-foreground/50">Student</span>
        </div>
        <div className="overflow-hidden text-right">
          <span className="meta-text text-foreground">Portfolio 2026</span>
        </div>
      </div>

      {/* Main Typography & Asymmetric Layout */}
      <div className="flex flex-col justify-center flex-grow relative z-0 pointer-events-none w-full max-w-screen-2xl mx-auto mt-12 md:mt-0">
        
        {/* Asymmetric ZEEL */}
        <div className="w-full pl-2 md:pl-12 overflow-hidden">
          <h1 className="font-display text-[20vw] md:text-[18vw] leading-[0.8] tracking-tighter uppercase flex">
            {zeelLetters.map((letter, i) => (
              <span key={`zeel-${i}`} className="hero-letter-zeel inline-block relative will-change-transform transform-style-3d text-foreground">
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Floating editorial text */}
        <div className="absolute left-6 md:left-32 top-[45%] md:top-1/2 w-48 md:w-64 overflow-hidden z-20">
          <p className="meta-text font-sans text-[9px] md:text-xs uppercase tracking-widest leading-relaxed text-foreground/60">
            Crafting digital experiences with a focus on interaction, motion, and typography.
          </p>
        </div>
        
        {/* Subtle Accent Geometric Shape */}
        <div className="hero-accent-shape absolute right-[20%] top-[35%] w-16 h-16 md:w-32 md:h-32 border-[1px] border-accent/40 rounded-full mix-blend-multiply" />

        {/* Asymmetric JAIN */}
        <div className="w-full pr-2 md:pr-24 flex justify-end overflow-hidden mt-4 md:mt-0">
          <h1 className="font-display text-[20vw] md:text-[18vw] leading-[0.8] tracking-tighter uppercase flex">
            {jainLetters.map((letter, i) => (
              <span key={`jain-${i}`} className="hero-letter-jain inline-block relative will-change-transform transform-style-3d text-foreground">
                {letter}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* Bottom Metadata */}
      <div className="w-full flex justify-between items-end uppercase tracking-widest text-[10px] md:text-xs font-medium z-10 pt-6 relative">
        <div className="border-line absolute top-0 left-0 w-full h-[1px] bg-foreground/15 origin-right" />
        <div className="flex flex-col gap-1 overflow-hidden">
          <span className="meta-text text-foreground">Software / Web / Creative</span>
          <span className="meta-text text-accent mt-1">"Improving 0.1% daily."</span>
        </div>
        <div className="flex flex-col gap-1 text-right overflow-hidden">
          <span className="meta-text text-foreground">Available for Internships</span>
          <span className="meta-text text-foreground/50">Mumbai / India</span>
        </div>
      </div>
    </section>
  );
};
