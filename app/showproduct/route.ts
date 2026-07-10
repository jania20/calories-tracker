
import {PrismaClient} from '@prisma/client';


const prisma =  new PrismaClient();
export async function GET(request: Request){

    const {searchParams} = new URL(request.url);
    const userId = Number(searchParams.get("userId"));

    const product_breakfast = await prisma.products.findMany({
        where: {
            userId: userId
        }
    });

    return Response.json(product_breakfast);
}