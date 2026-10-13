// Практическое занятие № 11. Запрос к внешнему API The Rick and Morty API
// средствами встроенного в Node.js fetch.

async function fetchCharacters() {
    //URL для получения персонажей
    const apiUrl = 'https://rickandmortyapi.com/api/character';

    console.log(`Отправляем запрос к: ${apiUrl}`);

    try {
        //выполнение GET-запроса с помощью fetch()
        const response = await fetch(apiUrl);

        //проверка статуса ответа
        if (!response.ok) {
            //если статус HTTP-ответа не 200-299, ошибка
            throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
        }

        //парсинг тела ответа как JSON
        const data = await response.json();

        //обработка полученных данных
        const characters = data.results;

        console.log('\nУспешно получено!');
        console.log(`Всего персонажей: ${data.info.count}`);
        console.log(`Показано персонажей на первой странице: ${characters.length}`);

        console.log('\n--- Имена первых 20 персонажей: ---');

        //вывод имен первых 20 персонажей
        characters.slice(0, 20).forEach((character, index) => {
            console.log(`${index + 1}. ${character.name} (Статус: ${character.status})`);
        });

        console.log('\n--- Подробная информация о первом персонаже: ---');

        //первый элемент массива результатов, на странице он всегда есть
        const first = characters[0];

        //происхождение лежит во вложенном объекте origin, нужно только его имя
        console.log(`Имя: ${first.name}`);
        console.log(`Вид: ${first.species}`);
        console.log(`Происхождение: ${first.origin.name}`);

    } catch (error) {
        //обработка ошибок (сетевых или ошибок HTTP-статуса)
        console.error('\n❌ Произошла ошибка при получении данных:', error.message);
    }
}

//запуск функции, возвращённый промис здесь не нужен
fetchCharacters();
