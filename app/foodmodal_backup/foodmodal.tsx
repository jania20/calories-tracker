'use client';
///Libraries
import Modal from "@mui/material/Modal";
import styles from './styles_foodmodal.module.css';
import {useState} from 'react';

    //this file receive the data types of the variable to know which type is going to be working with 
   type Props = {
        open: boolean,
        onClose : () => void,
        mealType: string, 
        userId : number,
    }

export default function AddFoodModal({open, onClose, mealType, userId}:Props){
    
    /*=====================================
            STATES OF THE INPUTS
    =====================================*/
    const [foodname, setfoodname] = useState("");
    const [calories, setcalories] = useState("");
    const [protein, setprotein] = useState("");
    const [carbs, setcarbs] = useState("");
    const [fats, setfats] = useState("");


    /*=====================================
    EVENT THAT TRIGGERS WHEN CLICKING THE ADD PRODUCT
    =====================================*/
    const  AddProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        const caloriesNumber = Number(calories);
        const proteinNumber = Number(protein);
        const carbsNumber = Number(carbs);
        const fatsNumber = Number(fats);
        
        //validates empty fields
        if(foodname ==="" || caloriesNumber<0 ||proteinNumber<0 || carbsNumber<0 || fatsNumber<0){
            alert("Campos no pueden estar vacio. Las calorias y micronutrientes tienen que ser mayor o igual a cero");
            return;
        }
        alert("Producto agregado");
        console.log("producto agregado");
        onClose();
        window.location.reload();

        //To contect it to the back end
        const connect = await fetch('/apieraser/addproduct',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                foodname: foodname,
                calories: caloriesNumber,
                protein: proteinNumber,
                carbs: carbsNumber,
                fats: fatsNumber, 
                mealType,
                userId
            }
                ),
            })

        const result = await connect.json();
        console.log(result.message);

        //reset variables
        setfoodname("");
        setcalories("");
        setprotein("");
        setcarbs("");
        setfats("");     
    }
    
    return(
   <Modal open={open}  onClose={onClose}>

    <form className={styles.modal} onSubmit={AddProduct} >
        <h2>Add food </h2>

        <input type="text" className={styles.nameProduct_input} placeholder="Enter foodname" value={foodname} onChange={(e) => setfoodname(e.target.value)} ></input>
        <input type="number" className={styles.calories_input} placeholder="Calories" value={calories} onChange={(e) => setcalories(e.target.value)}></input>

        <div className={styles.micronutrients_inputsContainer}>
            <input type="number" className={styles.protein_input} placeholder="protein" value={protein} onChange={(e) => setprotein(e.target.value)} ></input>
            <input type="number" className={styles.carbs_input} placeholder="carbs" value={carbs} onChange={(e) => setcarbs(e.target.value)}></input>
          <input type="number" className={styles.fats_input} placeholder="fats" value={fats} onChange={(e) => setfats(e.target.value)}></input>
        </div>
      
        <div className={styles.buttonsContainer} >
                <button type="submit" className={styles.addButton}  >
                    Add product
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
