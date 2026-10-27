import { calculateCost } from "./task2";

export interface Product {
    title: string;
    price: number;
    quantity: number;
}

export function describeProduct(product: Product): string {
    const total = calculateCost(product.price, product.quantity);
    return `${product.title}: ${product.price} руб. x ${product.quantity} шт. = ${total} руб.`;
}

export function runTask3(): void {
    const products: Product[] = [
        { title: "Nike Air Zoom Pegasus 41", price: 13990, quantity: 4 },
        { title: "Nike LeBron XXI", price: 18990, quantity: 2 },
        { title: "New Balance 550", price: 10990, quantity: 6 },
    ];

    products.forEach((product) => console.log(describeProduct(product)));
}
