import Head from 'next/head'
import React from "react"
import styles from '../styles/Signup.module.css'

export default function Signup() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to our App!
                </h1>

                <p className={styles.description}>
                    Get started by logging in / signing Up!
                </p>

                <form className={styles.grid}>
                    <h3 className={styles.field} style={{fontSize:"36px"}}> Name
                        <input type= "password" name={"pword"} className={styles.grid} ref={register({ required: true })}/>
                    </h3>


                    <h3 className={styles.field} style={{fontSize:"36px"}}> Email
                        <input type="email" name={"mail"} className={styles.grid} ref={register({required:true})}/>
                    </h3>


                    <h3 className={styles.field} style={{fontSize:"36px"}}> Password
                        <input type= "password" name={"pword"} className={styles.grid} ref={register({ required: true })}/>
                    </h3>
                    <input type={"submit"} className={styles.button1} value={"Login"}/>
                </form>

            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Created by Natalia Tuszko and Adrien Ventugol
                </a>
            </footer>
        </div>
    )
}