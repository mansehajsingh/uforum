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

    const [posts, setPosts] = useState([]);

    const cookies = new Cookies();

    useEffect(() => {
        let sessionValue = cookies.get("uforum_session");
        sessionValue ? null : navigate("/");

        let requestObj = { session: sessionValue }
        
        axios.post(`/api/communities/${community_id}/posts`, requestObj)
            .then(response => {
                setPosts(response.data);
            });
            
    }, []);

    const fillPostButtons = () => {
        let postButtons = posts.map(post => {
            
            return (
                <PostButton
                    title={post.title}
                    content={post.content}
                    key={post.community}
                />
            );

        });

        return postButtons;
    }

    return (
        <>
            <NavigationBar />
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <div className={styles.sidebar_content}>
                        {fillPostButtons()}
                    </div>
                </div>
            </div>
        </>
    );

}

export default CommunityPage