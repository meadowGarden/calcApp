package app.calc.repository;

import app.calc.entity.BOMEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BOMRepository extends CrudRepository<BOMEntity, Long> {
    List<BOMEntity> findAll();
    Optional<BOMEntity> findByName(String name);
}
