import java.util.NoSuchElementException;
import java.util.Scanner;

/** Модуль ввода данных: чтение размера и элементов массива с проверкой корректности. */
public final class InputModule {

    public static final int MAX_SIZE = 100;

    private InputModule() {
    }

    /** Чтение размера массива с повторным запросом при некорректном вводе. */
    public static int readSize(Scanner sc, int index) {
        while (true) {
            System.out.print("Массив " + index + ": количество элементов (1.." + MAX_SIZE + "): ");
            String line = nextLine(sc);
            try {
                int n = Integer.parseInt(line);
                if (n < 1 || n > MAX_SIZE) {
                    System.out.println("Ошибка: размер должен быть от 1 до " + MAX_SIZE + ".");
                    continue;
                }
                return n;
            } catch (NumberFormatException e) {
                System.out.println("Ошибка: требуется целое число.");
            }
        }
    }

    /** Чтение n вещественных элементов массива одной строкой. */
    public static double[] readArray(Scanner sc, int n, int index) {
        while (true) {
            System.out.print("Массив " + index + ": введите " + n + " " + plural(n) + " через пробел: ");
            String[] parts = nextLine(sc).split("\\s+");
            if (parts.length != n) {
                System.out.println("Ошибка: введено " + parts.length + " "
                        + plural(parts.length) + " вместо " + n + ".");
                continue;
            }
            try {
                double[] a = new double[n];
                for (int i = 0; i < n; i++) {
                    a[i] = Double.parseDouble(parts[i].replace(',', '.'));
                }
                return a;
            } catch (NumberFormatException e) {
                System.out.println("Ошибка: все элементы должны быть вещественными числами.");
            }
        }
    }

    /** Согласование числительного с существительным для сообщений пользователю. */
    private static String plural(int n) {
        int hundreds = n % 100;
        int units = n % 10;
        if (hundreds >= 11 && hundreds <= 14) {
            return "чисел";
        }
        if (units == 1) {
            return "число";
        }
        if (units >= 2 && units <= 4) {
            return "числа";
        }
        return "чисел";
    }

    private static String nextLine(Scanner sc) {
        if (!sc.hasNextLine()) {
            throw new NoSuchElementException("исходные данные закончились");
        }
        return sc.nextLine().trim();
    }
}
