package app.calc.service;

import app.calc.dto.request.AuthenticateRequest;
import app.calc.dto.request.RegisterRequest;
import app.calc.dto.response.AuthenticationResponse;
import app.calc.entity.Token;
import app.calc.exceptions.EntityDuplicationException;
import app.calc.repository.TokenRepository;
import app.calc.repository.UserRepository;
import app.calc.user.Role;
import app.calc.user.User;
import app.calc.utils.TokenType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationService(
            UserRepository userRepository,
            TokenRepository tokenRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager
    ) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        final String email = request.getEmail();
        final Optional<User> possibleUser = userRepository.findByEmail(email);
        if (possibleUser.isPresent())
            throw new EntityDuplicationException("user already exists");

        final String firstName = request.getFirstName();
        final String lastName = request.getLastName();
        final String passwordito = passwordEncoder.encode(request.getPassword());
        final Role role = Role.USER;
        final User userToSave = new User(firstName, lastName, email, passwordito, role);
        final User savedUser = userRepository.save(userToSave);

        final String jwtToken = jwtService.generateToken(savedUser);

        revokeAllUserTokens(savedUser);
        saveUserToken(savedUser, jwtToken);
        return new AuthenticationResponse(jwtToken);
    }

    public AuthenticationResponse authenticate(AuthenticateRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        final User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("not found"));
        final String jwtToken = jwtService.generateToken(user);

        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return new AuthenticationResponse(jwtToken);
    }

    public void revokeAllUserTokens(final User user) {
        final List<Token> validTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validTokens.isEmpty())
            return;

        validTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });

        tokenRepository.saveAll(validTokens);
    }

    public void saveUserToken(User user, String token) {
        final Token tokenToSave = new Token(token, TokenType.BEARER, false, false, user);
        tokenRepository.save(tokenToSave);
    }
}
