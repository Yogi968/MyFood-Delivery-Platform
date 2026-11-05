package com.fooddelivery.api.repository;

import com.fooddelivery.api.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository for performing database operations on Payment entities.
 */
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    /**
     * Finds a payment using its unique transaction ID.
     *
     * @param transactionId unique transaction identifier
     * @return the payment associated with the transaction ID
     */
    Optional<Payment> findByTransactionId(String transactionId);

    /**
     * Finds a payment using its unique idempotency key.
     *
     * @param idempotencyKey unique key used to prevent duplicate payments
     * @return the payment associated with the idempotency key
     */
    Optional<Payment> findByIdempotencyKey(String idempotencyKey);
}