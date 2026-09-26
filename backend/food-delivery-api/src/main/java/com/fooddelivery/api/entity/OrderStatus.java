package com.fooddelivery.api.entity;

/**
 * Represents the current status of an order.
 */
public enum OrderStatus {

    PENDING,
    CONFIRMED,
    PREPARING,
    OUT_FOR_DELIVERY,
    DELIVERED,
    CANCELLED
}