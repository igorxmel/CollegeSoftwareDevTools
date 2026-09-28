import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Scanner;

/** Управляющий модуль: связывает ввод, обработку и вывод. */
public class Main {

    public static final int ARRAY_COUNT = 5;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Integer> found = new ArrayList<>();

        System.out.println("Проверка пяти массивов на одинаковый знак элементов");
        System.out.println();

        try {
            for (int i = 1; i <= ARRAY_COUNT; i++) {
                int n = InputModule.readSize(sc, i);
                double[] a = InputModule.readArray(sc, n, i);

                OutputModule.printArray(i, a);
                boolean sameSign = SignChecker.hasSameSign(a);
                OutputModule.printCheckResult(i, a, sameSign);

                if (sameSign) {
                    found.add(i);
                }
            }
        } catch (NoSuchElementException e) {
            System.out.println();
            System.out.println("Ошибка ввода: " + e.getMessage() + ". Работа прервана.");
            return;
        }

        OutputModule.printSummary(found);
    }
}
