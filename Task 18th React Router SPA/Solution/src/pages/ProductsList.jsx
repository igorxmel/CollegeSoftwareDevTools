import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories, getProducts } from "../api";
import ProductCard from "../components/ProductCard";
import "./pages.css";

const ProductsList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category") || "";

    const [products, setProducts] = useState([]);
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
            } catch {
                // The category list is only needed for the filter.
            }
        }

        loadCategories();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        let cancelled = false;

        async function loadProducts() {
            setLoading(true);
            setError("");

            try {
                const data = await getProducts(category);
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
    }, [category]);

    function handleCategoryChange(event) {
        const value = event.target.value;

        if (value) {
            setSearchParams({ category: value });
        } else {
            setSearchParams({});
        }
    }

    return (
        <section className="page">
            <div className="page__head">
                <div>
                    <h1>Все товары</h1>
                    <p>Каталог кроссовок Dream Sneakers.</p>
                </div>

                <label className="filter">
                    <span>Категория</span>
                    <select value={category} onChange={handleCategoryChange}>
                        <option value="">Все категории</option>
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

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

export default ProductsList;
