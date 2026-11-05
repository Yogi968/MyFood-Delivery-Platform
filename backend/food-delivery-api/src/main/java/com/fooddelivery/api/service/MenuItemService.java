package com.fooddelivery.api.service;

import com.fooddelivery.api.dto.MenuItemRequest;
import com.fooddelivery.api.dto.MenuItemResponse;
import com.fooddelivery.api.dto.MenuItemUpdateRequest;
import com.fooddelivery.api.entity.MenuItem;
import com.fooddelivery.api.exception.ResourceNotFoundException;
import com.fooddelivery.api.repository.MenuItemRepository;
import com.fooddelivery.api.entity.Restaurant;
import com.fooddelivery.api.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final RestaurantRepository restaurantRepository;

    public MenuItemService(
            MenuItemRepository menuItemRepository,
            RestaurantRepository restaurantRepository) {

        this.menuItemRepository = menuItemRepository;
        this.restaurantRepository = restaurantRepository;
    }

    /**
     * Retrieves all available menu items belonging to a restaurant.
     *
     * @param restaurantId ID of the restaurant
     * @return list of available menu items
     */
    public List<MenuItemResponse> getAvailableMenuItems(Long restaurantId) {
        return menuItemRepository
                .findByRestaurantIdAndAvailableTrue(restaurantId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    /**
     * Retrieves a menu item and converts it into an API response DTO.
     *
     * @param id ID of the menu item
     * @return menu item response DTO
     */
    public MenuItemResponse getMenuItemById(Long id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Menu item not found with id: " + id));

        return toResponse(menuItem);
    }

    /**
     * Retrieves a restaurant by its ID and throws an exception
     * when the restaurant does not exist.
     *
     * @param restaurantId ID of the restaurant
     * @return the restaurant entity
     */
    public Restaurant getRestaurant(Long restaurantId) {
        return restaurantRepository.findById(restaurantId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Restaurant not found with id: " + restaurantId));
    }

    /**
     * Creates a new menu item for the specified restaurant.
     *
     * @param restaurantId ID of the restaurant
     * @param request menu item data received from the client
     * @return the newly created menu item
     */
    public MenuItemResponse createMenuItem(
            Long restaurantId,
            MenuItemRequest request) {

        Restaurant restaurant = getRestaurant(restaurantId);

        MenuItem menuItem = new MenuItem();

        menuItem.setRestaurant(restaurant);
        menuItem.setName(request.getName());
        menuItem.setDescription(request.getDescription());
        menuItem.setPrice(request.getPrice());
        menuItem.setImageUrl(request.getImageUrl());
        menuItem.setVegetarian(request.getVegetarian());
        menuItem.setAvailable(true);

        return toResponse(menuItemRepository.save(menuItem));
    }

    /**
     * Converts a MenuItem entity into the response DTO exposed by the API.
     *
     * @param menuItem menu item entity
     * @return menu item response DTO
     */
    private MenuItemResponse toResponse(MenuItem menuItem) {
        MenuItemResponse response = new MenuItemResponse();

        response.setId(menuItem.getId());
        response.setRestaurantId(menuItem.getRestaurant().getId());
        response.setName(menuItem.getName());
        response.setDescription(menuItem.getDescription());
        response.setPrice(menuItem.getPrice());
        response.setImageUrl(menuItem.getImageUrl());
        response.setVegetarian(menuItem.isVegetarian());
        response.setAvailable(menuItem.isAvailable());

        return response;
    }

    /**
     * Updates a menu item belonging to the specified restaurant.
     *
     * @param restaurantId ID of the restaurant
     * @param menuItemId ID of the menu item
     * @param request updated menu item data
     * @return updated menu item response
     */
    public MenuItemResponse updateMenuItem(
            Long restaurantId,
            Long menuItemId,
            MenuItemUpdateRequest request) {

        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Menu item not found"));

        if (!menuItem.getRestaurant().getId().equals(restaurantId)) {
            throw new ResourceNotFoundException(
                    "Menu item not found for this restaurant"
            );
        }

        menuItem.setName(request.getName());
        menuItem.setDescription(request.getDescription());
        menuItem.setPrice(request.getPrice());
        menuItem.setImageUrl(request.getImageUrl());
        menuItem.setVegetarian(request.getVegetarian());
        menuItem.setAvailable(request.getAvailable());

        MenuItem updatedMenuItem = menuItemRepository.save(menuItem);

        return toResponse(updatedMenuItem);
    }

    /**
     * Deactivates a menu item for the specified restaurant.
     *
     * <p>The menu item is not physically deleted from the database.
     * Its availability is set to false so that historical references
     * can still be preserved.</p>
     *
     * @param restaurantId ID of the restaurant
     * @param menuItemId ID of the menu item
     * @throws ResourceNotFoundException if the menu item does not exist
     *         or does not belong to the specified restaurant
     */
    public void deactivateMenuItem(Long restaurantId, Long menuItemId) {

        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Menu item not found")
                );

        if (!menuItem.getRestaurant().getId().equals(restaurantId)) {
            throw new ResourceNotFoundException(
                    "Menu item not found for this restaurant"
            );
        }

        menuItem.setAvailable(false);

        menuItemRepository.save(menuItem);
    }
}