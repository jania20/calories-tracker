

import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const userId = Number(searchParams.get("userId"));
  const mealType = searchParams.get("mealType");

  const products = await prisma.products.findMany({
    where: {
      userId,
      mealType: mealType || undefined,
    },
  });

  return NextResponse.json(products);
}