const API_URL = "/api";

async function request(path, options) {
    let response;

    try {
        response = await fetch(`${API_URL}${path}`, options);
    } catch {
        throw new Error("Не удалось связаться с сервером");
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Ошибка запроса");
    }

    return data;
}

export function getProducts(category) {
    const query = category
        ? `?category=${encodeURIComponent(category)}`
        : "";

    return request(`/products${query}`);
}

export function getProduct(id) {
    return request(`/products/${id}`);
}

export function getCategories() {
    return request("/categories");
}
