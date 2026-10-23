import { useLocation } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    const location = useLocation();

    return (
        <footer className="footer">
            <span>Текущий путь: {location.pathname}</span>
            <span>Параметры запроса: {location.search || "нет"}</span>
        </footer>
    );
};

export default Footer;
