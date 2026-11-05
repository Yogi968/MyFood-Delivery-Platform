package com.fooddelivery.api.repository;

import com.fooddelivery.api.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository for performing database operations on orders.
 */
public interface OrderRepository extends JpaRepository<Order, Long> {
    /**
     * Retrieves all orders placed by a specific user.
     *
     * @param userId ID of the user
     * @return list of orders belonging to the user
     */
    List<Order> findByUserId(Long userId);
}