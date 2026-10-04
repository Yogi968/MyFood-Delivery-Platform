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
                        .requestMatchers(
                                "/login",
                                "/register",
                                "/api/health",
                                "/error",
                                "/api/payments/payu/v2/success",
                                "/api/payments/payu/v2/failure",
                                "/api/payments/payu/v2/cancel"
                        ).permitAll()
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/restaurants").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/restaurants/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/restaurants/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/restaurants/*/menu-items").authenticated()
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
     * Configures CORS rules for the application's API endpoints.
     *
     * <p>
     * PayU callback endpoints are excluded from CORS processing because
     * PayU submits the payment result directly to the backend using a
     * form POST. These endpoints are already publicly accessible through
     * Spring Security.
     * </p>
     *
     * @return CORS configuration source
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:4200")
        );

        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        /*
         * Do not register a CORS configuration for the PayU v2 callback
         * endpoints because PayU submits the payment result directly
         * to the backend.
         */

        return new CorsConfigurationSource() {

            @Override
            public CorsConfiguration getCorsConfiguration(
                    jakarta.servlet.http.HttpServletRequest request) {

                String requestUri = request.getRequestURI();

                if (requestUri.equals("/api/payments/payu/v2/success")
                        || requestUri.equals("/api/payments/payu/v2/failure")
                        || requestUri.equals("/api/payments/payu/v2/cancel")) {
                    return null;
                }

                return configuration;
            }
        };
    }
}