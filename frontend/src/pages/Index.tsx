import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";
import { Cursor } from "@/components/Cursor";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TechStackSection } from "@/components/TechStackSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

export default function Index() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    setLenis(lenis);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // keep ScrollTriggers in sync with Lenis-driven scroll
    if (!reduced) {
      lenis.on("scroll", () => window.dispatchEvent(new Event("lenis-scroll")));
    }

    return () => {
      cancelAnimationFrame(rafId);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="paper-grid" aria-hidden="true" />
      <Cursor />

      <main className="relative z-10 block w-full">
        <HeroSection />
        <ProjectsSection />
        <TechStackSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
}
