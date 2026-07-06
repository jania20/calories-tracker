import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();


function validEmail(email: string){
        const regex = /^[a-zA-Z0-9._+]+@(gmail\.com|outlook\.com)$/;
        return regex.test(email);
    }

export async function POST(request: Request) {
    const info = await request.json();
    const {email,password} = info;

    if(email==="" ||  password===""){
        return Response.json(
            {error : "No se aceptan campos vacios "},
            {status: 400}
        )
    }

    if(!validEmail(email)){
        return Response.json(
            {error: "Formato de email invalido"},
            {status: 400}
        )
    }
    //Search emial of user
    const existingUser = await prisma.user.findFirst({
        where : {email},
    });

    if(!existingUser){
        return Response.json(
            {error: "Email no existe"},
            {status: 404}
        )
    }

    //Compare password
    const IsvalidPassword = await bcrypt.compare(password, existingUser.password);
    if(!IsvalidPassword){
        return Response.json(
            {error: "Password incorrecto"},
            {status: 401}
        );
    }

    return Response.json({
        mesage: "Login exitoso"
    });
}