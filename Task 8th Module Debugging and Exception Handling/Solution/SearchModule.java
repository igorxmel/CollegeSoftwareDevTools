import java.util.ArrayList;
import java.util.List;

/** Модуль обработки: последовательный проход по аргументу и поиск характерной точки. */
public final class SearchModule {

    /** Предел числа шагов, чтобы программа не зациклилась на бесконечном проходе. */
    public static final int MAX_STEPS = 10000;

    /** Точность, с которой уточняется положение характерной точки. */
    public static final double EPS = 1e-10;

    private SearchModule() {
    }

    /** Одна строка протокола вычислений. */
    public record Step(int number, double x, double y) {
    }

    /** Найденная характерная точка и протокол дошедших до неё вычислений. */
    public record Result(double x, double y, int steps, List<Step> trace) {
    }

    /**
     * Идёт от x0 вправо с шагом h, пока отклонение функции от искомого уровня
     * не сменит знак. Смена знака означает, что характерная точка пройдена,
     * после чего её положение уточняется половинным делением.
     */
    public static Result find(double x0, double h)
            throws InvalidStepException, PointNotFoundException {
        if (h <= 0) {
            throw new InvalidStepException("получено h = " + h + ", требуется положительное число");
        }

        List<Step> trace = new ArrayList<>();

        double xPrev = x0;
        double dPrev = FunctionModule.deviation(xPrev);
        trace.add(new Step(0, xPrev, FunctionModule.value(xPrev)));

        if (Math.abs(dPrev) < EPS) {
            return new Result(xPrev, FunctionModule.value(xPrev), 0, trace);
        }

        for (int step = 1; step <= MAX_STEPS; step++) {
            double x = x0 + step * h;
            double d = FunctionModule.deviation(x);
            trace.add(new Step(step, x, FunctionModule.value(x)));

            if (dPrev * d <= 0) {
                double root = refine(xPrev, x);
                return new Result(root, FunctionModule.value(root), step, trace);
            }

            xPrev = x;
            dPrev = d;
        }

        throw new PointNotFoundException("характерная точка не встретилась за "
                + MAX_STEPS + " шагов, последнее значение X = " + (x0 + MAX_STEPS * h));
    }

    /** Уточнение положения точки половинным делением отрезка. */
    private static double refine(double left, double right) {
        double dLeft = FunctionModule.deviation(left);
        while (right - left > EPS) {
            double middle = (left + right) / 2;
            if (dLeft * FunctionModule.deviation(middle) <= 0) {
                right = middle;
            } else {
                left = middle;
                dLeft = FunctionModule.deviation(left);
            }
        }
        return (left + right) / 2;
    }
}
