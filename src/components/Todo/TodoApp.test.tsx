import { Provider, WritableAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { beforeEach, describe, expect, it } from "vitest";

import { fireEvent, render, screen } from "@testing-library/react";

import { todosAtom } from "../../atoms/todosAtom";
import TodoApp from "./TodoApp";
import { Todo } from "../../types/todo.types";

function addTodo(todoText: string) {
  const inputElement = screen.getByTestId("input-field");

  const submitButton = screen.getByTestId("submit-button");

  fireEvent.change(inputElement, { target: { value: todoText } });

  fireEvent.click(submitButton);
}

// HydrateAtoms is a component that hydrates the atoms with the initial values
const HydrateAtoms = ({
  initialValues,
  children,
}: {
  initialValues: [WritableAtom<Todo[], unknown[], unknown>, Todo[]];
  children: React.ReactNode;
}) => {
  useHydrateAtoms([initialValues]);
  return children;
};

// TestProvider is a component that provides the atoms to the TodoApp component
const TestProvider = ({
  initialValues,
  children,
}: {
  initialValues: [WritableAtom<Todo[], unknown[], unknown>, Todo[]];
  children: React.ReactNode;
}) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

// TodoProvider is a component that wraps the TodoApp component with the TestProvider component
const TodoProvider = () => {
  return (
    <TestProvider initialValues={[todosAtom, []]}>
      <TodoApp />
    </TestProvider>
  );
};

beforeEach(() => {
  render(<TodoProvider />);
});

describe("Todo App", () => {
  it("should add a new todo item when submitted", () => {
    const todoText = "Buy a car";
    // add an item to the list
    addTodo(todoText);

    const todoItem = screen.getByText(todoText);

    // check if the todo item is added to the list
    expect(todoItem).toBeInTheDocument();

    // Check if the input is cleared after submission
    expect(screen.getByTestId("input-field")).toHaveValue("");
  });

  it("should delete a todo item when the delete button is clicked", () => {
    const todoText = "Buy a pillow";
    // add an item to the list
    addTodo(todoText);

    const deleteButton = screen.getByTestId("delete-button");

    if (!deleteButton) {
      throw new Error("Delete button not found");
    }

    // click the ListItem delete button
    fireEvent.click(deleteButton);

    const alertDialog = screen.getByTestId("alert-dialog");

    // check if the AlertDialog is opened
    expect(alertDialog).toBeInTheDocument();

    const confirmAlertDialogButton = screen.getByTestId(
      "alert-dialog-confirm-button"
    );

    // click the AlertDialog confirm button
    fireEvent.click(confirmAlertDialogButton);

    // check if the AlertDialog is closed
    expect(alertDialog).not.toBeInTheDocument();

    // check if the list item is deleted
    const todoItem = screen.queryByText(todoText);
    expect(todoItem).not.toBeInTheDocument();
  });

  it("should edit a todo item when the edit button is clicked", () => {
    const todoText = "Buy a pillow";
    // add an item to the list
    addTodo(todoText);

    const editButton = screen.getByTestId("edit-button");

    if (!editButton) {
      throw new Error("Edit button not found");
    }

    // click the ListItem edit button
    fireEvent.click(editButton);

    const inputElement = screen.getByTestId("input-field");

    // check if the input field is filled with the todo text
    expect(inputElement).toHaveValue(todoText);

    const submitButton = screen.getByTestId("submit-button");

    // change the input field value
    fireEvent.change(inputElement, { target: { value: "Pick up the kids" } });

    // click the submit button
    fireEvent.click(submitButton);

    const todoItem = screen.getByText("Pick up the kids");

    // check if the todo item is updated
    expect(todoItem).toBeInTheDocument();
  });
});
