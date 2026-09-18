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
        { scaleX: 0, scaleY: 0 }, 
        { scaleX: 1, scaleY: 1, duration: 1.5, ease: 'expo.inOut', stagger: 0.2 }
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

    scrollTl.to('.meta-text, .border-line', {
      opacity: 0,
      y: -40,
      ease: 'power2.inOut'
    }, 0);
    
    // Refresh ScrollTrigger when returning to top to fix vanishing elements
    ScrollTrigger.addEventListener('refresh', () => {
        if (window.scrollY === 0) {
            gsap.set('.hero-letter-zeel, .hero-letter-jain, .meta-text, .border-line', { clearProps: 'all' });
            entranceTl.restart();
        }
    });

    return () => {
      entranceTl.kill();
      scrollTl.kill();
      ScrollTrigger.clearEventListeners();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-background z-0">
      
      {/* Decorative Lines */}
      <div className="border-line absolute top-[30%] left-0 w-full h-[1px] bg-accent/20 origin-left" />
      <div className="border-line absolute bottom-[30%] right-0 w-full h-[1px] bg-accent/20 origin-right" />
      <div className="border-line absolute left-[20%] top-0 w-[1px] h-full bg-accent/10 origin-top hidden md:block" />

      {/* Top Metadata */}
      <div className="w-full flex justify-between items-start uppercase tracking-widest text-[9px] md:text-[10px] font-medium z-10 pb-6 relative">
        <div className="flex flex-col gap-1 overflow-hidden">
          <span className="meta-text text-foreground font-bold">03 / COMPUTER ENG.</span>
          <span className="meta-text text-muted-foreground">[ SYS.INIT_2026 ]</span>
        </div>
        <div className="overflow-hidden text-right">
          <span className="meta-text text-accent font-bold">PORTFOLIO // 1.0</span>
        </div>
      </div>

      {/* Main Typography & Asymmetric Layout */}
      <div className="flex flex-col justify-center flex-grow relative z-0 pointer-events-none w-full max-w-screen-2xl mx-auto mt-8 md:mt-0">
        
        {/* Asymmetric ZEEL */}
        <div className="w-full pl-2 md:pl-16 overflow-hidden relative">
          <div className="meta-text absolute left-2 md:left-16 top-0 text-[10px] text-accent font-mono">X:140 Y:200</div>
          <h1 className="font-display text-[18vw] md:text-[14vw] leading-[0.9] tracking-tight uppercase flex mt-4">
            {zeelLetters.map((letter, i) => (
              <span key={`zeel-${i}`} className="hero-letter-zeel inline-block relative will-change-transform transform-style-3d text-foreground font-bold">
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Floating editorial text */}
        <div className="absolute left-6 md:left-[35%] top-[55%] md:top-1/2 w-56 md:w-72 overflow-hidden z-20">
          <div className="border-l-2 border-accent pl-4">
            <p className="meta-text font-sans text-[10px] md:text-xs uppercase tracking-widest leading-relaxed text-muted-foreground font-medium">
              Creative development & digital design. Focusing on interactive interfaces and modern web architecture.
            </p>
          </div>
        </div>

        {/* Asymmetric JAIN */}
        <div className="w-full pr-2 md:pr-32 flex justify-end overflow-hidden mt-8 md:mt-0 relative">
          <div className="meta-text absolute right-2 md:right-32 bottom-full text-[10px] text-muted-foreground font-mono mb-2">VOL. 01</div>
          <h1 className="font-display text-[18vw] md:text-[14vw] leading-[0.9] tracking-tight uppercase flex text-foreground">
            {jainLetters.map((letter, i) => (
              <span key={`jain-${i}`} className="hero-letter-jain inline-block relative will-change-transform transform-style-3d font-bold">
                {letter}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* Bottom Metadata */}
      <div className="w-full flex justify-between items-end uppercase tracking-widest text-[9px] md:text-[10px] font-medium z-10 pt-6 relative">
        <div className="flex flex-col gap-1 overflow-hidden">
          <span className="meta-text text-foreground font-bold">SOFTWARE / WEB / CREATIVE</span>
          <span className="meta-text text-muted-foreground mt-1">AVAILABLE FOR INTERNSHIPS</span>
        </div>
        <div className="flex flex-col gap-1 text-right overflow-hidden">
          <span className="meta-text text-accent font-bold">MUMBAI, INDIA</span>
          <span className="meta-text text-muted-foreground">"IMPROVING 0.1% DAILY."</span>
        </div>
      </div>
    </section>
  );
};
