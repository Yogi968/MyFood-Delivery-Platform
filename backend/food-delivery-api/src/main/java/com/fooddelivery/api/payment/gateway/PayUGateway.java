package com.fooddelivery.api.payment.gateway;
import com.fooddelivery.api.dto.PaymentResponse;
import com.fooddelivery.api.config.PayUConfig;
import com.fooddelivery.api.dto.PaymentInitiationResponse;
import com.fooddelivery.api.entity.Payment;
import com.fooddelivery.api.util.PayUHashUtil;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

/**
 * Payment gateway implementation for the PayU test environment.
 */
@Component
@Primary
public class PayUGateway implements PaymentGateway {

    private final PayUConfig payUConfig;

    /**
     * Creates the PayU gateway with the required configuration.
     *
     * @param payUConfig configuration containing PayU credentials
     */
    public PayUGateway(PayUConfig payUConfig) {
        this.payUConfig = payUConfig;
    }

    /**
     * Creates the PayU payment initiation data required by the frontend.
     *
     * <p>
     * The payment is not marked as successful at this stage. The method
     * prepares the information required to redirect the customer to the
     * PayU test checkout.
     * </p>
     *
     * @param payment payment transaction created by MyFood
     * @return payment initiation information
     */
    @Override
    public PaymentInitiationResponse createPayment(Payment payment) {

        PaymentInitiationResponse response =
                new PaymentInitiationResponse();

        response.setPaymentUrl("https://test.payu.in/_payment");
        response.setKey(payUConfig.getMerchantKey());
        response.setTransactionId(payment.getTransactionId());
        response.setAmount(payment.getAmount().toString());
        response.setProductInfo(
                "MyFood Order #" + payment.getOrder().getId()
        );
        response.setFirstName(payment.getOrder().getFullName());
        response.setPhone(payment.getOrder().getPhoneNumber());
        String email = payment.getOrder().getUser().getEmail();

        String hashInput =
                payUConfig.getMerchantKey()
                        + "|" + payment.getTransactionId()
                        + "|" + payment.getAmount()
                        + "|MyFood Order"
                        + "|" + payment.getOrder().getFullName()
                        + "|" + email
                        + "||||||||||||||||"
                        + payUConfig.getMerchantSalt();

        String hash = PayUHashUtil.generateSha512(hashInput);

        response.setEmail(email);
        response.setHash(hash);
        response.setSuccessUrl(
                "http://localhost:8080/api/payments/payu/success"
        );
        response.setFailureUrl(
                "http://localhost:8080/api/payments/payu/failure"
        );
        return response;
    }

    /**
     * Verifies the status of an existing PayU payment transaction.
     *
     * <p>
     * The actual PayU verification request will be implemented once
     * the hosted checkout callback flow is connected.
     * </p>
     *
     * @param transactionId unique transaction identifier
     * @return verified payment information
     */
    @Override
    public PaymentResponse verifyPayment(String transactionId) {
        throw new UnsupportedOperationException(
                "PayU payment verification is not implemented yet."
        );
    }
}