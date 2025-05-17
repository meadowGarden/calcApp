package app.calc.repository;

import app.calc.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Page<User> findByFirstNameContainingIgnoreCaseAndLastNameContainingIgnoreCase(
            Pageable pageable, String firstNameContains, String lastNameContains);
}
