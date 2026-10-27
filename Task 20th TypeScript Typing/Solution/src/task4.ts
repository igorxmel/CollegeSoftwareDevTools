export interface Student {
    name: string;
    age: number;
    grade: number;
}

export function findAboveGrade(students: Student[], minGrade: number): Student[] {
    return students.filter((student) => student.grade > minGrade);
}

export function averageGrade(students: Student[]): number {
    if (students.length === 0) {
        return 0;
    }

    const sum = students.reduce((total, student) => total + student.grade, 0);
    return sum / students.length;
}

export function runTask4(): void {
    const students: Student[] = [
        { name: "Анна", age: 19, grade: 4.8 },
        { name: "Дмитрий", age: 20, grade: 3.9 },
        { name: "Мария", age: 19, grade: 4.4 },
        { name: "Иван", age: 21, grade: 3.2 },
        { name: "Ольга", age: 20, grade: 4.9 },
    ];

    const best = findAboveGrade(students, 4.5);
    console.log("Средний балл выше 4.5:", best.map((student) => student.name).join(", "));
    console.log("Средний балл группы:", averageGrade(students).toFixed(2));
}
