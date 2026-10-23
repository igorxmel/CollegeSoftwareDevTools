import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api";
import "./pages.css";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadCategories() {
            try {
                const data = await getCategories();
                if (!cancelled) {
                    setCategories(data);
                }
            } catch (requestError) {
                if (!cancelled) {
                    setError(requestError.message);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadCategories();

        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) {
        return <p className="state">Загрузка...</p>;
    }

    if (error) {
        return <p className="state state--error">{error}</p>;
    }

    return (
        <section className="page">
            <h1>Категории</h1>
            <p>Выберите категорию, чтобы посмотреть товары.</p>

            <div className="category-grid">
                {categories.map((category) => (
                    <Link
                        key={category}
                        className="category-card"
                        to={`/categories/${category}`}
                    >
                        <span>{category}</span>
                        <span>Смотреть</span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Categories;
