import {prisma} from '@/lib/prisma';


// to create an instace of prisma
//const prisma = new PrismaClient();

export async function POST(request:Request){

    try {

        //to receive the info from fron end
    const {foodname,calories,protein,carbs,fats, mealType, userId} = await request.json();
    
        //validate that calories and micronutrients are numbers
    if( typeof calories !== "number" ||typeof protein !== "number" ||typeof carbs !== "number" ||typeof fats !== "number"){
    return Response.json(
        {error:"Calories and macronutrients must be numbers"},
        {status:400}
    )   ;
    }


    if(!foodname.trim() || calories<=0 || protein< 0 || carbs<0 || fats <0){
          return Response.json({error: "Campos no pueden estar vacio. Las calorias y micronutrientes tienen que ser mayor o igual a cero"
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
            userId
        }
    });
    return Response.json({
        message: "Producto agregado"
    })
        
    } catch (error) {
        console.log(error);

        return Response.json(
            {error: "Server error"}, 
            {status: 500}
        )

    }
    
    
}