/** Шаг изменения аргумента задан неположительным числом. */
public class InvalidStepException extends SearchException {

    public InvalidStepException(String message) {
        super(message);
    }
}
