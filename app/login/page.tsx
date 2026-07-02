
///Libraries
'use client';
import { useState} from 'react';
import styles from './login_style.module.css';



export default function LoginPage(){
   
     const[email,setEmail] = useState("");
    const [password,setPassword] = useState("");
   

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
                    <form >
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

                        <button disabled={email==="" || password ===""? true:false}>Log In</button>

                        <p>Dont you have an account? <a href="/signup">Sign Up</a></p>
                    </form>
            </div>
        </section>
        );
    }
