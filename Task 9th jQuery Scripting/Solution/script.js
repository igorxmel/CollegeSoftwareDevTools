// Практическое занятие № 9. Все пять заданий на одной странице.
// $(function () { ... }) это короткая запись $(document).ready(): код внутри
// выполняется, когда разметка уже разобрана браузером.

$(function () {

    // --- Задание 1. Переключение текста заголовка ---------------------------

    const START_TITLE = "Изучаем jQuery";
    const OTHER_TITLE = "jQuery работает!";

    $("#changeButton").on("click", function () {
        const title = $("#title");
        if (title.text() === START_TITLE) {
            title.text(OTHER_TITLE);
        } else {
            title.text(START_TITLE);
        }
    });

    // --- Задание 2. Переключение оформления карточки ------------------------
    // Оформление описано классом в CSS, скрипт только добавляет и убирает его.

    $("#styleButton").on("click", function () {
        $("#card").toggleClass("active");
    });

    // --- Задание 3. Раскрывающийся блок -------------------------------------

    $("#detailsButton").on("click", function () {
        $("#details").slideToggle(300);
        if ($(this).text() === "Подробнее") {
            $(this).text("Скрыть");
        } else {
            $(this).text("Подробнее");
        }
    });

    // --- Задание 4. Проверка формы ------------------------------------------

    $("#registrationForm").on("submit", function (event) {
        // Без этого браузер перезагрузил бы страницу и результат пропал.
        event.preventDefault();

        const name = $("#name").val().trim();
        const email = $("#email").val().trim();

        if (name === "" || email === "") {
            $("#result")
                .text("Заполните все поля формы.")
                .css("color", "red");
        } else {
            $("#result")
                .text("Пользователь " + name + " успешно заполнил форму. Email: " + email)
                .css("color", "green");
        }
    });

    // --- Задание 5. Список задач --------------------------------------------

    $("#addTask").on("click", function () {
        const taskText = $("#taskInput").val().trim();

        if (taskText === "") {
            $("#taskMessage")
                .text("Введите название задачи.")
                .css("color", "red");
            return;
        }

        // Элементы создаются по отдельности, а текст задачи ставится через
        // .text(). Если собрать строку HTML и вставить её, введённые
        // пользователем теги выполнятся как разметка.
        const task = $("<li>");
        const text = $("<span>").text(taskText);
        const deleteButton = $("<button>")
            .text("Удалить")
            .addClass("deleteButton");

        task.append(text, deleteButton);
        $("#taskList").append(task);

        $("#taskInput").val("");
        $("#taskMessage").text("");
    });

    // Обработчик висит на списке, а не на самих задачах: задач при загрузке
    // страницы ещё нет, и обычный обработчик на них не навесился бы.
    $("#taskList").on("click", "span", function () {
        $(this).toggleClass("completed");
    });

    $("#taskList").on("click", ".deleteButton", function (event) {
        // Клик по кнопке иначе всплыл бы до li и заодно отметил задачу.
        event.stopPropagation();
        $(this).closest("li").remove();
    });

});
