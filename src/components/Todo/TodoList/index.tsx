import { useAtomValue, useSetAtom } from "jotai";

import { editIdAtom } from "../../../atoms/editIdAtom";
import { todosAtom } from "../../../atoms/todosAtom";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const TodoList = ({ setInputValue, inputRef }: TodoListProps) => {
  const todos = useAtomValue(todosAtom);
  const setEditId = useSetAtom(editIdAtom);

  const handleEdit = (id: number, text: string) => {
    setEditId(id);
    setInputValue(text);
    inputRef?.current?.focus();
  };

  return (
    <div className="w-full">
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} handleEdit={handleEdit} />
      ))}
    </div>
  );
};

export default TodoList;
