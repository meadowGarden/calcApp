# # stage
# FROM eclipse-temurin:21-jdk-jammy AS deps
# WORKDIR /build
#
# COPY --chmod=0755 gradlew gradlew
# COPY gradle/ gradle/
# COPY build.gradle .
# COPY settings.gradle .
#
# RUN ./gradlew dependencies --no-daemon
#
# # stage
# FROM deps AS package
# COPY . .
# RUN ./gradlew bootJar --no-daemon
#
# # stage
# FROM package as extract
# WORKDIR /build
# RUN java -Djarmode=layertools -jar build/libs/*.jar extract --destination build/extracted
#
# # stage
# FROM eclipse-temurin:21-jre-jammy AS final
#
# ARG UID=10001
# RUN adduser \
#     --disabled-password \
#     --gecos "" \
#     --home "/nonexistent" \
#     --shell "/sbin/nologin" \
#     --no-create-home \
#     --uid "${UID}" \
#     appuser
#
# USER appuser
#
# COPY --from=extract /build/build/extracted/dependencies/ ./
# COPY --from=extract /build/build/extracted/spring-boot-loader/ ./
# COPY --from=extract /build/build/extracted/snapshot-dependencies/ ./
# COPY --from=extract /build/build/extracted/application/ ./
#
# EXPOSE 8080
#
# ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]
#



FROM eclipse-temurin:17-jdk-jammy AS builder
WORKDIR /app
COPY . /app
RUN ./gradlew bootJar --no-daemon

FROM eclipse-temurin:17-jdk-jammy
COPY --from=builder /app/build/libs/*.jar app.jar
CMD ["java", "-jar", "app.jar"]
