import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useMemo } from "react";

import { editIdAtom } from "../../../atoms/editIdAtom";
import filterAtom from "../../../atoms/filterAtom";
import { todosAtom } from "../../../atoms/todosAtom";
import TodoListItem from "./TodoListItem";
import { FilterEnum } from "../../../types/filter.types";
import NoTodoItem from "./NoTodoItem";

interface TodoListProps {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const TodoList = ({ setInputValue, inputRef }: TodoListProps) => {
  const todos = useAtomValue(todosAtom);
  const setEditId = useSetAtom(editIdAtom);
  const filter = useAtomValue(filterAtom);

  const handleEdit = useCallback(
    (id: number, text: string) => {
      setEditId(id);
      setInputValue(text);
      inputRef.current?.focus();
    },
    [setEditId, setInputValue, inputRef]
  );

  const filteredTodos = useMemo(() => {
    if (filter === FilterEnum.ALL) return todos;
    if (filter === FilterEnum.ACTIVE) return todos.filter((todo) => !todo.done);
    if (filter === FilterEnum.COMPLETED)
      return todos.filter((todo) => todo.done);
  }, [todos, filter]);

  if (!filteredTodos?.length) {
    return <NoTodoItem className="mt-8" />;
  }

  return (
    <div className="w-full">
      {filteredTodos?.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} handleEdit={handleEdit} />
      ))}
    </div>
  );
};

export default TodoList;
