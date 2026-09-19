package com.fooddelivery.api.service;

import com.fooddelivery.api.dto.RestaurantResponse;
import com.fooddelivery.api.dto.RestaurantUpdateRequest;
import com.fooddelivery.api.entity.Restaurant;
import com.fooddelivery.api.exception.ResourceNotFoundException;
import com.fooddelivery.api.repository.RestaurantRepository;
import org.springframework.stereotype.Service;
import com.fooddelivery.api.dto.RestaurantRequest;
import java.util.List;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public List<RestaurantResponse> getAllRestaurants() {

        return restaurantRepository.findByIsActiveTrue()
                .stream()
                .map(restaurant -> new RestaurantResponse(
                        restaurant.getId(),
                        restaurant.getName(),
                        restaurant.getDescription(),
                        restaurant.getAddress(),
                        restaurant.getImageUrl(),
                        restaurant.getIsActive()
                ))
                .toList();
    }

    public RestaurantResponse createRestaurant(RestaurantRequest request) {

        Restaurant restaurant = new Restaurant();

        restaurant.setName(request.getName());
        restaurant.setDescription(request.getDescription());
        restaurant.setAddress(request.getAddress());
        restaurant.setImageUrl(request.getImageUrl());

        Restaurant savedRestaurant = restaurantRepository.save(restaurant);

        return new RestaurantResponse(
                savedRestaurant.getId(),
                savedRestaurant.getName(),
                savedRestaurant.getDescription(),
                savedRestaurant.getAddress(),
                savedRestaurant.getImageUrl(),
                savedRestaurant.getIsActive()
        );
    }

    public RestaurantResponse getRestaurantById(Long id) {

        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Restaurant not found with id: " + id)
                );

        return new RestaurantResponse(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getDescription(),
                restaurant.getAddress(),
                restaurant.getImageUrl(),
                restaurant.getIsActive()
        );
    }

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

        return new RestaurantResponse(
                updatedRestaurant.getId(),
                updatedRestaurant.getName(),
                updatedRestaurant.getDescription(),
                updatedRestaurant.getAddress(),
                updatedRestaurant.getImageUrl(),
                updatedRestaurant.getIsActive()
        );
    }

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

        return new RestaurantResponse(
                updatedRestaurant.getId(),
                updatedRestaurant.getName(),
                updatedRestaurant.getDescription(),
                updatedRestaurant.getAddress(),
                updatedRestaurant.getImageUrl(),
                updatedRestaurant.getIsActive()
        );
    }
}