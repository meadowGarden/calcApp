package app.calc;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@DisplayName("app tests")
@Order(0)
class CalcApplicationTests {
	@Value("${app.name}")
	private String appName;

	@Test
	void contextLoads() {
	}

	@Test
	void checkAppName() {
		Assertions.assertEquals("production costs calculator", appName);
	}

}
