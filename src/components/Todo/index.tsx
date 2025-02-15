import { useRef, useState } from "react";

import { Todo } from "../../types/todo.types";
import AppWrapper from "../AppWrapper";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoTitle from "./TodoTitle";

const TodoApp = () => {
  // TO-DO move todos and editId to the context
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <AppWrapper>
      <TodoTitle title="Todo List" description="Add and manage your todos." />

      <TodoForm
        todos={todos}
        setTodos={setTodos}
        editId={editId}
        setEditId={setEditId}
        inputValue={inputValue}
        setInputValue={setInputValue}
        inputRef={inputRef}
      />

      <TodoList
        todos={todos}
        setTodos={setTodos}
        setEditId={setEditId}
        setInputValue={setInputValue}
        inputRef={inputRef}
      />
    </AppWrapper>
  );
};

export default TodoApp;
