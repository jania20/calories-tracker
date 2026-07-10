'use client';
///Libraries
import Modal from "@mui/material/Modal";
import styles from './goalmodal_styles.module.css';
import {useState} from 'react';


    //this file receive the data types of the variable to know which type is going to be working with 
   type Props = {
        open: boolean,
        onClose : () => void,
        userId: number
   }
    
export default function AddGoal({open, onClose, userId}: Props){
    
    /*=====================================
            STATES OF THE INPUTS
    =====================================*/
    const [calories_goal, setcalories_goal] = useState("");
    const [protein_goal, setprotein_goal] = useState("");
    const [carbs_goal, setcarbs_goal] = useState("");
    const [fats_goal, setfats_goals] = useState("");
    


    /*=====================================
    EVENT THAT TRIGGERS WHEN CLICKING THE ADD PRODUCT
    =====================================*/
    const  handleGoal = async (e: React.FormEvent) => {
        e.preventDefault();

        if (calories_goal.trim() === "" || protein_goal.trim() === "" || carbs_goal.trim() === "" || fats_goal.trim() === "") {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const num_cal = Number(calories_goal);
        const num_protein = Number(protein_goal);
        const num_carbs = Number(carbs_goal);
        const num_fats = Number(fats_goal);
        
        const respuesta = await fetch('/api/addgoal', {
            method: 'POST', 
            headers: {
                'Content-Type' :  'application/json', 
            }, 
            body: JSON.stringify({
                userId,
                calories_goal: num_cal,
                protein_goal: num_protein,
                carbs_goal: num_carbs,
                fats_goal: num_fats
            })
        });

        if(!respuesta.ok){
            alert("Error")
        }
        onClose();
        window.location.reload();
    }

        
    
       
    
    return(
   <Modal open={open} onClose={onClose} >

    <form className={styles.modal} onSubmit={handleGoal} >
        <h2>Add goals </h2>

        <input type="text" className={styles.nameProduct_input} placeholder="Calories" value={calories_goal} onChange={(e) => setcalories_goal(e.target.value)} ></input>

        <div className={styles.micronutrients_inputsContainer}>
            <input type="number" className={styles.protein_input} placeholder="protein" value={protein_goal} onChange={(e) => setprotein_goal(e.target.value)} ></input>
            <input type="number" className={styles.carbs_input} placeholder="carbs" value={carbs_goal} onChange={(e) => setcarbs_goal(e.target.value)}></input>
          <input type="number" className={styles.fats_input} placeholder="fats" value={fats_goal} onChange={(e) => setfats_goals(e.target.value)}></input>
        </div>
      
        <div className={styles.buttonsContainer} >
                <button type="submit" className={styles.addButton}  >
                    Save Goal
                </button>

                <button
                type="button"
                    className={styles.cancelButton} onClick={onClose}>
                    Cancel
                </button>
            </div>
    </form>
   
   </Modal>
     );
    }
