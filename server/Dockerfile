FROM eclipse-temurin:17-jdk-jammy AS builder
WORKDIR /app
COPY . /app
RUN chmod +x gradlew
RUN ./gradlew bootJar --no-daemon

FROM eclipse-temurin:17-jdk-jammy
COPY --from=builder /app/build/libs/*.jar app.jar
CMD ["java", "-jar", "app.jar"]
