"use client";

// import { useRouter } from "next/navigation";

import { Todo } from "@prisma/client";

import { TodoItem } from "..";
import { toggleTodo } from "../actions/todo.actions";

// import * as todosApi from "@/todos/helpers/todos.helper";

interface Props {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {
  // const router = useRouter();

  // const toggleTodo = async (id: string, completed: boolean) => {
  //   await todosApi.updateTodo(id, completed);
  //   router.refresh();
  // };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};
