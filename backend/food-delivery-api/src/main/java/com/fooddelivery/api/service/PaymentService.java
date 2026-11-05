package com.fooddelivery.api.service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fooddelivery.api.config.PayUConfig;
import com.fooddelivery.api.dto.PayUV2PaymentRequest;
import com.fooddelivery.api.dto.PayUV2PaymentResponse;
import com.fooddelivery.api.dto.PayUV2AdditionalInfo;
import com.fooddelivery.api.dto.PayUV2BillingDetails;
import com.fooddelivery.api.dto.PayUV2CallbackActions;
import com.fooddelivery.api.dto.PayUV2Order;
import com.fooddelivery.api.dto.PayUV2PaymentChargeSpecification;
import com.fooddelivery.api.dto.PaymentRequest;
import com.fooddelivery.api.entity.Order;
import com.fooddelivery.api.entity.Payment;
import com.fooddelivery.api.entity.PaymentStatus;
import com.fooddelivery.api.payment.gateway.PayUV2Gateway;
import com.fooddelivery.api.repository.OrderRepository;
import com.fooddelivery.api.repository.PaymentRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Handles the business logic related to payments.
 *
 * <p>
 * This service creates payment records and initiates payments
 * through the PayU v2 Hosted Checkout API.
 * </p>
 */
@Service
public class PaymentService {

    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final PayUConfig payUConfig;
    private final PayUV2Gateway payUV2Gateway;

    /**
     * Creates the payment service with the required dependencies.
     *
     * @param orderRepository repository used to access orders
     * @param paymentRepository repository used to access payments
     * @param payUConfig PayU configuration
     * @param payUV2Gateway gateway used for PayU v2 communication
     */
    public PaymentService(
            OrderRepository orderRepository,
            PaymentRepository paymentRepository,
            PayUConfig payUConfig,
            PayUV2Gateway payUV2Gateway) {

        this.orderRepository = orderRepository;
        this.paymentRepository = paymentRepository;
        this.payUConfig = payUConfig;
        this.payUV2Gateway = payUV2Gateway;
    }

    /**
     * Creates a payment transaction and initiates it through
     * the PayU v2 Hosted Checkout API.
     *
     * @param request payment initiation request
     * @return PayU v2 response containing the checkout URL
     */
    @Transactional
    public PayUV2PaymentResponse createPayUV2Payment(
            PaymentRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String authenticatedEmail = authentication.getName();

        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Order not found: " + request.getOrderId()));

        if (!order.getUser().getEmail().equalsIgnoreCase(authenticatedEmail)) {
            throw new RuntimeException(
                    "You are not authorized to make a payment for this order.");
        }

        var existingPayment =
                paymentRepository.findByIdempotencyKey(
                        request.getIdempotencyKey());

        if (existingPayment.isPresent()) {
            return createPayUV2Payment(existingPayment.get());
        }

        Payment payment = new Payment();

        payment.setOrder(order);
        payment.setAmount(order.getTotalAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus(PaymentStatus.PENDING);
        payment.setIdempotencyKey(request.getIdempotencyKey());

        payment.setTransactionId(
                "MYFOOD_TXN_" + java.util.UUID.randomUUID());

        Payment savedPayment = paymentRepository.save(payment);

        return createPayUV2Payment(savedPayment);
    }

    /**
     * Builds the PayU v2 payment request for an existing payment
     * and sends it to the PayU v2 Hosted Checkout API.
     *
     * @param payment existing payment record
     * @return PayU v2 payment response containing the checkout URL
     */
    public PayUV2PaymentResponse createPayUV2Payment(
            Payment payment) {

        Order order = payment.getOrder();

        PayUV2PaymentChargeSpecification chargeSpecification =
                new PayUV2PaymentChargeSpecification();

        chargeSpecification.setPrice(
                payment.getAmount().toString());

        PayUV2Order payUOrder = new PayUV2Order();

        payUOrder.setProductInfo(
                "MyFood Order #" + order.getId());

        payUOrder.setPaymentChargeSpecification(
                chargeSpecification);

        PayUV2BillingDetails billingDetails =
                new PayUV2BillingDetails();

        billingDetails.setFirstName(
                order.getFullName());

        billingDetails.setEmail(
                order.getUser().getEmail());

        billingDetails.setPhone(
                order.getPhoneNumber());

        billingDetails.setAddress1(
                order.getAddress());

        billingDetails.setCity(
                order.getCity());

        billingDetails.setZipCode(
                order.getPincode());

        billingDetails.setCountry("India");

        PayUV2CallbackActions callbackActions =
                new PayUV2CallbackActions();

        callbackActions.setSuccessAction(
                "http://localhost:8080/api/payments/payu/v2/success");

        callbackActions.setFailureAction(
                "http://localhost:8080/api/payments/payu/v2/failure");

        callbackActions.setCancelAction(
                "http://localhost:8080/api/payments/payu/v2/cancel");

        PayUV2AdditionalInfo additionalInfo =
                new PayUV2AdditionalInfo();

        additionalInfo.setTxnFlow("nonseamless");

        PayUV2PaymentRequest request =
                new PayUV2PaymentRequest();

        request.setAccountId(
                payUConfig.getMerchantKey());

        request.setTxnId(
                payment.getTransactionId());

        request.setCurrency("INR");

        request.setOrder(payUOrder);

        request.setBillingDetails(billingDetails);

        request.setCallBackActions(callbackActions);

        request.setAdditionalInfo(additionalInfo);

        return payUV2Gateway.createPayment(request);
    }

    /**
     * Verifies a PayU v2 transaction and updates the payment and order
     * only when PayU confirms that the transaction was captured successfully.
     *
     * @param txnId merchant transaction ID
     * @return verified PayU transaction response
     */
    @Transactional
    public String verifyPayUV2Payment(String txnId) {

        String verificationResponse =
                payUV2Gateway.verifyPayment(txnId);

        try {
            com.fasterxml.jackson.databind.ObjectMapper objectMapper =
                    new com.fasterxml.jackson.databind.ObjectMapper();

            JsonNode root =
                    objectMapper.readTree(verificationResponse);

            int status = root.path("status").asInt();

            JsonNode result = root.path("result");

            if (status != 1 || !result.isArray() || result.isEmpty()) {
                throw new RuntimeException(
                        "PayU payment verification failed.");
            }

            JsonNode transaction = result.get(0);

            String paymentStatus =
                    transaction.path("status").asText();

            String unmappedStatus =
                    transaction.path("unmappedStatus").asText();

            if ("success".equalsIgnoreCase(paymentStatus)
                    && "captured".equalsIgnoreCase(unmappedStatus)) {

                Payment payment =
                        paymentRepository.findByTransactionId(txnId)
                                .orElseThrow(() ->
                                        new RuntimeException(
                                                "Payment not found for transaction: "
                                                        + txnId));

                payment.setPaymentStatus(PaymentStatus.PAID);

                paymentRepository.save(payment);

                Order order = payment.getOrder();

                order.setPaymentStatus(PaymentStatus.PAID);

                order.setStatus(
                        com.fooddelivery.api.entity.OrderStatus.CONFIRMED);

                orderRepository.save(order);
            }

            return verificationResponse;

        } catch (Exception exception) {
            throw new RuntimeException(
                    "Failed to process PayU verification response.",
                    exception);
        }
    }

    /**
     * Marks a PayU v2 payment as failed and keeps the order unconfirmed.
     *
     * @param txnId merchant transaction ID
     */
    @Transactional
    public void markPayUV2PaymentFailed(String txnId) {

        Payment payment =
                paymentRepository.findByTransactionId(txnId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Payment not found for transaction: " + txnId));

        payment.setPaymentStatus(PaymentStatus.FAILED);

        paymentRepository.save(payment);
    }

    /**
     * Finds a payment using the merchant transaction ID.
     *
     * @param txnId merchant transaction ID
     * @return payment associated with the transaction
     */
    public Payment getPaymentByTransactionId(String txnId) {

        return paymentRepository.findByTransactionId(txnId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Payment not found for transaction: " + txnId));
    }
}