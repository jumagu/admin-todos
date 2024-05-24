import { NextResponse, NextRequest } from "next/server";

import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      name: "Test",
      email: "test@test.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin", "client", "super-user"],
      todos: {
        create: [
          { description: "Buy groceries." },
          { description: "Call the doctor to schedule an appointment." },
          { description: "Finish the report for work." },
          { description: "Clean the garage." },
          { description: "Exercise for 30 minutes.", completed: true },
        ],
      },
    },
  });

  return NextResponse.json({
    message: "seed executed",
    user,
  });
}
