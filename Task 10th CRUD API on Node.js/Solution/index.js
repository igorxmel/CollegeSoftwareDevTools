// Практическое занятие № 10. API-сервер на Node.js и Express с CRUD-операциями
// над хранилищем в памяти.

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // для поддержки JSON-формата

const storages = [
    { id: 1, name: "John", age: 15 },
    { id: 2, name: "Mike", age: 16 },
    { id: 3, name: "Kate", age: 15 },
    { id: 4, name: "Lusi", age: 18 }
];

// Счётчик идентификаторов. Считать id от длины массива нельзя: после удаления
// записи длина уменьшается, и следующая добавленная получит уже занятый номер.
let nextId = storages.length + 1;

// Поиск записи по id из адреса. Возвращает индекс или -1.
function findIndexById(rawId) {
    const id = Number(rawId);
    return storages.findIndex((item) => item.id === id);
}

// 1. Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

// 2. Маршрут /start для получения текста Привет мир
app.get('/start', (req, res) => {
    res.send('Привет мир');
});

// 3. Маршрут /data с методом GET для получения всех данных
app.get('/data', (req, res) => {
    res.json(storages);
});

// 4. Маршрут /data с методом POST для добавления новой записи
app.post('/data/', (req, res) => {
    const { name, age } = req.body;
    const newItem = { id: nextId, name, age };
    nextId += 1;
    storages.push(newItem);
    res.status(201).json(newItem);
    console.log(storages);
});

// 5. Маршрут /data/:id с методом PUT для обновления записи по id
app.put('/data/:id', (req, res) => {
    const index = findIndexById(req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Запись с таким id не найдена' });
    }

    const { name, age } = req.body;
    // Переданы могут быть не все поля, поэтому непереданные остаются прежними.
    if (name !== undefined) {
        storages[index].name = name;
    }
    if (age !== undefined) {
        storages[index].age = age;
    }

    res.json(storages[index]);
    console.log(storages);
});

// 6. Маршрут /data/:id с методом DELETE для удаления записи по id
app.delete('/data/:id', (req, res) => {
    const index = findIndexById(req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Запись с таким id не найдена' });
    }

    const [removed] = storages.splice(index, 1);
    res.json(removed);
    console.log(storages);
});
