import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Attach a scroll-velocity skew to an element (single quickTo tween).
 * Returns a cleanup function.
 */
export function velocitySkew(el: HTMLElement, max = 6) {
  if (prefersReducedMotion()) return () => {};

  const proxy = { skew: 0 };
  const skewTo = gsap.quickTo(el, "skewY", { duration: 0.5, ease: "power3" });
  const clampSkew = gsap.utils.clamp(-max, max);

  const onUpdate = (self: ScrollTrigger) => {
    const skew = clampSkew(self.getVelocity() / -350);
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, {
        skew: 0,
        duration: 0.7,
        ease: "power3",
        overwrite: true,
        onUpdate: () => skewTo(proxy.skew),
      });
    }
  };

  const st = ScrollTrigger.create({ onUpdate });
  return () => st.kill();
}

/** Parallax: move an element at a fraction of scroll speed. Returns cleanup. */
export function parallax(el: HTMLElement, amount = 80) {
  if (prefersReducedMotion()) return () => {};
  const tween = gsap.fromTo(
    el,
    { yPercent: -amount / 10 },
    {
      yPercent: amount / 10,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
    }
  );
  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

/** Cursor-responsive magnetic pull. Returns cleanup. */
export function magnetic(el: HTMLElement, strength = 0.25) {
  if (prefersReducedMotion()) return () => {};

  const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "elastic.out(1, 0.4)" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "elastic.out(1, 0.4)" });

  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
    yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const onLeave = () => {
    xTo(0);
    yTo(0);
  };

  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", onLeave);
  return () => {
    el.removeEventListener("mousemove", onMove);
    el.removeEventListener("mouseleave", onLeave);
  };
}
