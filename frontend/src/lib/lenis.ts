import type Lenis from "lenis";

/**
 * Shared handle to the app-wide Lenis instance so any component
 * can smooth-scroll to a section without prop drilling.
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function scrollToSection(target: string) {
  const el = document.querySelector(target);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
