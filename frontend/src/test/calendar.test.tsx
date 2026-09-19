import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Calendar } from "@/components/ui/calendar";

describe("Calendar (react-day-picker v9 migration)", () => {
  it("renders without crashing", () => {
    const { container } = render(<Calendar />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders previous and next month nav buttons", () => {
    render(<Calendar />);
    expect(screen.getByRole("button", { name: /Previous Month/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next Month/i })).toBeInTheDocument();
  });

  it("renders the month grid", () => {
    const { container } = render(<Calendar />);
    expect(container.querySelector("table")).not.toBeNull();
  });
});
