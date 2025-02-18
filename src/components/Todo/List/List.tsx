import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useMemo } from "react";

import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { filterTodos } from "@utils/filterTodos";

import { editIdAtom } from "@atoms/editIdAtom";
import filterAtom from "@atoms/filterAtom";
import { todosAtom } from "@atoms/todosAtom";
import useDnd from "@hooks/useDnd";
import NoListItems from "@components/Todo/List/NoListItems/NoListItems";
import ListItem from "@components/Todo/List/ListItem/ListItem";

interface ListProps {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const List = ({ setInputValue, inputRef }: ListProps) => {
  const todos = useAtomValue(todosAtom);
  const setEditId = useSetAtom(editIdAtom);
  const filter = useAtomValue(filterAtom);
  const { sensors, handleDragEnd } = useDnd();

  const handleEdit = useCallback(
    (id: number, text: string) => {
      setEditId(id);
      setInputValue(text);
      inputRef.current?.focus();
    },
    [setEditId, setInputValue, inputRef]
  );

  const filteredTodos = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter]
  );

  if (!filteredTodos?.length) {
    return <NoListItems className="mt-8" />;
  }

  return (
    <div className="w-full">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredTodos}>
          {filteredTodos?.map((todo) => (
            <ListItem key={todo.id} todo={todo} handleEdit={handleEdit} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default List;
