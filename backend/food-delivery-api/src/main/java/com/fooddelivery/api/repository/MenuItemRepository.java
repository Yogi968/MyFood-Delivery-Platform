package com.fooddelivery.api.repository;

import com.fooddelivery.api.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

    /**
     * Finds all available menu items belonging to the specified restaurant.
     *
     * @param restaurantId ID of the restaurant
     * @return list of available menu items
     */
    List<MenuItem> findByRestaurantIdAndAvailableTrue(Long restaurantId);
}