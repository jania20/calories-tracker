import {PrismaClient} from '@prisma/client';


// to create an instace of prisma
const prisma = new PrismaClient();

export async function POST(request:Request){
    //to receive the info from fron end
    const {foodname,calories,protein,carbs,fats, mealType, userId} = await request.json();
    
    if(foodname ==="" || calories<=0 || carbs<=0 || fats <=0){
          return Response.json({message: "Campos no pueden estar vacio. Las calorias y micronutrientes tienen que ser mayor o igual a cero"
                }
            )
        }

    
    
        //to add a new product on database
    await prisma.products.create({
      data: { 
        foodname,
        calories,
        protein,
        carbs,
        fats,
        mealType, 
        userId
           }
        })

    //to see all products ingresado by end user
    await prisma.products.findMany({
        where:{
            userId: 1
        }
    });
    return Response.json({
        Message: "Producto agregado"
    })
    
}