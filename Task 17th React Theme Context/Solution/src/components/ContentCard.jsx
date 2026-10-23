import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import "./ContentCard.css";

function getCardTheme(variant, pageTheme) {
    if (variant === "fixed") {
        return "light";
    }

    if (variant === "opposite") {
        return pageTheme === "light" ? "dark" : "light";
    }

    return pageTheme;
}

const ContentCard = ({ variant, title, text }) => {
    const { theme } = useTheme();
    const cardTheme = getCardTheme(variant, theme);

    return (
        <article className={`content-card ${cardTheme}`}>
            <span className="content-card__badge">{cardTheme.toUpperCase()}</span>
            <h3>{title}</h3>
            <p>{text}</p>
        </article>
    );
};

export default ContentCard;
