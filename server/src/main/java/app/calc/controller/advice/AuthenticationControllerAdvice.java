package app.calc.controller.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AuthenticationControllerAdvice {

    @ExceptionHandler(UnsupportedOperationException.class)
    public ResponseEntity<?> userAlreadyExistsExceptionHandler() {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("user by your provided email already exists");
    }
}
