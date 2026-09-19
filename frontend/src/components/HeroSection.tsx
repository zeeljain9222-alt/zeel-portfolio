import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToSection } from "@/lib/lenis";
import { magnetic } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: "Work", target: "#build" },
  { label: "Skills", target: "#learn" },
  { label: "About", target: "#train" },
  { label: "Contact", target: "#contact" },
];

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const zeel = "ZEEL".split("");
  const jain = "JAIN".split("");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Entrance choreography
      const entrance = gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".hero-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "expo.out" }, 0.1)
        .fromTo(
          ".hero-letter",
          { yPercent: 118, rotate: 5 },
          { yPercent: 0, rotate: 0, duration: 1.15, stagger: 0.055, ease: "power4.out" },
          0.25
        )
        .fromTo(".hero-fade", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 }, 0.9)
        .fromTo(".hero-portrait", { opacity: 0, y: 46, scale: 0.985 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, 0.7);

      // Scroll-driven parallax depth. Starts paused and only plays once the
      // entrance finishes, so the scrub tween never fights the entrance tween.
      const scrub = gsap.timeline({
        paused: true,
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      scrub
        .to(".hero-body", { y: -60, opacity: 0.25, ease: "none" }, 0)
        .to(".hero-portrait", { y: 90, ease: "none" }, 0)
        .to(".hero-letter", { yPercent: -30, ease: "none" }, 0);
      entrance.eventCallback("onComplete", () => scrub.play());

      // Subtle cursor-responsive depth on the name
      const name = containerRef.current?.querySelector<HTMLElement>(".hero-name");
      if (name) {
        const rx = gsap.quickTo(name, "rotationY", { duration: 1.2, ease: "power3" });
        const ry = gsap.quickTo(name, "rotationX", { duration: 1.2, ease: "power3" });
        const onMove = (e: MouseEvent) => {
          rx((e.clientX / window.innerWidth - 0.5) * 6);
          ry((e.clientY / window.innerHeight - 0.5) * -4);
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // magnetic pull on CTAs
  useEffect(() => {
    const els = containerRef.current?.querySelectorAll<HTMLElement>("[data-magnetic]") ?? [];
    const cleanups = Array.from(els).map((el) => magnetic(el, 0.3));
    return () => cleanups.forEach((fn) => fn());
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    scrollToSection(target);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden px-6 md:px-14"
    >
      {/* top bar */}
      <header className="relative z-20 flex items-center justify-between pt-6 md:pt-8">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="font-display text-sm font-bold tracking-tight text-foreground"
          aria-label="Zeel Jain — home"
        >
          ZJ<span className="text-accent">.</span>
        </a>
        <nav className="flex items-center gap-6 md:gap-10">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.target}
              onClick={(e) => handleNavClick(e, item.target)}
              className="group relative font-sans text-xs font-medium tracking-[0.12em] text-foreground/70 transition-colors hover:text-foreground"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
      </header>

      {/* name + identity */}
      <div className="relative z-10 mt-16 flex flex-1 flex-col justify-center md:mt-0">
        <p className="hero-fade mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-accent md:mb-6">
          Portfolio — 2026
        </p>

        <h1
          className="hero-name select-none"
          style={{ perspective: "900px" }}
          aria-label="Zeel Jain"
        >
          <span aria-hidden="true" className="block overflow-hidden">
            {zeel.map((ch, i) => (
              <span
                key={`z-${i}`}
                className="hero-letter inline-block font-black-display text-[clamp(4.5rem,17vw,15rem)] leading-[0.86] text-foreground will-change-transform"
              >
                {ch}
              </span>
            ))}
          </span>
          <span aria-hidden="true" className="block overflow-hidden md:pl-[8%]">
            {jain.map((ch, i) => (
              <span
                key={`j-${i}`}
                className={`hero-letter inline-block font-black-display text-[clamp(4.5rem,17vw,15rem)] leading-[0.86] will-change-transform ${
                  i >= 1 ? "text-accent" : "text-foreground"
                }`}
              >
                {ch}
              </span>
            ))}
          </span>
        </h1>

        <div className="hero-body mt-8 md:mt-10">
          <div className="hero-rule hairline mb-6 w-full max-w-xl origin-left" />
          <p className="hero-fade font-display text-base font-semibold uppercase tracking-[0.18em] text-foreground md:text-lg">
            Computer Engineering Student
            <span className="mx-3 text-accent">•</span>
            Developer
            <span className="mx-3 text-accent">•</span>
            Calisthenics Athlete
          </p>
          <p className="hero-fade mt-3 max-w-md font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
            Building cool things, solving problems, and trying to improve 0.1% daily — in code and in training.
          </p>

          <div className="hero-fade mt-9 flex flex-wrap items-center gap-5">
            <a
              data-magnetic
              href="#build"
              onClick={(e) => handleNavClick(e, "#build")}
              className="group inline-flex items-center gap-3 bg-foreground px-8 py-4 font-sans text-sm font-semibold tracking-wide text-background transition-colors duration-300 hover:bg-accent"
            >
              View Projects
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </a>
            <a
              data-magnetic
              href="#train"
              onClick={(e) => handleNavClick(e, "#train")}
              className="group relative font-sans text-sm font-semibold tracking-wide text-foreground"
            >
              About Me
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-full origin-right scale-x-0 bg-accent transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
            </a>
          </div>
        </div>
      </div>

      {/* portrait — single clean professional photo area */}
      <div className="relative z-0 pointer-events-none">
        <div
          className="hero-portrait absolute bottom-0 right-0 hidden aspect-[4/5] w-[300px] items-end justify-center overflow-hidden border border-foreground/10 bg-secondary/60 md:flex lg:w-[340px]"
          style={{ transform: "translateY(12%)" }}
          data-cursor="active"
        >
          <div className="flex flex-col items-center gap-3 pb-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/25">
              <span className="font-display text-sm font-bold text-foreground/60">ZJ</span>
            </span>
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Portrait
            </span>
          </div>
        </div>
      </div>

      {/* bottom meta strip */}
      <div className="relative z-10 flex items-center justify-between py-6 font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
        <span className="hero-fade">Mumbai, India</span>
        <span className="hero-fade hidden md:inline">CS Eng — Internship Ready</span>
        <span className="hero-fade">Scroll ↓</span>
      </div>
    </section>
  );
};
