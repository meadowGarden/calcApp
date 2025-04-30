package app.calc.controller;

import app.calc.dto.request.BOMRequest;
import app.calc.dto.response.pricedEntities.BOMData;
import app.calc.dto.response.BackListResponse;
import app.calc.dto.response.BackResponse;
import app.calc.entity.BOMEntity;
import app.calc.service.BOMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/bom")
@CrossOrigin("http://localhost:5173/")
public class BOMController {
    private final BOMService bomService;

    @Autowired
    public BOMController(BOMService bomService) {
        this.bomService = bomService;
    }

    @PostMapping
    public ResponseEntity<?> createBOM(@RequestBody BOMRequest request) {
        final BackResponse<BOMData<BOMEntity>> response = bomService.createBOM(request);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }

    @GetMapping
    public ResponseEntity<?> getAllBOM() {
        final BackListResponse<BOMData<BOMEntity>> response = bomService.getAllBOM();
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getEntities());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getBOMByID(@PathVariable long id) {
        final BackResponse<BOMData<BOMEntity>> response = bomService.getBOMByID(id);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateBOMByID(@PathVariable long id, @RequestBody BOMRequest request) {
        final BackResponse<BOMEntity> response = bomService.updateBOMByID(id, request);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteBOMByID(@PathVariable long id) {
        final BackResponse<BOMEntity> response = bomService.deleteBOMByID(id);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getObject());
    }
}
