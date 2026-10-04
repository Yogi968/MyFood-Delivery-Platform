package com.fooddelivery.api.controller;

import com.fooddelivery.api.dto.PayUV2PaymentResponse;
import com.fooddelivery.api.dto.PaymentRequest;
import com.fooddelivery.api.entity.Payment;
import com.fooddelivery.api.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;
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
     * Creates a payment through the PayU v2 Hosted Checkout API.
     *
     * @param request payment initiation request
     * @return PayU v2 response containing the checkout URL
     */
    @PostMapping("/v2")
    public ResponseEntity<PayUV2PaymentResponse> createPayUV2Payment(
            @Valid @RequestBody PaymentRequest request) {

        PayUV2PaymentResponse response =
                paymentService.createPayUV2Payment(request);

        return ResponseEntity.ok(response);
    }

    /**
     * Handles the callback sent by PayU after a successful payment
     * and verifies the transaction with PayU.
     *
     * @param callbackData payment callback parameters sent by PayU
     * @return verified PayU transaction response
     */
    @PostMapping("/payu/v2/success")
    public ResponseEntity<String> handlePayUSuccess(
            @RequestParam MultiValueMap<String, String> callbackData) {

        String txnId = callbackData.getFirst("txnId");

        System.out.println("PayU v2 SUCCESS callback:");
        System.out.println(callbackData);

        if (txnId == null || txnId.isBlank()) {
            return ResponseEntity.badRequest()
                    .body("Transaction ID is missing.");
        }

        String verificationResponse =
                paymentService.verifyPayUV2Payment(txnId);

        System.out.println("PayU v2 verification response:");
        System.out.println(verificationResponse);

        Payment payment =
                paymentService.getPaymentByTransactionId(txnId);

        String redirectUrl = UriComponentsBuilder
                .fromUriString("http://localhost:4200/order-confirmation")
                .queryParam("status", "success")
                .queryParam("orderId", payment.getOrder().getId())
                .build()
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(java.net.URI.create(redirectUrl));

        return new ResponseEntity<>(headers, HttpStatus.SEE_OTHER);
    }

    /**
     * Handles a failed PayU v2 payment.
     *
     * @param callbackData payment callback parameters sent by PayU
     * @return acknowledgement response
     */
    @PostMapping("/payu/v2/failure")
    public ResponseEntity<String> handlePayUFailure(
            @RequestParam MultiValueMap<String, String> callbackData) {

        String txnId = callbackData.getFirst("txnId");

        System.out.println("PayU v2 FAILURE callback:");
        System.out.println(callbackData);

        if (txnId == null || txnId.isBlank()) {
            return ResponseEntity.badRequest()
                    .body("Transaction ID is missing.");
        }

        paymentService.markPayUV2PaymentFailed(txnId);

        Payment payment =
                paymentService.getPaymentByTransactionId(txnId);

        String redirectUrl = UriComponentsBuilder
                .fromUriString("http://localhost:4200/order-confirmation")
                .queryParam("status", "failed")
                .queryParam("orderId", payment.getOrder().getId())
                .build()
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(java.net.URI.create(redirectUrl));

        return new ResponseEntity<>(headers, HttpStatus.SEE_OTHER);
    }

    /**
     * Handles a cancelled PayU v2 payment.
     *
     * @param callbackData payment callback parameters sent by PayU
     * @return acknowledgement response
     */
    @PostMapping("/payu/v2/cancel")
    public ResponseEntity<String> handlePayUCancel(
            @RequestParam MultiValueMap<String, String> callbackData) {

        String txnId = callbackData.getFirst("txnId");

        System.out.println("PayU v2 CANCEL callback:");
        System.out.println(callbackData);

        if (txnId == null || txnId.isBlank()) {
            return ResponseEntity.badRequest()
                    .body("Transaction ID is missing.");
        }

        paymentService.markPayUV2PaymentFailed(txnId);

        Payment payment =
                paymentService.getPaymentByTransactionId(txnId);

        String redirectUrl = UriComponentsBuilder
                .fromUriString("http://localhost:4200/order-confirmation")
                .queryParam("status", "cancelled")
                .queryParam("orderId", payment.getOrder().getId())
                .build()
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(java.net.URI.create(redirectUrl));

        return new ResponseEntity<>(headers, HttpStatus.SEE_OTHER);
    }
}