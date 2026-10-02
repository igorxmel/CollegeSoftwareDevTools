/** Модуль вычислений: задаёт функцию варианта и искомый уровень. */
public final class FunctionModule {

    /** Значение, при котором точка графика считается характерной. */
    public static final double LEVEL = -10.0;

    /** Текстовая запись функции для заголовков и сообщений. */
    public static final String FORMULA = "Y(X) = x^2 - e^x";

    private FunctionModule() {
    }

    /** Значение функции в точке x. */
    public static double value(double x) {
        double y = x * x - Math.exp(x);
        if (Double.isNaN(y) || Double.isInfinite(y)) {
            throw new ArithmeticException(
                    "значение функции при x = " + x + " вышло за пределы вещественного типа");
        }
        return y;
    }

    /**
     * Отклонение функции от искомого уровня. Характерная точка это нуль
     * отклонения, поэтому дальше работа идёт именно с ним.
     */
    public static double deviation(double x) {
        return value(x) - LEVEL;
    }
}
