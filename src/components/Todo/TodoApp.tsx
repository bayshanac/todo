import { useRef, useState } from "react";

import AppWrapper from "../AppWrapper/AppWrapper";
import Filter from "./Filter/Filter";
import Form from "./Form/Form";
import Header from "../Header/Header";
import List from "./List/List";

const TodoApp = () => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <AppWrapper>
      <Header title="Todo List" description="Add and manage your todos." />
      <Form
        inputValue={inputValue}
        setInputValue={setInputValue}
        inputRef={inputRef}
        className="mb-6"
      />
      <Filter />
      <List setInputValue={setInputValue} inputRef={inputRef} />
    </AppWrapper>
  );
};

export default TodoApp;
