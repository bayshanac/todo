import { useAtom } from "jotai";

import { todosAtom } from "@atoms/todosAtom";
import { useCallback } from "react";
import {
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export default function useDnd() {
  const [todos, setTodos] = useAtom(todosAtom);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = todos.findIndex((todo) => todo.id === active.id);
        const newIndex = todos.findIndex((todo) => todo.id === over.id);

        // Create a new array with the updated order
        const reorderedTodos = [...todos];
        const movedTodos = reorderedTodos.splice(oldIndex, 1);
        reorderedTodos.splice(newIndex, 0, movedTodos[0]);

        setTodos(reorderedTodos);
      }
    },
    [setTodos, todos]
  );

  return { sensors, handleDragEnd };
}
