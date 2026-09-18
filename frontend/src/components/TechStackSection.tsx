import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { id: '01', name: 'HTML', type: 'MARKUP', coord: 'X:10 Y:45' },
  { id: '02', name: 'CSS', type: 'STYLE', coord: 'X:45 Y:20' },
  { id: '03', name: 'JAVA', type: 'CORE', coord: 'X:80 Y:60' },
  { id: '04', name: 'C', type: 'SYSTEM', coord: 'X:30 Y:80' },
  { id: '05', name: 'RDBMS', type: 'DATA', coord: 'X:70 Y:30' },
];

export const TechStackSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${skills.length * 100}%`,
          pin: true,
          scrub: 1,
        }
      });

      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        
        const name = panel.querySelector('.skill-name');
        const id = panel.querySelector('.skill-id');
        const type = panel.querySelector('.skill-type');
        const coord = panel.querySelector('.skill-coord');
        const lines = panel.querySelectorAll('.tech-line');

        // Initial state for all but first panel
        if (i > 0) {
          gsap.set(panel, { autoAlpha: 0, scale: 0.8, rotateZ: i % 2 === 0 ? 5 : -5 });
        }

        // Animation for entering panel
        if (i > 0) {
          tl.to(panel, {
            autoAlpha: 1,
            scale: 1,
            rotateZ: 0,
            duration: 1,
            ease: 'power2.inOut'
          }, `label_${i}`);
          
          // Animate inner elements independently
          tl.fromTo(name, { y: 100, rotateX: 45 }, { y: 0, rotateX: 0, duration: 1, ease: 'power3.out' }, `label_${i}`);
          tl.fromTo(id, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, `label_${i}+=0.2`);
          tl.fromTo(type, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, `label_${i}+=0.2`);
          tl.fromTo(lines, { scaleX: 0 }, { scaleX: 1, duration: 0.8, stagger: 0.1 }, `label_${i}`);
        }

        // Animation for exiting panel (except the last one)
        if (i < skills.length - 1) {
          tl.to(panel, {
            autoAlpha: 0,
            scale: 1.2,
            y: -100,
            duration: 1,
            ease: 'power2.inOut'
          }, `label_${i + 1}`);
        }
        
        // Add subtle continuous movement to coordinates
        gsap.to(coord, {
          y: 'random(-10, 10)',
          x: 'random(-10, 10)',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-background text-foreground overflow-hidden flex items-center justify-center"
      data-cursor-type="tech"
    >
      
      {/* Global Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      {/* Global Static UI Elements */}
      <div className="absolute top-12 left-12 font-mono text-[10px] text-foreground/40 uppercase tracking-widest hidden md:block z-50">
        SYS.REQ. // V.3.1.4<br/>
        CALIBRATING_DATA_STREAM...<br/>
        STATUS: ONLINE
      </div>
      
      <div className="absolute bottom-12 right-12 font-mono text-[10px] text-foreground/40 uppercase tracking-widest text-right hidden md:block z-50">
        TECHNICAL<br/>
        ANALYSIS_MATRIX
      </div>

      {skills.map((skill, i) => (
        <div 
          key={skill.id}
          ref={el => panelsRef.current[i] = el}
          className="absolute inset-0 w-full h-full flex items-center justify-center p-6 md:p-24 will-change-transform transform-style-3d"
        >
          <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
            
            {/* Dynamic decorative lines per skill */}
            <div className={`tech-line absolute top-[20%] ${i % 2 === 0 ? 'left-0' : 'right-0'} w-[30%] h-[1px] bg-foreground/20 origin-${i % 2 === 0 ? 'left' : 'right'}`} />
            <div className={`tech-line absolute bottom-[20%] ${i % 2 === 0 ? 'right-0' : 'left-0'} w-[40%] h-[1px] bg-foreground/20 origin-${i % 2 === 0 ? 'right' : 'left'}`} />
            <div className="tech-line absolute left-[10%] top-0 w-[1px] h-[30%] bg-foreground/20 origin-top" />
            
            {/* Main Typographic Element */}
            <div className="relative z-10 flex flex-col items-center">
              <span className="skill-id font-mono text-xl md:text-2xl text-accent mb-4 tracking-widest">{skill.id}</span>
              
              <h2 className="skill-name font-display text-[15vw] md:text-[12vw] uppercase tracking-tighter leading-none text-foreground mix-blend-multiply relative">
                {skill.name}
                {/* Subtle duplicate for glitch/depth effect */}
                <span className="absolute inset-0 text-foreground/5 translate-x-2 translate-y-2 pointer-events-none">{skill.name}</span>
              </h2>
              
              <div className="skill-type font-sans text-sm md:text-lg font-bold tracking-[0.3em] uppercase text-foreground/60 mt-8 border-b border-foreground/20 pb-2 px-8">
                {skill.type}
              </div>
            </div>

            {/* Floating Technical Markers */}
            <div className="skill-coord absolute top-[15%] right-[15%] font-mono text-[10px] text-foreground/40 border border-foreground/10 p-2 hidden md:block">
              {skill.coord}<br/>
              FREQ: {100 + i * 15}HZ
            </div>
            
            {/* Abstract geometric shape based on index */}
            <div className={`absolute ${i % 2 === 0 ? 'left-[20%] bottom-[30%]' : 'right-[20%] top-[30%]'} opacity-10 pointer-events-none`}>
              {i % 3 === 0 && <div className="w-32 h-32 rounded-full border border-foreground" />}
              {i % 3 === 1 && <div className="w-32 h-32 border border-foreground rotate-45" />}
              {i % 3 === 2 && <div className="w-32 h-4 border-y border-foreground" />}
            </div>

          </div>
        </div>
      ))}
      
    </section>
  );
};
