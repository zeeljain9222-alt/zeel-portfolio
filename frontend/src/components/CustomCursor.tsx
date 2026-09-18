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

    // Smooth following with slight delay for natural movement
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
    if (cursorState === 'link') scale = 0.9;
    if (cursorState === 'project') scale = 1.15;
    if (cursorState === 'tech') scale = 1.05;

    gsap.to(cursor, { 
      scale: scale, 
      duration: 0.4, 
      ease: 'power3.out' 
    });
  }, [cursorState]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none flex items-center justify-center rounded-full"
      style={{ 
        width: '44px', 
        height: '44px', 
        zIndex: 99999,
        border: '1.5px solid hsl(var(--foreground) / 0.25)', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* Default Layer - Soft color / Lens */}
      <div 
        className="absolute inset-0 rounded-full backdrop-blur-[2px] transition-opacity duration-500"
        style={{ 
          backgroundColor: 'hsl(var(--foreground) / 0.03)',
          opacity: cursorState === 'default' ? 1 : 0 
        }} 
      />
      
      {/* Link Layer - Darker soft color */}
      <div 
        className="absolute inset-0 rounded-full backdrop-blur-[4px] transition-opacity duration-500"
        style={{ 
          backgroundColor: 'hsl(var(--foreground) / 0.12)',
          opacity: cursorState === 'link' ? 1 : 0 
        }} 
      />

      {/* Project Layer - Subtle accent color/texture */}
      <div 
        className="absolute inset-0 rounded-full backdrop-blur-[3px] transition-opacity duration-500"
        style={{ 
          backgroundColor: 'hsl(var(--accent) / 0.08)',
          backgroundImage: 'radial-gradient(circle at center, hsl(var(--accent) / 0.15) 0%, transparent 70%)',
          opacity: cursorState === 'project' ? 1 : 0 
        }} 
      />

      {/* Tech Layer - Technical grid texture */}
      <div 
        className="absolute inset-0 rounded-full backdrop-blur-[2px] transition-opacity duration-500"
        style={{ 
          backgroundColor: 'hsl(var(--foreground) / 0.04)',
          backgroundImage: 'linear-gradient(hsl(var(--foreground) / 0.12) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.12) 1px, transparent 1px)',
          backgroundSize: '6px 6px',
          backgroundPosition: 'center center',
          opacity: cursorState === 'tech' ? 1 : 0 
        }} 
      />
    </div>
  );
};
