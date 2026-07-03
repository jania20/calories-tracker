'use client';
import styles from './dashboard_style.module.css';
//Importation from an extern library to use the visual gauge
//import Stack from '@mui/material/Stack';
import * as React from 'react';
import LinearProgress from "@mui/material/LinearProgress";

import { Gauge } from '@mui/x-charts/Gauge';


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


return(

    <>
    {/*==========================================
                HEADER SECTION
    ===========================================*/}
        <header className={styles.header}>
            <div>
                <p>Calorie Tracker</p>
            </div>

            <div className={styles.logout_link}>
                    <a >Log out</a>
            </div>
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
                 <Gauge className={styles.gauge}
                    value={75}
                    startAngle={-110}
                    endAngle={110}
                    sx={{
                        '& .MuiGauge-valueText': {
                        fontSize: 30,
                        transform: 'translate(0px, 0px)',
                         },
                        }}
                        text={({ value, valueMax }) => `${value} / ${valueMax}`}
                    />
                    
                {/* Goal/Remaing container */}
                <div>
                    {/* goal */}
                    <div>
                        <p>GOAL</p>
                        <h3></h3>
                    </div>

                    {/* remaining */}
                    <div>
                        <p>REMAINING</p>
                        <h3></h3>
                    </div>
                </div>

                {/*===================
                      Micronutrients
                  ===================*/} 
                <div className={styles.micronutrients}>

                    {/* protein */}
                    <div>
                        <h5>PROTEIN</h5>
                        <LinearProgress
                            variant="determinate"
                            value={75}
                                    
                            sx={{
                                height: 12,
                                borderRadius: 5,
                                color: "success",
                                width: 200,
                                backgroundColor: '#8e8e8ea2',
                                '& .MuiLinearProgress-bar': {
                                backgroundColor: '#73bc99dc', // Color de la barra de progreso activa
                                    },
                                }}
                            />
                    </div>
                        
                {/* carbohydrates */}
                <div>
                    <h5>CARBOHYDRATES</h5>
                    <LinearProgress
                        variant="determinate"
                        value={75}

                        sx={{
                            height: 12,
                            borderRadius: 5,
                            color: "success",
                            width: 200,
                            backgroundColor: '#8e8e8ea2',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#73bc99dc', // Color de la barra de progreso activa
                                    },
                                }}
                            />
                        </div>
                        
                        {/* fats */}
                        <div>
                            <h5>FATS</h5>
                               <LinearProgress
                                    variant="determinate"
                                    value={75}
                                    
                                    sx={{
                                        height: 12,
                                        borderRadius: 5,
                                        color: "success",
                                        width: 200,
                                        backgroundColor: '#8e8e8ea2',
                                        '& .MuiLinearProgress-bar': {
                                          backgroundColor: '#73bc99dc', // Color de la barra de progreso activa
                                          },
                                        }}
                                    />
                        </div>
                   
                    </div>

                </section>

                {/* Meals section */}
                <section>
                    <p>Register todays meal</p>

                    {/* Breakfast section */}
                    <div></div>
                    {/* Lunch section */}
                    <div></div>

                    {/* Dinner section */}
                    <div></div>
                </section>
            </main>

        </>
    );
}