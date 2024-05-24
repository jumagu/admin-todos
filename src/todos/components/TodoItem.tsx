"use client";

import { useOptimistic, startTransition } from "react";

import { Todo } from "@prisma/client";

import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

import styles from "./TodoItem.module.css";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  // const { id, completed } = todo;

  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompletedValue: boolean) => ({
      ...state,
      completed: newCompletedValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed));
      await toggleTodo(todoOptimistic.id, !todoOptimistic.completed);
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed));
    }
  };

  return (
    <div
      className={
        todoOptimistic.completed ? styles.todoDone : styles.todoPending
      }
    >
      <div className="flex flex-row justify-start items-center gap-4 h-full">
        <div
          className={`p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            todoOptimistic.completed ? "bg-blue-100" : "bg-red-100"
          }`}
          // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.completed)}
          onClick={onToggleTodo}
        >
          {todoOptimistic.completed ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className="text-left">{todoOptimistic.description}</div>
      </div>
    </div>
  );
};
