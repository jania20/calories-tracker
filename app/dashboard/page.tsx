"use client"
import { useRouter } from 'next/navigation'
import styles from "./styles_dashboard.module.css"
import { Gauge } from '@mui/x-charts/Gauge';
import { useState, useEffect} from "react";
import AddFoodModal from "../foodmodal/foodmodal";
import { Products, Goal } from '@prisma/client';
import  AddGoal from "../goalmodal/page";


export default function DashboardPage(){

    //state that indicate the modal status (true or false)
    const [showModal, setshowModal] = useState(false);
    const [mealType, setmealType] = useState("");
    const [product, setproduct] = useState<Products[]>([]);
    const [Addgoal, setAddgoal] = useState(false);
    const [showgoal, setshowgoal] = useState<Goal | null>(null);
    const router = useRouter();

    //to obtain the user id
    const storedUserId =
    typeof window !== "undefined"
        ? localStorage.getItem("userId")
        : null;

    const userId = storedUserId ? Number(storedUserId) : null
    


     //function to close the modal
    // to close the modal once I call this funcion
    const closeModal = () => {
        setshowModal(false);
    }
    const closeAddgoal = () =>{
        setAddgoal(false);
    }

    console.log("modal status: " +showModal);

    
        /*==========
        TO LOGOUT
        ==========*/
    const handleLogout = () =>{
        localStorage.removeItem("userId");
        router.push("/login");
    }
    
    useEffect(() =>{

    if (userId === null || Number.isNaN(userId)) return;

    const getGoal = async () => {

        const response = await fetch(`/api/showgoalroute?userId=${userId}`);

        const data = await response.json();

        setshowgoal(data);
    };

     getGoal();
    }, [userId]);

    /*=====================
    TO OBTAIN ALL PRODUCTS
    =====================*/
    useEffect(() => {
        if (userId === null || Number.isNaN(userId)) return;
        const getProducts = async () => {
            const response = await fetch(`/api/showproductroute?userId=${userId}`);
            const data = await response.json();
            setproduct(data);
        };
        if (!userId) return;
            getProducts();
    }, [userId]);

    /*=====
    DELETE PRODUCT
    ======*/
    const deleteProduct = async (id: number) => {

    const response = await fetch("/api/deleteproductroute", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
        }),
    });

    const data = await response.json();

    if(response.ok){
        console.log(data.message);

        setproduct((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
        );
    }
};

    //BREAKFAST FOOD
    const breakfastFood = product.filter(
        product=> product.mealType === "breakfast"
    ); 
  const lunchFood = product.filter(
        product => product.mealType === "lunch"
    );
    const dinnerFood = product.filter(
        product => product.mealType === "dinner"
    );
      /*=======
        TO OBTAIN SUM OF CALORIES AND MICRONUTRIENTS
    ===========*/

     const sum_calories = product.reduce(
      (total, product) => total + product.calories, 0
    ); 
    const sum_protein = product.reduce(
        (total, product) => total + product.protein, 0
    );
    const sum_carbs = product.reduce(
        (total, product) => total + product.carbs, 0
    );
    const sum_fats = product.reduce(
        (total, product) => total + product.fats, 0
    );

    
    if (userId === null || Number.isNaN(userId)) {
    return <p>You must log in first.</p>;

    }

    const hasGoal = showgoal !== null;
    const percentage = hasGoal
        ? (sum_calories / showgoal.calories_goal) * 100
        : 0;
    const gaugeColor = !hasGoal
        ? "#9E9E9E"    
        : percentage < 70
        ? "#4CAF50"    
        : percentage < 100
        ? "#FFC107"   
        : "#F44336";  
        
    const remainingCalories = showgoal
    ? Math.max(showgoal.calories_goal - sum_calories, 0)
    : null;

    
    
return(

  
    <>
      
    
    {/*==========================================
                HEADER SECTION
    ===========================================*/}
        <header className={styles.header}>
            <p>Calorie Tracker</p>
            <button  className={styles.logout} onClick={handleLogout}> Log out </button>
         </header>
    
    {/*==========================================
               BODY SECTION
    ===========================================*/}
           
        <main className={styles.main}>
            <h3>
                {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })}
            </h3>

            <section className={styles.indicator_section}>

                  {/*===================
                        Gauge
                  ===================*/}
                    <button className={styles.addgoals} onClick={() => setAddgoal(true)}>Add/Modify Goal</button>
                  
                   <div className={styles.gauge_container}>
                        <Gauge
                            className={styles.gauge}
                            value={sum_calories}
                            valueMax={showgoal?.calories_goal ?? Math.max(sum_calories, 1)}
                            startAngle={-110}
                            endAngle={110}
                            sx={{
                                "& .MuiGauge-valueArc": {
                                    fill: gaugeColor,
                                },
                                "& .MuiGauge-referenceArc": {
                                    fill: "#e0e0e0",
                                },
                                "& .MuiGauge-valueText": {
                                    fontSize: 16,
                                },
                            }}
                            text={() =>
                                `${sum_calories} / ${
                                    showgoal?.calories_goal ?? "No goal"
                                }`
                            }
                        />
                    </div>
                  {/*======================
                        Goal / Remaining
                  ======================*/}
                <div className={styles.goal_remaining_container}>
                    {/* goal */}
                    <div className={styles.goal}>
                        <p>GOAL</p>
                        <p>{showgoal? `${showgoal.calories_goal} kcal`: "No goal"}</p>
                    </div>

                    {/* remaining */}
                    <div className={styles.remaining}>
                        <p>REMAINING</p>
                        <div className={styles.remaining_value}>
                            <p>{showgoal ? `${remainingCalories} kcal` : "No goal"}</p>

                            {percentage > 100 && (
                                <>
                                <span>-</span>
                                <p className={styles.over_goal}> You have exceeded your goal! </p>
                                </>
                            )}
                    </div>
                </div>
            </div>

                {/*===================
                      Macronutrients
                  ===================*/} 
                <div className={styles.micronutrients}>

                    {/* protein */}
                    <div className={styles.nutrient}>
                        <div className={styles.nutrient_header}>
                            <span>Protein: </span>
                            <span>{sum_protein} / {showgoal?.protein_goal ?? "No goal"}</span>
                        </div>
                </div>
                        
                {/* carbohydrates */}
                <div className={styles.nutrient}>
                        <div className={styles.nutrient_header}>
                            <span>Carbs: </span>
                            <span>{sum_carbs} / {showgoal?.carbs_goal ?? "No goal"}</span>
                    </div>
                </div>
                        
                {/* fats */}
                <div className={styles.nutrient}>
                    <div className={styles.nutrient_header}>
                            <span>Fats: </span>
                            <span>{sum_fats} / {showgoal?.fats_goal ?? "No goal"}</span>
                        </div>
                    </div>
                </div>
    </section>

    {/*==========================================================
                        MEALS
    ==========================================================*/}
                <section className={styles.meals_section}>
                    <h2>Meals</h2>

                    {/*==========================
                            BREAKFAST
                    ==========================*/}
                    <div className={styles.meal_card}>
                        <h3>🌄 Breakfast</h3>
                        
                        <div className={styles.meal_content}>
                           {breakfastFood.map((product) =>(
                                <div className={styles.product_item} key={product.id}>
                                    <p>
                                        {product.foodname} | Calories: {product.calories} kcal | Protein: {product.protein} g | Carbs: {product.carbs} g | Fats: {product.fats} g 
                                    </p>

                                    <button 
                                        className={styles.delete_button} 
                                        onClick={() => deleteProduct(product.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}                           

                        </div>
                        <button className={styles.view_more}>
                          View more
                        </button>

                        <button className={styles.add_food_button}  onClick={() => { setshowModal(true); setmealType("breakfast")}}  >
                            + Add food
                        </button>
                    </div>

                     {/*==========================
                           LUNCH    
                    ==========================*/}
                     <div className={styles.meal_card}>
                        <h3>🍽️ Lunch</h3>
                        
                        <div className={styles.meal_content}>
                               {lunchFood.map((product) =>(
                                <div className={styles.product_item} key={product.id}>
                                    <p>
                                        {product.foodname} | Calories: {product.calories} kcal | Protein: {product.protein} g | Carbs: {product.carbs} g | Fats: {product.fats} g 
                                    </p>

                                    <button 
                                        className={styles.delete_button} 
                                        onClick={() => deleteProduct(product.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                            <button className={styles.view_more}>
                            View more
                            </button>                

                            <button className={styles.add_food_button} onClick={() => {setshowModal(true); setmealType("lunch")}} >
                                + Add food
                            </button>
                    </div>

                            
                    {/*==========================
                            DINNER    
                    ==========================*/}
                    <div className={styles.meal_card}>
                        <h3>🌙 Dinner</h3>

                            <div className={styles.meal_content}>
                                {dinnerFood.map((product) =>(
                                    <div className={styles.product_item} key={product.id}>
                                        <p>
                                            {product.foodname} | Calories: {product.calories} kcal | Protein: {product.protein} g | Carbs: {product.carbs} g | Fats: {product.fats} g 
                                        </p>

                                        <button 
                                            className={styles.delete_button} 
                                            onClick={() => deleteProduct(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button className={styles.view_more}>
                                View more
                            </button>
                            
                            <button 
                                className={styles.add_food_button} 
                                onClick={() => {
                                    setshowModal(true); 
                                    setmealType("dinner")
                                }}
                            >
                                + Add food
                            </button>
                        </div>
                </section>
            </main>
            
            <AddFoodModal
                open = {showModal}
                onClose  = {closeModal}  
                mealType = {mealType}
                userId={userId}
            />

            <AddGoal
                open = {Addgoal}
                onClose = {closeAddgoal}
                userId={userId}
                />
                    
        </>
    );
}

