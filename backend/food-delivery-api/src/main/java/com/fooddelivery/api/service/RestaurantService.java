
package com.fooddelivery.api.service;

import com.fooddelivery.api.dto.RestaurantResponse;
import com.fooddelivery.api.dto.RestaurantUpdateRequest;
import com.fooddelivery.api.dto.RestaurantRequest;
import com.fooddelivery.api.entity.Restaurant;
import com.fooddelivery.api.exception.ResourceNotFoundException;
import com.fooddelivery.api.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    /**
     * Retrieves all active restaurants with their complete details.
     */
    public List<RestaurantResponse> getAllRestaurants() {
        return restaurantRepository.findByIsActiveTrue()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    /**
     * Creates a new restaurant using the supplied request details.
     */
    public RestaurantResponse createRestaurant(RestaurantRequest request) {

        Restaurant restaurant = new Restaurant();

        restaurant.setName(request.getName());
        restaurant.setDescription(request.getDescription());
        restaurant.setAddress(request.getAddress());
        restaurant.setImageUrl(request.getImageUrl());

        Restaurant savedRestaurant = restaurantRepository.save(restaurant);

        return toResponse(savedRestaurant);
    }

    /**
     * Retrieves a restaurant by its unique ID.
     */
    public RestaurantResponse getRestaurantById(Long id) {

        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Restaurant not found with id: " + id
                        )
                );

        return toResponse(restaurant);
    }

    /**
     * Updates the basic details of an existing restaurant.
     */
    public RestaurantResponse updateRestaurant(
            Long id,
            RestaurantUpdateRequest request) {

        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Restaurant not found with id: " + id
                        )
                );

        restaurant.setName(request.getName());
        restaurant.setDescription(request.getDescription());
        restaurant.setAddress(request.getAddress());
        restaurant.setImageUrl(request.getImageUrl());

        Restaurant updatedRestaurant =
                restaurantRepository.save(restaurant);

        return toResponse(updatedRestaurant);
    }

    /**
     * Marks a restaurant as inactive without deleting its database record.
     */
    public RestaurantResponse deactivateRestaurant(Long id) {

        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Restaurant not found with id: " + id
                        )
                );

        restaurant.setIsActive(false);

        Restaurant updatedRestaurant =
                restaurantRepository.save(restaurant);

        return toResponse(updatedRestaurant);
    }

    /**
     * Converts a Restaurant entity into a complete RestaurantResponse DTO.
     */
    private RestaurantResponse toResponse(Restaurant restaurant) {

        return new RestaurantResponse(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getDescription(),
                restaurant.getAddress(),
                restaurant.getImageUrl(),
                restaurant.getImageAlt(),
                restaurant.getCuisine(),
                restaurant.getRating(),
                restaurant.getDeliveryTime(),
                restaurant.getDistance(),
                restaurant.getPriceForOne(),
                restaurant.getBadge(),
                restaurant.getDiscount(),
                restaurant.getIsActive()
        );
    }
}
