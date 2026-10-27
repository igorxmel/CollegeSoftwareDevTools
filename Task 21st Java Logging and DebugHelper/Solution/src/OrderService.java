import java.util.logging.Logger;

public class OrderService {

    private static final Logger logger =
            Logger.getLogger(OrderService.class.getName());

    // С этого количества пар заказ считается крупным и попадает в журнал как предупреждение.
    private static final int LARGE_ORDER_QUANTITY = 100;

    public double calculateTotal(double price, int quantity) {
        logger.info("Начало обработки заказа");
        logger.info("Получены данные: стоимость " + price + ", количество " + quantity);

        if (price <= 0) {
            logger.warning("Некорректная стоимость товара: " + price);
            throw new IllegalArgumentException(
                    "Стоимость товара должна быть больше нуля");
        }

        if (quantity <= 0) {
            logger.warning("Некорректное количество товара: " + quantity);
            throw new IllegalArgumentException(
                    "Количество товара должно быть положительным целым числом");
        }

        if (quantity >= LARGE_ORDER_QUANTITY) {
            logger.warning("Крупный заказ: " + quantity + " шт., нужна проверка остатков на складе");
        }

        double total = price * quantity;
        logger.info("Расчёт завершён. Итоговая стоимость: " + total);
        return total;
    }
}
