import { Atom, atom, WritableAtom } from "jotai";

import { Todo } from "../types/todo.types";

const TODOS_STORAGE_KEY = "todos";

// Get initial value from localStorage or default to empty array
const getInitialTodos = () => {
  try {
    const stored = localStorage.getItem(TODOS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize localStorage with empty array if no value exists
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify([]));
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Update todos in localStorage and atom
const updateTodos = (
  _get: <Value>(atom: Atom<Value>) => Value,
  set: <Value, Args extends unknown[], Result>(
    atom: WritableAtom<Value, Args, Result>,
    ...args: Args
  ) => Result,
  newTodos: Todo[]
) => {
  try {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(newTodos));
    set(todosAtom, newTodos);
  } catch (error) {
    console.error(error);
  }
};

// @ts-expect-error Expected 0-1 arguments, but got 2.
export const todosAtom = atom<Todo[]>(getInitialTodos(), updateTodos);
