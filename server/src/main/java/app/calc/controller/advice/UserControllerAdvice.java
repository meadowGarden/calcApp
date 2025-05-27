package app.calc.controller.advice;

import app.calc.controller.UserController;
import app.calc.exceptions.EntityDuplicationException;
import app.calc.exceptions.PasswordRepetitionException;
import app.calc.exceptions.WrongCurrentPasswordException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(assignableTypes = UserController.class)
public class UserControllerAdvice {

    @ExceptionHandler(EntityDuplicationException.class)
    public ResponseEntity<?> userAlreadyExistsExceptionHandler() {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body("user by your provided email already exists");
    }

    @ExceptionHandler(WrongCurrentPasswordException.class)
    public ResponseEntity<?> wrongCurrentPasswordExceptionHandler() {
        return ResponseEntity
                .status(HttpStatus.NOT_ACCEPTABLE)
                .body("provided current password is wrong");
    }

    @ExceptionHandler(PasswordRepetitionException.class)
    public ResponseEntity<?> repeatingNewPasswordExceptionHandler() {
        return ResponseEntity
                .status(HttpStatus.EXPECTATION_FAILED)
                .body("provided new password is the same as current one");
    }
}
