package com.fooddelivery.api.payment.gateway;

import com.fooddelivery.api.dto.PaymentInitiationResponse;
import com.fooddelivery.api.dto.PaymentResponse;
import com.fooddelivery.api.entity.Payment;

/**
 * Defines the contract that every payment gateway implementation
 * must follow.
 *
 * <p>
 * The application depends on this interface rather than a specific
 * payment provider. This allows the payment provider to be changed
 * without modifying the core payment business logic.
 * </p>
 */
public interface PaymentGateway {

    /**
     * Creates a payment request and prepares the information required
     * to redirect the customer to the configured payment gateway.
     *
     * @param payment payment transaction created by the application
     * @return payment initiation information required by the frontend
     */
    PaymentInitiationResponse createPayment(Payment payment);

    /**
     * Verifies the status of an existing payment transaction.
     *
     * @param transactionId unique transaction identifier
     * @return verified payment information
     */
    PaymentResponse verifyPayment(String transactionId);
}