// Практическое занятие № 12. Пять заданий варианта 1 на одной странице.
// Все контроллеры собраны в одном модуле, каждый отвечает за свою секцию.

var app = angular.module("practiceApp", []);

// --- Задание 4. Переключение темы ------------------------------------------
// Контроллер объявлен первым, потому что он внешний: ThemeController висит на
// body, а остальные контроллеры вложены в него.

app.controller("ThemeController", function ($scope) {
    $scope.isDark = false;

    $scope.toggleTheme = function () {
        $scope.isDark = !$scope.isDark;
    };
});

// --- Задание 1. Карточка студента ------------------------------------------
// Поля объявлены одним объектом student, карточка читает те же свойства, что
// и поля ввода, поэтому обновляется при каждом нажатии клавиши.

app.controller("StudentCardController", function ($scope) {
    $scope.student = {
        surname: "",
        name: "",
        group: "",
        speciality: ""
    };
});

// --- Задание 2. Счётчик ----------------------------------------------------

app.controller("CounterController", function ($scope) {
    $scope.count = 0;

    $scope.increase = function () {
        $scope.count += 1;
    };

    // Проверка стоит здесь, а не только в разметке: ng-disabled делает кнопку
    // серой, но значение защищает именно это условие.
    $scope.decrease = function () {
        if ($scope.count > 0) {
            $scope.count -= 1;
        }
    };

    $scope.reset = function () {
        $scope.count = 0;
    };
});

// --- Задание 3. Список студентов -------------------------------------------

app.controller("StudentsController", function ($scope) {
    $scope.students = [
        { name: "Егор", surname: "Холкин", group: "ИС-42" },
        { name: "Иван", surname: "Петров", group: "ИС-41" }
    ];

    $scope.newStudent = { name: "", surname: "", group: "" };
    $scope.message = "";

    $scope.addStudent = function () {
        var name = $scope.newStudent.name.trim();
        var surname = $scope.newStudent.surname.trim();
        var group = $scope.newStudent.group.trim();

        if (name === "" || surname === "" || group === "") {
            $scope.message = "Заполните имя, фамилию и группу.";
            return;
        }

        $scope.students.push({ name: name, surname: surname, group: group });

        // Поля очищаются присваиванием нового объекта, иначе следующая запись
        // ссылалась бы на тот же объект, что уже лежит в массиве.
        $scope.newStudent = { name: "", surname: "", group: "" };
        $scope.message = "";
    };

    $scope.removeStudent = function (index) {
        $scope.students.splice(index, 1);
    };
});

// --- Задание 5. Регистрация студента ---------------------------------------

app.controller("RegistrationController", function ($scope) {
    $scope.form = { surname: "", name: "", group: "", email: "" };
    $scope.registered = null;

    // Адрес состоит из имени без пробелов и собаки, домена и зоны минимум из
    // двух букв. Регулярное выражение лежит в $scope, потому что ng-pattern
    // получает его как выражение Angular, а не как строку.
    $scope.emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    // ng-submit вызывает обработчик и при незаполненной форме, поэтому
    // состояние формы проверяется здесь.
    $scope.submit = function () {
        if ($scope.regForm.$invalid) {
            $scope.registered = null;
            return;
        }

        // Копия нужна, чтобы карточка не менялась при дальнейшем вводе.
        $scope.registered = angular.copy($scope.form);
    };
});
