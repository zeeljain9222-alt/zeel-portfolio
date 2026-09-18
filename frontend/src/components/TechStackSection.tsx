import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'HTML', percent: 95 },
  { name: 'CSS', percent: 90 },
  { name: 'JAVA', percent: 85 },
  { name: 'C', percent: 75 },
  { name: 'RDBMS / SQL', percent: 80 },
];

export const TechStackSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const instrumentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Rotate the instrument dials
      gsap.to('.tech-dial', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

      rowsRef.current.forEach((row, i) => {
        if (!row) return;

        const line = row.querySelector('.measure-line');
        const num = row.querySelector('.percent-num');
        const targetPercent = skills[i].percent;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            end: 'top 50%',
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
        tl.fromTo(label, { x: -30, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0);
      });

      // Parallax for the whole instrument section
      gsap.to(instrumentRef.current, {
        y: '-10vh',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full bg-background text-foreground py-32 px-6 md:px-24 overflow-hidden flex flex-col justify-center"
      data-cursor-type="tech"
    >
      
      {/* Decorative technical elements / Instrument UI */}
      <div 
        ref={instrumentRef}
        className="absolute top-0 right-0 w-[50vw] h-[100vh] pointer-events-none opacity-5 flex items-center justify-center"
      >
        <div className="tech-dial absolute w-[40vw] h-[40vw] rounded-full border border-foreground border-dashed" />
        <div className="tech-dial absolute w-[30vw] h-[30vw] rounded-full border border-foreground" style={{ animationDirection: 'reverse' }} />
        <div className="absolute w-[2px] h-[50vw] bg-foreground/20 rotate-45" />
        <div className="absolute w-[50vw] h-[2px] bg-foreground/20 -rotate-45" />
      </div>

      <div className="absolute top-12 left-12 font-mono text-[10px] text-foreground/40 uppercase tracking-widest hidden md:block">
        SYS.REQ. // V.3.1.4<br/>
        CALIBRATING_DATA_STREAM...<br/>
        STATUS: ONLINE
      </div>
      
      <div className="w-full max-w-6xl mx-auto z-10">
        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-24 text-foreground/20">
          Technical<br/>Analysis
        </h2>

        <div className="flex flex-col gap-10 md:gap-14 border-l border-foreground/10 pl-4 md:pl-12 relative">
          
          {/* Vertical axis line indicator */}
          <div className="absolute top-0 -left-[5px] w-[9px] h-[9px] border-2 border-accent rounded-full bg-background" />
          <div className="absolute bottom-0 -left-[5px] w-[9px] h-[9px] border-2 border-foreground/30 rounded-full bg-background" />

          {skills.map((skill, i) => (
            <div 
              key={skill.name} 
              ref={el => rowsRef.current[i] = el}
              className="flex items-center w-full group relative"
            >
              <div className="skill-label w-32 md:w-48 font-sans text-xs md:text-sm font-bold tracking-widest uppercase shrink-0">
                {skill.name}
              </div>
              
              <div className="flex-grow h-12 relative mx-4 md:mx-8 flex items-center">
                {/* Background grid line - looks like a data track */}
                <div className="absolute inset-0 w-full h-full flex items-center">
                  <div className="w-full h-[1px] bg-foreground/10 border-dashed border-b border-foreground/20" />
                </div>
                
                {/* Animated measurement line */}
                <div 
                  className="measure-line absolute left-0 h-[2px] bg-foreground top-1/2 -translate-y-1/2 origin-left will-change-transform shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                  style={{ width: '100%' }}
                />
                
                {/* Technical crosshairs/markers */}
                <div className="absolute left-0 w-[2px] h-full bg-foreground/20 top-0" />
                <div className="measure-line absolute right-0 w-[2px] h-full bg-accent top-0 origin-left transition-colors duration-300" style={{ width: '100%', background: 'none', borderRight: '2px solid var(--accent)' }} />
              </div>

              <div className="w-24 flex items-baseline justify-end gap-1 shrink-0">
                <span className="percent-num font-display text-3xl md:text-5xl tracking-tighter text-accent">
                  0
                </span>
                <span className="font-mono text-xs text-foreground/50 mb-1">%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
