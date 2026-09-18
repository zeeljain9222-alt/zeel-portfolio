import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<'default' | 'link' | 'project' | 'tech'>('default');

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Initialize cursor at the center of the screen so it's immediately visible
    gsap.set(cursor, { 
      xPercent: -50, 
      yPercent: -50, 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2 
    });

    // Smooth following with slight delay for premium feel
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onHoverEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('[data-cursor-type="project"]')) {
        setCursorState('project');
      } else if (target.closest('[data-cursor-type="tech"]')) {
        setCursorState('tech');
      } else if (target.closest('a, button, [data-cursor-type="link"]')) {
        setCursorState('link');
      }
    };

    const onHoverLeave = () => {
      setCursorState('default');
    };

    window.addEventListener('mousemove', onMouseMove);

    const attachListeners = () => {
      const interactives = document.querySelectorAll('a, button, [data-cursor-type]');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', onHoverEnter as EventListener);
        el.addEventListener('mouseleave', onHoverLeave);
      });
    };

    attachListeners();

    const observer = new MutationObserver(() => {
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      const interactives = document.querySelectorAll('a, button, [data-cursor-type]');
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onHoverEnter as EventListener);
        el.removeEventListener('mouseleave', onHoverLeave);
      });
      observer.disconnect();
    };
  }, []);

  // Scale effect based on state
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let scale = 1;
    if (cursorState === 'link') scale = 1.1;
    if (cursorState === 'project') scale = 1.3;
    if (cursorState === 'tech') scale = 1.15;

    gsap.to(cursor, { 
      scale: scale, 
      duration: 0.4, 
      ease: 'power3.out' 
    });
  }, [cursorState]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none flex items-center justify-center rounded-full bg-foreground text-background"
      style={{ 
        width: '70px', 
        height: '70px', 
        zIndex: 99999,
        border: '1px solid rgba(255, 255, 255, 0.1)', // subtle border for visibility against dark backgrounds
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' // subtle shadow
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Default State - Hero */}
        <div className={`absolute transition-all duration-300 ease-out flex items-center justify-center ${cursorState === 'default' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <span className="text-xl">✦</span>
        </div>
        
        {/* Link State - Arrow */}
        <div className={`absolute transition-all duration-300 ease-out flex items-center justify-center ${cursorState === 'link' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <span className="text-2xl font-bold">↗</span>
        </div>

        {/* Project State - VIEW Label */}
        <div className={`absolute transition-all duration-300 ease-out flex items-center justify-center ${cursorState === 'project' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase mt-[1px]">View</span>
        </div>

        {/* Tech State - Tech Symbol */}
        <div className={`absolute transition-all duration-300 ease-out flex items-center justify-center ${cursorState === 'tech' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <span className="font-mono text-sm font-bold tracking-widest">01</span>
        </div>
        
      </div>
    </div>
  );
};
