"use strict";

const numbers = [4, 7, 10, 13, 18, 21];
const doubled = numbers.map(number => number * 2);
const even = numbers.filter(number => number % 2 === 0);
console.log("Исходный массив:", numbers);
console.log("Удвоенные значения:", doubled);
console.log("Чётные числа:", even);