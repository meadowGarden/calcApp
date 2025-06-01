package app.calc;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@DisplayName("app tests")
@Order(0)
class CalcApplicationTests {
	@Value("${app.name}")
	private String appName;

	@Test
	@Disabled
	void contextLoads() {
	}

	@Test
	@Disabled
	void checkAppName() {
		Assertions.assertEquals("production costs calculator", appName);
	}

}
