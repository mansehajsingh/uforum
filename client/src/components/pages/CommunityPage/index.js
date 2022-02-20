import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./CommunityPage.module";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../NavigationBar";

const CommunityPage = (props) => {

    const { community_id } = useParams();

    const [communityName, setCommunityName] = useState("Community");
    const [communityDescription, setCommunityDescription] = useState("");
    const [communityOwner, setCommunityOwner] = useState("");

    return (
        <>
            <NavigationBar />
            <div className={styles.content}>
                <div className={styles.sidebar}>
                </div>
            </div>
        </>
    );

}

export default CommunityPage