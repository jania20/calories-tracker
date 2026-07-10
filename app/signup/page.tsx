
///Libraries
'use client';
import { useState} from 'react';
//To import tthe styles defined on the login_style.css
import styles from './signup_style.module.css'
import {useRouter} from "next/navigation";


/*import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'*/

export default function SignUpPage(){

     /*==========================================================
            VALIDATIONS USING USESTATE()
    ==========================================================*/ 

     
    //States of email and password
    const [lastname,setLastname] = useState("");
    const [name,setName] = useState("");
    const[email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();

    
   // const [type, setType] = useState('password');
   // const [icon, setIcon] = useState(eyeOff);

    //Event executed once user click on the log in button
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

            if(!validName(name)){
                alert("El nombre solo puede contener letras.")
                return;
            }

            if(!validLastname(lastname)){
                alert("El apellido solo puede contener letras.")
            }

            if(!validEmail(email)){
                alert("Email invalido. Solamente puede empezar con letras,numeros,_,.,+ Depues terminar con @gmail.com/@outlook.com");
                return;
            }

            if(!validPassword(password)){
                alert("Password incorrecto. Debe tener longitud minima de 8 caracteres, una mayuscula, un numero y un caracter ")
                return;
            }

            const response = await fetch("/api/registerroute",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name.trim(),
                    lastname: lastname.trim(), 
                    email, 
                    password
                })
            });
            
            //to use the useRouter()
            
            const data = await response.json();
            if(response.ok){
                alert("Usuario registrado exitosamente");
                router.push("/login");
            }else{
                alert(data.error);
                }
            }

            /*Conditional to show password within the input 

            const handleToggle = () => {
            if (type==='password'){
                setIcon(eye);
                setType('text')
            } else {
                setIcon(eyeOff)
                setType('password')
            }
            }*/
        

    /*==========================================================
                        FUNCTIONS
    ==========================================================*/
    //name function
    const validName = (name: string) : boolean =>{
            const regex = /^[a-zA-Z\s]+$/;
            return regex.test(name);
    }

    //lastname function
    const validLastname = (lastname: string) : boolean =>{
        const regex = /^[a-zA-Z\s]*$/;
        return regex.test(lastname);
    }
    
    //email funciont
    const validEmail = (email: string) : boolean =>{
        const regex = /^[a-zA-Z0-9._+]+@(gmail\.com|outlook\.com)$/;
        return regex.test(email);
        }

    //password function
    const validPassword = (password: string) : boolean =>{
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&*_!?.-])[a-zA-Z0-9@#$%&*_!?.-]{6,}$/;
        return regex.test(password);
    }


    
    /*==========================================================
                           UI
    ==========================================================*/

    return (
        <section>  
            <div className={styles.text_container}>
                <h1>Calorie Tracker</h1>       
                <p>Welcome to this app!</p>
             </div>
             
            <div className={styles.form_container}>
                <h3>REGISTER NEW ACCOUNT</h3>
                    <form onSubmit={handleRegister}>
                        <div className={styles.fields}>
                            <label htmlFor="input_name">Name: </label>
                            <input type="text" 
                                    id="input_name" 
                                    className={styles.fields}
                                    value = {name}
                                    onChange={(e) => setName(e.target.value)}
                                    />
                        </div>

                        <div className={styles.fields}>
                            <label htmlFor="input_lastname">Last Name:</label>
                            <input type="text" 
                                    id="input_lastname"
                                    value = {lastname}
                                    onChange = {(e) => setLastname(e.target.value)}
                                    />
                        </div>

                        <div className={styles.fields}>
                            <label htmlFor="input_email">Email: </label>
                            <input type="email" 
                                id="input_email" 
                                value={email}
                                className={styles.input_email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                        </div>

                        <div className={styles.fields}>
                            <label htmlFor="input_password">Password: </label>
                            <input type={password} 
                                id="input_password" 
                                className={styles.input_password}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        </div>

                        <button disabled={name==="" || email==="" || password==="" ? true:false}>Sign Up</button>
                        

                        <p>Do you already have an account? <a href="/login"><span>Log in</span></a></p>
                    </form>
            </div>
        </section>
    );
}
