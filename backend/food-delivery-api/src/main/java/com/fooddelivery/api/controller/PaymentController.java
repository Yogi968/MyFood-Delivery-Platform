package com.fooddelivery.api.controller;

import com.fooddelivery.api.dto.PaymentInitiationResponse;
import com.fooddelivery.api.dto.PaymentRequest;
import com.fooddelivery.api.dto.PaymentResponse;
import com.fooddelivery.api.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller responsible for payment-related operations.
 */
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    /**
     * Creates the payment controller with the required payment service.
     *
     * @param paymentService service responsible for payment business logic
     */
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    /**
     * Initiates a payment for an existing order.
     *
     * @param request payment initiation details
     * @return created payment information
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PaymentInitiationResponse createPayment(
            @Valid @RequestBody PaymentRequest request
    ) {
        return paymentService.createPayment(request);
    }
}