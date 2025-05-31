package app.calc.config;

import app.calc.repository.UserRepository;
import app.calc.user.Role;
import app.calc.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class StartUp {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public StartUp(final UserRepository userRepository, final PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    CommandLineRunner initialize() {
        return args -> {
            if (userRepository.findByEmail("admin@app.com").isEmpty()) {
                final User userToCreate = new User(
                        "admin",
                        "",
                        "admin@app.com",
                        passwordEncoder.encode("Adm1n1str4tor"),
                        Role.ADMIN);

                userRepository.save(userToCreate);
            }
        };
    }
}
