'use client';
import styles from './dashboard_style.module.css';
//Importation from an extern library to use the visual gauge
//import Stack from '@mui/material/Stack';
import * as React from 'react';
import LinearProgress from "@mui/material/LinearProgress";
import { useState } from "react";
import AddFoodModal from './components/foodmodal/FoodModal';
import { Gauge } from '@mui/x-charts/Gauge';

const LinearBar_style = {
    height: 12,
    borderRadius: 5,
    width: 200,
    backgroundColor: '#8e8e8ea2',
    '& .MuiLinearProgress-bar': {
        backgroundColor: '#73bc99dc'
    }
};



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
                    value={75}
                    startAngle={-110}
                    endAngle={110}
                    sx={{
                        '& .MuiGauge-valueText': {
                            fontSize: 30,
                            transform: 'translate(0px,0px)'
                        }
                    }}
                    text={({ value, valueMax }) => `${value} / ${valueMax}`}
                />

                  {/*======================
                        Goal / Remaining
                  ======================*/}
                <div className={styles.goal_remaining_container}>
                    {/* goal */}
                    <div className={styles.goal}>
                        <p>GOAL</p>
                        <p>235 kcal</p>
                    </div>

                    {/* remaining */}
                    <div className={styles.remaining}>
                        <p>REMAINING</p>
                        <p>345</p>
                       
                    </div>
                </div>

                {/*===================
                      Macronutrients
                  ===================*/} 
                <div className={styles.micronutrients}>

                    {/* protein */}
                    <div className={styles.nutrient}>
                        <div className={styles.nutrient_header}>
                            <span>Protein</span>
                            <span>90/140gz</span>
                        </div>
                          
                        <LinearProgress
                            variant="determinate"
                            value={75}
                                    
                            sx={LinearBar_style}
                            />
                </div>
                        
                {/* carbohydrates */}
                <div className={styles.nutrient}>
                        <div className={styles.nutrient_header}>
                            <span>Carbohydrates</span>
                            <span>90/140gz</span>
                    </div>
                            
                        <LinearProgress
                            variant="determinate"
                            value={75}
                                    
                            sx={LinearBar_style}
                            />
                </div>
                        
                {/* fats */}
                <div className={styles.nutrient}>
                    <div className={styles.nutrient_header}>
                            <span>Fats</span>
                            <span>90/140gz</span>
                    </div>
                         
                <LinearProgress
                    variant="determinate"
                    value={75}
                                    
                    sx={LinearBar_style}
                    />
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
                            No foods added yet
                        </div>

                        <button className={styles.view_more}>
                            View more →
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
                            No foods added yet
                        </div>

                        <button className={styles.view_more}>
                            View more
                        </button>

                        <button className={styles.add_food_button} onClick={() => {console.log("CLICK");   setMealType("lunch");
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
                            No foods added yet
                        </div>

                        <button className={styles.view_more}>View more </button>
                        
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

