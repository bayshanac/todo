import { beforeEach, describe, expect, it, vi } from "vitest";

import useLocalStorage from "@hooks/useLocalStorage";
import { Todo } from "@models/todo.types";
import { act, renderHook } from "@testing-library/react";

describe("useLocalStorage", () => {
  const mockStorage: { [key: string]: string } = {};

  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.getItem = vi.fn((key: string) => mockStorage[key]);
    Storage.prototype.setItem = vi.fn((key: string, value: string) => {
      mockStorage[key] = value;
    });
    // Clear mock storage before each test
    Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
  });

  it("should initialize with default value when localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", "default"));

    expect(result.current[0]).toBe("default");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "testKey",
      JSON.stringify("default")
    );
  });

  it("should load existing value from localStorage", () => {
    localStorage.setItem("testKey", JSON.stringify("stored value"));

    const { result } = renderHook(() => useLocalStorage("testKey", "default"));

    expect(result.current[0]).toBe("stored value");
  });

  it("should update localStorage when state changes", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", "default"));

    act(() => {
      result.current[1]("new value");
    });

    expect(result.current[0]).toBe("new value");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "testKey",
      JSON.stringify("new value")
    );
  });

  it("should work with complex objects", () => {
    const defaultValue: Todo[] = [
      { id: 1, text: "test", done: false, order: 0 },
    ];
    const { result } = renderHook(() =>
      useLocalStorage("testKey", defaultValue)
    );

    expect(result.current[0]).toEqual(defaultValue);

    const newValue: Todo[] = [{ id: 1, text: "updated", done: true, order: 0 }];
    act(() => {
      result.current[1](newValue);
    });

    expect(result.current[0]).toEqual(newValue);
    expect(JSON.parse(mockStorage["testKey"])).toEqual(newValue);
  });
});
