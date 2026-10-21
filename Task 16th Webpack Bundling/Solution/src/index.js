import { TASK, percentOf } from "./utils.js";

const doneInput = document.getElementById("done");
const totalInput = document.getElementById("total");
const result = document.getElementById("result");
const bar = document.getElementById("bar");

function render() {
    const done = Number(doneInput.value);
    const total = Number(totalInput.value);
    const percent = percentOf(done, total);

    result.textContent =
        `Задача «${TASK.title}»: выполнено ${done} из ${total} — ${percent.toFixed(1)}%`;
    bar.value = percent;
}

doneInput.value = TASK.done;
totalInput.value = TASK.total;

document.getElementById("calculate").addEventListener("click", render);
render();
