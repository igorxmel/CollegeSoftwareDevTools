export function runTask1(): void {
    const userName: string = "Анна";
    let age: number = 19;
    let averageScore: number = 4.6;
    let isTaskDone: boolean = false;

    console.log(`Пользователь: ${userName}, возраст: ${age}`);
    console.log(`Средний балл: ${averageScore}, задание выполнено: ${isTaskDone}`);

    age = 20;
    isTaskDone = true;
    console.log(`После изменения: возраст ${age}, задание выполнено: ${isTaskDone}`);

    // Компилятор отклоняет присваивание значения другого типа:
    // age = "двадцать";   error TS2322: Type 'string' is not assignable to type 'number'.
}
