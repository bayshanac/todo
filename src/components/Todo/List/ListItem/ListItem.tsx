import { useAtom, useAtomValue } from "jotai";
import { FC, useCallback, useState } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";

import { editIdAtom } from "@atoms/editIdAtom";
import { todosAtom } from "@atoms/todosAtom";
import AlertDialog from "@components/ui/AlertDialog/AlertDialog";
import IconButton from "@components/ui/Button/Button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Todo } from "@models/todo.types";
import { cn } from "@utils/cn";

interface ListItemProps {
  todo: Todo;
  handleEdit: (id: number, text: string) => void;
}

const ListItem: FC<ListItemProps> = ({ todo, handleEdit }) => {
  const [todos, setTodos] = useAtom(todosAtom);
  const [isOpen, setIsOpen] = useState(false);
  const editId = useAtomValue(editIdAtom);
  const isEditing = editId === todo.id;

  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({ id: todo.id });

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

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={cn(
          "flex items-center justify-between content-stretch px-4 py-3 mb-2 bg-white hover:bg-gray-50 rounded-lg shadow-md",
          {
            "bg-gray-100 hover:bg-gray-100 shadow-xs": todo.done,
            "opacity-60": isEditing,
          }
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
            tabIndex={-1}
          />
          <span
            className={cn("flex-1 text-left", {
              "line-through text-gray-500": todo.done,
              "text-gray-500 cursor-not-allowed": isEditing,
            })}
            tabIndex={-1}
          >
            {todo.text}
          </span>
        </button>
        <div className="flex gap-2">
          <IconButton
            icon={<LuPencil />}
            onClick={() => handleEdit(todo.id, todo.text)}
            {...((todo.done || isEditing) && { disabled: true })}
            data-testid="edit-button"
            variant="transparent"
            className="text-amber-500 hover:text-amber-800"
          />
          <IconButton
            icon={<LuTrash2 />}
            onClick={() => setIsOpen(true)}
            {...(isEditing && { disabled: true })}
            variant="transparent"
            className="text-red-500 hover:text-red-800"
            data-testid="delete-button"
          />
        </div>
      </div>
      <AlertDialog
        isOpen={isOpen}
        title="Delete Todo"
        description="Are you sure you want to delete this todo?"
        onCancel={() => setIsOpen(false)}
        onConfirm={() => handleDelete(todo.id)}
      />
    </>
  );
};

export default ListItem;
