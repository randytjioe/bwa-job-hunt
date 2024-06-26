import { NextResponse } from "next/server";
import { CategoryJob } from "./../../../../../node_modules/.prisma/client/index.d";
import prisma from "../../../../../lib/prisma";
export async function GET() {
  const jobs = await prisma.job.findMany({
    take: 6,
    include: {
      CategoryJob: true,
      Company: {
        include: {
          CompanyOverview: true,
        },
      },
    },
  });
  return NextResponse.json(jobs);
}
