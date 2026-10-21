export const TASK = {
    title: "Курсовая работа",
    done: 26,
    total: 40,
};

export function percentOf(part, whole) {
    if (whole <= 0) {
        return 0;
    }

    const value = (part / whole) * 100;
    return Math.min(Math.max(value, 0), 100);
}
