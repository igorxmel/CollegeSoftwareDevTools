import java.util.NoSuchElementException;
import java.util.Scanner;

/** Модуль ввода данных: чтение вещественных чисел с повтором при неверном вводе. */
public final class InputModule {

    private InputModule() {
    }

    /**
     * Читает вещественное число. Нечисловой ввод перехватывается здесь же и
     * приводит к повторному запросу, а не к остановке программы.
     */
    public static double readDouble(Scanner sc, String prompt) {
        while (true) {
            System.out.print(prompt);
            String line = nextLine(sc);
            try {
                return Double.parseDouble(line.replace(',', '.'));
            } catch (NumberFormatException e) {
                System.out.println("Ошибка: требуется вещественное число, введено \"" + line + "\".");
            }
        }
    }

    private static String nextLine(Scanner sc) {
        if (!sc.hasNextLine()) {
            throw new NoSuchElementException("исходные данные закончились");
        }
        return sc.nextLine().trim();
    }
}
