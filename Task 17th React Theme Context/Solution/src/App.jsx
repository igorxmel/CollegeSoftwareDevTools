import React from "react";
import { useTheme } from "./contexts/ThemeContext";
import ThemeButton from "./components/ThemeButton";
import ContentCard from "./components/ContentCard";

const App = () => {
    const { theme } = useTheme();

    return (
        <div className={`app-body ${theme}`}>
            <header className="page-header">
                <h1>Текущая тема: {theme.toUpperCase()}</h1>
                <p>React Context API и шаблоны элементов</p>
            </header>

            <main className="page-main">
                <h2>Привет! Это демонстрация React Context API.</h2>
                <p>
                    Нажмите кнопку ниже, чтобы глобально изменить цветовую схему
                    приложения. Карточки ниже показывают три разных способа работы с
                    темой.
                </p>

                <ThemeButton />

                <div className="cards">
                    <ContentCard
                        variant="global"
                        title="Глобальная тема"
                        text="Карточка повторяет тему всей страницы: при переключении меняется вместе с ней."
                    />
                    <ContentCard
                        variant="fixed"
                        title="Фиксированная тема"
                        text="Карточка всегда остаётся светлой, независимо от темы страницы."
                    />
                    <ContentCard
                        variant="opposite"
                        title="Противоположная тема"
                        text="Карточка всегда показывает тему, противоположную теме страницы."
                    />
                </div>
            </main>
        </div>
    );
};

export default App;
