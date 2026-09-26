package com.fooddelivery.api.controller;

import com.fooddelivery.api.dto.OrderRequest;
import com.fooddelivery.api.dto.order.OrderResponse;
import com.fooddelivery.api.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Provides REST APIs for managing customer orders.
 */
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    /**
     * Creates the OrderController with its required service.
     *
     * @param orderService service responsible for order business logic
     */
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * Creates a new order for the authenticated user.
     *
     * @param request order details received from the client
     * @return newly created order
     */
    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @Valid @RequestBody OrderRequest request) {

        OrderResponse response = orderService.createOrder(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    /**
     * Retrieves an order belonging to the authenticated user.
     *
     * @param orderId ID of the order
     * @return requested order
     */
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(
            @PathVariable Long orderId) {

        OrderResponse response = orderService.getOrderById(orderId);

        return ResponseEntity.ok(response);
    }

    /**
     * Retrieves all orders placed by the currently authenticated user.
     *
     * @return list of the user's orders
     */
    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderResponse>> getMyOrders() {

        List<OrderResponse> responses = orderService.getMyOrders();

        return ResponseEntity.ok(responses);
    }
}