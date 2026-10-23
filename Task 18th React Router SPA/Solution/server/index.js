const express = require("express");
const cors = require("cors");
const { products } = require("./data");

const app = express();
const PORT = 3001;

let nextId = Math.max(...products.map((product) => product.id)) + 1;

app.use(cors());
app.use(express.json());

function findProduct(id) {
    return products.find((product) => product.id === Number(id));
}

app.get("/api/products", (req, res) => {
    const { category } = req.query;

    const result = category
        ? products.filter((product) => product.category === category)
        : products;

    res.json(result);
});

app.get("/api/products/:id", (req, res) => {
    const product = findProduct(req.params.id);

    if (!product) {
        return res.status(404).json({ message: "Товар не найден" });
    }

    res.json(product);
});

app.get("/api/categories", (req, res) => {
    const categories = [...new Set(products.map((product) => product.category))];
    res.json(categories);
});

app.post("/api/products", (req, res) => {
    const { title, category, price, description } = req.body;

    if (!title || !category || price === undefined || !description) {
        return res.status(400).json({ message: "Заполните все поля" });
    }

    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice)) {
        return res.status(400).json({ message: "Цена должна быть числом" });
    }

    const product = {
        id: nextId,
        title,
        category,
        price: numericPrice,
        description
    };

    nextId += 1;
    products.push(product);

    res.status(201).json(product);
});

function updateProduct(req, res) {
    const product = findProduct(req.params.id);

    if (!product) {
        return res.status(404).json({ message: "Товар не найден" });
    }

    const { title, category, price, description } = req.body;

    if (title !== undefined) {
        product.title = title;
    }

    if (category !== undefined) {
        product.category = category;
    }

    if (price !== undefined) {
        product.price = Number(price);
    }

    if (description !== undefined) {
        product.description = description;
    }

    res.json(product);
}

app.put("/api/products/:id", updateProduct);
app.patch("/api/products/:id", updateProduct);

app.delete("/api/products/:id", (req, res) => {
    const index = products.findIndex(
        (product) => product.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({ message: "Товар не найден" });
    }

    const [removed] = products.splice(index, 1);
    res.json(removed);
});

app.listen(PORT, () => {
    console.log(`API запущен: http://localhost:${PORT}`);
});
