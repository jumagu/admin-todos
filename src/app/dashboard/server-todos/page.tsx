export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { getUserSessionServer } from "@/auth/actions/auth.actions";

export const metadata = {
  title: "Server TODO List",
  description: "List of tasks",
};

export default async function ServerTodosPage() {
  const user = await getUserSessionServer();

  if (!user) redirect("/api/auth/signin");

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: "asc" },
  });

  const completedTodos = !(todos.filter((todo) => todo.completed).length > 0);

  return (
    <>
      <NewTodo completedTodos={completedTodos} />
      <TodosGrid todos={todos} />
    </>
  );
}
