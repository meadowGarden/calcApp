package app.calc.service;

import app.calc.dto.request.UserRequest;
import app.calc.dto.response.BackListResponse;
import app.calc.dto.response.BackResponse;
import app.calc.dto.response.UserResponse;
import app.calc.exceptions.EntityDuplicationException;
import app.calc.repository.UserRepository;
import app.calc.user.User;
import app.calc.utils.EntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    @Autowired
    public UserService(
            final UserRepository userRepository,
            final PasswordEncoder passwordEncoder,
            final AuthenticationService authenticationService,
            final JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
    }

    public BackResponse<UserResponse> createUser(final UserRequest request) {
        final String email = request.getEmail();
        final Optional<User> possibleUser = userRepository.findByEmail(email);
        if (possibleUser.isPresent())
            throw new EntityDuplicationException("user already exists");

        final User userToSave = EntityMapper.userDTO_user(request);
        final String encodedPassword =
                passwordEncoder.encode(userToSave.getPassword());
        userToSave.setPassword(encodedPassword);

        final User savedUser = userRepository.save(userToSave);
        final String jwtToken = jwtService.generateToken(savedUser);

        authenticationService.revokeAllUserTokens(savedUser);
        authenticationService.saveUserToken(savedUser, jwtToken);

        return new BackResponse<>(EntityMapper.user_userDTO(savedUser), HttpStatus.CREATED);
    }

    public BackListResponse<User> getAllUsers() {
        final List<User> list = userRepository.findAll();
        return new BackListResponse<>(list, HttpStatus.OK);
    }

    public BackResponse<User> getUserByID(long id) {
        final Optional<User> userByID = userRepository.findById(id);
        return userByID
                .map(user -> new BackResponse<>(user, HttpStatus.OK))
                .orElseGet(() -> new BackResponse<>(null, HttpStatus.NOT_FOUND));
    }

    public BackResponse<User> updateUserByID(long id, UserRequest dto) {
        final Optional<User> userByID = userRepository.findById(id);
        if (userByID.isEmpty())
            return new BackResponse<>(null, HttpStatus.NOT_FOUND);

        final User userToUpdate = userByID.get();
        userToUpdate.setFirstName(dto.getFirstName());
        userToUpdate.setLastName(dto.getLastName());
        userToUpdate.setEmail(dto.getEmail());
        userToUpdate.setPassword(passwordEncoder.encode(dto.getPassword()));
        userToUpdate.setRole(dto.getRole());

        final User updatedUser = userRepository.save(userToUpdate);
        return new BackResponse<>(updatedUser, HttpStatus.OK);
    }

    public BackResponse<User> deleteUserByID(long id) {
        final Optional<User> userByID = userRepository.findById(id);
        if (userByID.isEmpty())
            return new BackResponse<>(null, HttpStatus.NOT_FOUND);

        userRepository.deleteById(id);
        return new BackResponse<>(null, HttpStatus.NO_CONTENT);
    }
}
