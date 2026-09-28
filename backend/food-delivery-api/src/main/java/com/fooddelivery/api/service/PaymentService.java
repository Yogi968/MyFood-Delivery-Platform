package com.fooddelivery.api.service;

import com.fooddelivery.api.dto.PaymentInitiationResponse;
import com.fooddelivery.api.dto.PaymentRequest;
import com.fooddelivery.api.dto.PaymentResponse;
import com.fooddelivery.api.payment.gateway.PaymentGateway;
import com.fooddelivery.api.repository.OrderRepository;
import com.fooddelivery.api.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import com.fooddelivery.api.entity.Order;
import com.fooddelivery.api.entity.Payment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;

/**
 * Handles the business logic related to payments.
 *
 * <p>
 * The service depends on the PaymentGateway interface rather than
 * directly depending on a specific payment provider.
 * </p>
 */
@Service
public class PaymentService {

    private final PaymentGateway paymentGateway;
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    /**
     * Creates the payment service with the required payment gateway.
     *
     * @param paymentGateway payment gateway implementation
     * @param orderRepository repository used to access orders
     * @param paymentRepository repository used to access payments
     */
    public PaymentService(PaymentGateway paymentGateway, OrderRepository orderRepository, PaymentRepository paymentRepository) {
        this.paymentGateway = paymentGateway;
        this.orderRepository = orderRepository;
        this.paymentRepository = paymentRepository;
    }


    /**
     * Creates a payment transaction for an existing order.
     *
     * @param request payment initiation request
     * @return payment information
     */
    @Transactional
    public PaymentInitiationResponse createPayment(PaymentRequest request) {
        /**
         * Retrieves the currently authenticated user from Spring Security.
         */
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String authenticatedEmail = authentication.getName();
        /**
         * Find the order using the ID supplied by the client.
         * The order amount will be obtained from the database.
         */
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Order not found: " + request.getOrderId()
                        )
                );

        /**
         * Ensures that the authenticated user owns the requested order.
         *
         * <p>
         * A user must not be able to initiate a payment for another user's order.
         * </p>
         */
        if (!order.getUser().getEmail().equalsIgnoreCase(authenticatedEmail)) {
            throw new RuntimeException(
                    "You are not authorized to make a payment for this order."
            );
        }

        /**
         * Check whether this idempotency key was already used.
         *
         * If the client retries the same payment request, we should
         * return the existing payment instead of creating another one.
         */
        var existingPayment =
                paymentRepository.findByIdempotencyKey(
                        request.getIdempotencyKey()
                );

        if (existingPayment.isPresent()) {
            throw new RuntimeException(
                    "A payment with this idempotency key already exists."
            );
        }

/**
 * Create a new payment using the trusted amount from the order.
 */
        Payment payment = new Payment();

        payment.setOrder(order);
        payment.setAmount(order.getTotalAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus(
                com.fooddelivery.api.entity.PaymentStatus.PENDING
        );
        payment.setIdempotencyKey(request.getIdempotencyKey());

/**
 * Generate a unique transaction ID for the payment.
 */
        payment.setTransactionId(
                "MYFOOD_TXN_" + java.util.UUID.randomUUID()
        );

        Payment savedPayment = paymentRepository.save(payment);

/**
 * Passes the saved payment to the configured payment gateway.
 */
        PaymentInitiationResponse gatewayResponse =
                paymentGateway.createPayment(savedPayment);

        return gatewayResponse;
    }

    /**
     * Converts a Payment entity into the response DTO exposed by the API.
     *
     * @param payment payment entity retrieved from the database
     * @return payment response containing the required payment information
     */
    private PaymentResponse mapToPaymentResponse(Payment payment) {

        PaymentResponse response = new PaymentResponse();

        response.setId(payment.getId());
        response.setOrderId(payment.getOrder().getId());
        response.setTransactionId(payment.getTransactionId());
        response.setAmount(payment.getAmount());
        response.setPaymentMethod(payment.getPaymentMethod());
        response.setPaymentStatus(payment.getPaymentStatus());
        response.setCreatedAt(payment.getCreatedAt());
        response.setUpdatedAt(payment.getUpdatedAt());

        return response;
    }

    /**
     * Verifies the status of an existing payment.
     *
     * @param transactionId unique transaction identifier
     * @return updated payment information
     */
    public PaymentResponse verifyPayment(String transactionId) {
        return paymentGateway.verifyPayment(transactionId);
    }
}