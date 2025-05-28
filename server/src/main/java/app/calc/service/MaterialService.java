package app.calc.service;

import app.calc.dto.request.MaterialRequest;
import app.calc.dto.response.BackListResponse;
import app.calc.dto.response.BackResponse;
import app.calc.entity.MaterialEntity;
import app.calc.exceptions.EntityDuplicationException;
import app.calc.repository.MaterialRepository;
import app.calc.utils.AppFormatter;
import app.calc.utils.EntityMapper;
import app.calc.utils.UnitOfMeasurement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class MaterialService {
    private final MaterialRepository materialRepository;

    @Autowired
    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    public BackResponse<MaterialEntity> addMaterial(MaterialRequest dto) {
        final String materialName = dto.getName();
        Optional<MaterialEntity> materialEntity = materialRepository.findByName(materialName);
        if (materialEntity.isPresent())
            throw new EntityDuplicationException("material by this name already exists");

        final MaterialEntity materialToSave = EntityMapper.materialDTO_material(dto);
        final MaterialEntity savedMaterial = materialRepository.save(materialToSave);
        return new BackResponse<>(savedMaterial, HttpStatus.CREATED);
    }

    public BackListResponse<MaterialEntity> getAllMaterials() {
        final List<MaterialEntity> materials = materialRepository.findAll();
        return new BackListResponse<>(materials, HttpStatus.OK);
    }

    public BackResponse<MaterialEntity> getMaterialByID(long id) {
        final Optional<MaterialEntity> materialByID = materialRepository.findById(id);

        if (materialByID.isEmpty())
            return new BackResponse<>(null, HttpStatus.NOT_FOUND);

        return new BackResponse<>(materialByID.get(), HttpStatus.OK);
    }

    public BackResponse<MaterialEntity> updateMaterialByID(long id, MaterialRequest dto) {
        final Optional<MaterialEntity> materialByID = materialRepository.findById(id);
        if (materialByID.isEmpty())
            return new BackResponse<>(null, HttpStatus.NOT_FOUND);

        final MaterialEntity materialToUpdate = materialByID.get();

        Optional<MaterialEntity> materialEntity = materialRepository.findByName(dto.getName());
        if (materialEntity.isPresent() && materialEntity.get().getID() != materialToUpdate.getID())
            throw new EntityDuplicationException("material by this name already exists");

        materialToUpdate.setName(dto.getName());
        materialToUpdate.setDescription(dto.getDescription());
        materialToUpdate.setPurchaseUOM(dto.getPurchaseUOM());
        materialToUpdate.setStorageUOM(dto.getStorageUOM());
        materialToUpdate.setPurchasePrice(dto.getPurchasePrice());
        materialToUpdate.setPrice(AppFormatter.adjustPrice(dto.getPurchasePrice(), dto.getConversionRatio()));

        final MaterialEntity updateMaterial = materialRepository.save(materialToUpdate);
        return new BackResponse<>(updateMaterial, HttpStatus.OK);
    }

    public BackResponse<MaterialEntity> deleteMaterialByID(long id) {
        final Optional<MaterialEntity> materialByID = materialRepository.findById(id);
        if (materialByID.isEmpty())
            return new BackResponse<>(null, HttpStatus.NOT_FOUND);

        materialRepository.deleteById(id);
        return new BackResponse<>(null, HttpStatus.NO_CONTENT);
    }

    public BackResponse<List<UnitOfMeasurement>> getUOM() {
        final List<UnitOfMeasurement> list = new ArrayList<>(Arrays.asList(UnitOfMeasurement.values()));
        return new BackResponse<>(list, HttpStatus.OK);
    }
}
