package app.calc.service;

import app.calc.dto.request.BOMLineRequest;
import app.calc.dto.response.BackListResponse;
import app.calc.dto.response.BackResponse;
import app.calc.dto.response.pricedEntities.BOMData;
import app.calc.entity.BOMLineEntity;
import app.calc.repository.BOMLineRepository;
import app.calc.utils.AppFormatter;
import app.calc.utils.EntityMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BOMLineService {
    private final BOMLineRepository bomLineRepository;

    @Autowired
    public BOMLineService(BOMLineRepository bomLineRepository) {
        this.bomLineRepository = bomLineRepository;
    }

    public BackResponse<BOMData<BOMLineEntity>> createBOMLine(BOMLineRequest dto) {
        final BOMLineEntity bomLineToCreate = EntityMapper.bomLineDTO_bomLine(dto);
        final BOMLineEntity savedBOMLine = bomLineRepository.save(bomLineToCreate);
        final BOMData<BOMLineEntity> bomData = new BOMData<>(savedBOMLine, calculateCost(savedBOMLine));
        return new BackResponse<>(bomData, HttpStatus.CREATED);
    }

    public BackListResponse<BOMData<BOMLineEntity>> getAllBOMLines() {
        final List<BOMLineEntity> bomLinesEntities = bomLineRepository.findAll();
        final List<BOMData<BOMLineEntity>> bom = bomLinesEntities.stream()
                .map(b -> new BOMData<>(b, calculateCost(b)))
                .toList();
        return new BackListResponse<>(bom, HttpStatus.OK);
    }

    public BackResponse<BOMData<BOMLineEntity>> getBOMLineByID(long id) {
        final BOMLineEntity bomLineEntity = bomLineRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("bomLine with an id: %d was not found", id)));
        final double costs = calculateCost(bomLineEntity);
        final BOMData<BOMLineEntity> bomData = new BOMData<>(bomLineEntity, costs);
        return new BackResponse<>(bomData, HttpStatus.OK);
    }

    private double calculateCost(final BOMLineEntity entity) {
        double costs = entity.getQuantity() * entity.getMaterial().getPrice();
        return AppFormatter.roundingBOMLinesCosts(costs);
    }

    public BackResponse<BOMLineEntity> updateBOMLine(long id, BOMLineRequest dto) {
        final Optional<BOMLineEntity> bomLineByID = bomLineRepository.findById(id);

        if (bomLineByID.isEmpty())
            return new BackResponse<>(null, HttpStatus.NOT_FOUND);

        final BOMLineEntity bomLineToUpdate = bomLineByID.get();
        bomLineToUpdate.setMaterial(dto.getMaterial());
        bomLineToUpdate.setQuantity(dto.getQuantity());

        final BOMLineEntity updatedBOMLine = bomLineRepository.save(bomLineToUpdate);
        return new BackResponse<>(updatedBOMLine, HttpStatus.OK);
    }

    public BackResponse<BOMLineEntity> deleteBOMLineByID(long id) {
        final Optional<BOMLineEntity> bomLineByID = bomLineRepository.findById(id);
        if (bomLineByID.isEmpty())
            return new BackResponse<>(null, HttpStatus.NOT_FOUND);

        bomLineRepository.deleteById(id);
        return new BackResponse<>(null, HttpStatus.NO_CONTENT);
    }
}
