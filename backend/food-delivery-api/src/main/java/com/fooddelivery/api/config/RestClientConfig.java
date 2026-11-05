package com.fooddelivery.api.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

/**
 * Configures HTTP clients and JSON processing used by the application.
 */
@Configuration
public class RestClientConfig {

    /**
     * Creates the RestClient used for external API communication.
     *
     * @return configured RestClient instance
     */
    @Bean
    public RestClient restClient() {
        return RestClient.builder().build();
    }

    /**
     * Creates the ObjectMapper used to convert Java objects to JSON
     * and JSON responses back to Java objects.
     *
     * @return configured ObjectMapper instance
     */
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}