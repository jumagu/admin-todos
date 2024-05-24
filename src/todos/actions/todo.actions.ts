"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";

export const sleep = async (seconds: number = 0): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  // ! delay function for useOptimistic test
  // ! await sleep(2);

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) throw `todo whit id: ${id} does not exists.`;

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  revalidatePath("/dashboard/server-todos");

  return updatedTodo;
};

export const addTodo = async (description: string, userId: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description, userId } });

    revalidatePath("/dashboard/server-todos");

    return todo;
  } catch (error) {
    return {
      message: "An error occurs while creating todo.",
    };
  }
};

export const deleteCompletedTodos = async (): Promise<void> => {
  try {
    await prisma.todo.deleteMany({ where: { completed: true } });

    revalidatePath("/dashboard/server-todos");
  } catch (error) {
    throw error;
  }
};

/* export const thereAreCompletedTodos = async (): Promise<boolean> => {
  const completedTodos = await prisma.todo.findMany({
    where: { completed: true },
  });

  if (completedTodos.length > 0) return false;

  return true;
}; */
