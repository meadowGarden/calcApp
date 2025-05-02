package app.calc.utils;

import app.calc.dto.request.BOMLineRequest;
import app.calc.dto.request.BOMRequest;
import app.calc.dto.request.MaterialRequest;
import app.calc.entity.BOMEntity;
import app.calc.entity.BOMLineEntity;
import app.calc.entity.MaterialEntity;
import app.calc.repository.BOMLineRepository;
import jakarta.persistence.EntityNotFoundException;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class EntityMapper {



    public static MaterialEntity materialDTO_material(MaterialRequest dto) {
        return new MaterialEntity(
                dto.getName(),
                dto.getDescription(),
                dto.getUOM(),
                dto.getPrice()
        );
    }

    public static BOMLineEntity bomLineDTO_bomLine(BOMLineRequest dto) {
        return new BOMLineEntity(dto.getQuantity(), dto.getMaterial());
    }

    public static BOMLineRequest bomLine_bomLineDTO(BOMLineEntity entity) {
        return new BOMLineRequest(entity.getQuantity(), entity.getMaterial());
    }

    public static BOMEntity bomDTO_bom(BOMRequest dto, BOMLineRepository bomLineRepository) {
        Set<BOMLineEntity> attachedBomLines = new HashSet<>();

        if (dto.getBomLines() != null && dto.getBomLines().size() != 0) {
            attachedBomLines = dto.getBomLines().stream()
                    .map(line -> bomLineRepository.findById(line.getId())
                            .orElseThrow(() -> new EntityNotFoundException("")))
                    .collect(Collectors.toSet());
        }

        return new BOMEntity(
                dto.getName(),
                dto.getDescription(),
                dto.getUOM(),
                attachedBomLines
        );
    }
}
