package com.fooddelivery.api.config;
import com.fooddelivery.api.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )
                .authorizeHttpRequests(auth -> auth

                        // Allow CORS preflight requests.
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Public restaurant endpoints.
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/restaurants",
                                "/api/restaurants/*",
                                "/api/restaurants/*/menu-items"
                        ).permitAll()

                        // Public authentication and callback endpoints.
                        .requestMatchers(
                                "/login",
                                "/register",
                                "/api/health",
                                "/error",
                                "/api/payments/payu/v2/success",
                                "/api/payments/payu/v2/failure",
                                "/api/payments/payu/v2/cancel"
                        ).permitAll()

                        // Admin endpoints.
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/restaurants").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/restaurants/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/restaurants/**").hasRole("ADMIN")

                        // Menu item endpoints.
                        .requestMatchers(HttpMethod.GET, "/api/menu-items/*").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/restaurants/*/menu-items").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/restaurants/*/menu-items/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/restaurants/*/menu-items/*").hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    /**
     * Configures CORS for local development and the production frontend.
     *
     * @return CORS configuration source
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        // Allowed frontend origins.
        configuration.setAllowedOrigins(List.of(
                "http://localhost:4200",
                "https://my-food-delivery-platform.vercel.app"
        ));

        // Allowed HTTP methods.
        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "OPTIONS"
        ));

        // Allowed request headers.
        configuration.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type",
                "Accept",
                "Origin"
        ));

        // Allow JWT authorization headers.
        configuration.setExposedHeaders(List.of(
                "Authorization"
        ));

        // Enable only if the frontend uses cookies or credentialed requests.
        configuration.setAllowCredentials(false);

        // Cache preflight response for one hour.
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}