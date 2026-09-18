import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<'default' | 'link' | 'project' | 'tech'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.3, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.3, ease: 'power3' });

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

  // Handle GSAP animations for cursor state changes
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (cursorState === 'default') {
      gsap.to(cursor, { width: 32, height: 32, backgroundColor: 'transparent', border: '1px solid var(--foreground)', duration: 0.4, ease: 'back.out(1.5)' });
    } else if (cursorState === 'link') {
      gsap.to(cursor, { width: 48, height: 48, backgroundColor: 'var(--foreground)', border: 'none', duration: 0.4, ease: 'back.out(1.5)' });
    } else if (cursorState === 'project') {
      gsap.to(cursor, { width: 80, height: 80, backgroundColor: 'var(--foreground)', border: 'none', duration: 0.4, ease: 'back.out(1.5)' });
    } else if (cursorState === 'tech') {
      gsap.to(cursor, { width: 56, height: 56, backgroundColor: 'transparent', border: '1px dashed var(--accent)', duration: 0.4, ease: 'back.out(1.5)' });
    }
  }, [cursorState]);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 overflow-hidden mix-blend-difference ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transformOrigin: 'center center', width: 32, height: 32, border: '1px solid var(--foreground)', borderRadius: '50%' }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Default State */}
        <div className={`absolute w-1.5 h-1.5 bg-accent rounded-full transition-all duration-300 ${cursorState === 'default' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
        
        {/* Link State */}
        <div className={`absolute transition-all duration-300 flex items-center justify-center text-background ${cursorState === 'link' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>

        {/* Project State */}
        <div className={`absolute transition-all duration-300 text-background font-sans text-[10px] font-bold tracking-widest uppercase ${cursorState === 'project' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
          View
        </div>

        {/* Tech State */}
        <div className={`absolute transition-all duration-300 text-accent ${cursorState === 'tech' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line></svg>
        </div>
      </div>
    </div>
  );
};
