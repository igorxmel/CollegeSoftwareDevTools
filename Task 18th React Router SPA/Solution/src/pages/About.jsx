import "./pages.css";

const About = () => {
    return (
        <section className="page">
            <h1>О проекте</h1>
            <p>
                Приложение сделано в рамках практического занятия №18. Клиент на
                React получает данные с сервера на Express, маршруты описаны через
                react-router-dom, а состояние загрузки и ошибки обрабатывается в
                каждом запросе.
            </p>
            <p>
                Тема приложения выбрана самостоятельно: каталог кроссовок Dream
                Sneakers.
            </p>
        </section>
    );
};

export default About;
