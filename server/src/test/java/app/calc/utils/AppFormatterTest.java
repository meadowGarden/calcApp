package app.calc.utils;

import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.MethodName.class)
@DisplayName("app formatting")
class AppFormatterTest {

    @ParameterizedTest(name="value: {0}, expected: {1}")
    @CsvSource({
            "2.456789, 2.45679",
            "1.999999, 2.0",
            "6.125477, 6.12548"
    })
    @DisplayName("costs rounding for bom lines")
    @Order(1)
    void testRoundingBOMLines(double input, double output) {
        assertEquals(output, AppFormatter.roundingBOMLinesCosts(input));
    }

    @ParameterizedTest(name="in: {0}, out: {1}")
    @CsvSource({
            "2.456789, 2.457",
            "1.999999, 2.0",
            "6.12547, 6.125"
    })
    @DisplayName("costs rounding for bom")
    @Order(2)
    void testRoundingBOM(double input, double output) {
        assertEquals(output, AppFormatter.roundingBOMCosts(input));
    }
}
