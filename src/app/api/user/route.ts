import { hashPassword } from "@/lib/utils";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const hashedPassword = await hashPassword(body.password);
  const result = await prisma.user.create({
    data: {
      ...body,
      password: hashedPassword,
    },
  });
  return NextResponse.json(result);
}
