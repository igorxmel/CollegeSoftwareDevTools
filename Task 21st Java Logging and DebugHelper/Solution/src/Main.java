import java.util.logging.Level;
import java.util.logging.Logger;

public class Main {

    private static final Logger logger =
            Logger.getLogger(Main.class.getName());

    private static void processOrder(OrderService service, String title, double price, int quantity) {
        try {
            double total = service.calculateTotal(price, quantity);
            DebugHelper.printOrder(title, price, quantity, total);
        } catch (IllegalArgumentException e) {
            logger.log(Level.SEVERE, "Не удалось обработать заказ: " + title, e);
            DebugHelper.printError(title, e.getMessage());
        } catch (RuntimeException e) {
            logger.log(Level.SEVERE, "Непредвиденная ошибка при обработке заказа: " + title, e);
            DebugHelper.printError(title, "внутренняя ошибка, подробности в журнале");
        }
    }

    public static void main(String[] args) {
        OrderService service = new OrderService();

        System.out.println("1. Корректный заказ");
        processOrder(service, "Nike Air Zoom Pegasus 41", 13990, 2);

        System.out.println("\n2. Нулевая стоимость");
        processOrder(service, "Adidas Adizero SL2", 0, 1);

        System.out.println("\n3. Отрицательная стоимость");
        processOrder(service, "New Balance 550", -10990, 1);

        System.out.println("\n4. Нулевое количество");
        processOrder(service, "Nike LeBron XXI", 18990, 0);

        System.out.println("\n5. Отрицательное количество");
        processOrder(service, "Under Armour Curry 12", 16990, -3);

        System.out.println("\n6. Заказ с большим количеством товаров");
        processOrder(service, "New Balance 550", 10990, 250);
    }
}
