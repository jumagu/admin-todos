import { NextResponse, NextRequest } from "next/server";

import * as yup from "yup"

import prisma from "@/lib/prisma";
import { getUserSessionServer } from "@/auth/actions/auth.actions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(take)) {
    return NextResponse.json(
      { message: "take must be a number." },
      { status: 400 }
    );
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      { message: "skip must be a number." },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json(todos);
}

const todoSchema = yup.object({
  description: yup.string().required(),
  completed: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  const user = await getUserSessionServer();

  if (!user) {
    return NextResponse.json("Unauthorize user", { status: 401 });
  }

  try {
    const { description, completed } = await todoSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.create({
      data: { completed, description, userId: user.id },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const user = await getUserSessionServer();

  if (!user) {
    return NextResponse.json("Unauthorize user", { status: 401 });
  }

  try {
    const deletedTodos = await prisma.todo.deleteMany({
      where: { completed: true, userId: user.id },
    });

    return NextResponse.json({
      message: `${deletedTodos.count} todos were eliminated`,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
