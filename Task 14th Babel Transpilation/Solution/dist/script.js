"use strict";

const greet = (name = "Гость") => {
  return `Привет, ${name}!`;
};
console.log(greet("Мария"));
console.log(greet());