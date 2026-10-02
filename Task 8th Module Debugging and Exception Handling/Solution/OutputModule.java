import java.util.List;

/** Модуль вывода: заголовок, протокол вычислений, результат и сообщения об ошибках. */
public final class OutputModule {

    /** Сколько строк протокола печатать с начала и с конца, если он длинный. */
    private static final int HEAD = 15;
    private static final int TAIL = 5;

    private OutputModule() {
    }

    public static void printHeader() {
        System.out.println("Поиск характерной точки графика функции");
        System.out.println("Функция: " + FunctionModule.FORMULA);
        System.out.println("Ищется точка, в которой функция равна " + FunctionModule.LEVEL);
        System.out.println();
    }

    /** Протокол вычислений. Длинный протокол печатается с пропуском середины. */
    public static void printTrace(List<SearchModule.Step> trace) {
        System.out.println();
        System.out.printf("%6s %14s %18s%n", "Шаг", "X", "Y(X)");

        if (trace.size() <= HEAD + TAIL + 1) {
            for (SearchModule.Step s : trace) {
                printStep(s);
            }
            return;
        }

        for (int i = 0; i < HEAD; i++) {
            printStep(trace.get(i));
        }
        System.out.printf("%6s %14s %18s%n", "...", "...", "...");
        for (int i = trace.size() - TAIL; i < trace.size(); i++) {
            printStep(trace.get(i));
        }
    }

    private static void printStep(SearchModule.Step s) {
        System.out.printf("%6d %14.6f %18.6f%n", s.number(), s.x(), s.y());
    }

    public static void printPoint(SearchModule.Result r) {
        System.out.println();
        System.out.println("Характерная точка пройдена на шаге " + r.steps() + ".");
        System.out.printf("Уточнённые координаты: X = %.6f, Y(X) = %.6f%n", r.x(), r.y());
    }

    public static void printError(String message) {
        System.out.println();
        System.out.println("Ошибка: " + message + ".");
    }
}
