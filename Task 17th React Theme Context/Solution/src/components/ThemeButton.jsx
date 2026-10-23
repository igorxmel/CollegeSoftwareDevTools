import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import "./ThemeButton.css";

const ThemeButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className={`theme-button ${theme}`}
            onClick={toggleTheme}
            type="button"
        >
            Переключить на {theme === "light" ? "темную" : "светлую"}
        </button>
    );
};

export default ThemeButton;
