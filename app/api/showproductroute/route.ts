

import {NextResponse} from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET(req: Request) {

  try {
  const { searchParams } = new URL(req.url);

  const userId = Number(searchParams.get("userId"));
  //const mealType = searchParams.get("mealType");

  if (!userId) {
  return NextResponse.json(
    {error:"UserId es requerido"},
    {status:400}
  );
}

if(userId <=0){
  return NextResponse.json(
    {error : "User id debe ser positivo"}, 
    {status: 404}
  );
}

  const products = await prisma.products.findMany({
    where: {
      userId,
     // mealType: mealType || undefined,
    },
  });

  return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return Response.json(
      {error: "Server error"},
      {status: 500}
    )
  }
 
}