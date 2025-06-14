package app.calc.controller.advice;

import app.calc.controller.AuthenticationController;
import app.calc.exceptions.EntityDuplicationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(assignableTypes = AuthenticationController.class)
public class AuthenticationControllerAdvice {

    @ExceptionHandler(EntityDuplicationException.class)
    public ResponseEntity<?> userAlreadyExistsExceptionHandler() {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body("user by your provided email already exists");
    }
}
