import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeroSection } from "@/components/HeroSection";
import { setLenis } from "@/lib/lenis";
import type Lenis from "lenis";

// jsdom lacks scrollIntoView used by the fallback path
Element.prototype.scrollIntoView = vi.fn();

const makeLenis = () =>
  ({
    scrollTo: vi.fn(),
    raf: vi.fn(),
    destroy: vi.fn(),
  }) as unknown as Lenis;

describe("HeroSection", () => {
  beforeEach(() => {
    setLenis(null);
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { container } = render(<HeroSection />);
    expect(container.querySelector("section#home")).toBeInTheDocument();
  });

  it("renders the full name and heading", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { name: "Zeel Jain" })).toBeInTheDocument();
  });

  it("renders roles, bio and CTAs", () => {
    render(<HeroSection />);
    expect(screen.getAllByText(/Computer Engineering Student/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Calisthenics Athlete/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /View Projects/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /About Me/i })).toBeInTheDocument();
  });

  it("renders the site nav with all sections", () => {
    render(<HeroSection />);
    for (const label of ["Work", "Skills", "About", "Contact"]) {
      expect(screen.getAllByRole("link", { name: label }).length).toBeGreaterThan(0);
    }
  });

  it("renders the portrait area", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Portrait/i)).toBeInTheDocument();
  });

  it("smooth-scrolls to a section via lenis on nav click", async () => {
    const user = userEvent.setup();
    const lenis = makeLenis();
    setLenis(lenis);

    render(
      <div>
        <div id="build" />
        <HeroSection />
      </div>
    );

    await user.click(screen.getByRole("link", { name: "Work" }));

    expect(lenis.scrollTo).toHaveBeenCalledTimes(1);
    expect(lenis.scrollTo).toHaveBeenCalledWith(
      document.querySelector("#build"),
      expect.objectContaining({ duration: 1.4 })
    );
  });

  it("falls back to scrollIntoView when lenis is unavailable", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <div id="learn" />
        <HeroSection />
      </div>
    );

    await user.click(screen.getByRole("link", { name: "Skills" }));

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });
});
