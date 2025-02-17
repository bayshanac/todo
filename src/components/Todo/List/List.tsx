import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useMemo } from "react";

import { editIdAtom } from "../../../atoms/editIdAtom";
import filterAtom from "../../../atoms/filterAtom";
import { todosAtom } from "../../../atoms/todosAtom";
import { FilterEnum } from "../../../types/filter.types";
import ListItem from "./ListItem/ListItem";
import NoListItems from "./NoListItems/NoListItems";

interface ListProps {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const List = ({ setInputValue, inputRef }: ListProps) => {
  const todos = useAtomValue(todosAtom);
  const setEditId = useSetAtom(editIdAtom);
  const filter = useAtomValue(filterAtom);

  const handleEdit = useCallback(
    (id: number, text: string) => {
      setEditId(id);
      setInputValue(text);
      inputRef.current?.focus();
    },
    [setEditId, setInputValue, inputRef]
  );

  const filteredTodos = useMemo(() => {
    if (filter === FilterEnum.ALL) return todos;
    if (filter === FilterEnum.ACTIVE) return todos.filter((todo) => !todo.done);
    if (filter === FilterEnum.COMPLETED)
      return todos.filter((todo) => todo.done);
  }, [todos, filter]);

  if (!filteredTodos?.length) {
    return <NoListItems className="mt-8" />;
  }

  return (
    <div className="w-full">
      {filteredTodos?.map((todo) => (
        <ListItem key={todo.id} todo={todo} handleEdit={handleEdit} />
      ))}
    </div>
  );
};

export default List;
