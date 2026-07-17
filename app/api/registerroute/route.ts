import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";


export async function POST(req: Request) {
  const body = await req.json();
  const {name, lastname, email, password} = body;

  /*====================================
        FUNCTIONS
  ====================================*/

       //email funciont
    const validEmail = (email: string) : boolean =>{
        const regex = /^[a-zA-Z0-9._+]+@(gmail\.com|outlook\.com)$/;
        return regex.test(email);
        }

    const validPassword = (password: string) : boolean =>{
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&*_!?.-])[a-zA-Z0-9@#$%&*_!?.-]{6,}$/;
        return regex.test(password);
    }

    
  /*====================================
        VALIDATIONS
  ====================================*/

     //Validtes that fields are not null
    if(!name ||!email || !password){
        return Response.json(
        {error: "Los campos no pueden estar vacios."},
        {status: 400}
         )
      }

    if(!validEmail(email)){
        return Response.json(
             {error: "Email no puede contener espacios y debe terminar en @gmail.com/@outlook.com"},
             {status: 400}
        )
    }

  //password validation
    if(!validPassword(password)){
        return Response.json(
            {error: "Password debe contener al menos una mayuscula, un numero y caracter especial(?=.*[@#$%&*_!?.-])"},
            {status: 400}
        )
    }

    //
    //CHECK IF EMAIL EXIST IN THE DATABASE, AND VALUE IS SOTRAGE IN existingUser variable
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    //depending of the "existingUser" value it's will execute the first or second section of
    if (existingUser){
        return Response.json(
            {error: "Email already exist."},
            {status: 409}
          )
        }
        
        const hashPassword = await bcrypt.hash(password,10)
        
        //To save info in the database
        const user = await prisma.user.create({
            data: {
            name, 
            lastname, 
            email, 
            password: hashPassword
                }
            });
        console.log("Usuario registrado exitosamente", user);

  return Response.json(
    {
        message: "Usuario registrado exitosamente", 
        userId: user.id
    }, 
    {
        status: 201
    }
  );
}