import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ActHeader } from "./ActHeader";

gsap.registerPlugin(ScrollTrigger);

const PRACTICE = [
  { label: "Discipline", value: "Consistency over intensity — training and code follow the same rule." },
  { label: "Progression", value: "From first pull-up to muscle-ups; from first script to full-stack apps." },
  { label: "Recovery", value: "Rest, review, refactor. Growth happens between the reps." },
];

/**
 * TRAIN act — the calisthenics side, treated professionally:
 * a strength-training narrative expressed as engineering discipline.
 */
export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".train-block",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".train-grid", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".train-lead",
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".train-lead", start: "top 85%" },
        }
      );

      // layered drift for depth
      gsap.to(".train-drift", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="train" ref={sectionRef} className="relative w-full py-28 md:py-36">
      <ActHeader word="TRAIN" kicker="03 / About" sub="Calisthenics taught me what shipping taught me: small reps, daily." />

      <div className="mx-auto mt-16 max-w-[1500px] px-6 md:px-14">
        <p className="train-lead max-w-3xl font-display text-2xl font-bold leading-snug tracking-tight text-foreground md:text-4xl">
          I'm <span className="text-accent">Zeel</span> — a Computer Engineering student who treats
          software and strength training as the same craft: <span className="underline decoration-accent decoration-2 underline-offset-8">show up, load the bar, add one rep.</span>
        </p>

        <div className="train-grid mt-16 grid grid-cols-1 gap-px overflow-hidden border border-foreground/10 bg-foreground/10 md:grid-cols-3">
          {PRACTICE.map((p) => (
            <div key={p.label} className="train-block bg-background p-8 md:p-10">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  {p.label}
                </span>
              </div>
              <p className="mt-5 font-sans text-sm leading-relaxed text-foreground/80 md:text-[15px]">{p.value}</p>
            </div>
          ))}
        </div>

        {/* quiet signature stat line — drifts for depth */}
        <div className="train-drift mt-20 flex items-center justify-between border-t border-foreground/10 pt-6">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Code · Pull-ups · Projects
          </span>
          <span className="font-display text-lg font-black uppercase tracking-tight text-foreground/70 md:text-2xl">
            0.1% <span className="text-accent">daily</span>
          </span>
        </div>
      </div>
    </section>
  );
};
