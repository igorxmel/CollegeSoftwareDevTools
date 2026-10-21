"use strict";

class Student {
  constructor(name, group, averageMark) {
    this.name = name;
    this.group = group;
    this.averageMark = averageMark;
  }
  getInfo() {
    return `${this.name}, группа ${this.group}, средний балл ${this.averageMark}`;
  }
}
const student = new Student("Холкин Егор", "ИС-42", 4.8);
console.log(student.getInfo());