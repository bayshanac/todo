import { useAtom, useAtomValue } from "jotai";
import { FC, useCallback } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";

import { editIdAtom } from "../../../atoms/editIdAtom";
import { todosAtom } from "../../../atoms/todosAtom";
import { Todo } from "../../../types/todo.types";
import { cn } from "../../../utils";
import IconButton from "../../buttons/IconButton";

interface TodoListItemProps {
  todo: Todo;
  handleEdit: (id: number, text: string) => void;
}

const TodoListItem: FC<TodoListItemProps> = ({ todo, handleEdit }) => {
  const [todos, setTodos] = useAtom(todosAtom);
  const editId = useAtomValue(editIdAtom);
  const isEditing = editId === todo.id;

  const handleToggleDone = useCallback(
    (id: number) => {
      if (isEditing) return;
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      );
    },
    [isEditing, setTodos, todos]
  );

  const handleDelete = useCallback(
    (id: number) => {
      if (isEditing) return;
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [isEditing, setTodos, todos]
  );

  return (
    <div
      className={cn(
        "flex items-center justify-between content-stretch px-4 py-3 mb-2 bg-white hover:bg-gray-50 rounded-lg shadow",
        { "bg-gray-200 hover:bg-gray-200": todo.done, "opacity-60": isEditing }
      )}
    >
      <button
        className={cn("flex items-center flex-1 gap-3 cursor-pointer")}
        onClick={() => handleToggleDone(todo.id)}
      >
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => handleToggleDone(todo.id)}
          className="w-5 h-5 cursor-pointer text-green-500"
          disabled={isEditing}
        />
        <span
          className={cn("flex-1 text-left", {
            "line-through text-gray-500": todo.done,
            "text-gray-500 cursor-not-allowed": isEditing,
          })}
        >
          {todo.text}
        </span>
      </button>
      <div className="flex gap-2">
        <IconButton
          icon={<LuPencil />}
          onClick={() => handleEdit(todo.id, todo.text)}
          {...((todo.done || isEditing) && { disabled: true })}
        />
        <IconButton
          icon={<LuTrash2 />}
          onClick={() => handleDelete(todo.id)}
          {...(isEditing && { disabled: true })}
          variant="danger"
        />
      </div>
    </div>
  );
};

export default TodoListItem;
