package app.calc.utils;

import app.calc.dto.request.BOMLineRequest;
import app.calc.dto.request.BOMRequest;
import app.calc.dto.request.MaterialRequest;
import app.calc.dto.request.UserRequest;
import app.calc.dto.response.UserResponse;
import app.calc.entity.BOMEntity;
import app.calc.entity.BOMLineEntity;
import app.calc.entity.MaterialEntity;
import app.calc.repository.BOMLineRepository;
import app.calc.user.User;
import jakarta.persistence.EntityNotFoundException;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class EntityMapper {




    public static UserResponse user_userDTO(final User user) {
        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.isEnabled()
        );
    }

    public static User userDTO_user(UserRequest dto) {
        return new User(
                dto.getFirstName(),
                dto.getLastName(),
                dto.getEmail(),
                dto.getPassword(),
                dto.getRole()
        );
    }

    public static MaterialEntity materialDTO_material(MaterialRequest dto) {
        if (Double.compare(dto.getConversionRatio(), 0) == 0)
            dto.setConversionRatio(1);

        if (dto.getStorageUOM() == null)
            dto.setStorageUOM(dto.getPurchaseUOM());

        double price = dto.getPurchasePrice();
        if (dto.getPurchaseUOM() != dto.getStorageUOM()) {
            price = AppFormatter.adjustPrice(dto.getPurchasePrice(), dto.getConversionRatio());
            price = AppFormatter.roundingMaterialPrice(price);
        }

        return new MaterialEntity(
                dto.getName(),
                dto.getDescription(),
                dto.getPurchaseUOM(),
                dto.getStorageUOM(),
                dto.getPurchasePrice(),
                price,
                dto.getConversionRatio()
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
