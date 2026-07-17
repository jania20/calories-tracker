

import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request){

    try {
         console.log("ENTRO AL DELETE");

           const body = await req.json();
    const email  = body.email;

    //need to check if email exist
    const exisiting_email = await prisma.user.findUnique({
        where:{ 
            email
            }
        });
    if(!exisiting_email){
        return Response.json(
            {message: "Email dont exist"}, 
            {status: 404}
        )
    }
     
    await prisma.user.delete({
        where: {
            email
        }
    })
    
    return Response.json(
    {message: "Usuario eliminado"}, 
    {status: 200}
    )   

    }
 
     catch (error) {
           console.log(error)
        return Response.json(
            {message:  "Server error"},
            {status: 500}
            
        )
     
    }
}
