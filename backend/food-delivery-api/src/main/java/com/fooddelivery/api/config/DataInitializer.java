package com.fooddelivery.api.config;

import com.fooddelivery.api.entity.User;
import com.fooddelivery.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Value("${ADMIN_EMAIL}")
    private String adminEmail;

    @Value("${ADMIN_PASSWORD}")
    private String adminPassword;

    @Bean
    CommandLineRunner createAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (userRepository.findByEmail(adminEmail).isEmpty()) {

                User admin = new User(
                        adminEmail,
                        passwordEncoder.encode(adminPassword),
                        "ADMIN"
                );

                userRepository.save(admin);

                System.out.println("Development admin created successfully.");
            }
        };
    }
}