import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../api";
import "./pages.css";

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadProduct() {
            setLoading(true);
            setError("");

            try {
                const data = await getProduct(productId);
                if (!cancelled) {
                    setProduct(data);
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

        loadProduct();

        return () => {
            cancelled = true;
        };
    }, [productId]);

    if (loading) {
        return <p className="state">Загрузка...</p>;
    }

    if (error) {
        return (
            <section className="page">
                <p className="state state--error">{error}</p>
                <button
                    className="button"
                    type="button"
                    onClick={() => navigate("/products")}
                >
                    Назад к списку
                </button>
            </section>
        );
    }

    return (
        <section className="page">
            <button
                className="button button--ghost"
                type="button"
                onClick={() => navigate(-1)}
            >
                Назад к списку
            </button>

            <article className="product-detail">
                <span className="product-card__category">{product.category}</span>
                <h1>{product.title}</h1>
                <p className="product-detail__price">
                    {product.price.toLocaleString("ru-RU")} ₽
                </p>
                <p>{product.description}</p>
            </article>
        </section>
    );
};

export default ProductDetail;
