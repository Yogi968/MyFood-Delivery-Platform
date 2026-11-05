
# Stage 1: Build the Spring Boot application
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy Maven configuration and wrapper
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy application source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Select the executable Spring Boot JAR
RUN JAR_FILE=$(find target -maxdepth 1 -type f -name '*.jar' ! -name '*.original' | head -n 1) \
    && cp "$JAR_FILE" app.jar

# Stage 2: Run the application
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/app.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
