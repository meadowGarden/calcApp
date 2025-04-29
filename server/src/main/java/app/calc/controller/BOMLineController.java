package app.calc.controller;

import app.calc.dto.request.BOMLineRequest;
import app.calc.dto.response.BackListResponse;
import app.calc.dto.response.BackResponse;
import app.calc.dto.response.pricedEntities.BOMData;
import app.calc.entity.BOMLineEntity;
import app.calc.service.BOMLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/bomlines")
@CrossOrigin("http://localhost:5173/")
public class BOMLineController {
    private final BOMLineService bomLineService;

    @Autowired
    public BOMLineController(BOMLineService bomLineService) {
        this.bomLineService = bomLineService;
    }

    @PostMapping
    public ResponseEntity<?> createBOMLine(@RequestBody BOMLineRequest dto) {
        final BackResponse<BOMData<BOMLineEntity>> response = bomLineService.createBOMLine(dto);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getEntity());
    }

    @GetMapping
    public ResponseEntity<?> getAllBOMLines() {
        final BackListResponse<BOMData<BOMLineEntity>> response = bomLineService.getAllBOMLines();
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getEntities());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getBOMLineByID(@PathVariable long id) {
        final BackResponse<BOMData<BOMLineEntity>> response = bomLineService.getBOMLineByID(id);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getEntity());
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateBOMLineByID(@PathVariable long id, @RequestBody BOMLineRequest request) {
        final BackResponse<BOMLineEntity> response = bomLineService.updateBOMLine(id, request);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getEntity());
    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity<?> deleteBOMLineByID(@PathVariable long id) {
        final BackResponse<BOMLineEntity> response = bomLineService.deleteBOMLineByID(id);
        return ResponseEntity
                .status(response.getStatus())
                .body(response.getEntity());
    }
}
