package com.fooddelivery.api.payment.gateway;

import com.fooddelivery.api.config.PayUConfig;
import com.fooddelivery.api.util.PayUV2AuthUtil;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fooddelivery.api.dto.PayUV2PaymentRequest;
import com.fooddelivery.api.dto.PayUV2PaymentResponse;

/**
 * Handles communication between the application and PayU v2 APIs.
 */
@Component
public class PayUV2Gateway {

    private final RestClient restClient;
    private final PayUConfig payUConfig;
    private final ObjectMapper objectMapper;

    /**
     * Creates the PayU v2 gateway.
     *
     * @param restClient HTTP client used for PayU communication
     * @param payUConfig PayU configuration
     * @param objectMapper converts Java objects to JSON
     */
    public PayUV2Gateway(
            RestClient restClient,
            PayUConfig payUConfig,
            ObjectMapper objectMapper) {

        this.restClient = restClient;
        this.payUConfig = payUConfig;
        this.objectMapper = objectMapper;
    }

    /**
     * Generates the current date in the exact GMT format
     * required by PayU v2 APIs.
     *
     * @return current GMT date
     */
    private String generatePayUDate() {
        return ZonedDateTime.now(ZoneOffset.UTC)
                .format(
                        DateTimeFormatter.ofPattern(
                                "EEE, dd MMM yyyy HH:mm:ss 'GMT'",
                                java.util.Locale.ENGLISH
                        )
                );
    }

    /**
     * Creates a payment through the PayU v2 Hosted Checkout API.
     *
     * @param request PayU v2 payment request
     * @return PayU payment response containing the checkout URL
     */
    public PayUV2PaymentResponse createPayment(
            PayUV2PaymentRequest request) {

        try {
            String requestBody =
                    objectMapper.writeValueAsString(request);

            String date = generatePayUDate();

            String signature =
                    PayUV2AuthUtil.generateSignature(
                            requestBody,
                            date,
                            payUConfig.getMerchantSalt());

            String authorization =
                    "hmac username=\""
                            + payUConfig.getMerchantKey()
                            + "\", algorithm=\"sha512\", headers=\"date\", signature=\""
                            + signature
                            + "\"";

//            return restClient
//                    .post()
//                    .uri(payUConfig.getPaymentUrl())
//                    .header("Content-Type", "application/json")
//                    .header("date", date)
//                    .header("authorization", authorization)
//                    .body(requestBody)
//                    .retrieve()
//                    .body(PayUV2PaymentResponse.class);
            String responseBody = restClient.post()
                    .uri(payUConfig.getPaymentUrl())
                    .contentType(MediaType.APPLICATION_JSON)
                    .header("date", date)
                    .header("authorization", authorization)
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

            System.out.println("PayU v2 response:");
            System.out.println(responseBody);

            try {
                return objectMapper.readValue(responseBody, PayUV2PaymentResponse.class);
            } catch (Exception exception) {
                throw new RuntimeException(
                        "Unable to parse PayU v2 response: " + responseBody,
                        exception);
            }

        } catch (JsonProcessingException exception) {
            throw new IllegalStateException(
                    "Failed to create PayU v2 payment request.",
                    exception);
        }
    }

    /**
     * Verifies a PayU v2 transaction using the merchant transaction ID.
     *
     * @param txnId merchant transaction ID
     * @return raw PayU verification response
     */
    public String verifyPayment(String txnId) {

        try {
            String requestBody = """
                {"txnId":["%s"]}
                """.formatted(txnId);

            String date = generatePayUDate();

            String signature = PayUV2AuthUtil.generateSignature(
                    requestBody,
                    date,
                    payUConfig.getMerchantSalt()
            );

            String authorization =
                    "hmac username=\"" + payUConfig.getMerchantKey()
                            + "\", algorithm=\"sha512\", headers=\"date\", signature=\""
                            + signature + "\"";

            return restClient.post()
                    .uri(payUConfig.getVerifyUrl())
                    .contentType(MediaType.APPLICATION_JSON)
                    .header("date", date)
                    .header("authorization", authorization)
                    .header("Info-Command", "verify_payment")
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

        } catch (Exception exception) {
            throw new RuntimeException(
                    "Failed to verify PayU payment.",
                    exception
            );
        }
    }
}