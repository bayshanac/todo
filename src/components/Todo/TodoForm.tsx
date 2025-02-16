import { useAtom } from "jotai";
import { FC, useCallback, useState } from "react";
import { LuCircleCheckBig, LuCirclePlus, LuCircleX } from "react-icons/lu";

import { editIdAtom } from "../../atoms/editIdAtom";
import { todosAtom } from "../../atoms/todosAtom";
import { useKeyPress } from "../../hooks/useKeyPress";
import IconButton from "../buttons/IconButton";
import Input from "../Input";

interface TodoFormProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const TodoForm: FC<TodoFormProps> = ({
  inputValue,
  setInputValue,
  inputRef,
}) => {
  const [todos, setTodos] = useAtom(todosAtom);
  const [editId, setEditId] = useAtom(editIdAtom);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (!inputValue.trim()) {
        setError("Todo cannot be empty");
        return;
      }

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
    },
    [editId, inputValue, setEditId, setInputValue, setTodos, todos]
  );

  const handleCancelEdit = useCallback(() => {
    setEditId(null);
    setInputValue("");
    inputRef?.current?.focus();
  }, [setEditId, setInputValue, inputRef]);

  useKeyPress("Escape", handleCancelEdit);

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
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </form>
  );
};

export default TodoForm;
