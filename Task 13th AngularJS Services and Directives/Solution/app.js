// Практическое занятие № 13. Приложение из трёх частей: сервис знает, как
// получить данные, контроллер когда их запросить и что положить в $scope,
// директива как показать одну карточку.

angular.module('UserApp', [])

    // Сервис: модель данных и вся сетевая логика
    .service('UserService', function ($http) {

        var apiUrl = 'https://jsonplaceholder.typicode.com/users';

        //метод сервиса для получения данных
        this.getUsers = function () {
            console.log("UserService: Запрос данных к API...");

            //используем $http для GET-запроса
            //возвращаем промис, чтобы контроллер мог обработать результат
            return $http.get(apiUrl);
        };
    })

    // Директива для карточек
    .directive('userCard', function () {
        return {
            //ограничиваем использование как элемент (E: Element)
            restrict: 'E',

            //определяем шаблон HTML для нашей карточки
            template: `
                <div class="card">
                    <h2>{{ user.name }}</h2>
                    <p class="username">{{ user.username }}</p>
                    <dl>
                        <dt>Почта</dt>
                        <dd><a href="mailto:{{ user.email }}">{{ user.email }}</a></dd>
                        <dt>Телефон</dt>
                        <dd>{{ user.phone }}</dd>
                        <dt>Сайт</dt>
                        <dd>{{ user.website }}</dd>
                        <dt>Город</dt>
                        <dd>{{ user.address.city }}</dd>
                        <dt>Компания</dt>
                        <dd>{{ user.company.name }}</dd>
                    </dl>
                </div>
            `,

            //определяем Scope Директивы
            scope: {
                // '=' (двустороннее связывание): привязываем атрибут 'user-data'
                //из внешнего scope (Controller) к внутреннему свойству 'user'.
                //это позволяет нам передавать данные пользователя внутрь директивы.
                user: '=userData'
            }
        };
    })

    // Контроллер: состояние страницы и бизнес-логика
    .controller('UserListController', function ($scope, UserService) {

        $scope.users = [];
        $scope.isLoading = false;
        $scope.error = null;

        $scope.loadUsers = function () {
            $scope.isLoading = true;
            //прошлая ошибка снимается, иначе при повторном запросе на странице
            //остаётся сообщение от предыдущей неудачной попытки
            $scope.error = null;

            //вызываем метод getUsers нашего сервиса
            UserService.getUsers()
                .then(function (response) {
                    //успешное выполнение промиса
                    //сами данные лежат в response.data, сам response это ещё
                    //и статус с заголовками
                    $scope.users = response.data;
                    console.log("Контроллер: получено пользователей " + $scope.users.length);
                })
                .catch(function (error) {
                    //обработка ошибки
                    $scope.users = [];
                    $scope.error = 'Не удалось получить список пользователей. Код ответа: ' + error.status;
                    console.error("Контроллер: ошибка запроса", error.status);
                })
                .finally(function () {
                    //выполняется независимо от успеха/неудачи
                    $scope.isLoading = false;
                });
        };

        //запускаем загрузку данных при инициализации контроллера
        $scope.loadUsers();
    });
