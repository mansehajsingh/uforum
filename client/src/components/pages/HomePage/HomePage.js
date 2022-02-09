import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import styles from "./HomePage.module";
import axios from "axios";
import { Snackbar, SnackbarContent } from "@mui/material";
import { Slide } from "@mui/material";
import "./HomePage.module.scss"

const HomePage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

    const validateInput = () => {
        username ? setUsernameError("") : setUsernameError("Please enter a username");
        password ? setPasswordError("") : setPasswordError("Please enter a password");

        return username && password;
    }

    const sendCredentials = () => {
        const requestData = {
            username: username,
            password: password
        }

        let response = axios.post("/api/login", requestData)
            .then(res => {
                
            })
            .catch(err => {
                setIsSnackBarOpen(true);
            });
    }

    return (
        <div className={styles.content}>
            <form className={styles.login_form}>
                <img className={styles.login_form_logo}  src="../../../../static/public/images/uforum_logo_white.svg"/>
                <input 
                    className={styles.username_input} 
                    placeholder="Username"
                    value={username}
                    onInput={e => setUsername(e.target.value)}
                    spellCheck="false"
                />
                <p className={styles.input_error}>{usernameError}</p>
                <input 
                    className={styles.password_input} 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onInput={e => setPassword(e.target.value)}
                />
                <p className={styles.input_error}>{passwordError}</p>
                <p className={styles.sign_in_message}>Don't have an account yet? <Link to="/sign-up">Sign up.</Link></p>
                <button 
                    className={styles.submit_button} 
                    type="button"
                    onClick={() => validateInput() ? sendCredentials() : null}
                >
                    Login
                </button>
            </form>
            <Snackbar
                open={isSnackBarOpen}
                message="Invalid credentials."
                autoHideDuration={5000}
                onClose={() => setIsSnackBarOpen(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                TransitionComponent={Slide}
                ContentProps={{ className: styles.error_snackbar }}
            />
        </div>
    );

}

export default HomePage