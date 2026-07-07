'use client';
import styles from './dashboard_style.module.css';
//Importation from an extern library to use the visual gauge
//import Stack from '@mui/material/Stack';
import * as React from 'react';
import { useState } from "react";
import AddFoodModal from './components/foodmodal/FoodModal';
import { Gauge } from '@mui/x-charts/Gauge';
import { useEffect } from "react";


export default function DashboardPage(){

    /*======================
        TO OBTAIN THE DATE
    ======================*/
    const day = new Date();
    const currentDate = day.toLocaleDateString("en-US",{
        weekday:"long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    const [ShowModal, setShowModal] = useState(false);
    console.log("ShowModal:", ShowModal);
    const [mealType, setMealType] = useState("");

    const closeModal = () => {
        setShowModal(false);
        setMealType("");
    };

    type Product = {
        id: number;
        foodname: string;
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
    }

    const [breakfast, setBreakfast] = useState<Product[]>([]);
    const [lunch, setLunch] =  useState<Product[]>([]);
    const [dinner, setDinner] =   useState<Product[]>([]);



        const userId =
    typeof window !== "undefined"
        ? Number(localStorage.getItem("userId"))
        : null;

    useEffect(() => {
    if (!userId) return;

    fetch(`/api/showproduct?userId=${userId}&mealType=breakfast`)
        .then(res => res.json())
        .then(setBreakfast);

    fetch(`/api/showproduct?userId=${userId}&mealType=lunch`)
        .then(res => res.json())
        .then(setLunch);

    fetch(`/api/showproduct?userId=${userId}&mealType=dinner`)
        .then(res => res.json())
        .then(setDinner);

}, [userId]);


const [showAllBreakfast, setShowAllBreakfast] = useState(false);
const [showAllLunch, setShowAllLunch] = useState(false);
const [showAllDinner, setShowAllDinner] = useState(false);

const breakfastToShow = showAllBreakfast
 ? breakfast: breakfast.slice(0,2);

 const lunchToShow =showAllLunch
    ? lunch
    : lunch.slice(0,2);

const dinnerToShow = showAllDinner
    ? dinner
    : dinner.slice(0,2);


    const AllProducts = [
        ...breakfast,
        ...lunch, 
        ...dinner
    ]


    const totalcalorias = AllProducts.reduce((total,item) => total + item.calories, 0);
    const totalProtein = AllProducts.reduce((total,item) => total + item.protein,0);
    const totalCarbs = AllProducts.reduce((total, item) => total + item.carbs,0);
    const totalFats = AllProducts.reduce((total,item) => total + item. fats, 0);

    const calorieGoal = 2000;
    const gaugeValue = (totalcalorias/calorieGoal) * 100;

    /*DELTE BUTTON */
    const deleteProduct = async(id: number) =>{
        await fetch("api/deleteproduct", {
            method: "DELETE", 
            headers: {
                "Content-Type" : "application/json"
              }, 
              body: JSON.stringify({id})
        }); 

        window.location.reload();
    };

return(

    <>
    
    {/*==========================================
                HEADER SECTION
    ===========================================*/}
        <header className={styles.header}>
            <p>Calorie Tracker</p>
            <a >Log out</a>
         </header>
    
    {/*==========================================
               BODY SECTION
    ===========================================*/}
           
        <main className={styles.main}>
            <h3>{currentDate}</h3>

            <section className={styles.indicator_section}>

                  {/*===================
                        Gauge
                  ===================*/}
                 <Gauge
                    className={styles.gauge}
                    value={gaugeValue}
                    startAngle={-110}
                    endAngle={110}
                    sx={{
                        '& .MuiGauge-valueText': {
                            fontSize: 30,
                            transform: 'translate(0px,0px)'
                        }
                    }}
                    text={() => `${totalcalorias} / ${calorieGoal}`}
                />

                  {/*======================
                        Goal / Remaining
                  ======================*/}
                <div className={styles.goal_remaining_container}>
                    {/* goal */}
                    <div className={styles.goal}>
                        <p>{calorieGoal}</p>
                        <p>{totalcalorias}</p>
                    </div>

                    {/* remaining */}
                    <div className={styles.remaining}>
                        <p>REMAINING</p>
                        <p>{calorieGoal - totalcalorias}</p>
                       
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
                            <span>{totalProtein}</span>
                        </div>
                </div>
                        
                {/* carbohydrates */}
                <div className={styles.nutrient}>
                        <div className={styles.nutrient_header}>
                            <span>Carbohydrates: </span>
                            <span>{totalCarbs}</span>
                    </div>
                </div>
                        
                {/* fats */}
                <div className={styles.nutrient}>
                    <div className={styles.nutrient_header}>
                            <span>Fats: </span>
                            <span>{totalFats}</span>
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
                            {breakfast.length === 0 ? (
                                    "No foods added yet"
                                ) : (
                                    breakfastToShow.map((item) => (
                                    <div key={item.id} className={styles.product_items}>
                                        <p >
                                        {item.foodname} - {item.calories}kcal |  Protein: {item.protein} | Carbohydrates: {item.carbs} | Fats: {item.fats}
                                        </p>

                                        <button className={styles.delete_button} onClick={() => deleteProduct(item.id)}>Delete</button>
                                    </div> 
                                    ))
                                )}
                        </div>

                        <button className={styles.view_more}
                        onClick={() => setShowAllBreakfast(!showAllBreakfast)}>
                            {showAllBreakfast ? "view less" : "view more"}
                        </button>

                        <button className={styles.add_food_button} onClick={() => {console.log("CLICK"); setMealType("breakfast");
                            setShowModal(true);
                            }}>
                            + Add food
                        </button>
                    </div>

                     {/*==========================
                           LUNCH    
                    ==========================*/}
                     <div className={styles.meal_card}>
                        <h3>🍽️ Lunch</h3>
                        
                        <div className={styles.meal_content}>
                            {lunch.length === 0 ? (
                                    "No foods added yet"
                                ) : (
                                    lunchToShow.map((item) => (
                                   <div key={item.id} className={styles.product_items}>
                                        <p >
                                        {item.foodname} - {item.calories}kcal |  Protein: {item.protein} | Carbohydrates: {item.carbs} | Fats: {item.fats}
                                        </p>

                                        <button className={styles.delete_button} onClick={() => deleteProduct(item.id)}>Delete</button>
                                    </div>  
                                    ))
                                )}
                        </div>

                        <button className={styles.view_more} onClick={() => setShowAllLunch(!showAllLunch)}>
                            View more
                        </button>

                         <button className={styles.add_food_button} onClick={() => {console.log("CLICK"); setMealType("lunch");
                            setShowModal(true);
                            }}>
                            + Add food
                        </button>
                    </div>

                            
                    {/*==========================
                            DINNER    
                    ==========================*/}

                    
                     <div className={styles.meal_card}>
                        <h3>🌙 Dinner</h3>
                        
                        <div className={styles.meal_content}>
                            {dinner.length === 0 ? (
                                    "No foods added yet"
                                ) : (
                                    dinnerToShow.map((item) => (
                                    <div key={item.id} className={styles.product_items}>
                                        <p >
                                        {item.foodname} - {item.calories}kcal |  Protein: {item.protein} | Carbohydrates: {item.carbs} | Fats: {item.fats}
                                        </p>

                                        <button className={styles.delete_button} onClick={() => deleteProduct(item.id)}>Delete</button>
                                    </div> 
                                    ))
                                )}
                        </div> 

                        <button className={styles.view_more} onClick={() => setShowAllDinner(!showAllDinner)}>View more </button>
                        
                        <button className={styles.add_food_button} onClick={() => {console.log("CLICK"); setMealType("dinner");
                            setShowModal(true);
                            }}>
                            + Add food
                        </button>
                    </div>
                </section>
            </main>

                    
            <AddFoodModal
            open={ShowModal}
            onClose={closeModal}
            mealType={mealType}
            />

        </>
    );
}

