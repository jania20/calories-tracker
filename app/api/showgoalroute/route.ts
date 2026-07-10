import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    const userId = Number(searchParams.get("userId"));

    const goal = await prisma.goal.findUnique({
        where: {
            userId
        }
    });

    return Response.json(goal);
}