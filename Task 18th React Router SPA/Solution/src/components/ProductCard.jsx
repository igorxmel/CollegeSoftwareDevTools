import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
    return (
        <article className="product-card">
            <span className="product-card__category">{product.category}</span>
            <h3>{product.title}</h3>
            <p className="product-card__price">
                {product.price.toLocaleString("ru-RU")} ₽
            </p>
            <Link className="product-card__link" to={`/products/${product.id}`}>
                Подробнее
            </Link>
        </article>
    );
};

export default ProductCard;
