import { FC } from "react";
import { LuCircleCheckBig, LuCirclePlus, LuCircleX } from "react-icons/lu";

import { Todo } from "../../types/todo.types";
import IconButton from "../buttons/IconButton";
import Input from "../Input";

interface TodoFormProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const TodoForm: FC<TodoFormProps> = ({
  todos,
  setTodos,
  editId,
  setEditId,
  inputValue,
  setInputValue,
  inputRef,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (editId !== null) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: inputValue } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: inputValue, done: false }]);
    }
    setInputValue("");
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setInputValue("");
    inputRef?.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-8">
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          inputValue={inputValue}
          setInputValue={setInputValue}
          placeholder="Add a new todo..."
        />

        <IconButton
          type="submit"
          icon={editId !== null ? <LuCircleCheckBig /> : <LuCirclePlus />}
          variant="submit"
        />
        {editId ? (
          <IconButton
            icon={<LuCircleX />}
            variant="delete"
            onClick={handleCancelEdit}
          />
        ) : null}
      </div>
    </form>
  );
};

export default TodoForm;
