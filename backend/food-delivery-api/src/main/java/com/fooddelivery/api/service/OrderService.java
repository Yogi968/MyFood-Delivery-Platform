package com.fooddelivery.api.service;

import com.fooddelivery.api.exception.ResourceNotFoundException;
import com.fooddelivery.api.repository.OrderRepository;
import org.springframework.stereotype.Service;
import com.fooddelivery.api.dto.order.OrderItemRequest;
import com.fooddelivery.api.dto.OrderRequest;
import com.fooddelivery.api.dto.order.OrderResponse;
import com.fooddelivery.api.entity.MenuItem;
import com.fooddelivery.api.entity.Order;
import com.fooddelivery.api.entity.OrderItem;
import com.fooddelivery.api.entity.OrderStatus;
import com.fooddelivery.api.entity.PaymentStatus;
import com.fooddelivery.api.entity.Restaurant;
import com.fooddelivery.api.entity.User;
import com.fooddelivery.api.repository.MenuItemRepository;
import com.fooddelivery.api.repository.RestaurantRepository;
import com.fooddelivery.api.entity.User;
import com.fooddelivery.api.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

/**
 * Handles business logic related to food orders.
 */
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;
    /**
     * Creates the OrderService with its required dependencies.
     *
     * @param orderRepository repository used for order persistence
     */
    public OrderService(OrderRepository orderRepository, RestaurantRepository restaurantRepository, MenuItemRepository menuItemRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
        this.menuItemRepository = menuItemRepository;
        this.userRepository = userRepository;
    }

    /**
     * Retrieves the currently authenticated user from the
     * Spring Security context using the email stored in the JWT.
     *
     * @return authenticated user
     * @throws IllegalStateException if no authenticated user exists
     */
    private User getAuthenticatedUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("User is not authenticated.");
        }

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalStateException("Authenticated user not found."));
    }

    /**
     * Finds a restaurant by its ID.
     *
     * @param restaurantId ID of the restaurant
     * @return restaurant entity
     * @throws ResourceNotFoundException if the restaurant does not exist
     */
    private Restaurant getRestaurant(Long restaurantId) {
        return restaurantRepository.findById(restaurantId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Restaurant not found with id: " + restaurantId
                        ));
    }

    /**
     * Creates a new order for the authenticated user.
     *
     * @param request order details received from the client
     * @return created order response
     */
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {

        User user = getAuthenticatedUser();

        Restaurant restaurant = getRestaurant(request.getRestaurantId());

        Order order = new Order();

        order.setUser(user);
        order.setRestaurant(restaurant);

        order.setFullName(request.getFullName());
        order.setPhoneNumber(request.getPhoneNumber());
        order.setAddress(request.getAddress());
        order.setCity(request.getCity());
        order.setPincode(request.getPincode());

        order.setPaymentMethod(request.getPaymentMethod());

        order.setStatus(OrderStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.PENDING);
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : request.getItems()) {

            MenuItem menuItem = menuItemRepository.findById(itemRequest.getMenuItemId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Menu item not found with id: "
                                            + itemRequest.getMenuItemId()
                            ));

            if (!menuItem.getRestaurant().getId()
                    .equals(restaurant.getId())) {

                throw new IllegalArgumentException(
                        "Menu item does not belong to the selected restaurant."
                );
            }

            if (!menuItem.isAvailable()) {
                throw new IllegalArgumentException(
                        "Menu item is currently unavailable: "
                                + menuItem.getName()
                );
            }

            BigDecimal subtotal = menuItem.getPrice()
                    .multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setMenuItem(menuItem);
            orderItem.setPrice(menuItem.getPrice());
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setSubtotal(subtotal);

            order.getOrderItems().add(orderItem);

            totalAmount = totalAmount.add(subtotal);
        }

        order.setTotalAmount(totalAmount);
        Order savedOrder = orderRepository.save(order);

        return mapToOrderResponse(savedOrder);
    }

    /**
     * Retrieves an order belonging to the currently authenticated user.
     *
     * @param orderId ID of the order to retrieve
     * @return order response
     * @throws ResourceNotFoundException if the order does not exist
     *         or does not belong to the authenticated user
     */
    public OrderResponse getOrderById(Long orderId) {

        User authenticatedUser = getAuthenticatedUser();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id: " + orderId
                        ));

        if (!order.getUser().getId().equals(authenticatedUser.getId())) {
            throw new ResourceNotFoundException(
                    "Order not found with id: " + orderId
            );
        }

        return mapToOrderResponse(order);
    }

    /**
     * Retrieves all orders placed by the currently authenticated user.
     *
     * @return list of orders belonging to the authenticated user
     */
    public List<OrderResponse> getMyOrders() {

        User authenticatedUser = getAuthenticatedUser();

        List<Order> orders =
                orderRepository.findByUserId(authenticatedUser.getId());

        return orders.stream()
                .map(this::mapToOrderResponse)
                .toList();
    }

    /**
     * Converts an Order entity into an OrderResponse DTO.
     *
     * @param order order entity
     * @return order response DTO
     */
    private OrderResponse mapToOrderResponse(Order order) {

        OrderResponse response = new OrderResponse();

        response.setId(order.getId());
        response.setRestaurantId(order.getRestaurant().getId());
        response.setTotalAmount(order.getTotalAmount());
        response.setStatus(order.getStatus());
        response.setPaymentMethod(order.getPaymentMethod());
        response.setPaymentStatus(order.getPaymentStatus());

        response.setFullName(order.getFullName());
        response.setPhoneNumber(order.getPhoneNumber());
        response.setAddress(order.getAddress());
        response.setCity(order.getCity());
        response.setPincode(order.getPincode());

        response.setCreatedAt(order.getCreatedAt());
        response.setUpdatedAt(order.getUpdatedAt());

        return response;
    }
}