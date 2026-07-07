import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(request: Request){
    const body = await request.json();

     const {
        foodname,
        calories,
        protein,
        carbs,
        fats,
        mealType,
        userId
    } = body;

    if(!body.foodname || !body.calories || !body.protein || !body.carbs || !body.fats){
        return Response.json(
            {error:"Fields required"}, 
            {status: 400}
        );
    }

    
   
      const product = await prisma.products.create({
    data: {
      foodname,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fats: Number(fats),
      mealType,
      userId: Number(userId),
    },
  });


    return NextResponse.json(product, { status: 201 });


}