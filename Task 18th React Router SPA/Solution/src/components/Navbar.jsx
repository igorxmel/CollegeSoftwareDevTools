import { NavLink } from "react-router-dom";
import "./Navbar.css";

const links = [
    { to: "/", label: "Главная", end: true },
    { to: "/products", label: "Товары" },
    { to: "/categories", label: "Категории" },
    { to: "/about", label: "О проекте" }
];

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink to="/" className="navbar__brand" end>
                Dream Sneakers
            </NavLink>

            <div className="navbar__links">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.end}
                        className={({ isActive }) =>
                            isActive
                                ? "navbar__link navbar__link--active"
                                : "navbar__link"
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
