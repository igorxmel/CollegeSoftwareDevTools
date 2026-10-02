import java.util.NoSuchElementException;
import java.util.Scanner;

/** Управляющий модуль: связывает ввод, поиск характерной точки и вывод. */
public class Main {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        OutputModule.printHeader();

        try {
            double x0 = InputModule.readDouble(sc, "Начальное значение X0: ");
            double h = InputModule.readDouble(sc, "Шаг изменения аргумента h: ");

            SearchModule.Result result = SearchModule.find(x0, h);

            OutputModule.printTrace(result.trace());
            OutputModule.printPoint(result);
        } catch (InvalidStepException e) {
            OutputModule.printError("неверный шаг, " + e.getMessage());
        } catch (PointNotFoundException e) {
            OutputModule.printError(e.getMessage());
        } catch (ArithmeticException e) {
            OutputModule.printError("вычисление прервано, " + e.getMessage());
        } catch (NoSuchElementException e) {
            OutputModule.printError(e.getMessage());
        } finally {
            sc.close();
        }
    }
}
