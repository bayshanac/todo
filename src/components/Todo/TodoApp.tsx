import { useRef, useState } from "react";

import AppWrapper from "@components/AppWrapper/AppWrapper";
import Filter from "@components/Todo/Filter/Filter";
import Form from "@components/Todo/Form/Form";
import Header from "@components/Header/Header";
import List from "@components/Todo/List/List";

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
