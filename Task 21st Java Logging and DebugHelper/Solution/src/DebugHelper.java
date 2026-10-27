import java.util.Locale;

public class DebugHelper {

    private static final Locale RU = Locale.forLanguageTag("ru-RU");

    public static void printOrder(String title, double price, int quantity, double total) {
        System.out.println("Информация о заказе:");
        System.out.println("  Товар: " + title);
        System.out.println("  Стоимость одной пары: " + money(price));
        System.out.println("  Количество: " + quantity);
        System.out.println("  Итоговая сумма: " + money(total));
    }

    public static void printError(String title, String message) {
        System.err.println("Заказ \"" + title + "\" не обработан: " + message);
    }

    private static String money(double value) {
        return String.format(RU, "%.2f руб.", value);
    }
}
