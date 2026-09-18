import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'JAVA', percent: 82 },
  { name: 'JAVASCRIPT', percent: 78 },
  { name: 'HTML / CSS', percent: 90 },
  { name: 'SQL', percent: 75 },
  { name: 'C++', percent: 72 },
  { name: 'NODE / EXPRESS', percent: 68 },
  { name: 'GSAP', percent: 60 },
];

export const TechStackSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row, i) => {
        if (!row) return;

        const line = row.querySelector('.measure-line');
        const num = row.querySelector('.percent-num');
        const targetPercent = skills[i].percent;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          }
        });

        // Draw line
        tl.fromTo(line, 
          { scaleX: 0 }, 
          { scaleX: targetPercent / 100, ease: 'none' },
          0
        );

        // Count up number
        tl.fromTo(num,
          { innerHTML: 0 },
          { 
            innerHTML: targetPercent,
            snap: { innerHTML: 1 },
            ease: 'none',
            onUpdate: function() {
              if (num) num.innerHTML = Math.round(this.targets()[0].innerHTML) + '%';
            }
          },
          0
        );

        // Subtle horizontal shift for the label to create depth
        const label = row.querySelector('.skill-label');
        tl.fromTo(label, { x: -20, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-background text-foreground py-32 px-6 md:px-24 overflow-hidden flex flex-col justify-center">
      
      {/* Decorative technical elements */}
      <div className="absolute top-12 left-12 font-mono text-[10px] text-foreground/30 uppercase tracking-widest hidden md:block">
        SYS.REQ. // V.2.0.4<br/>
        CALIBRATING_DATA...
      </div>
      
      <div className="w-full max-w-6xl mx-auto z-10">
        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-24 text-foreground/20">
          Technical<br/>Stack
        </h2>

        <div className="flex flex-col gap-8 md:gap-12">
          {skills.map((skill, i) => (
            <div 
              key={skill.name} 
              ref={el => rowsRef.current[i] = el}
              className="flex items-center w-full group"
            >
              <div className="skill-label w-40 md:w-64 font-sans text-xs md:text-sm font-bold tracking-widest uppercase shrink-0">
                {skill.name}
              </div>
              
              <div className="flex-grow h-8 relative mx-4 md:mx-8 flex items-center">
                {/* Background grid line */}
                <div className="absolute inset-0 w-full h-[1px] top-1/2 -translate-y-1/2 bg-foreground/10 border-dashed border-b border-foreground/20" />
                
                {/* Animated measurement line */}
                <div 
                  className="measure-line absolute left-0 h-[2px] bg-foreground top-1/2 -translate-y-1/2 origin-left will-change-transform"
                  style={{ width: '100%' }}
                />
                
                {/* Technical crosshairs/markers */}
                <div className="absolute left-0 w-1 h-3 bg-foreground top-1/2 -translate-y-1/2" />
                <div className="measure-line absolute w-1 h-3 bg-accent top-1/2 -translate-y-1/2 origin-left transition-colors duration-300" style={{ width: '100%', background: 'none', borderRight: '2px solid var(--accent)' }} />
              </div>

              <div className="percent-num w-16 text-right font-display text-2xl md:text-4xl tracking-tighter text-accent shrink-0">
                0%
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
