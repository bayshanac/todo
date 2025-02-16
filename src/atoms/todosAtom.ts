import { Atom, atom, WritableAtom } from "jotai";

import { Todo } from "../types/todo.types";

// Get initial value from localStorage or default to empty array
const getInitialTodos = () => {
  const stored = localStorage.getItem("todos");
  return stored ? JSON.parse(stored) : [];
};

const updateTodos = (
  _get: <Value>(atom: Atom<Value>) => Value,
  set: <Value, Args extends unknown[], Result>(
    atom: WritableAtom<Value, Args, Result>,
    ...args: Args
  ) => Result,
  newTodos: Todo[]
) => {
  localStorage.setItem("todos", JSON.stringify(newTodos));
  set(todosAtom, newTodos);
};

// @ts-expect-error Expected 0-1 arguments, but got 2.
export const todosAtom = atom<Todo[]>(getInitialTodos(), updateTodos);
