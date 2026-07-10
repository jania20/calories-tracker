'use client';
///Libraries
import { useState} from 'react';
import styles from './login_style.module.css';
import { useRouter } from 'next/navigation';



export default function LoginPage(){
   
    const[email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();
    /*==========================================================
                        FUNCTIONS
    ==========================================================*/
    //email funciont
    const validEmail = (email: string) : boolean =>{
        const regex = /^[a-zA-Z0-9._+]+@(gmail\.com|outlook\.com)$/;
        return regex.test(email);
        }

   
        //Event executed once user click on the log in button
        const handleLogin = async (e: React.FormEvent) => {
            e.preventDefault();
    
                if(!validEmail(email)){
                    alert("Email invalido. Solamente puede empezar con letras,numeros,_,.,+ Depues terminar con @gmail.com/@outlook.com");
                    return;
                }
                
        //To send data to the backend
            const response = await fetch("/api/loginroute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                email: email,
                password: password                
                 }),
            });

            const data = await response.json();
            if (!response.ok){
                alert(data.error);
                return
            }

            localStorage.setItem("userId", data.userId);
            
            router.push('/dashboard');
            
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
                <h3>LOG IN</h3>
                    <form onSubmit={handleLogin}>
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
                            <input type="password" 
                                id="input_password" 
                                className={styles.input_password}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        </div>

                        <button disabled={email==="" || password ===""? true:false} >Log In</button>

                        <p>Dont you have an account? <a href="/signup"><span className={styles.signup_text}>Sign Up</span></a></p>
                    </form>
            </div>
        </section>
        );
    }
