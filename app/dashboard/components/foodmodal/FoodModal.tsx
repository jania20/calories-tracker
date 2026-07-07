'use client';
///Libraries
import Modal from "@mui/material/Modal";
import styles from './modal_style.module.css';
import {useState} from 'react';

  type Props = {
    open: boolean;
    onClose: () => void;
    mealType:  string;
  };




export default function AddFoodModal({open, onClose, mealType}:Props){

   const [foodname, setfoodname] = useState("");
   const [calories, setcalories] = useState("");
   const [protein, setprotein] = useState("");
   const [carbs, setcarbs] = useState("");
   const [fats, setfats]= useState("");

   
   
   async function handleAddProduct(e: React.FormEvent){
    e.preventDefault();

    

    if(!foodname || !calories|| !protein || !carbs|| !fats){
        alert("Los campos no pueden estar vacios.");
        return;
    }

    if(isNaN(Number(calories)) || isNaN(Number(protein)) || isNaN(Number(carbs)) || isNaN(Number(fats))){
      {alert("Solo numeros validos")}
      return
    }

    const userId = Number(localStorage.getItem("userId"));
    alert("Producto agregado exitosamente");

      const response = await fetch("/api/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodname,
        calories,
        protein,
        carbs,
        fats,
        mealType,
        userId,
      }),
    });

     if (response.ok) {
      window.location.reload();
   }

    onClose();
    setfoodname("");
    setcalories("");
    setprotein("");
    setcarbs("");
    setfats("");
    }
   
  
    console.log("Modal abierto:", open);
    return(
   <Modal open={open} onClose={onClose}>

    <form className={styles.modal} onSubmit={handleAddProduct}>
        <h2>Add food </h2>

        <input type="text" className={styles.nameProduct_input} placeholder="Food name" value={foodname} onChange={(e) => setfoodname(e.target.value)}></input>
        <input type="number" className={styles.calories_input} placeholder="Calories (kcal)" value={calories} onChange={(e) => setcalories(e.target.value)}></input>

        <div className={styles.micronutrients_inputsContainer}>
            <input type="number" className={styles.protein_input} placeholder="Protein g" value={protein} onChange={(e) => {setprotein(e.target.value)}}></input>
            <input type="number" className={styles.carbs_input} placeholder="Carbs g" value={carbs}  onChange={(e) => setcarbs(e.target.value)}></input>
          <input type="number" className={styles.fats_input} placeholder="Fat g" value={fats}  onChange={(e) => setfats(e.target.value)}></input>
        </div>
      
        <div className={styles.buttonsContainer}>
                <button type="submit" className={styles.addButton} >
                    Add product
                </button>

                <button
                type="button"
                    className={styles.cancelButton}
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
    </form>
   
    
   </Modal>
     );
    }
