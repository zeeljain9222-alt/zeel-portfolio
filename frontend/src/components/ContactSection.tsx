import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const letsRef = useRef<HTMLDivElement>(null);
  const buildRef = useRef<HTMLDivElement>(null);
  const somethingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // "LET'S" slides horizontally
    tl.fromTo(letsRef.current, 
      { x: "-20vw", opacity: 0.5 },
      { x: "5vw", opacity: 1, ease: "power2.out" },
      0
    );

    // "BUILD" scales forward and fades in
    tl.fromTo(buildRef.current,
      { scale: 0.5, z: -500, opacity: 0, x: "10vw" },
      { scale: 1, z: 0, opacity: 1, x: "-5vw", ease: "power2.out" },
      0
    );

    // "SOMETHING." shifts diagonally
    tl.fromTo(somethingRef.current,
      { x: "30vw", y: "20vh", rotation: 5, opacity: 0 },
      { x: "15vw", y: "0vh", rotation: 0, opacity: 1, ease: "power2.out" },
      0
    );

    // Animated line travelling across screen
    tl.fromTo(lineRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, ease: "power2.inOut" },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background py-32 perspective-[1000px]"
    >
      <div 
        ref={lineRef} 
        className="absolute top-1/2 left-0 w-full h-[1px] bg-foreground/20 -translate-y-1/2 z-0"
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-start justify-center gap-4 mix-blend-difference text-background pointer-events-none">
        <div ref={letsRef} className="font-display text-[15vw] leading-[0.8] tracking-tighter uppercase whitespace-nowrap will-change-transform">
          Let's
        </div>
        <div ref={buildRef} className="font-display text-[18vw] leading-[0.8] tracking-tighter uppercase whitespace-nowrap text-accent mix-blend-normal will-change-transform ml-12">
          Build
        </div>
        <div ref={somethingRef} className="font-display text-[12vw] leading-[0.8] tracking-tighter uppercase whitespace-nowrap will-change-transform ml-24">
          Something.
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-8 md:p-16">
        <div className="flex justify-between items-start w-full">
          <div className="text-xs uppercase tracking-widest font-medium pointer-events-auto">
            Available for freelance
          </div>
          <MagneticButton href="mailto:hello@example.com" className="pointer-events-auto group">
            <div className="w-24 h-24 rounded-full border border-foreground/20 flex items-center justify-center bg-background/50 backdrop-blur-sm transition-colors group-hover:bg-accent group-hover:text-white group-hover:border-accent group-hover:shadow-[0_0_30px_rgba(200,80,60,0.3)]">
              <span className="text-xs uppercase tracking-widest font-medium">Email</span>
            </div>
          </MagneticButton>
        </div>

        <div className="flex justify-between items-end w-full">
          <div className="flex gap-6 pointer-events-auto">
            <MagneticButton href="https://github.com">
              <span className="text-sm uppercase tracking-widest font-medium hover:text-accent transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-accent hover:after:w-full after:transition-all after:duration-300">GitHub</span>
            </MagneticButton>
            <MagneticButton href="https://linkedin.com">
              <span className="text-sm uppercase tracking-widest font-medium hover:text-accent transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-accent hover:after:w-full after:transition-all after:duration-300">LinkedIn</span>
            </MagneticButton>
          </div>
          <div className="text-xs uppercase tracking-widest font-medium text-foreground/50 pointer-events-auto">
            © 2024 Portfolio
          </div>
        </div>
      </div>
    </section>
  );
};
