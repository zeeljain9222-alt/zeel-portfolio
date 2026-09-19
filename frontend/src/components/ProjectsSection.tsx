import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ActHeader } from "./ActHeader";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: "01",
    title: "AWS Weather Intelligence",
    tech: "React / AWS / Data Viz",
    desc: "Dashboard for weather-station monitoring and anomaly detection.",
  },
  {
    num: "02",
    title: "Calisthenics Academy",
    tech: "Fullstack / Database",
    desc: "Website with trial booking, backend, database and admin functionality.",
  },
  {
    num: "03",
    title: "Student Management",
    tech: "Java / OOP",
    desc: "Java system utilizing ArrayList and Exception Handling.",
  },
  {
    num: "04",
    title: "NGO Website",
    tech: "HTML / CSS / JS",
    desc: "Informational platform for a non-profit organization.",
  },
  {
    num: "05",
    title: "CODEZ",
    tech: "Creative Frontend",
    desc: "Creative frontend experiments and web concepts.",
  },
];

/** Subtle 3D tilt that follows the cursor across a card. */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
    gsap.set(el, { transformPerspective: 900 });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      ry(px * 8);
      rx(py * -8);
    };
    const onLeave = () => {
      rx(0);
      ry(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return ref;
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const tiltRef = useTilt();

  return (
    <div ref={tiltRef} className="tilt-card" data-cursor="active">
      <article className="tilt-inner group relative flex h-full flex-col border border-foreground/10 bg-card p-7 transition-colors duration-300 hover:border-accent/50 md:p-8">
        <div className="flex items-start justify-between">
          <span className="font-display text-4xl font-black text-foreground/10 transition-colors duration-300 group-hover:text-accent/30 md:text-5xl">
            {project.num}
          </span>
          <span className="mt-2 h-2 w-2 rounded-full bg-accent/0 ring-1 ring-foreground/20 transition-all duration-300 group-hover:bg-accent group-hover:ring-accent" />
        </div>

        <h3 className="mt-6 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-foreground md:text-[1.7rem]">
          {project.title}
        </h3>

        <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-muted-foreground">{project.desc}</p>

        <div className="mt-8 flex items-center justify-between border-t border-foreground/10 pt-4">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {project.tech}
          </span>
          <span className="translate-x-0 font-sans text-sm text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            ↗
          </span>
        </div>
      </article>
    </div>
  );
}

export const ProjectsSection = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 70, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 78%" },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="build" className="relative w-full pb-28 pt-4 md:pb-36">
      <ActHeader word="BUILD" kicker="01 / Projects" sub="Selected work — shipped, in progress, and always iterating." />

      <div ref={gridRef} className="mx-auto mt-14 max-w-[1500px] px-6 md:px-14" style={{ perspective: "1200px" }}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <div
              key={p.num}
              className={`project-card ${i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-1" : ""}`}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
