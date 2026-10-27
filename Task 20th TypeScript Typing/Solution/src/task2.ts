export function calculateCost(unitPrice: number, quantity: number): number {
    return unitPrice * quantity;
}

export function runTask2(): void {
    console.log("Nike Air Zoom Pegasus 41, 2 пары:", calculateCost(13990, 2), "руб.");
    console.log("New Balance 550, 1 пара:", calculateCost(10990, 1), "руб.");
    console.log("Adidas Adizero SL2, 3 пары:", calculateCost(11990, 3), "руб.");
}
