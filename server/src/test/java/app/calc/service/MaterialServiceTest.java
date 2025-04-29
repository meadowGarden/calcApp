package app.calc.service;

import app.calc.dto.request.MaterialRequest;
import app.calc.dto.response.BackResponse;
import app.calc.entity.MaterialEntity;
import app.calc.repository.MaterialRepository;
import app.calc.utils.UnitOfMeasurement;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
@DisplayName("material service mock")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class MaterialServiceTest {
    @Mock
    private MaterialRepository materialRepository;

    @InjectMocks
    private MaterialService materialService;

    private MaterialRequest materialRequest;
    private MaterialEntity materialEntitySaved001;
    private MaterialEntity materialEntitySaved002;
    private MaterialEntity materialEntitySaved003;

    @BeforeEach
    void beforeEachSetUp() {
        materialRequest =
                new MaterialRequest("mat01", "desc01",  UnitOfMeasurement.LITER, 1.0);

        materialEntitySaved001 =
                new MaterialEntity(1, "mat01", "desc01", UnitOfMeasurement.LITER, 1.0);
        materialEntitySaved002 =
                new MaterialEntity(2, "mat02", "desc02", UnitOfMeasurement.SET, 0.5);
        materialEntitySaved003 =
                new MaterialEntity(3, "mat03", "desc03", UnitOfMeasurement.PIECE, 3.9);
    }

    @Test
    @DisplayName("create material, success")
    @Order(1)
    void testMaterialCreateSuccess() {
        Mockito.when(materialRepository.save(any(MaterialEntity.class)))
                        .thenReturn(materialEntitySaved001);
        final BackResponse<MaterialEntity> response = materialService.addMaterial(materialRequest);

        Assertions.assertEquals(1.0, response.getEntity().getPrice());
        Assertions.assertEquals("mat01", response.getEntity().getName());
        Assertions.assertEquals("desc01", response.getEntity().getDescription());
        Assertions.assertEquals(HttpStatus.CREATED, response.getStatus());

        Mockito.verify(materialRepository, Mockito.times(1))
                .save(any(MaterialEntity.class));
    }

    @Test
    @DisplayName("get all materials")
    @Order(2)
    void testGetMaterialAllMaterials() {
        List<MaterialEntity> list = List.of(materialEntitySaved001, materialEntitySaved002, materialEntitySaved003);
        Mockito.when(materialRepository.findAll())
                .thenReturn(list);

        var response = materialService.getAllMaterials();
        Assertions.assertEquals(3, response.getEntities().size());
    }

    @Test
    @DisplayName("get material by id, success")
    @Order(3)
    void testGetMaterialByIDSuccess() {
        Mockito.when(materialRepository.findById(1L))
                .thenReturn(Optional.of(materialEntitySaved001));

        var response = materialService.getMaterialByID(1L);
        Assertions.assertEquals(1, response.getEntity().getID());
    }

    @Test
    @DisplayName("get material by id, fail")
    @Order(3)
    void testGetMaterialByIDFail() {
        Mockito.when(materialRepository.findById(-1L))
                .thenReturn(Optional.empty());
        var response = materialService.getMaterialByID(-1L);
        Assertions.assertNull(response.getEntity());
    }

    @Test
    @DisplayName("update material")
    @Order(4)
    @Disabled
    void testUpdateMaterialSuccess() {
//        Mockito.when(materialRepository.findById(1L))
//        Mockito.when(materialRepository.save(Mockito.any(MaterialEntity.class)))
//                .thenReturn();

    }

    @Test
    @DisplayName("delete material, success")
    @Order(5)
    @Disabled
    void testDeleteMaterialSuccess() {

    }

    @Test
    @DisplayName("delete material, fail")
    @Order(5)
    @Disabled
    void testDeleteMaterialFail() {

    }
}
