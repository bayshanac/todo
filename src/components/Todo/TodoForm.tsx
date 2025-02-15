import { useAtom } from "jotai";
import { FC } from "react";
import { LuCircleCheckBig, LuCirclePlus, LuCircleX } from "react-icons/lu";

import { editIdAtom } from "../../atoms/editIdAtom";
import { todosAtom } from "../../atoms/todosAtom";
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
