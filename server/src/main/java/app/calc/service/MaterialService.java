package app.calc.service;

import app.calc.dto.request.MaterialRequest;
import app.calc.dto.response.BackListResponse;
import app.calc.dto.response.BackResponse;
import app.calc.entity.MaterialEntity;
import app.calc.repository.MaterialRepository;
import app.calc.utils.EntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialService {
    private final MaterialRepository materialRepository;

    @Autowired
    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    public BackResponse<MaterialEntity> addMaterial(MaterialRequest request) {
        final MaterialEntity materialToSave = EntityMapper.materialDTO_material(request);
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
        materialToUpdate.setName(dto.getName());
        materialToUpdate.setDescription(dto.getDescription());
        materialToUpdate.setUOM(dto.getUOM());
        materialToUpdate.setPrice(dto.getPrice());

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
}
