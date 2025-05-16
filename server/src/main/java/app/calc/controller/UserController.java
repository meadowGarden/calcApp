package app.calc.controller;

import app.calc.dto.request.UserRequest;
import app.calc.dto.response.BackListResponse;
import app.calc.dto.response.BackResponse;
import app.calc.dto.response.UserResponse;
import app.calc.service.UserService;
import app.calc.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody final UserRequest userRequest) {
        final BackResponse<UserResponse> response = userService.createUser(userRequest);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getAllUsers() {
        final BackListResponse<User> response = userService.getAllUsers();
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getEntities());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getUserByID(@PathVariable long id) {
        final BackResponse<User> response = userService.getUserByID(id);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateUser(@PathVariable long id, @RequestBody UserRequest request) {
        final BackResponse<User> response = userService.updateUserByID(id, request);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable long id) {
        final BackResponse<User> response = userService.deleteUserByID(id);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }
}
