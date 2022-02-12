import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import styles from "./SignUpPage.module";
import axios from "axios";
import { Snackbar } from "@mui/material";
import { Slide } from "@mui/material";
import "./SignUpPage.module.scss"
import Cookies from "universal-cookie/es6";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const SignUpPage = (props) => {

    const [firstRender, setFirstRender] = useState(true);

    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
    const [snackBarText, setSnackBarText] = useState("");

    const [signUpButtonText, setSignUpButtonText] = useState("Sign Up");
    const [disableSignUp, setDisableSignUp] = useState(false);
 
    const navigate = useNavigate();

    useEffect(() => { // checks to see if a cookie exists already on page load
        cookies.get("uforum_session") ? navigate("/communities") : null;
        setFirstRender(false);
    }, []);

    useEffect(() => {
        if(!firstRender) validateUsername();
    }, [username]);

    useEffect(() => {
        if (!firstRender) validateFullName();
    }, [fullName]);

    useEffect(() => {
        if (!firstRender) validatePassword();
    }, [password]);

    
    const sendCredentials = () => { // sends sign up credentials to the server
        const requestData = {
            username: username,
            full_name: fullName,
            password: password
        }

        axios.post("/api/create-user", requestData)
            .then(response => {
                navigate("/");
            })
            .catch(error => {
                error.response.status == 409 
                ? setSnackBarText("Username already taken.") 
                : setSnackBarText("Someting went wrong.");

                setIsSnackBarOpen(true);
                setPassword("");
                setSignUpButtonText("Sign Up");
                setDisableSignUp(false);
            });
    }

    const validateInput = () => {
        let usernameValid = validateUsername();
        let passwordValid = validatePassword();
        let fullNameValid = validateFullName();
        return usernameValid && passwordValid && fullNameValid;
    }

    const validateUsername = () => {
        let message = "";

        let re = /^[a-z0-9]+$/i;

        message = username.length < 4 || username.length > 20 ?
                  "Please enter a username between 4-20 characters inclusive." :
                  message;

        let test = re.test(username.replace("_", ""));

        message = !test && username.replace("_", "") ?
                  "Username can only contain letters, numbers, and underscores." :
                  message;

        message = !username ? 
                  "Please enter a username." : 
                  message;

        setUsernameError(message);
        return !!!message;
    }

    const validateFullName = () => {
        fullName ? setFullNameError("") : setFullNameError("Please enter a full name.");

        fullName.length > 30 
        ? setFullNameError("Full name must be at most 30 characters.") 
        : null;

        return !!fullName;
    }

    const validatePassword = () => {
        let message = "";

        message = password.length < 4 || password.length > 30 ?
                  "Please enter a password between 4-30 characters inclusive." :
                  message;

        message = !password ?
                  "Please enter a password." :
                  message;

        setPasswordError(message);
        return !!!message;
    }

    const handleSignUpButtonClick = () => {
        setDisableSignUp(true);
        setSignUpButtonText("Please Wait");
        validateInput() ? sendCredentials() : setSignUpButtonText("Sign Up");
    }

    return (
        <div className={styles.content}>
            <form className={styles.sign_up_form}>
                <img className={styles.sign_up_form_logo}  src="../../../../static/public/images/uforum_logo_white.svg"/>
                <input 
                    className={styles.username_input} 
                    placeholder="Username"
                    value={username}
                    onInput={e => setUsername(e.target.value)}
                    spellCheck="false"
                />
                <p className={styles.input_error}>{usernameError}</p>
                <input
                    className={styles.full_name_input}
                    placeholder="Full Name"
                    value={fullName}
                    onInput={e => setFullName(e.target.value)}
                    spellCheck="false"
                />
                <p className={styles.input_error}>{fullNameError}</p>
                <input 
                    className={styles.password_input} 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onInput={e => setPassword(e.target.value)}
                />
                <p className={styles.input_error}>{passwordError}</p>
                <p className={styles.sign_in_message}>Already have an account? <Link to="/">Login.</Link></p>
                <button 
                    className={styles.submit_button} 
                    type="button"
                    onClick={handleSignUpButtonClick}
                    disabled={disableSignUp}
                >
                    {signUpButtonText}
                </button>
            </form>
            <Snackbar
                open={isSnackBarOpen}
                message={snackBarText}
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

export default SignUpPage