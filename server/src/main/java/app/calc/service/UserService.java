package app.calc.service;

import app.calc.dto.request.ChangePasswordRequest;
import app.calc.dto.request.UserRequest;
import app.calc.dto.response.BackListResponse;
import app.calc.dto.response.BackResponse;
import app.calc.dto.response.UserResponse;
import app.calc.exceptions.EntityDuplicationException;
import app.calc.exceptions.PasswordRepetitionException;
import app.calc.exceptions.WrongCurrentPasswordException;
import app.calc.repository.UserRepository;
import app.calc.user.Role;
import app.calc.user.User;
import app.calc.utils.EntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
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

    public BackResponse<Page<UserResponse>> getAllUsers(
            PageRequest pageRequest,
            String firstNameContains,
            String lastNameContains
    ) {
        final Page<User> pageRaw =
                userRepository.findByFirstNameContainingIgnoreCaseAndLastNameContainingIgnoreCase(
                        pageRequest, firstNameContains, lastNameContains);

        final List<UserResponse> userList = pageRaw.get()
                .map(EntityMapper::user_userDTO)
                .toList();

        Page<UserResponse> adjustedPage = new PageImpl<>(userList, pageRequest, pageRaw.getTotalElements());
        return new BackResponse<>(adjustedPage, HttpStatus.OK);
    }

    public BackResponse<UserResponse> getUserByID(long id) {
        final Optional<User> userByID = userRepository.findById(id);
        return userByID
                .map(user -> new BackResponse<>(EntityMapper.user_userDTO(userByID.get()), HttpStatus.OK))
                .orElseGet(() -> new BackResponse<>(null, HttpStatus.NOT_FOUND));
    }

    public BackResponse<UserResponse> updateUserByID(long id, UserRequest dto) {
        final Optional<User> userByID = userRepository.findById(id);
        if (userByID.isEmpty())
            return new BackResponse<>(null, HttpStatus.NOT_FOUND);

        final User userToUpdate = userByID.get();

        final Optional<User> possibleUser = userRepository.findByEmail(dto.getEmail());
        if (possibleUser.isPresent() && possibleUser.get().getId() != userToUpdate.getId())
            throw new EntityDuplicationException("user already exists");

        userToUpdate.setFirstName(dto.getFirstName());
        userToUpdate.setLastName(dto.getLastName());
        userToUpdate.setEmail(dto.getEmail());

        if (dto.getRole() != null)
            userToUpdate.setRole(dto.getRole());

        final User updatedUser = userRepository.save(userToUpdate);
        return new BackResponse<>(EntityMapper.user_userDTO(updatedUser), HttpStatus.OK);
    }

    public BackResponse<String> updateUsersPassword(long id, ChangePasswordRequest dto) {
        final Optional<User> userByID = userRepository.findById(id);
        if (userByID.isEmpty())
            return new BackResponse<>(null, HttpStatus.NOT_FOUND);

        final User userToUpdate = userByID.get();
        if (!passwordEncoder.matches(dto.getOldPassword(), userToUpdate.getPassword()))
            throw new WrongCurrentPasswordException("old password is wrong");

        if (passwordEncoder.matches(dto.getNewPassword(), userToUpdate.getPassword()))
            throw new PasswordRepetitionException("new password is the same as new password");

        userToUpdate.setPassword(passwordEncoder.encode(dto.getNewPassword()));

        final User updatedUser = userRepository.save(userToUpdate);
        return new BackResponse<>("password has been changed", HttpStatus.OK);
    }

    public BackResponse<UserResponse> deleteUserByID(long id) {
        final Optional<User> userByID = userRepository.findById(id);
        if (userByID.isEmpty())
            return new BackResponse<>(null, HttpStatus.NOT_FOUND);

        userRepository.deleteById(id);
        return new BackResponse<>(null, HttpStatus.NO_CONTENT);
    }

    public BackListResponse<Role> getAllRoles() {
        final List<Role> roles = new ArrayList<>(Arrays.asList(Role.values()));
        return new BackListResponse<>(roles, HttpStatus.OK);
    }
}
