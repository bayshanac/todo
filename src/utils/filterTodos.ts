import { Filter, FILTER_VALUES } from "@models/filter.types";
import { Todo } from "@models/todo.types";

export const filterTodos = (todos: Todo[], filter: Filter) => {
  switch (filter) {
    case FILTER_VALUES.ACTIVE:
      return todos.filter((todo) => !todo.done);
    case FILTER_VALUES.COMPLETED:
      return todos.filter((todo) => todo.done);
    default:
      return todos;
  }
};
