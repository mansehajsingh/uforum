import React from "react";
import styles from "./CommunityButton.module";
import { useNavigate } from "react-router-dom";

// component imports
import CommunityIcon from "../CommunityIcon";

const CommunityButton = (props) => {

    return (
        <div className={styles.button_wrapper}>
            <div className={styles.left}>
                <p className={styles.title}>{props.name}</p>
                <p className={styles.description}>{props.description}</p>
            </div>
            <div className={styles.right}>
                <CommunityIcon title={props.name} />
                <p className={styles.id_label}>community_id: {props.communityID}</p>
            </div>
        </div>
    );

}

export default CommunityButton