package app.calc.exceptions;

import jakarta.persistence.PersistenceException;

public class WrongCurrentPasswordException extends PersistenceException {
    public WrongCurrentPasswordException(String message) {
        super(message);
    }
}
