export interface Assignment {
    id: number;
    title: string;
    description: string;
    done: boolean;
}

let nextId = 1;

export function addAssignment(list: Assignment[], title: string, description: string): Assignment {
    const assignment: Assignment = { id: nextId, title, description, done: false };
    nextId += 1;
    list.push(assignment);
    return assignment;
}

export function completeAssignment(list: Assignment[], id: number): boolean {
    const assignment = list.find((item) => item.id === id);

    if (!assignment) {
        return false;
    }

    assignment.done = true;
    return true;
}

export function getUnfinished(list: Assignment[]): Assignment[] {
    return list.filter((item) => !item.done);
}

export function runTask5(): void {
    const assignments: Assignment[] = [];

    addAssignment(assignments, "ПЗ 18", "SPA на React Router и API на Express");
    addAssignment(assignments, "ПЗ 19", "WebSocket-чат с уведомлениями");
    addAssignment(assignments, "ПЗ 20", "Типизация кода на TypeScript");

    completeAssignment(assignments, 1);
    console.log("Закрытие несуществующего задания:", completeAssignment(assignments, 99));

    console.log("Невыполненные задания:");
    getUnfinished(assignments).forEach((item) => {
        console.log(`${item.id}. ${item.title}: ${item.description}`);
    });
}
