import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: '01',
    title: 'AWS Weather\nIntelligence',
    tech: 'React / AWS / Data Viz',
    desc: 'Dashboard for weather-station monitoring and anomaly detection.',
  },
  {
    num: '02',
    title: 'Calisthenics\nAcademy',
    tech: 'Fullstack / Database',
    desc: 'Website with trial booking, backend, database and admin functionality.',
  },
  {
    num: '03',
    title: 'Student\nManagement',
    tech: 'Java / OOP',
    desc: 'Java system utilizing ArrayList and Exception Handling.',
  },
  {
    num: '04',
    title: 'NGO\nWebsite',
    tech: 'HTML / CSS / JS',
    desc: 'Informational platform for a non-profit organization.',
  },
  {
    num: '05',
    title: 'CODEZ',
    tech: 'Creative Frontend',
    desc: 'Creative frontend experiments and web concepts.',
  }
];

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current;
      if (!panels.length) return;

      // Pin the main container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${panels.length * 100}%`,
          pin: true,
          scrub: 1,
        }
      });

      // Cinematic transitions for each panel
      panels.forEach((panel, i) => {
        if (i === 0) return; // First panel is already visible

        const img = panel?.querySelector('.project-img');
        const title = panel?.querySelector('.project-title');
        const num = panel?.querySelector('.project-num');
        const meta = panel?.querySelector('.project-meta');

        // Different entry animations based on index to make it feel experimental
        if (i % 3 === 1) {
          // Slide up from bottom with scale
          tl.fromTo(panel, 
            { yPercent: 100, scale: 0.8 }, 
            { yPercent: 0, scale: 1, ease: 'power2.inOut' }
          );
        } else if (i % 3 === 2) {
          // Clip path reveal from center
          tl.fromTo(panel, 
            { clipPath: 'circle(0% at 50% 50%)' }, 
            { clipPath: 'circle(150% at 50% 50%)', ease: 'power2.inOut' }
          );
        } else {
          // Slide from right with rotation
          tl.fromTo(panel, 
            { xPercent: 100, rotation: 5 }, 
            { xPercent: 0, rotation: 0, ease: 'power2.inOut' }
          );
        }

        // Inner parallax animations for content
        tl.fromTo(img, { scale: 1.5 }, { scale: 1, ease: 'power2.out' }, '<');
        tl.fromTo(title, { x: 100, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, '<0.2');
        tl.fromTo(num, { y: -100, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, '<0.1');
        tl.fromTo(meta, { opacity: 0 }, { opacity: 1, ease: 'power2.out' }, '<0.3');
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-background">
      {projects.map((project, i) => (
        <div 
          key={project.num}
          ref={el => panelsRef.current[i] = el}
          className="absolute inset-0 w-full h-full flex items-center justify-center p-6 md:p-12 bg-background will-change-transform"
          style={{ zIndex: i }}
        >
          {/* Huge background number */}
          <div className="project-num absolute top-[-10vh] left-[-5vw] font-display text-[40vw] leading-none text-foreground/5 pointer-events-none select-none">
            {project.num}
          </div>

          <div className="relative w-full max-w-7xl h-[70vh] flex flex-col md:flex-row items-center gap-12 z-10">
            
            {/* Project Image Placeholder */}
            <div 
              className="relative w-full md:w-2/3 h-full overflow-hidden bg-foreground/10 group cursor-none"
              data-cursor-text="VIEW PROJECT &rarr;"
            >
              <div className="project-img absolute inset-0 w-full h-full bg-foreground/5 scale-110 transition-transform duration-1000 group-hover:scale-100 origin-center flex items-center justify-center">
                <span className="text-foreground/20 font-sans tracking-widest text-sm uppercase">Placeholder Image</span>
              </div>
              {/* Animated borders */}
              <div className="absolute inset-0 border border-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none m-4" />
            </div>

            {/* Project Details */}
            <div className="project-meta w-full md:w-1/3 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-accent font-sans font-bold text-sm tracking-widest">PROJECT {project.num}</span>
                <div className="h-[1px] w-12 bg-foreground/30" />
              </div>
              
              <h2 className="project-title font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] mb-8 whitespace-pre-line">
                {project.title}
              </h2>
              
              <div className="flex flex-col gap-2 mb-8">
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-foreground/50">Technology</span>
                <span className="font-sans text-sm font-medium uppercase tracking-wider">{project.tech}</span>
              </div>

              <p className="font-sans text-sm leading-relaxed text-foreground/80 mb-12 max-w-sm uppercase tracking-wider">
                {project.desc}
              </p>

              <button className="self-start text-xs font-bold uppercase tracking-widest border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors">
                View Project &rarr;
              </button>
            </div>
            
          </div>
        </div>
      ))}
    </section>
  );
};
