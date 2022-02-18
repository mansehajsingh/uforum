import React from "react";
import styles from "./CommunityIcon.module";

const CommunityIcon = (props) => {

    const getLetters = () => {
        let letters = props.title.charAt(0).split(" ");
        
        letters += props.title.split(" ").length >= 2 ? 
                   props.title.split(" ")[1].charAt(0) :
                   "";

        return letters;
    }

    return (
        <div className={styles.icon_wrapper}>
            <p className={styles.icon_letters}>{getLetters()}</p>
        </div>
    );

}

export default CommunityIcon