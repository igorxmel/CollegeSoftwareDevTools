import { Link } from "react-router-dom";
import "./pages.css";

const Home = () => {
    return (
        <section className="page page--home">
            <h1>Dream Sneakers</h1>
            <p>
                Учебное приложение на React Router. Здесь можно посмотреть каталог
                кроссовок, открыть карточку товара и отфильтровать список по
                категории.
            </p>

            <div className="home-links">
                <Link className="button" to="/products">
                    Открыть каталог
                </Link>
                <Link className="button button--ghost" to="/categories">
                    Категории
                </Link>
            </div>
        </section>
    );
};

export default Home;
