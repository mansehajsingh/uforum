import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./CommunitiesPage.module";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import { useNavigate } from "react-router-dom";
import CommunityButton from "../../CommunityButton";

const CommunitiesPage = (props) => {
    
    const navigate = useNavigate();
    const cookies = new Cookies();
    
    const [communities, setCommunities] = useState(null);

    const COMMUNITIES_FILTER_TYPES = {
        OWNED: 1,
        CURATED: 2,
        MEMBER: 3,
    }

    useEffect(() => {
        let sessionValue = cookies.get("uforum_session");
        sessionValue ? null : navigate("/");

        let sessionObj = { session: sessionValue }
 
        axios.post("/api/get-communities", sessionObj)
            .then(response => {
                setCommunities(response.data)
            });
            
    }, []);

    const renderCommunities = (filterType) => {

        if(!communities) return (<></>);

        let filteredCommunities = communities.filter(community => {
            return community.join_type == filterType;
        });

        let communityButtons = filteredCommunities.map(community => {
            return ( 
                <CommunityButton 
                    name={community.community.name}
                    description={community.community.description}
                    communityID={community.community.community_id}
                    key={community.community.community_id}
                />
            );
        });

        if (communityButtons.length == 0) {
            return (
                <div class={styles.empty_placeholder}>
                    <p>Nothing to see here.</p>
                </div>
            );
        }

        return communityButtons;
    }

    return (
        <div className={styles.content}>
            <h1 className={styles.title}>COMMUNITIES</h1>
            <div className={styles.buttons_wrapper}>
                <button className={styles.add_button}>Add</button>
                <button className={styles.create_button}>Create</button>
            </div>
            <h3 className={styles.subheading}>OWNED</h3>
            <div 
            className={styles.communities_wrapper}
            >
                {renderCommunities(COMMUNITIES_FILTER_TYPES.OWNED)}
            </div>
            <h3 className={styles.subheading}>CURATED</h3>
            <div 
            className={styles.communities_wrapper}
            >
                {renderCommunities(COMMUNITIES_FILTER_TYPES.CURATED)}
            </div>
            <h3 className={styles.subheading}>MEMBER OF</h3>
            <div 
            className={styles.communities_wrapper}
            >
                {renderCommunities(COMMUNITIES_FILTER_TYPES.MEMBER)}
            </div>
        </div>
    );

}

export default CommunitiesPage