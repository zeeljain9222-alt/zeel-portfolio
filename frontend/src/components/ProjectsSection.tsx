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
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track || !containerRef.current) return;

      const totalProjects = projects.length;

      // Horizontal Scroll Animation
      const scrollTween = gsap.to(track, {
        xPercent: -100 + (100 / totalProjects),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: `+=${totalProjects * 100}%`,
        }
      });

      // Parallax effects inside each project
      const panels = gsap.utils.toArray('.project-panel');
      panels.forEach((panel: any) => {
        const img = panel.querySelector('.project-img-inner');
        const title = panel.querySelector('.project-title');
        const num = panel.querySelector('.project-num');

        // Image parallax (moves opposite to scroll direction)
        if (img) {
          gsap.fromTo(img, 
            { x: '-15vw', scale: 1.2 }, 
            { x: '15vw', scale: 1, ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left right',
                end: 'right left',
                scrub: true
              }
            }
          );
        }

        // Title parallax
        if (title) {
          gsap.fromTo(title,
            { x: '10vw' },
            { x: '-10vw', ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left right',
                end: 'right left',
                scrub: true
              }
            }
          );
        }
        
        // Number parallax
        if (num) {
          gsap.fromTo(num,
            { x: '5vw', y: '10vh' },
            { x: '-5vw', y: '-10vh', ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left right',
                end: 'right left',
                scrub: true
              }
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-20 w-full h-screen overflow-hidden bg-background">
      
      {/* Horizontal Track */}
      <div 
        ref={trackRef} 
        className="flex h-full will-change-transform"
        style={{ width: `${projects.length * 100}vw` }}
      >
        {projects.map((project) => (
          <div 
            key={project.num}
            className="project-panel relative w-screen h-full flex items-center justify-center p-6 md:p-12"
          >
            {/* Background number */}
            <div className="project-num absolute top-[10vh] left-[5vw] font-display text-[25vw] leading-none text-foreground/[0.03] pointer-events-none select-none z-0">
              {project.num}
            </div>

            <div className="relative w-full max-w-7xl h-[75vh] flex flex-col md:flex-row items-center gap-12 z-10">
              
              {/* Project Image Placeholder */}
              <div 
                className="relative w-full md:w-[60%] h-full overflow-hidden bg-foreground/5 cursor-none"
                data-cursor-type="project"
              >
                <div className="project-img-inner absolute -inset-x-24 inset-y-0 bg-foreground/10 flex items-center justify-center will-change-transform">
                  <span className="text-foreground/30 font-sans tracking-widest text-sm uppercase">Project Preview</span>
                </div>
              </div>

              {/* Project Details */}
              <div className="w-full md:w-[40%] flex flex-col justify-center shrink-0">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-accent font-sans font-bold text-sm tracking-widest">PROJECT {project.num}</span>
                  <div className="h-[1px] w-12 bg-foreground/20" />
                </div>
                
                <h2 className="project-title font-display text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.9] mb-8 whitespace-pre-line will-change-transform">
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
      </div>
    </section>
  );
};
