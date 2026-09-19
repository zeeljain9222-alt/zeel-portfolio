import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ActHeader } from "@/components/ActHeader";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TechStackSection } from "@/components/TechStackSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

// GSAP ScrollTrigger measures layout; stub it in jsdom
vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    create: vi.fn(() => ({ kill: vi.fn() })),
    getAll: vi.fn(() => []),
    refresh: vi.fn(),
  },
}));

describe("ActHeader", () => {
  it("renders the act word visually and for screen readers", () => {
    render(<ActHeader word="BUILD" kicker="01 / Projects" />);
    expect(screen.getByText("BUILD")).toBeInTheDocument();
    expect(screen.getByText("01 / Projects")).toBeInTheDocument();
  });
});

describe("BUILD act (ProjectsSection)", () => {
  it("anchors to #build and lists every project", () => {
    const { container } = render(<ProjectsSection />);
    expect(container.querySelector("section#build")).toBeInTheDocument();
    expect(screen.getByText("AWS Weather Intelligence")).toBeInTheDocument();
    expect(screen.getByText("Calisthenics Academy")).toBeInTheDocument();
    expect(screen.getByText("Student Management")).toBeInTheDocument();
    expect(screen.getByText("NGO Website")).toBeInTheDocument();
    expect(screen.getByText("CODEZ")).toBeInTheDocument();
  });
});

describe("LEARN act (TechStackSection)", () => {
  it("anchors to #learn and shows skill rows", () => {
    const { container } = render(<TechStackSection />);
    expect(container.querySelector("section#learn")).toBeInTheDocument();
    expect(screen.getAllByText("JAVA").length).toBeGreaterThan(0);
    expect(screen.getAllByText("REACT").length).toBeGreaterThan(0);
  });
});

describe("TRAIN act (AboutSection)", () => {
  it("anchors to #train and renders the three practice panels", () => {
    const { container } = render(<AboutSection />);
    expect(container.querySelector("section#train")).toBeInTheDocument();
    expect(screen.getByText("Discipline")).toBeInTheDocument();
    expect(screen.getByText("Progression")).toBeInTheDocument();
    expect(screen.getByText("Recovery")).toBeInTheDocument();
  });
});

describe("REPEAT act (ContactSection)", () => {
  it("anchors to #contact and carries the closing line + links", () => {
    const { container } = render(<ContactSection />);
    expect(container.querySelector("section#contact")).toBeInTheDocument();
    expect(screen.getByText(/0.1% daily/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /GitHub/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /LinkedIn/i })).toBeInTheDocument();
  });

  it("renders the loop strip in order", () => {
    render(<ContactSection />);
    const strip = screen.getAllByText("REPEAT");
    expect(strip.length).toBeGreaterThan(0);
    expect(screen.getAllByText("BUILD").length).toBeGreaterThan(0);
    expect(screen.getAllByText("TRAIN").length).toBeGreaterThan(0);
  });
});
