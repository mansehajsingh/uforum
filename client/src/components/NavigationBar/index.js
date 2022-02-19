import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NavigationBar.module";

const NavigationBar = (props) => {

    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    
    useEffect(() => {
        window.addEventListener("resize", () => setViewportWidth(window.innerWidth));
        return () => window.removeEventListener("resize", () => setViewportWidth(window.innerWidth));
    });

    const getNavLinks = () => {

        if (viewportWidth > 600) {

            return (
                <>
                    <Link to="/communities">COMMUNITIES</Link>
                    <Link to="/about">ABOUT</Link>
                    <Link to="/profile">PROFILE</Link>
                </>
            );

        }
        else {

            return (
                <>
                    <img 
                        className={styles.navigation_icon}  src="../../../../static/public/images/navigation_icons/communities.svg"
                        onClick={() => navigate("/communities")}
                    />
                    <img 
                        className={styles.navigation_icon}  src="../../../../static/public/images/navigation_icons/about.svg"
                        onClick={() => navigate("/about")}
                    />
                    <img 
                        className={styles.navigation_icon}  src="../../../../static/public/images/navigation_icons/profile.svg"
                        onClick={() => navigate("/profile")}
                    />
                </>
            );

        }

    }

    return (
        <nav className={styles.navigation_bar} >
            <img 
                className={styles.navigation_logo}  src="../../../static/public/images/uforum_logo_white.svg"
                onClick={() => navigate("/communities")}
            />
            <div className={styles.left}>
                {getNavLinks()}
            </div>
        </nav>
    );
}

export default NavigationBar