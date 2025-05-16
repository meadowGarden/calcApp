package app.calc.controller;

import app.calc.dto.request.MaterialRequest;
import app.calc.dto.response.BackListResponse;
import app.calc.dto.response.BackResponse;
import app.calc.entity.MaterialEntity;
import app.calc.service.MaterialService;
import app.calc.utils.UnitOfMeasurement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/materials")
public class MaterialController {
    private final MaterialService materialService;

    @Autowired
    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    @PostMapping
    public ResponseEntity<?> addMaterial(@RequestBody MaterialRequest request) {
        final BackResponse<MaterialEntity> response = materialService.addMaterial(request);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }

    @GetMapping
    public ResponseEntity<?> getAllMaterials() {
        final BackListResponse<MaterialEntity> response = materialService.getAllMaterials();
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getEntities());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getMaterialByID(@PathVariable long id) {
        final BackResponse<MaterialEntity> response = materialService.getMaterialByID(id);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateMaterial(@PathVariable long id, @RequestBody MaterialRequest dto) {
        final BackResponse<MaterialEntity> response = materialService.updateMaterialByID(id, dto);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }

    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteMaterialByID(@PathVariable long id) {
        final BackResponse<MaterialEntity> response = materialService.deleteMaterialByID(id);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }

    @GetMapping(path = "/uom")
    public ResponseEntity<?> getUOM() {
        final BackResponse<List<UnitOfMeasurement>> response = materialService.getUOM();
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }
}
