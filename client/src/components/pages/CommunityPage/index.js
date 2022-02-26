import React, { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import styles from "./CommunityPage.module";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../NavigationBar";
import PostButton from "../../PostButton";
import { fetchPostsByCommunity } from "../../../utils/actions";

const CommunityPage = (props) => {

    const { community_id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [communityName, setCommunityName] = useState("Community");
    const [communityDescription, setCommunityDescription] = useState("");
    const [communityOwner, setCommunityOwner] = useState("");

    const [posts, setPosts] = useState([]);

    const cookies = new Cookies();

    useEffect(() => {
        let sessionValue = cookies.get("uforum_session");
        sessionValue ? null : navigate("/");

        let sessionObj = { session: sessionValue }
        
        fetchPostsByCommunity(community_id, sessionObj)
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
                    id={post.post_id}
                    onClick={() => {
                        setSearchParams({
                            post: post.post_id
                        });
                    }}
                    key={post.community}
                />
            );

        });

        return postButtons.reverse();
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
                <div className={styles.post_wrapper}>
                    
                </div>
            </div>
        </>
    );

}

export default CommunityPage