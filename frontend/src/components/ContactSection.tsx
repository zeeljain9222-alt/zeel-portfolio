import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ActHeader } from "./ActHeader";
import { magnetic } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * REPEAT act — closing line and transition into contact.
 * Ends the journey on the loop: BUILD → LEARN → TRAIN → REPEAT.
 */
export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The loop strip letters cascade in
      gsap.fromTo(
        ".loop-step",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".loop-strip", start: "top 85%" },
        }
      );

      // Giant closing statement rises with slight rotation for depth
      gsap.fromTo(
        ".close-line",
        { opacity: 0, y: 90, rotateX: 14 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".close-line", start: "top 85%" },
        }
      );

      // dotted progress line draws across
      gsap.fromTo(
        ".loop-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: ".loop-strip", start: "top 88%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = sectionRef.current?.querySelector<HTMLElement>("[data-magnetic]");
    if (!el) return;
    return magnetic(el, 0.35);
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative w-full pb-24 pt-20 md:pb-32">
      <ActHeader
        word="REPEAT"
        kicker="04 / Contact"
        sub="The loop never ends — neither does the work."
        tone="accent"
        bleed={false}
      />

      <div className="mx-auto mt-20 max-w-[1500px] px-6 md:mt-28 md:px-14" style={{ perspective: "900px" }}>
        {/* loop strip */}
        <div className="loop-strip flex items-center justify-between">
          {["BUILD", "LEARN", "TRAIN", "REPEAT"].map((step, i) => (
            <div key={step} className="loop-step flex items-center gap-4 md:gap-6">
              <span
                className={`font-display text-xs font-black uppercase tracking-[0.2em] md:text-sm ${
                  i === 3 ? "text-accent" : "text-foreground/50"
                }`}
              >
                {step}
              </span>
              {i < 3 && <span className="hidden font-sans text-muted-foreground md:inline">→</span>}
            </div>
          ))}
        </div>
        <div className="loop-rule hairline mt-4 w-full origin-left" />

        {/* closing statement + CTA */}
        <div className="mt-20 flex flex-col items-start gap-12 md:mt-28 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="close-line font-black-display text-[clamp(2.2rem,6vw,5.5rem)] uppercase leading-[1.02] tracking-tight text-foreground">
              Trying to improve
              <br />
              <span className="text-accent">0.1% daily.</span>
            </p>
            <p className="close-line mt-6 max-w-md font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
              Looking for internships and collaborations where good work ships fast. If that sounds like your team — let's talk.
            </p>
          </div>

          <div className="flex flex-col items-start gap-8 md:items-end">
            <a
              data-magnetic
              data-cursor="active"
              href="mailto:hello@example.com"
              className="group inline-flex h-32 w-32 items-center justify-center rounded-full border border-foreground/20 bg-card text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground md:h-40 md:w-40"
            >
              Email
              <span className="sr-only">Zeel Jain</span>
            </a>
            <div className="flex gap-7 font-sans text-xs font-semibold uppercase tracking-[0.18em]">
              <a href="https://github.com" className="text-muted-foreground transition-colors hover:text-accent">
                GitHub
              </a>
              <a href="https://linkedin.com" className="text-muted-foreground transition-colors hover:text-accent">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-foreground/10 pt-6 font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          <span>© 2026 Zeel Jain</span>
          <span>Back to top ↑</span>
        </div>
      </div>
    </section>
  );
};
