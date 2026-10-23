import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductsList from "./pages/ProductsList";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import "./App.css";

const App = () => {
    return (
        <div className="app">
            <Navbar />

            <main className="app__content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductsList />} />
                    <Route path="/products/:productId" element={<ProductDetail />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route
                        path="/categories/:categoryName"
                        element={<CategoryProducts />}
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

export default App;
