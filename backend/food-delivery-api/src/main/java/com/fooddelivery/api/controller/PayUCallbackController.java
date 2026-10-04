package com.fooddelivery.api.controller;
import org.springframework.beans.factory.annotation.Value;
import com.fooddelivery.api.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/payments/payu")
public class PayUCallbackController {
    private final PaymentService paymentService;
    @Value("${app.frontend-url}")
    private String frontendUrl;
    public PayUCallbackController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

}