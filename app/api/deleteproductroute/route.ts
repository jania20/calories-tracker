
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";



export async function DELETE(request: Request){

    try {
         const body = await request.json();

    const {id} = body;

    if(!id){
        return NextResponse.json(
            {error: "Product id is required"},
            {status: 400}
        );
    }
/*
    const existing_product = await prisma.products.findUnique({
    where: {
        id: Number(id)
        }
    });

    if(!existing_product){
        return NextResponse.json(
           {error: "Product id no registrado"},
           {status: 404}
          );
        }
*/

     await prisma.products.delete({
        where: {
            id: Number(id)
        }
      });

    return NextResponse.json({
        mesasage: "Product deleted succesfully"
    }); 


    } catch (error) {

        console.log(error);
        return Response.json(
            {error: "Server error"},
            {status: 500}
        )
    }
  
}