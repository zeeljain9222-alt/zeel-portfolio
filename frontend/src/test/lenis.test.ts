import { describe, it, expect, vi } from "vitest";
import { getLenis, setLenis, scrollToSection } from "@/lib/lenis";
import type Lenis from "lenis";

const makeLenis = () => ({ scrollTo: vi.fn() }) as unknown as Lenis;

describe("lib/lenis", () => {
  it("stores and clears the instance", () => {
    const lenis = makeLenis();
    setLenis(lenis);
    expect(getLenis()).toBe(lenis);
    setLenis(null);
    expect(getLenis()).toBeNull();
  });

  it("scrolls via lenis when available", () => {
    const lenis = makeLenis();
    setLenis(lenis);
    document.body.innerHTML = '<div id="about"></div>';

    scrollToSection("#about");

    expect(lenis.scrollTo).toHaveBeenCalledWith(
      document.querySelector("#about"),
      expect.objectContaining({ duration: 1.4 })
    );
    setLenis(null);
  });

  it("falls back to scrollIntoView without lenis", () => {
    setLenis(null);
    const spy = vi.fn();
    Element.prototype.scrollIntoView = spy;
    document.body.innerHTML = '<div id="contact"></div>';

    scrollToSection("#contact");

    expect(spy).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("does nothing when the target does not exist", () => {
    setLenis(null);
    const lenis = makeLenis();
    setLenis(lenis);

    scrollToSection("#does-not-exist");

    expect(lenis.scrollTo).not.toHaveBeenCalled();
    setLenis(null);
  });
});
