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
      if (!panels.length || !containerRef.current) return;

      // Ensure all panels are correctly positioned absolutely
      gsap.set(panels, { zIndex: (i) => i });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${panels.length * 100}%`,
          pin: true,
          scrub: 1,
        }
      });

      panels.forEach((panel, i) => {
        if (i === 0) {
          // Panel 0 fades out slightly as Panel 1 comes in
          tl.to(panel, { opacity: 0.2, scale: 0.95, ease: 'none' }, 0);
          return;
        }

        const img = panel?.querySelector('.project-img');
        const content = panel?.querySelector('.project-meta');
        const num = panel?.querySelector('.project-num');

        // Different entrance animations for variety
        if (i === 1) {
          // Slide up from bottom
          tl.fromTo(panel, { yPercent: 100 }, { yPercent: 0, ease: 'none' }, '+=0');
          tl.fromTo(img, { scale: 1.5 }, { scale: 1, ease: 'power2.out' }, '<');
          tl.fromTo(content, { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, '<0.2');
        } else if (i === 2) {
          // Clip path reveal from center
          tl.fromTo(panel, 
            { clipPath: 'circle(0% at 50% 50%)' }, 
            { clipPath: 'circle(150% at 50% 50%)', ease: 'none' },
            '+=0'
          );
          tl.fromTo(num, { rotation: -45, scale: 0.5 }, { rotation: 0, scale: 1, ease: 'power2.out' }, '<');
        } else if (i === 3) {
          // Slide from right
          tl.fromTo(panel, { xPercent: 100 }, { xPercent: 0, ease: 'none' }, '+=0');
          tl.fromTo(img, { xPercent: -50 }, { xPercent: 0, ease: 'power2.out' }, '<');
        } else if (i === 4) {
          // Scale up from center
          tl.fromTo(panel, { scale: 0, opacity: 0, borderRadius: '100%' }, { scale: 1, opacity: 1, borderRadius: '0%', ease: 'none' }, '+=0');
          tl.fromTo(content, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power2.out' }, '<0.2');
        }

        // As the next panel comes in, fade out the current one
        if (i < panels.length - 1) {
          tl.to(panel, { opacity: 0.2, scale: 0.95, ease: 'none' }, '+=0');
        }
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
        >
          {/* Huge background number */}
          <div className="project-num absolute top-[-5vh] left-[-2vw] font-display text-[35vw] leading-none text-foreground/[0.03] pointer-events-none select-none">
            {project.num}
          </div>

          <div className="relative w-full max-w-7xl h-[75vh] flex flex-col md:flex-row items-center gap-12 z-10">
            
            {/* Project Image Placeholder */}
            <div 
              className="relative w-full md:w-2/3 h-full overflow-hidden bg-foreground/5 group cursor-none"
              data-cursor-type="project"
            >
              <div className="project-img absolute inset-0 w-full h-full bg-foreground/10 scale-110 transition-transform duration-1000 group-hover:scale-100 origin-center flex items-center justify-center">
                <span className="text-foreground/30 font-sans tracking-widest text-sm uppercase">Project Preview</span>
              </div>
              <div className="absolute inset-0 border border-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none m-4" />
            </div>

            {/* Project Details */}
            <div className="project-meta w-full md:w-1/3 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-accent font-sans font-bold text-sm tracking-widest">PROJECT {project.num}</span>
                <div className="h-[1px] w-12 bg-foreground/30" />
              </div>
              
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.9] mb-8 whitespace-pre-line">
                {project.title}
              </h2>
              
              <div className="flex flex-col gap-2 mb-8 border-l-2 border-accent pl-4">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-foreground/50">Technology</span>
                <span className="font-sans text-sm font-medium uppercase tracking-wider">{project.tech}</span>
              </div>

              <p className="font-sans text-sm leading-relaxed text-foreground/80 mb-12 max-w-sm uppercase tracking-wider">
                {project.desc}
              </p>

              <button data-cursor-type="link" className="self-start text-xs font-bold uppercase tracking-widest border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors">
                Explore Project &rarr;
              </button>
            </div>
            
          </div>
        </div>
      ))}
    </section>
  );
};
