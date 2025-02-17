import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { FilterEnum } from "../types/filter.types";
import { Todo } from "../types/todo.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filterTodos = (todos: Todo[], filter: FilterEnum) => {
  if (filter === FilterEnum.ALL) return todos;
  if (filter === FilterEnum.ACTIVE) return todos.filter((todo) => !todo.done);
  if (filter === FilterEnum.COMPLETED) return todos.filter((todo) => todo.done);
};
