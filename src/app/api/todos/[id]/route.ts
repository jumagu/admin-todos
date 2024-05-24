import { NextResponse, NextRequest } from "next/server";

import * as yup from "yup";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { getUserSessionServer } from "@/auth/actions/auth.actions";

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const user = await getUserSessionServer();

  if (!user) return null;

  const todo = await prisma.todo.findUnique({ where: { id } });

  if (todo?.userId !== user.id) return null;

  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json(
      { message: `todo whit id: ${params.id} does not exists.` },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
}

const todoSchema = yup.object({
  description: yup.string().optional(),
  completed: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json(
      { message: `todo whit id: ${id} does not exists.` },
      { status: 404 }
    );
  }

  try {
    const { description, completed } = await todoSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { description, completed },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
