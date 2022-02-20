import React, { useState } from "react";
import styles from "./CommunityButton.module";
import { useNavigate } from "react-router-dom";

// component imports
import CommunityIcon from "../CommunityIcon";

const CommunityButton = (props) => {

    const [accentBGColor, setAccentBGColor] = useState("#F3F5F6");
    const navigate = useNavigate();

    const goToCommunityPage = () => {
        navigate(`/communities/${props.communityID}`);
    }

    return (
        <div 
            className={styles.button_wrapper}
            onMouseOver={() => setAccentBGColor("#16bac5")}
            onMouseOut={() => setAccentBGColor("#F3F5F6")}
            onClick={goToCommunityPage}
        >
            <div 
                className={styles.button_accent}
                style={{
                    backgroundColor: accentBGColor
                }}
            ></div>
            <div className={styles.button_content}>
                <div className={styles.left}>
                    <p className={styles.title}>{props.name}</p>
                    <p className={styles.description}>{props.description}</p>
                    <p className={styles.id_label}>community_id: {props.communityID}</p>
                </div>
                <div className={styles.right}>
                    <CommunityIcon title={props.name} />
                </div>
            </div>
        </div>
    );

}

export default CommunityButton