import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { velocitySkew } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

interface ActHeaderProps {
  /** e.g. "BUILD" */
  word: string;
  /** small label, e.g. "01 / Projects" */
  kicker: string;
  /** short supporting line */
  sub?: string;
  /** visually distinct word treatment */
  tone?: "ink" | "accent";
  /** let the word bleed off the right edge for editorial rhythm */
  bleed?: boolean;
}

/**
 * Act divider: enormous display word pinned visually to the act,
 * letters rise with stagger, whole word skews with scroll velocity.
 */
export function ActHeader({ word, kicker, sub, tone = "ink", bleed = true }: ActHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // velocitySkew no-ops under prefers-reduced-motion
      if (wordRef.current) velocitySkew(wordRef.current, 4);

      gsap.fromTo(
        ".act-char",
        { yPercent: 110, rotate: 4 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".act-meta",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        ".act-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative select-none px-6 pt-24 md:px-14 md:pt-32">
      <div className="act-rule hairline w-full origin-left" />
      <div className="mx-auto flex max-w-[1500px] items-baseline justify-between gap-6 pt-4">
        <span className="act-meta font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
          {kicker}
        </span>
        {sub && (
          <span className="act-meta hidden max-w-xs text-right font-sans text-xs leading-relaxed text-muted-foreground md:block">
            {sub}
          </span>
        )}
      </div>
      <div
        ref={wordRef}
        className={`act-word mt-2 flex overflow-hidden text-[clamp(4rem,16vw,15rem)] ${
          bleed ? "justify-start" : "justify-center"
        }`}
        aria-hidden="true"
      >
        {word.split("").map((ch, i) => (
          <span
            key={`${ch}-${i}`}
            className={`act-char inline-block will-change-transform ${
              tone === "accent" && i === 0 ? "text-accent" : "text-foreground"
            }`}
          >
            {ch}
          </span>
        ))}
      </div>
      <span className="sr-only">{word}</span>
    </div>
  );
}
