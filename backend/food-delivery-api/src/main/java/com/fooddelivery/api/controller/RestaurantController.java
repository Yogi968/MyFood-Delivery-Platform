package com.fooddelivery.api.controller;

import com.fooddelivery.api.dto.RestaurantResponse;
import com.fooddelivery.api.dto.RestaurantUpdateRequest;
import com.fooddelivery.api.service.RestaurantService;
import org.springframework.web.bind.annotation.*;
import com.fooddelivery.api.dto.RestaurantRequest;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping
    public List<RestaurantResponse> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    @PostMapping
    public RestaurantResponse createRestaurant(
            @RequestBody RestaurantRequest request) {

        return restaurantService.createRestaurant(request);
    }

    @GetMapping("/{id}")
    public RestaurantResponse getRestaurantById(
            @PathVariable Long id) {

        return restaurantService.getRestaurantById(id);
    }

    @PutMapping("/{id}")
    public RestaurantResponse updateRestaurant(
            @PathVariable Long id,
            @RequestBody RestaurantUpdateRequest request) {

        return restaurantService.updateRestaurant(id, request);
    }

    @DeleteMapping("/{id}")
    public RestaurantResponse deactivateRestaurant(
            @PathVariable Long id) {

        return restaurantService.deactivateRestaurant(id);
    }
}