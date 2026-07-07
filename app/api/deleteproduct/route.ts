
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request){
    const body = await request.json();

    const {id} = body;

    if(!id){
        return NextResponse.json(
            {error: "Product id is required"},
            {status: 400}
        );
    }

    await prisma.products.delete({
        where: {
            id: Number(id)
        }
    });

    return NextResponse.json({
        mesasage: "Product deleted succesfully"
    });
}