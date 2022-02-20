import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./CommunityPage.module";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../NavigationBar";
import PostButton from "../../PostButton";

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
                    <div className={styles.sidebar_content}>
                        <PostButton 
                            title={"This is a post title."}
                            content={"This is the content of the post, hi hello lol."}
                        />
                        <PostButton 
                            title={"This is a post title."}
                            content={"This is the content of the post, hi hello lol."}
                        />
                        <PostButton 
                            title={"This is a post title."}
                            content={"This is the content of the post, hi hello lol."}
                        />
                        <PostButton 
                            title={"This is a post title."}
                            content={"This is the content of the post, hi hello lol."}
                        />
                    </div>
                </div>
            </div>
        </>
    );

}

export default CommunityPage