import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useKeyPress } from "./useKeyPress";

describe("useKeyPress", () => {
  it("should trigger callback when specified single key is pressed", () => {
    const callback = vi.fn();
    renderHook(() => useKeyPress("Enter", callback));

    // Simulate pressing the Enter key
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should trigger callback when any of multiple specified keys is pressed", () => {
    const callback = vi.fn();
    renderHook(() => useKeyPress(["Enter", "Escape"], callback));

    // Simulate pressing both keys separately
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("should not trigger callback when other keys are pressed", () => {
    const callback = vi.fn();
    renderHook(() => useKeyPress("Enter", callback));

    // Simulate pressing a different key
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));

    expect(callback).not.toHaveBeenCalled();
  });
});
