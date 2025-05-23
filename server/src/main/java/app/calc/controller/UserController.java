package app.calc.controller;

import app.calc.dto.request.ChangePasswordRequest;
import app.calc.dto.request.UserRequest;
import app.calc.dto.response.BackListResponse;
import app.calc.dto.response.BackResponse;
import app.calc.dto.response.UserResponse;
import app.calc.service.UserService;
import app.calc.user.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createUser(@RequestBody final UserRequest userRequest) {
        final BackResponse<UserResponse> response = userService.createUser(userRequest);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAllUsers(
            @RequestParam(required = false) String firstNameContains,
            @RequestParam(required = false) String lastNameContains,
            @RequestParam(defaultValue = "1") Integer pageNumber,
            @RequestParam(defaultValue = "20") Integer numberOfItems,
            @RequestParam(defaultValue = "lastName") String sortBy,
            @RequestParam(defaultValue = "true") boolean sortAsc
    ) {
        final Sort.Direction direction = sortAsc ? Sort.Direction.ASC : Sort.Direction.DESC;
        final Sort sort = Sort.by(direction, sortBy);
        final PageRequest pageRequest = PageRequest.of(--pageNumber, numberOfItems, sort);
        final BackResponse<Page<UserResponse>> response = userService.getAllUsers(
                pageRequest,
                firstNameContains,
                lastNameContains
        );

        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getUserByID(@PathVariable long id) {
        final BackResponse<UserResponse> response = userService.getUserByID(id);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateUser(@PathVariable long id, @RequestBody UserRequest request) {
        final BackResponse<UserResponse> response = userService.updateUserByID(id, request);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<?> changePassword(@PathVariable long id, @RequestBody ChangePasswordRequest request) {
        final BackResponse<String> response = userService.updateUsersPassword(id, request);

        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable long id) {
        final BackResponse<UserResponse> response = userService.deleteUserByID(id);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }

    @GetMapping(path = "/roles")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAllRoles() {
        final BackListResponse<Role> response = userService.getAllRoles();
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getEntities());
    }
}
