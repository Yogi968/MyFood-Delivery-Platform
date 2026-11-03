package com.fooddelivery.api.repository;

import com.fooddelivery.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    /**
     * Checks whether an account already exists for the given email.
     *
     * @param email email address to check
     * @return true if an account exists, otherwise false
     */
    boolean existsByEmail(String email);
}
