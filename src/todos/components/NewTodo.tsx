"use client";

import { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import { IoTrashOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";

import * as todosApi from "@/todos/helpers/todos.helper";
import { addTodo, deleteCompletedTodos } from "../actions/todo.actions";

export const NewTodo = ({ completedTodos }: { completedTodos: boolean }) => {
  const router = useRouter();

  const [description, setDescription] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // if (description.trim().length === 0) return;

    // await addTodo(description, user.id);
    await todosApi.createTodo(description);
    setDescription("");
    router.refresh();
  };

  // const onDeleteCompleted = async () => {
  //   await todoApi.deleteCompletedTodos();
  //   router.refresh();
  // };

  return (
    <form
      className="flex flex-col sm:flex-row gap-1 w-full mb-4"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-6/12">
        <input
          type="text"
          value={description}
          className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
          placeholder="What needs to be done?"
          onChange={(event) => setDescription(event.target.value)}
        />
        <button
          type="submit"
          disabled={description.trim().length === 0}
          className="flex items-center justify-center gap-1 p-2 rounded text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700 disabled:bg-sky-300 transition-all"
        >
          <IoIosAddCircleOutline />
          Add
        </button>
      </div>

      <span className="flex flex-1"></span>

      <button
        type="button"
        disabled={completedTodos}
        className="w- flex items-center justify-center gap-1 p-2 rounded text-white bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-red-300 transition-all"
        onClick={() => deleteCompletedTodos()}
      >
        <IoTrashOutline />
        Delete completed
      </button>
    </form>
  );
};
