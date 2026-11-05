package com.fooddelivery.api.controller;

import com.fooddelivery.api.dto.MenuItemRequest;
import com.fooddelivery.api.dto.MenuItemResponse;
import com.fooddelivery.api.dto.MenuItemUpdateRequest;
import com.fooddelivery.api.entity.MenuItem;
import com.fooddelivery.api.service.MenuItemService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MenuItemController {

    private final MenuItemService menuItemService;

    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    /**
     * Retrieves all available menu items for a restaurant.
     *
     * @param restaurantId ID of the restaurant
     * @return list of available menu items
     */
    @GetMapping("/restaurants/{restaurantId}/menu-items")
    public List<MenuItemResponse> getMenuItems(
            @PathVariable Long restaurantId) {

        return menuItemService.getAvailableMenuItems(restaurantId);
    }

    /**
     * Retrieves a menu item by its ID.
     *
     * @param id ID of the menu item
     * @return requested menu item
     */
    @GetMapping("/menu-items/{id}")
    public MenuItemResponse getMenuItem(
            @PathVariable Long id) {

        return menuItemService.getMenuItemById(id);
    }

    /**
     * Creates a new menu item for a restaurant.
     *
     * @param restaurantId ID of the restaurant
     * @param request menu item creation data
     * @return newly created menu item
     */
    @PostMapping("/restaurants/{restaurantId}/menu-items")
    @ResponseStatus(HttpStatus.CREATED)
    public MenuItemResponse createMenuItem(
            @PathVariable Long restaurantId,
            @Valid @RequestBody MenuItemRequest request) {

        return menuItemService.createMenuItem(
                restaurantId,
                request
        );
    }

    /**
     * Updates a menu item belonging to the specified restaurant.
     *
     * @param restaurantId ID of the restaurant
     * @param menuItemId ID of the menu item
     * @param request updated menu item data
     * @return updated menu item response
     */
    @PutMapping("/restaurants/{restaurantId}/menu-items/{menuItemId}")
    public MenuItemResponse updateMenuItem(
            @PathVariable Long restaurantId,
            @PathVariable Long menuItemId,
            @Valid @RequestBody MenuItemUpdateRequest request) {

        return menuItemService.updateMenuItem(
                restaurantId,
                menuItemId,
                request
        );
    }

    /**
     * Deactivates a menu item for the specified restaurant.
     *
     * @param restaurantId ID of the restaurant
     * @param menuItemId ID of the menu item
     */
    @DeleteMapping("/restaurants/{restaurantId}/menu-items/{menuItemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMenuItem(
            @PathVariable Long restaurantId,
            @PathVariable Long menuItemId) {

        menuItemService.deactivateMenuItem(
                restaurantId,
                menuItemId
        );
    }
}