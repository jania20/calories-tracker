

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request){
    const {userId,calories_goal,protein_goal,carbs_goal,fats_goal} = await request.json();

       if (userId == null || calories_goal == null ||protein_goal == null ||carbs_goal == null ||fats_goal == null
) {
    return Response.json(
        { message: "Missing required fields" }       
        );
    }

    const goal = await prisma.goal.findUnique({
    where: 
        {
            userId
        }
    });

    if(!goal){
        await prisma.goal.create({
            data: {
                userId,
                calories_goal,
                protein_goal,
                carbs_goal,
                fats_goal
            }
        });
    }else{
        await prisma.goal.update({
            where: {
                userId
            },
            data: {
                calories_goal, 
                protein_goal, 
                carbs_goal, 
                fats_goal
                }
            });
    }
    
    return Response.json(
        {message: "Goals agregados exitosamente"}
    )

}