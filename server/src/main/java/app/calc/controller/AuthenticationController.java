package app.calc.controller;

import app.calc.dto.request.AuthenticateRequest;
import app.calc.dto.request.RegisterRequest;
import app.calc.dto.response.AuthenticationResponse;
import app.calc.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping(path = "/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        final AuthenticationResponse response = authenticationService.register(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping(path = "/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticateRequest request
    ) {
        final AuthenticationResponse response = authenticationService.authenticate(request);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @PostMapping(path = "/logout")
    public ResponseEntity<?> logout() {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(null);
    }
}
