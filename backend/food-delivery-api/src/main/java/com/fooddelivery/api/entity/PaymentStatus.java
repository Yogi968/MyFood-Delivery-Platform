package com.fooddelivery.api.entity;

/**
 * Represents the current status of an order payment.
 */
public enum PaymentStatus {

    PENDING,
    PAID,
    FAILED,
    REFUNDED
}