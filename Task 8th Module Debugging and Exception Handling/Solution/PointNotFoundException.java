/** Характерная точка не встретилась за отведённое число шагов. */
public class PointNotFoundException extends SearchException {

    public PointNotFoundException(String message) {
        super(message);
    }
}
