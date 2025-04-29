package app.calc.repository;

import app.calc.entity.BOMLineEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BOMLineRepository extends CrudRepository<BOMLineEntity, Long> {
    List<BOMLineEntity> findAll();
}
