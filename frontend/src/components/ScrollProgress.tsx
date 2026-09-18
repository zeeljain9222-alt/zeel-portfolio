import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollProgress = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current || !numRef.current) return;

    const totalSections = 5;

    gsap.to(lineRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1,
        onUpdate: (self) => {
          const currentSection = Math.min(
            totalSections,
            Math.max(1, Math.ceil(self.progress * totalSections))
          );
          if (numRef.current) {
            numRef.current.innerText = `0${currentSection}`;
          }
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 mix-blend-difference text-background hidden md:flex pointer-events-none">
      <div ref={numRef} className="font-sans text-xs tracking-widest font-medium">01</div>
      <div className="w-[1px] h-24 bg-background/20 relative overflow-hidden">
        <div 
          ref={lineRef} 
          className="absolute top-0 left-0 w-full h-full bg-background origin-top scale-y-0 will-change-transform"
        />
      </div>
      <div className="font-sans text-xs tracking-widest font-medium">05</div>
    </div>
  );
};
