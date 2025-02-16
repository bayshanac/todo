import { useRef, useState } from "react";

import AppWrapper from "../AppWrapper";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoTitle from "./TodoTitle";
import Filter from "./Filter";
const TodoApp = () => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <AppWrapper>
      <TodoTitle title="Todo List" description="Add and manage your todos." />

      <TodoForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        inputRef={inputRef}
        className="mb-6"
      />

      <Filter />

      <TodoList setInputValue={setInputValue} inputRef={inputRef} />
    </AppWrapper>
  );
};

export default TodoApp;
