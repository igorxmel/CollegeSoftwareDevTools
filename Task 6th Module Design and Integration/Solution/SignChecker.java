/** Модуль обработки данных: проверка массива на одинаковый знак элементов. */
public final class SignChecker {

    private SignChecker() {
    }

    /**
     * Процедура проверки. Получает все элементы рассматриваемого массива.
     * Возвращает true, если все элементы строго положительны либо все строго отрицательны.
     * Ноль знака не имеет, поэтому массив с нулём условию не удовлетворяет.
     */
    public static boolean hasSameSign(double[] a) {
        if (a == null || a.length == 0) {
            return false;
        }
        boolean allPositive = true;
        boolean allNegative = true;
        for (double v : a) {
            if (v <= 0) {
                allPositive = false;
            }
            if (v >= 0) {
                allNegative = false;
            }
        }
        return allPositive || allNegative;
    }

    /** Название знака для вывода. Вызывается только для массивов, прошедших проверку. */
    public static String signName(double[] a) {
        return a[0] > 0 ? "положительные" : "отрицательные";
    }
}
