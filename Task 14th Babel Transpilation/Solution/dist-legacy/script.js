"use strict";

var greet = function greet() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Гость";
  return "\u041F\u0440\u0438\u0432\u0435\u0442, ".concat(name, "!");
};
console.log(greet("Мария"));
console.log(greet());