import { FC } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";

import { Todo } from "../../../types/todo.types";
import { cn } from "../../../utils";
import IconButton from "../../buttons/IconButton";

interface TodoListItemProps {
  todo: Todo;
  handleToggleDone: (id: number) => void;
  handleEdit: (id: number, text: string) => void;
  handleDelete: (id: number) => void;
}

const TodoListItem: FC<TodoListItemProps> = ({
  todo,
  handleToggleDone,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between content-stretch px-4 py-3 mb-2 bg-white hover:bg-gray-50 rounded-lg shadow",
        todo.done && "bg-gray-200 hover:bg-gray-200"
      )}
    >
      <button
        className={cn("flex items-center flex-1 gap-3 cursor-pointer")}
        onClick={() => handleToggleDone(todo.id)}
        aria-label={`Toggle ${todo.text} completion status`}
      >
        <input
          type="checkbox"
          checked={todo.done}
          className="w-5 h-5 cursor-pointer text-green-500"
        />
        <span
          className={cn("flex-1 text-left", {
            "line-through text-gray-500": todo.done,
          })}
        >
          {todo.text}
        </span>
      </button>
      <div className="flex gap-2">
        <IconButton
          icon={<LuPencil />}
          onClick={() => handleEdit(todo.id, todo.text)}
          {...(todo.done && { disabled: true })}
        />
        <IconButton
          icon={<LuTrash2 />}
          onClick={() => handleDelete(todo.id)}
          variant="danger"
        />
      </div>
    </div>
  );
};

export default TodoListItem;
