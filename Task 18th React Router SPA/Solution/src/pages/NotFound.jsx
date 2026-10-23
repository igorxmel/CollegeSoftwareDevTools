import { Link } from "react-router-dom";
import "./pages.css";

const NotFound = () => {
    return (
        <section className="page page--center">
            <p className="not-found__code">404</p>
            <h1>Страница не найдена</h1>
            <p>Такого адреса в приложении нет.</p>
            <Link className="button" to="/">
                На главную
            </Link>
        </section>
    );
};

export default NotFound;
