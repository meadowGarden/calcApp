package app.calc.exceptions;

import jakarta.persistence.PersistenceException;

public class PasswordRepetitionException extends PersistenceException {
    public PasswordRepetitionException(String message) {
        super(message);
    }
}
