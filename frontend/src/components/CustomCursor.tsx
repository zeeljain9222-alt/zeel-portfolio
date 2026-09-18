import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<'default' | 'link' | 'project' | 'tech'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Smooth following with slightly more delay for premium feel
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.3, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.3, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

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
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

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
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      observer.disconnect();
    };
  }, [isVisible]);

  // Handle GSAP animations for cursor state changes (size and styling)
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (cursorState === 'default') {
      gsap.to(cursor, { width: 64, height: 64, backgroundColor: 'transparent', border: '2px solid var(--foreground)', duration: 0.4, ease: 'power3.out' });
    } else if (cursorState === 'link') {
      gsap.to(cursor, { width: 80, height: 80, backgroundColor: 'var(--foreground)', border: 'none', duration: 0.4, ease: 'power3.out' });
    } else if (cursorState === 'project') {
      gsap.to(cursor, { width: 100, height: 100, backgroundColor: 'var(--foreground)', border: 'none', duration: 0.4, ease: 'power3.out' });
    } else if (cursorState === 'tech') {
      gsap.to(cursor, { width: 80, height: 80, backgroundColor: 'transparent', border: '2px dashed var(--accent)', duration: 0.4, ease: 'power3.out' });
    }
  }, [cursorState]);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 overflow-hidden mix-blend-difference ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transformOrigin: 'center center', width: 64, height: 64, border: '2px solid var(--foreground)', borderRadius: '50%' }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Default State - Clear dot */}
        <div className={`absolute inset-0 transition-opacity duration-400 flex items-center justify-center ${cursorState === 'default' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="w-2 h-2 bg-foreground rounded-full" />
        </div>
        
        {/* Link State - Arrow */}
        <div className={`absolute inset-0 transition-all duration-400 flex items-center justify-center text-background ${cursorState === 'link' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-rotate-45"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>

        {/* Project State - VIEW Label */}
        <div className={`absolute inset-0 transition-all duration-400 flex flex-col items-center justify-center text-background ${cursorState === 'project' ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase">View</span>
        </div>

        {/* Tech State - Tech Symbol Lens */}
        <div className={`absolute inset-0 transition-all duration-400 flex items-center justify-center text-accent ${cursorState === 'tech' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
        </div>
        
      </div>
    </div>
  );
};
