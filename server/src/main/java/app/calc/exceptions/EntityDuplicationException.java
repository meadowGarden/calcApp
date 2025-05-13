package app.calc.exceptions;

import jakarta.persistence.PersistenceException;

public class EntityDuplicationException extends PersistenceException {
    public EntityDuplicationException(String message) {
        super(message);
    }
}
