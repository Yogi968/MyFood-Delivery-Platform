package com.fooddelivery.api.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import com.fooddelivery.api.repository.UserRepository;
import com.fooddelivery.api.dto.LoginRequest;
import com.fooddelivery.api.entity.User;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.fooddelivery.api.dto.AuthResponse;
import com.fooddelivery.api.service.JwtService;
import com.fooddelivery.api.dto.LoginResponse;

@RestController
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());

        if (user.isPresent()) {

            if (passwordEncoder.matches(
                    request.getPassword(),
                    user.get().getPassword())) {
                    String token = jwtService.generateToken(
                        user.get().getEmail(),
                        user.get().getRole()
                    );
                return new LoginResponse(
                        user.get().getId(),
                        user.get().getEmail(),
                        "Login successful",
                        token
                );
            }
        }

        return new LoginResponse(
                null,
                null,
                "Invalid email or password",
                null
        );
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody User user) {
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        user.setRole("USER");
        User savedUser = userRepository.save(user);
        return new AuthResponse(
                savedUser.getId(),
                savedUser.getEmail(),
                "Registration successful"
        );
    }
}