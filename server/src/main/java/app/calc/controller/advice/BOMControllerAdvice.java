package app.calc.controller.advice;

import app.calc.controller.BOMController;
import app.calc.exceptions.EntityDuplicationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(assignableTypes = BOMController.class)
public class BOMControllerAdvice {

    @ExceptionHandler(EntityDuplicationException.class)
    public ResponseEntity<?> bomAlreadyExistsExceptionHandler() {

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body("bom by this name already exists");
    }
}
