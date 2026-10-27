import { runTask1 } from "./task1";
import { runTask2 } from "./task2";
import { runTask3 } from "./task3";
import { runTask4 } from "./task4";
import { runTask5 } from "./task5";

const tasks: Array<[string, () => void]> = [
    ["Задание 1. Типизация переменных", runTask1],
    ["Задание 2. Работа с функциями", runTask2],
    ["Задание 3. Интерфейс Product", runTask3],
    ["Задание 4. Массив студентов", runTask4],
    ["Задание 5. Учёт учебных заданий", runTask5],
];

tasks.forEach(([title, run]) => {
    console.log(`\n=== ${title} ===`);
    run();
});
