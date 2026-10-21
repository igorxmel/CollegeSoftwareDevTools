"use strict";

var numbers = [4, 7, 10, 13, 18, 21];
var doubled = numbers.map(function (number) {
  return number * 2;
});
var even = numbers.filter(function (number) {
  return number % 2 === 0;
});
console.log("Исходный массив:", numbers);
console.log("Удвоенные значения:", doubled);
console.log("Чётные числа:", even);