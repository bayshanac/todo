import { Todo } from "../../../types/todo.types";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const TodoList = ({
  todos,
  setTodos,
  setEditId,
  setInputValue,
  inputRef,
}: TodoListProps) => {
  const handleToggleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id: number, text: string) => {
    setEditId(id);
    setInputValue(text);
    inputRef?.current?.focus();
  };

  return (
    <div className="w-full">
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          handleToggleDone={handleToggleDone}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;
