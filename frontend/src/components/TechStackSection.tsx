import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ActHeader } from "./ActHeader";
import { velocitySkew } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const SKILL_ROWS = [
  { items: ["JAVA", "C", "PYTHON"], note: "Core languages" },
  { items: ["HTML", "CSS", "JAVASCRIPT"], note: "Web fundamentals" },
  { items: ["REACT", "TAILWIND", "AWS"], note: "Modern stack" },
  { items: ["SQL", "RDBMS", "OOP"], note: "Data & systems" },
];

/**
 * LEARN act: oversized kinetic type rows, each drifting horizontally
 * at a different rate and direction; skews with scroll velocity.
 */
export const TechStackSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Infinite drift per row (CSS-independent so scrub/velocity stay in sync)
      const rows = gsap.utils.toArray<HTMLElement>(".skill-track");
      rows.forEach((row, i) => {
        const direction = i % 2 === 0 ? -1 : 1;
        const distance = row.scrollWidth / 2; // track holds content duplicated once
        if (reduced) return;

        gsap.fromTo(
          row,
          { x: direction > 0 ? -distance : 0 },
          {
            x: direction > 0 ? 0 : -distance,
            duration: 26 + i * 6,
            ease: "none",
            repeat: -1,
            modifiers: {
              x: (x) => `${parseFloat(x) % distance}px`,
            },
          }
        );

        // Scroll-linked boost: rows shift with scroll for depth
        gsap.to(row, {
          xPercent: direction * 6,
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });

      // Row entrance: clip-reveal from center outward
      gsap.utils.toArray<HTMLElement>(".skill-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, scaleX: 0.85 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 88%" },
            delay: i * 0.04,
          }
        );
      });

      if (!reduced) {
        const word = containerRef.current?.querySelector<HTMLElement>(".act-word");
        if (word) velocitySkew(word, 5);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="learn" ref={containerRef} className="relative w-full overflow-hidden py-28 md:py-36">
      <ActHeader
        word="LEARN"
        kicker="02 / Skills"
        sub="Tools I think in — sharpened course by course, project by project."
        tone="accent"
        bleed={false}
      />

      <div className="mt-16 space-y-10 md:mt-20 md:space-y-14">
        {SKILL_ROWS.map((row) => (
          <div key={row.note} className="skill-row relative">
            <div className="skill-track flex w-max items-baseline gap-10 whitespace-nowrap will-change-transform md:gap-16">
              {[...row.items, ...row.items].map((item, i) => (
                <span key={`${item}-${i}`} className="flex items-baseline gap-10 md:gap-16">
                  <span
                    className={`font-black-display text-[clamp(2.6rem,7vw,6.5rem)] uppercase leading-none ${
                      i % 2 === 0 ? "text-foreground" : "text-foreground/25"
                    }`}
                  >
                    {item}
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
                </span>
              ))}
            </div>
            <span className="absolute -top-5 left-6 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground md:left-14">
              {row.note}
            </span>
          </div>
        ))}
      </div>

      {/* learning-now strip */}
      <div className="mx-auto mt-20 flex max-w-[1500px] items-center gap-5 px-6 md:px-14">
        <span className="hairline w-16 shrink-0" />
        <p className="font-sans text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Currently learning — <span className="font-semibold text-foreground">Node.js · System Design · DSA in Java</span>
        </p>
      </div>
    </section>
  );
};
