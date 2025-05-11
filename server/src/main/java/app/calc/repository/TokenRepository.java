package app.calc.repository;

import app.calc.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {
    @Query("""
            SELECT t FROM Token t
            INNER JOIN User u ON u.id = t.user.id
            WHERE u.id = :userID AND (t.expired = FALSE OR t.revoked = FALSE)
            """)
    List<Token> findAllValidTokensByUser(long userID);

    Optional<Token> findByToken(String token);
}
