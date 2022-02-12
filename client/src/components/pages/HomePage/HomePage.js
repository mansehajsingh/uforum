import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import styles from "./HomePage.module";
import axios from "axios";
import { Snackbar } from "@mui/material";
import { Slide } from "@mui/material";
import "./HomePage.module.scss"
import Cookies from "universal-cookie/es6";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const HomePage = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

    const [loginButtonText, setLoginButtonText] = useState("Login");
    const [disableLogin, setDisableLogin] = useState(false);
 
    const navigate = useNavigate();

    useEffect(() => { // checks to see if a cookie exists already on page load
        cookies.get("uforum_session") ? navigate("/communities") : null;
    }, []);

    const validateInput = () => {
        username ? setUsernameError("") : setUsernameError("Please enter a username.");
        password ? setPasswordError("") : setPasswordError("Please enter a password.");

        return username && password;
    }

    const sendCredentials = () => { // sends login credentials to the server
        const requestData = {
            username: username,
            password: password
        }

        axios.post("/api/login", requestData)
            .then(res => {
                createCookie({
                    username: res.data.session.username,
                    session_id: res.data.session.session_id
                }, new Date(res.data.session.expiry_date));
                
                navigate('/communities');
            })
            .catch(err => {
                setIsSnackBarOpen(true);
                setPassword("");
                setLoginButtonText("Login");
                setDisableLogin(false);
            });
    }

    const createCookie = (data, expiry_date) => { // creates stringified cookie with the required data
        cookies.set("uforum_session", JSON.stringify(data), {
            path: "/",
            expires: expiry_date
        });
    }

    const handleLoginButtonClick = () => {
        setDisableLogin(true);
        setLoginButtonText("Please Wait");
        validateInput() ? sendCredentials() : setLoginButtonText("Login");
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
                    onClick={handleLoginButtonClick}
                    disabled={disableLogin}
                >
                    {loginButtonText}
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