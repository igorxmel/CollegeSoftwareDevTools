import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../api";
import ProductCard from "../components/ProductCard";
import "./pages.css";

const CategoryProducts = () => {
    const { categoryName } = useParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadProducts() {
            setLoading(true);
            setError("");

            try {
                const data = await getProducts(categoryName);
                if (!cancelled) {
                    setProducts(data);
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

        loadProducts();

        return () => {
            cancelled = true;
        };
    }, [categoryName]);

    return (
        <section className="page">
            <Link className="back-link" to="/categories">
                Все категории
            </Link>

            <h1>Категория: {categoryName}</h1>

            {loading && <p className="state">Загрузка...</p>}
            {error && <p className="state state--error">{error}</p>}

            {!loading && !error && products.length === 0 && (
                <p className="state">В этой категории пока нет товаров.</p>
            )}

            {!loading && !error && products.length > 0 && (
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default CategoryProducts;
