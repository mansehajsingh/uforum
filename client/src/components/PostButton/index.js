import React, { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import styles from "./PostButton.module";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import { useNavigate } from "react-router-dom";

const PostButton = (props) => {

    return (
        <div className={styles.button_wrapper} onClick={props.onClick}>
            <p className={styles.title_text}>{props.title}</p>
            <p className={styles.content_text}>{props.content}</p>
        </div>
    );

}

export default PostButton
