import java.util.List;
import java.util.Locale;

/** Модуль вывода данных: печать массивов, результатов проверки и итогового сообщения. */
public final class OutputModule {

    private OutputModule() {
    }

    public static void printArray(int index, double[] a) {
        StringBuilder sb = new StringBuilder("  массив " + index + ": [");
        for (int i = 0; i < a.length; i++) {
            sb.append(String.format(Locale.US, "%.2f", a[i]));
            if (i < a.length - 1) {
                sb.append("; ");
            }
        }
        System.out.println(sb.append("]").toString());
    }

    public static void printCheckResult(int index, double[] a, boolean sameSign) {
        if (sameSign) {
            System.out.println("  результат: все элементы " + SignChecker.signName(a));
        } else {
            System.out.println("  результат: элементы массива " + index + " разного знака");
        }
    }

    public static void printSummary(List<Integer> numbers) {
        System.out.println();
        if (numbers.isEmpty()) {
            System.out.println("Массивов с элементами одного знака нет.");
            return;
        }
        StringBuilder sb = new StringBuilder("Элементы одного знака содержат массивы с номерами: ");
        for (int i = 0; i < numbers.size(); i++) {
            sb.append(numbers.get(i));
            if (i < numbers.size() - 1) {
                sb.append(", ");
            }
        }
        System.out.println(sb.toString());
    }
}
