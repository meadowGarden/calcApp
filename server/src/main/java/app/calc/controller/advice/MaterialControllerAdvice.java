package app.calc.controller.advice;

import app.calc.controller.MaterialController;
import app.calc.exceptions.EntityDuplicationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(assignableTypes = MaterialController.class)
public class MaterialControllerAdvice {
    @ExceptionHandler(EntityDuplicationException.class)
    public ResponseEntity<?> materialNameAlreadyExistsExceptionHandler() {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body("another material with provided name already exists");
    }
}
