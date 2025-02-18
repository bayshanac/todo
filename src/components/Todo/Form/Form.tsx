import { useAtom } from "jotai";
import { FC, useCallback } from "react";
import { LuCircleCheckBig, LuCirclePlus, LuCircleX } from "react-icons/lu";

import { editIdAtom } from "@atoms/editIdAtom";
import { todosAtom } from "@atoms/todosAtom";
import { Button as IconButton, Input } from "@components/ui";
import { useKeyPress } from "@hooks/useKeyPress";
import { cn } from "@utils/cn";

interface FormProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  className?: string;
}

const Form: FC<FormProps> = ({
  inputValue,
  setInputValue,
  inputRef,
  className,
}) => {
  const [todos, setTodos] = useAtom(todosAtom);
  const [editId, setEditId] = useAtom(editIdAtom);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!inputValue.trim()) {
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
        setTodos([
          ...todos,
          {
            id: Date.now(),
            text: inputValue,
            done: false,
            order: todos.length,
          },
        ]);
      }
      setInputValue("");
      inputRef?.current?.focus();
    },
    [editId, inputRef, inputValue, setEditId, setInputValue, setTodos, todos]
  );

  const handleCancelEdit = useCallback(() => {
    setEditId(null);
    setInputValue("");
    inputRef?.current?.focus();
  }, [setEditId, setInputValue, inputRef]);

  useKeyPress("Escape", handleCancelEdit);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full flex gap-2", className)}
    >
      <Input
        name="add-todo"
        label="Add Todo"
        ref={inputRef}
        value={inputValue}
        setInputValue={setInputValue}
        placeholder="Add a new todo..."
        data-testid="input-field"
      />

      <IconButton
        type="submit"
        icon={editId !== null ? <LuCircleCheckBig /> : <LuCirclePlus />}
        size="lg"
        disabled={!inputValue.trim()}
        data-testid="submit-button"
      />
      {editId ? (
        <IconButton
          icon={<LuCircleX />}
          variant="delete"
          onClick={handleCancelEdit}
          size="lg"
        />
      ) : null}
    </form>
  );
};

export default Form;
