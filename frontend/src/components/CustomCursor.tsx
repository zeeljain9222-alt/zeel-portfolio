import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const text = textRef.current;
    if (!cursor || !text) return;

    // QuickTo for smooth tracking
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3' });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onHoverEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorText = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
      
      if (cursorText) {
        text.innerHTML = cursorText;
        gsap.to(cursor, {
          scale: 4,
          backgroundColor: 'var(--foreground)',
          color: 'var(--background)',
          mixBlendMode: 'normal',
          duration: 0.4,
          ease: 'back.out(1.5)'
        });
        gsap.to(text, { opacity: 1, scale: 0.25, duration: 0.3 }); // scale text down to counteract cursor scale
      } else {
        gsap.to(cursor, {
          scale: 2,
          backgroundColor: 'transparent',
          border: '1px solid var(--foreground)',
          duration: 0.4,
          ease: 'back.out(1.5)'
        });
      }
    };

    const onHoverLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'var(--foreground)',
        border: 'none',
        mixBlendMode: 'difference',
        duration: 0.4,
        ease: 'power3.out'
      });
      gsap.to(text, { opacity: 0, duration: 0.2 });
      text.innerHTML = '';
    };

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    // Attach to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor], [data-cursor-text]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onHoverEnter as EventListener);
      el.addEventListener('mouseleave', onHoverLeave);
    });

    // Observer for dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const el = node as HTMLElement;
            const interactives = el.querySelectorAll?.('a, button, [data-cursor], [data-cursor-text]');
            interactives?.forEach(intEl => {
              intEl.addEventListener('mouseenter', onHoverEnter as EventListener);
              intEl.addEventListener('mouseleave', onHoverLeave);
            });
            if (el.matches?.('a, button, [data-cursor], [data-cursor-text]')) {
              el.addEventListener('mouseenter', onHoverEnter as EventListener);
              el.addEventListener('mouseleave', onHoverLeave);
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onHoverEnter as EventListener);
        el.removeEventListener('mouseleave', onHoverLeave);
      });
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-4 h-4 bg-foreground rounded-full pointer-events-none z-[9999] flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transformOrigin: 'center center' }}
    >
      <div 
        ref={textRef} 
        className="opacity-0 font-sans text-[8px] font-bold tracking-widest text-background whitespace-nowrap text-center uppercase"
      />
    </div>
  );
};
