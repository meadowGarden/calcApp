package app.calc.repository;

import app.calc.entity.MaterialEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialRepository extends CrudRepository<MaterialEntity, Long> {
    List<MaterialEntity> findAll();
}
