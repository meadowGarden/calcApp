package app.calc.service;

import app.calc.dto.request.BOMRequest;
import app.calc.dto.response.pricedEntities.BOMData;
import app.calc.dto.response.BackListResponse;
import app.calc.dto.response.BackResponse;
import app.calc.entity.BOMEntity;
import app.calc.repository.BOMLineRepository;
import app.calc.repository.BOMRepository;
import app.calc.utils.AppFormatter;
import app.calc.utils.EntityMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BOMService {
    private final BOMRepository bomRepository;
    private final BOMLineRepository bomLineRepository;

    @Autowired
    public BOMService(BOMRepository bomRepository, BOMLineRepository bomLineRepository) {
        this.bomRepository = bomRepository;
        this.bomLineRepository = bomLineRepository;
    }

    public BackResponse<BOMData<BOMEntity>> createBOM(BOMRequest dto) {
        final BOMEntity bomToCreate = EntityMapper.bomDTO_bom(dto, bomLineRepository);
        final BOMEntity savedBOM = bomRepository.save(bomToCreate);
        final BOMData<BOMEntity> bomData = new BOMData<>(savedBOM, calculateCost(savedBOM));
        return new BackResponse<>(bomData, HttpStatus.CREATED);
    }

    public BackListResponse<BOMData<BOMEntity>> getAllBOM() {
        final List<BOMEntity> bomEntities = bomRepository.findAll();
        final List<BOMData<BOMEntity>> bom = bomEntities.stream()
                .map(b -> new BOMData<>(b, calculateCost(b)))
                .collect(Collectors.toList());
        return new BackListResponse<>(bom, HttpStatus.OK);
    }

    public BackResponse<BOMData<BOMEntity>> getBOMByID(long id) {
        final BOMEntity bom = bomRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("bom with an id: %d was not found", id)));
        final double cost = calculateCost(bom);
        final BOMData<BOMEntity> bomData = new BOMData<>(bom, cost);
        return new BackResponse<>(bomData, HttpStatus.OK);
    }

    private double calculateCost(final BOMEntity bom) {
        if (bom.getBomLines().size() == 0)
            return 0.0;

        double costs = bom.getBomLines().stream()
                .map(b -> b.getQuantity() * b.getMaterial().getPrice())
                .reduce(Double::sum)
                .orElseThrow(NumberFormatException::new);
        return AppFormatter.roundingBOMCosts(costs);
    }

    public BackResponse<BOMEntity> updateBOMByID(long id, BOMRequest dto) {
        final Optional<BOMEntity> bomByID = bomRepository.findById(id);

        if (bomByID.isEmpty())
            return new BackResponse<>(null, HttpStatus.NOT_FOUND);

        final BOMEntity bomToUpdate = bomByID.get();
        bomToUpdate.setName(dto.getName());
        bomToUpdate.setDescription(dto.getDescription());
        bomToUpdate.setUOM(dto.getUOM());
        bomToUpdate.setBomLines(dto.getBomLines());

        final BOMEntity updateBOM = bomRepository.save(bomToUpdate);
        return new BackResponse<>(updateBOM, HttpStatus.OK);
    }

    public BackResponse<BOMEntity> deleteBOMByID(long id) {
        final Optional<BOMEntity> bomByID = bomRepository.findById(id);
        if (bomByID.isEmpty())
            return new BackResponse<>(null, HttpStatus.NOT_FOUND);

        return new BackResponse<>(null, HttpStatus.NO_CONTENT);
    }
}
